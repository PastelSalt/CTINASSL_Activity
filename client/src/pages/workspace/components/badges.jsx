import { BookOpen, Boxes, CheckSquare, ClipboardList, FolderKanban, History, Milestone, Package } from 'lucide-react'
import { STATUS, PRIORITY } from '../data/status'
import { dueInfo } from '../data/format'
import { get, recordHref, recordTitle } from '../data/selectors'

/** Icon + text + tone from the single status map. Never colour alone. */
export function StatusBadge({ domain, status }) {
  const entry = STATUS[domain]?.[status]
  if (!entry) return <span className="badge badge--neutral">{status}</span>
  const Icon = entry.icon
  return <span className={`badge badge--${entry.tone}`}><Icon size={13} strokeWidth={2.4} aria-hidden="true" />{status}</span>
}

export function PriorityBadge({ priority }) {
  const entry = PRIORITY[priority]
  const Icon = entry.icon
  return <span className={`badge badge--${entry.tone} badge--quiet`}><Icon size={13} strokeWidth={2.4} aria-hidden="true" />{priority}</span>
}

/** Relative due date with overdue/today treatment; the absolute date is in the tooltip. */
export function DueLabel({ due, done = false }) {
  const info = dueInfo(due, done)
  return <span className={`due due--${info.tone}`} title={due || undefined}>{info.label}</span>
}

export function Avatar({ userId, size = 'md' }) {
  const user = get('user', userId)
  if (!user) return <span className={`avatar avatar--${size} avatar--empty`} title="Unassigned" aria-label="Unassigned">—</span>
  return <span className={`avatar avatar--${user.tone} avatar--${size}`} title={user.name} role="img" aria-label={user.name}>{user.initials}</span>
}

export function AvatarStack({ ids, max = 3 }) {
  const shown = ids.slice(0, max)
  return (
    <span className="avatar-stack">
      {shown.map((id) => <Avatar userId={id} size="sm" key={id} />)}
      {ids.length > max && <span className="avatar avatar--sm avatar--empty">+{ids.length - max}</span>}
    </span>
  )
}

const CHIP_ICONS = { Project: FolderKanban, Milestone, Task: CheckSquare, Requirement: ClipboardList, Asset: Boxes, Revision: History, Document: BookOpen, Deliverable: Package }

/** A relationship rendered as a link to the related record. */
export function RelationChip({ type, id, label }) {
  const Icon = CHIP_ICONS[type] || FolderKanban
  let href
  if (type === 'Project') href = `/projects/${id}`
  else if (type === 'Deliverable') href = `/projects/${get('deliverable', id)?.projectId}?view=deliverables`
  else href = recordHref(type, id)
  const text = label ?? (type === 'Project' ? get('project', id)?.name : recordTitle(type, id))
  return <a className="chip" href={href} title={`${type}: ${text}`}><Icon size={13} aria-hidden="true" /><span>{text}</span></a>
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

/** Stacked bar with a text legend so the numbers are never only in the colours. */
export function StackedBar({ segments, label }) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0)
  return (
    <div className="stacked">
      <div className="stacked__bar" role="img" aria-label={`${label}: ${segments.map((s) => `${s.label} ${s.value}`).join(', ')}`}>
        {segments.filter((s) => s.value > 0).map((s) => <span className={`stacked__seg stacked__seg--${s.tone}`} style={{ flexGrow: s.value }} key={s.label} />)}
      </div>
      <ul className="stacked__legend">
        {segments.map((s) => <li key={s.label}><i className={`stacked__seg--${s.tone}`} aria-hidden="true" />{s.label} <strong>{s.value}</strong>{total ? <span> · {Math.round((s.value / total) * 100)}%</span> : null}</li>)}
      </ul>
    </div>
  )
}
