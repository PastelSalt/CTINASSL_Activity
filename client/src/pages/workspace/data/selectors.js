import { data } from './store'
import { DEMO_TODAY, daysFromToday } from './format'

// All derived numbers (counts, progress, states, gaps) are computed here so Home, Insights, and the
// project page can never disagree. Selectors read the merged store and never mutate it.

const LISTS = { project: 'projects', milestone: 'milestones', task: 'tasks', requirement: 'requirements', file: 'files', change: 'changes' }
export const get = (type, id) => data()[LISTS[type]]?.find((item) => item.id === id) ?? null

export const scoped = (list, projectId) => (!projectId || projectId === 'all' ? list : list.filter((item) => item.projectId === projectId))
export const activeProjects = () => data().projects.filter((p) => !p.archived)

/* ---------- Work ---------- */
export const isOpen = (task) => task.status !== 'Done'
export const isOverdue = (task) => isOpen(task) && Boolean(task.due) && task.due < DEMO_TODAY
export const dueSoon = (task, days = 7) => isOpen(task) && Boolean(task.due) && daysFromToday(task.due) >= 0 && daysFromToday(task.due) <= days

export const milestoneState = (m) => {
  if (m.done) return 'Done'
  if (m.due < DEMO_TODAY) return 'Overdue'
  if (m.start <= DEMO_TODAY) return 'Doing'
  return 'Upcoming'
}

export const tasksOfMilestone = (milestoneId) => data().tasks.filter((task) => task.milestoneId === milestoneId)
export const milestoneProgress = (milestoneId) => {
  const list = tasksOfMilestone(milestoneId)
  return { done: list.filter((t) => t.status === 'Done').length, total: list.length }
}

export function projectProgress(projectId) {
  const list = data().tasks.filter((task) => task.projectId === projectId)
  const done = list.filter((task) => task.status === 'Done').length
  return { done, total: list.length, pct: list.length ? Math.round((done / list.length) * 100) : null }
}

export const projectHealth = (projectId) => (data().tasks.some((t) => t.projectId === projectId && isOverdue(t)) ? 'At risk' : 'On track')

export function projectCounts(projectId) {
  const mine = (list) => list.filter((item) => item.projectId === projectId).length
  const d = data()
  return { tasks: mine(d.tasks), milestones: mine(d.milestones), requirements: mine(d.requirements), files: mine(d.files), changes: mine(d.changes) }
}

export const nextMilestone = (projectId) => data().milestones
  .filter((m) => m.projectId === projectId && !m.done)
  .sort((a, b) => a.due.localeCompare(b.due))[0] ?? null

/* ---------- Home and Tasks horizons ---------- */
const byDue = (a, b) => (a.due || '9999').localeCompare(b.due || '9999')

export function todayList(projectId = 'all') {
  const open = scoped(data().tasks, projectId).filter(isOpen)
  return {
    overdue: open.filter(isOverdue).sort(byDue),
    today: open.filter((t) => t.due === DEMO_TODAY),
    doing: open.filter((t) => t.status === 'Doing' && (!t.due || t.due > DEMO_TODAY)).sort(byDue),
    doneToday: scoped(data().tasks, projectId).filter((t) => t.status === 'Done' && t.due === DEMO_TODAY),
  }
}

/** Tasks and milestones due after today, within the window, as one sorted list. */
export function upNext(days = 7, projectId = 'all') {
  const within = (due) => due && daysFromToday(due) > 0 && daysFromToday(due) <= days
  const tasks = scoped(data().tasks, projectId).filter((t) => isOpen(t) && within(t.due)).map((record) => ({ kind: 'task', record, due: record.due }))
  const milestones = scoped(data().milestones, projectId).filter((m) => !m.done && within(m.due)).map((record) => ({ kind: 'milestone', record, due: record.due }))
  return [...tasks, ...milestones].sort((a, b) => a.due.localeCompare(b.due))
}

export function figures() {
  const open = data().tasks.filter(isOpen)
  return { dueToday: open.filter((t) => t.due === DEMO_TODAY).length, overdue: open.filter(isOverdue).length, doing: open.filter((t) => t.status === 'Doing').length }
}

export const recentProjects = (limit = 4) => activeProjects().sort((a, b) => b.lastOpenedAt.localeCompare(a.lastOpenedAt)).slice(0, limit)

export function recents(limit = 6) {
  const d = data()
  const items = [
    ...activeProjects().map((p) => ({ type: 'Project', id: p.id, title: p.name, at: p.lastOpenedAt })),
    ...d.files.map((f) => ({ type: 'File', id: f.id, title: f.name, at: `${f.updatedAt}T00:00:00` })),
    ...d.changes.map((c) => ({ type: 'Change', id: c.id, title: c.summary, at: c.at })),
  ]
  return items.sort((a, b) => b.at.localeCompare(a.at)).slice(0, limit)
}

/* ---------- Specs ---------- */
export const isFinalFile = (file) => (file.body ? file.status === 'Final' : Boolean(file.isFinal))
export const criteriaProgress = (req) => ({ met: req.acceptance.filter((c) => c.met).length, total: req.acceptance.length })

/** What a requirement is linked to, and which links are still missing (a "lens" on the record). */
export function requirementLinks(req) {
  const d = data()
  const tasks = d.tasks.filter((t) => t.requirementIds.includes(req.id))
  const files = d.files.filter((f) => f.requirementIds.includes(req.id))
  const changes = d.changes.filter((c) => c.requirementIds.includes(req.id))
  const milestone = req.milestoneId ? get('milestone', req.milestoneId) : null
  return { tasks, files, changes, milestone, gaps: { task: tasks.length === 0, file: !files.some(isFinalFile) } }
}

export function coverage(projectId = 'all') {
  const list = scoped(data().requirements, projectId)
  const complete = list.filter((r) => r.status === 'Met' && r.verified).length
  const withGaps = list.filter((r) => { const g = requirementLinks(r).gaps; return g.task || g.file }).length
  return { total: list.length, complete, withGaps }
}

export const overdueRecords = (projectId = 'all') => [
  ...scoped(data().tasks, projectId).filter(isOverdue).map((record) => ({ type: 'Task', record })),
  ...scoped(data().milestones, projectId).filter((m) => milestoneState(m) === 'Overdue').map((record) => ({ type: 'Milestone', record })),
]

/* ---------- Links ---------- */
export function recordHref(type, id) {
  if (type === 'Project') return `/projects/${id}`
  if (type === 'Task') return `/tasks?select=${id}`
  const record = get(type.toLowerCase(), id)
  if (!record) return '/home'
  if (type === 'File') return record.body ? `/library?doc=${id}` : `/library?select=${id}`
  const view = { Requirement: 'specs', Milestone: 'work', Change: 'history' }[type]
  return `/projects/${record.projectId}?view=${view}&select=${id}`
}

export function recordTitle(type, id) {
  const record = get(type.toLowerCase(), id)
  return record?.title || record?.name || record?.summary || id
}
