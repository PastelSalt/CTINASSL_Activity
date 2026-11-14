import { activeProjects } from '../data/selectors'
import { DEMO_TODAY } from '../data/format'

const DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const addDays = (n) => { const d = new Date(`${DEMO_TODAY}T00:00:00`); d.setDate(d.getDate() + n); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` }

/** Reads "#project", "!" / "!high", and a due word (today, tomorrow, weekday) out of one line. */
export function parseQuickAdd(text, fallbackProject) {
  let title = text
  let priority = 'normal'
  let due = null
  let projectId = fallbackProject
  const projects = activeProjects()

  const tag = title.match(/#([\w-]+)/)
  if (tag) {
    const found = projects.find((p) => p.id.includes(tag[1].toLowerCase()) || p.name.toLowerCase().replace(/\W+/g, '').includes(tag[1].toLowerCase().replace(/\W+/g, '')))
    if (found) { projectId = found.id; title = title.replace(tag[0], '') }
  }
  if (/(^|\s)!(high)?(\s|$)/i.test(title)) { priority = 'high'; title = title.replace(/(^|\s)!(high)?(?=\s|$)/i, ' ') }
  const word = title.match(/\b(today|tomorrow|mon|tue|wed|thu|fri|sat|sun)\b/i)
  if (word) {
    const w = word[1].toLowerCase()
    if (w === 'today') due = DEMO_TODAY
    else if (w === 'tomorrow') due = addDays(1)
    else {
      const today = new Date(`${DEMO_TODAY}T00:00:00`).getDay()
      due = addDays(((DAYS.indexOf(w) - today + 7) % 7) || 7)
    }
    title = title.replace(word[0], '')
  }
  return { title: title.replace(/\s+/g, ' ').trim(), priority, due, projectId }
}

