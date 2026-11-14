import { activities, assets, deliverables, documents, milestones, projects, requirements, revisions, tasks, users } from './fixtures'
import { DEMO_TODAY, daysFromToday } from './format'

// All derived numbers (counts, percentages, statuses) are computed here so Overview, Reports,
// and the module pages can never disagree. Selectors never mutate fixtures.

const index = (list) => new Map(list.map((item) => [item.id, item]))
const maps = {
  project: index(projects), user: index(users), milestone: index(milestones), task: index(tasks),
  requirement: index(requirements), asset: index(assets), document: index(documents), revision: index(revisions), deliverable: index(deliverables),
}
export const get = (type, id) => maps[type]?.get(id) ?? null

export const scoped = (list, scope) => (scope === 'all' ? list : list.filter((item) => item.projectId === scope))
export const byDateDesc = (field) => (a, b) => b[field].localeCompare(a[field])

export const milestoneStatus = (m) => {
  if (m.done) return 'Completed'
  if (m.blocked) return 'Blocked'
  if (m.due < DEMO_TODAY) return 'Overdue'
  if (m.start <= DEMO_TODAY) return 'In progress'
  return 'Upcoming'
}

export const isOpen = (task) => task.status !== 'Completed'
export const isOverdue = (task) => isOpen(task) && Boolean(task.due) && task.due < DEMO_TODAY
export const dueSoon = (task) => isOpen(task) && Boolean(task.due) && daysFromToday(task.due) >= 0 && daysFromToday(task.due) <= 7

export function projectProgress(projectId) {
  const list = tasks.filter((task) => task.projectId === projectId)
  const done = list.filter((task) => task.status === 'Completed').length
  return { done, total: list.length, pct: list.length ? Math.round((done / list.length) * 100) : null }
}

export function projectCounts(projectId) {
  const mine = (list) => list.filter((item) => item.projectId === projectId).length
  return {
    milestones: mine(milestones), tasks: mine(tasks), requirements: mine(requirements), assets: mine(assets),
    documents: mine(documents), revisions: mine(revisions), deliverables: mine(deliverables),
  }
}

export const nextMilestone = (projectId) => milestones
  .filter((m) => m.projectId === projectId && !m.done)
  .sort((a, b) => a.due.localeCompare(b.due))[0] ?? null

export const tasksOfMilestone = (milestoneId) => tasks.filter((task) => task.milestoneId === milestoneId)
export const milestoneProgress = (milestoneId) => {
  const list = tasksOfMilestone(milestoneId)
  return { done: list.filter((t) => t.status === 'Completed').length, total: list.length }
}

/** Records linked to a requirement, plus which chain stages have no implementing record (gaps). */
export function requirementLinks(req) {
  const linkedTasks = tasks.filter((task) => task.requirementIds.includes(req.id))
  const linkedRevisions = revisions.filter((rev) => rev.requirementIds.includes(req.id))
  const milestone = req.milestoneId ? get('milestone', req.milestoneId) : null
  const deliverable = req.deliverableId ? get('deliverable', req.deliverableId) : null
  return {
    tasks: linkedTasks, revisions: linkedRevisions, milestone, deliverable,
    gaps: { milestone: !milestone, task: linkedTasks.length === 0, revision: linkedRevisions.length === 0, deliverable: !deliverable },
  }
}

export const criteriaProgress = (req) => ({ met: req.acceptance.filter((c) => c.met).length, total: req.acceptance.length })

export function attentionItems(scope) {
  const items = []
  for (const task of scoped(tasks, scope)) {
    if (!isOpen(task)) continue
    const days = task.due ? daysFromToday(task.due) : null
    let reason = null
    if (task.status === 'Blocked') reason = { rank: 1, label: 'Blocked' }
    else if (days !== null && days < 0) reason = { rank: 0, label: 'Overdue' }
    else if (days !== null && days <= 1) reason = { rank: 2, label: days === 0 ? 'Due today' : 'Due tomorrow' }
    if (reason) items.push({ kind: 'task', record: task, rank: reason.rank, reason: reason.label })
  }
  for (const m of scoped(milestones, scope)) {
    const status = milestoneStatus(m)
    if (status === 'Overdue' || status === 'Blocked') items.push({ kind: 'milestone', record: m, rank: status === 'Overdue' ? 0 : 1, reason: status })
  }
  return items.sort((a, b) => a.rank - b.rank || (a.record.due || '9999').localeCompare(b.record.due || '9999'))
}

export function verificationCoverage(scope) {
  const list = scoped(requirements, scope)
  const count = (value) => list.filter((req) => req.verification === value).length
  return { total: list.length, verified: count('Verified'), unverified: count('Unverified'), failed: count('Failed') }
}

export function workload(scope) {
  const list = scoped(tasks, scope)
  const countBy = (field, values) => Object.fromEntries(values.map((value) => [value, list.filter((t) => t[field] === value).length]))
  return {
    total: list.length,
    byStatus: countBy('status', ['Backlog', 'To do', 'In progress', 'In review', 'Blocked', 'Completed']),
    byPriority: countBy('priority', ['Low', 'Medium', 'High', 'Urgent']),
  }
}

export const overdueRecords = (scope) => [
  ...scoped(tasks, scope).filter(isOverdue).map((record) => ({ type: 'Task', record })),
  ...scoped(milestones, scope).filter((m) => milestoneStatus(m) === 'Overdue').map((record) => ({ type: 'Milestone', record })),
]

export const recentActivity = (scope, limit = 20) => scoped(activities, scope).slice().sort(byDateDesc('at')).slice(0, limit)

const ROUTES = { Task: '/tasks', Milestone: '/milestones', Requirement: '/requirements', Asset: '/assets', Revision: '/revisions' }
export function recordHref(type, id) {
  if (type === 'Document') return `/documentation?view=reader&doc=${id}`
  return ROUTES[type] ? `${ROUTES[type]}?select=${id}` : '/dashboard'
}

export function recordTitle(type, id) {
  const record = get(type.toLowerCase(), id)
  return record?.title || record?.name || record?.summary || id
}
