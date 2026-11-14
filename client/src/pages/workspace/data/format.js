// Fixed "demo today" so relative dates, overdue checks, and sorting are computed, never hard-coded.
export const DEMO_TODAY = '2026-11-12'
export const DEMO_NOW = '2026-11-12T12:00:00'

const DAY = 86400000
const toDate = (iso) => new Date(`${iso.slice(0, 10)}T00:00:00`)

export const daysBetween = (from, to) => Math.round((toDate(to) - toDate(from)) / DAY)
export const daysFromToday = (iso) => daysBetween(DEMO_TODAY, iso)

export const formatDate = (iso) => toDate(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
export const formatMonth = (iso) => toDate(iso).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })

/** Describes a due date relative to the demo day. `tone` drives the visual treatment. */
export function dueInfo(due, done = false) {
  if (!due) return { label: 'No date', tone: 'none', days: null }
  const days = daysFromToday(due)
  if (done) return { label: formatDate(due), tone: 'done', days }
  if (days < 0) return { label: `${-days} day${days === -1 ? '' : 's'} overdue`, tone: 'overdue', days }
  if (days === 0) return { label: 'Today', tone: 'today', days }
  if (days === 1) return { label: 'Tomorrow', tone: 'soon', days }
  if (days <= 7) return { label: `In ${days} days`, tone: 'soon', days }
  return { label: formatDate(due), tone: 'later', days }
}

export function timeAgo(iso) {
  const minutes = Math.round((new Date(DEMO_NOW) - new Date(iso)) / 60000)
  if (minutes < 60) return `${Math.max(minutes, 1)} min ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours} h ago`
  const days = Math.round(hours / 24)
  return days === 1 ? 'Yesterday' : `${days} days ago`
}

export const dayGroup = (iso) => {
  const days = daysBetween(iso, DEMO_TODAY)
  if (days <= 0) return 'Today'
  if (days === 1) return 'Yesterday'
  return formatDate(iso)
}

export function formatBytes(bytes) {
  if (!bytes) return '—'
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`
