import { FileText, FolderKanban, History, ListChecks, Milestone, ClipboardList } from 'lucide-react'
import { FLAGS, STATUS } from '../data/status'
import { dueInfo } from '../data/format'
import { get, recordHref, recordTitle } from '../data/selectors'

/** Icon + text + tone from the single status map. Never colour alone. */
export function StatusBadge({ domain, status }) {
  const entry = STATUS[domain]?.[status]
  if (!entry) return <span className="badge badge--neutral">{status}</span>
  const Icon = entry.icon
  return <span className={`badge badge--${entry.tone}`}><Icon size={13} strokeWidth={2.4} aria-hidden="true" />{status}</span>
}

/** A flag that applies to a record (Blocked, Verified, Reviewed, Final file, High priority). */
export function Flag({ name, label }) {
  const entry = FLAGS[name]
  const Icon = entry.icon
  return <span className={`badge badge--${entry.tone} badge--quiet`}><Icon size={13} strokeWidth={2.4} aria-hidden="true" />{label ?? name}</span>
}

/** Relative due date with overdue/today treatment; the absolute date is in the tooltip. */
export function DueLabel({ due, done = false }) {
  const info = dueInfo(due, done)
  return <span className={`due due--${info.tone}`} title={due || undefined}>{info.label}</span>
}

const CHIP_ICONS = { Project: FolderKanban, Milestone, Task: ListChecks, Requirement: ClipboardList, File: FileText, Change: History }

/** A relationship rendered as a link to the related record. */
export function RelationChip({ type, id, label }) {
  const Icon = CHIP_ICONS[type] || FolderKanban
  const text = label ?? (type === 'Project' ? get('project', id)?.name : recordTitle(type, id))
  return <a className="chip" href={recordHref(type, id)} title={`${type}: ${text}`}><Icon size={13} aria-hidden="true" /><span>{text}</span></a>
}

export function ProgressBar({ value, max, label }) {
  const pct = max ? Math.round((value / max) * 100) : 0
  return (
    <span className="progress">
      <span className="progress__track" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-label={label}><span style={{ width: `${pct}%` }} /></span>
      <span className="progress__text">{max ? `${value}/${max}` : 'No tasks'}</span>
    </span>
  )
}
