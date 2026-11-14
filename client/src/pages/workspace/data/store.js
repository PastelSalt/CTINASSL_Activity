import { useSyncExternalStore } from 'react'
import * as base from './fixtures'

// Session-only state (PLAN-A-04L): tasks added with Quick add and projects created from a template
// appear immediately, are clearly labelled as session-only, and disappear on reload.
// Nothing is persisted or sent anywhere.

let session = { projects: [], milestones: [], tasks: [] }
let sequence = 0
let version = 0
let cache = null
const listeners = new Set()

const build = () => ({
  projects: [...base.projects, ...session.projects],
  milestones: [...base.milestones, ...session.milestones],
  tasks: [...base.tasks, ...session.tasks],
  requirements: base.requirements,
  files: base.files,
  changes: base.changes,
})

/** Current merged data. Selectors read from here so session additions show up everywhere. */
export const data = () => (cache ||= build())

const emit = () => {
  cache = null
  version += 1
  listeners.forEach((listener) => listener())
}

const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** Re-renders the caller whenever session data changes. */
export const useStoreVersion = () => useSyncExternalStore(subscribe, () => version)

export const sessionCount = () => session.tasks.length + session.projects.length

export function addTask(partial) {
  const id = `s-t${++sequence}`
  session = {
    ...session,
    tasks: [...session.tasks, { id, projectId: 'project-garden', milestoneId: null, title: 'Untitled task', notes: '', status: 'To do', priority: 'normal', due: null, blocked: false, subtasks: [], requirementIds: [], fileIds: [], changeIds: [], session: true, ...partial }],
  }
  emit()
  return id
}

export function addProject(project, milestones = [], tasks = []) {
  const id = `s-p${++sequence}`
  const stamp = { updatedAt: '2026-11-12', lastOpenedAt: '2026-11-12T12:00:00', session: true }
  session = {
    projects: [...session.projects, { id, tone: 'pink', tags: [], objective: '', description: '', start: '2026-11-12', end: '2027-02-12', phaseIndex: 0, ...project, ...stamp }],
    milestones: [...session.milestones, ...milestones.map((m, i) => ({ id: `s-m${++sequence}`, projectId: id, description: '', start: '2026-11-12', phase: 0, afterId: null, ...m, session: true, order: i }))],
    tasks: [...session.tasks, ...tasks.map((t) => ({ id: `s-t${++sequence}`, projectId: id, milestoneId: null, notes: '', status: 'To do', priority: 'normal', due: null, blocked: false, subtasks: [], requirementIds: [], fileIds: [], changeIds: [], session: true, ...t }))],
  }
  emit()
  return id
}

export function resetSession() {
  session = { projects: [], milestones: [], tasks: [] }
  emit()
}
