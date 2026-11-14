import { Check, ChevronDown, Circle, File, FileText, Image, Link2, Music, Table2, CircleCheckBig, Loader } from 'lucide-react'
import { get, isFinalFile, criteriaProgress, milestoneProgress, milestoneState, requirementLinks, tasksOfMilestone } from '../data/selectors'
import { formatBytes, formatDate, timeAgo } from '../data/format'
import { DueLabel, Flag, ProgressBar, RelationChip, StatusBadge } from './badges'
import { DetailPanel, Fields, PreviewAction } from './layout'
import { UnsupportedPreview } from './states'
import { kindLabel } from '../data/kinds'

/** A row that is a link when `href` is given, otherwise a selectable button. */
function RowShell({ href, onSelect, id, selected, className, children }) {
  const props = href ? { href } : { type: 'button', onClick: () => onSelect(id), 'aria-pressed': Boolean(selected) }
  const Element = href ? 'a' : 'button'
  return <Element className={`row ${className} ${selected ? 'row--selected' : ''}`} {...props}>{children}</Element>
}

const STATUS_ICONS = { 'To do': Circle, Doing: Loader, Done: CircleCheckBig }

/** Lens block: why a record exists (what is above it) and what it becomes (what follows from it). */
export function LensBlock({ why = [], becomes = [], emptyWhy, emptyBecomes }) {
  return (
    <div className="lens">
      <div><h3>Why it exists</h3>{why.length ? <div className="chip-list">{why}</div> : <p className="muted">{emptyWhy}</p>}</div>
      <div><h3>What it becomes</h3>{becomes.length ? <div className="chip-list">{becomes}</div> : <p className="muted">{emptyBecomes}</p>}</div>
    </div>
  )
}

export function TaskRow({ task, selected, onSelect, href, showProject = false }) {
  const milestone = task.milestoneId ? get('milestone', task.milestoneId) : null
  const done = task.subtasks.filter((s) => s.done).length
  const Icon = STATUS_ICONS[task.status]
  return (
    <RowShell href={href} onSelect={onSelect} id={task.id} selected={selected} className={`task-row task-row--${task.status.replace(' ', '').toLowerCase()}`}>
      <span className="task-row__icon" aria-hidden="true"><Icon size={20} /></span>
      <span className="row__main">
        <span className="row__title">{task.title}<span className="sr-only"> ({task.status})</span></span>
        <span className="row__meta">
          {showProject && <span>{get('project', task.projectId).name}</span>}
          {milestone && <span>{milestone.title}</span>}
          {task.subtasks.length > 0 && <span>{done}/{task.subtasks.length} subtasks</span>}
          {task.session && <span className="session-tag">Session only</span>}
        </span>
      </span>
      <span className="row__side">
        {task.blocked && <Flag name="Blocked" />}
        {task.priority === 'high' && <Flag name="High" label="High priority" />}
        <DueLabel due={task.due} done={task.status === 'Done'} />
      </span>
    </RowShell>
  )
}

/** A milestone with its tasks underneath (project Work tab). */
export function MilestoneGroup({ milestone, tasks, selectedId, onSelect, defaultOpen = true }) {
  const state = milestoneState(milestone)
  const progress = milestoneProgress(milestone.id)
  const after = milestone.afterId ? get('milestone', milestone.afterId) : null
  return (
    <details className="milestone-group" open={defaultOpen}>
      <summary>
        <ChevronDown className="milestone-group__chevron" size={16} aria-hidden="true" />
        <span className="milestone-group__title">{milestone.title}</span>
        <span className="milestone-group__meta">
          <StatusBadge domain="derived" status={state} />
          {milestone.blocked && <Flag name="Blocked" />}
          <DueLabel due={milestone.due} done={state === 'Done'} />
          <ProgressBar value={progress.done} max={progress.total} label={`${milestone.title} tasks done`} />
          {after && <span className="muted">after {after.title}</span>}
        </span>
      </summary>
      <ul className="rows rows--tight">
        {tasks.map((task) => <li key={task.id}><TaskRow task={task} selected={selectedId === task.id} onSelect={onSelect} /></li>)}
        {tasks.length === 0 && <li className="board__empty">No tasks yet</li>}
      </ul>
    </details>
  )
}

export function RequirementRow({ requirement, selected, onSelect, href }) {
  const criteria = criteriaProgress(requirement)
  const links = requirementLinks(requirement)
  return (
    <RowShell href={href} onSelect={onSelect} id={requirement.id} selected={selected} className="req-row">
      <span className="row__main">
        <span className="row__title"><code className="req-id">{requirement.id}</code> {requirement.title}</span>
        <span className="row__meta">
          <span>{criteria.total ? `${criteria.met}/${criteria.total} criteria` : 'No criteria'}</span>
          <span>{links.tasks.length} task{links.tasks.length === 1 ? '' : 's'} · {links.files.length} file{links.files.length === 1 ? '' : 's'}</span>
          {links.gaps.task && <span className="gap">No work yet</span>}
        </span>
      </span>
      <span className="row__side">
        <StatusBadge domain="requirement" status={requirement.status} />
        {requirement.verified && <Flag name="Verified" />}
      </span>
    </RowShell>
  )
}

const KIND_ICONS = { document: FileText, image: Image, media: Music, data: Table2, link: Link2 }
const previewable = (file) => ['png', 'jpg', 'md', 'pdf'].includes(file.ext) && !file.progress

export function FileThumb({ file, large = false }) {
  const Icon = KIND_ICONS[file.kind] || File
  return <span className={`thumb thumb--${file.kind} ${large ? 'thumb--large' : ''}`} aria-hidden="true"><Icon size={large ? 40 : 28} /><small>{file.ext === 'link' ? 'link' : `.${file.ext}`}</small></span>
}

export function FileTile({ file, selected, onSelect }) {
  return (
    <button type="button" className={`tile ${selected ? 'tile--selected' : ''}`} aria-pressed={selected} onClick={() => onSelect(file.id)}>
      <FileThumb file={file} />
      <span className="tile__name">{file.name}</span>
      <span className="row__meta"><span>{get('project', file.projectId).name}</span></span>
      <span className="row__meta">
        <span>{file.progress ? `${file.progress}% uploaded` : file.kind === 'link' ? file.host : formatBytes(file.bytes)}</span>
        {file.body && <StatusBadge domain="document" status={file.status} />}
        {!file.body && isFinalFile(file) && <Flag name="Final" label="Final file" />}
      </span>
      {file.progress && <ProgressBar value={file.progress} max={100} label={`${file.name} upload`} />}
    </button>
  )
}

export function ChangeEntry({ change, selected, onSelect }) {
  return (
    <li className="feed__item">
      <span className="feed__dot" aria-hidden="true" />
      <button type="button" className={`row row--button feed__card ${selected ? 'row--selected' : ''}`} aria-pressed={selected} onClick={() => onSelect(change.id)}>
        <span className="row__main">
          <span className="row__title">{change.summary}</span>
          <span className="row__meta">
            <span>{change.recordType}: {get(change.recordType.toLowerCase(), change.recordId)?.name || get(change.recordType.toLowerCase(), change.recordId)?.title || change.recordId}</span>
            {change.toVersion != null && <span>v{change.fromVersion} → v{change.toVersion}</span>}
            <time dateTime={change.at} title={change.at.replace('T', ' ')}>{timeAgo(change.at)}</time>
          </span>
        </span>
        <span className="row__side">{change.reviewed && <Flag name="Reviewed" />}</span>
      </button>
    </li>
  )
}

/* Detail panels: full record, relationships as chips, and preview-only actions. */

export function TaskPanel({ task, onClose }) {
  const milestone = task.milestoneId ? get('milestone', task.milestoneId) : null
  return (
    <DetailPanel title={task.title} kicker={`Task · ${get('project', task.projectId).name}`} onClose={onClose}
      actions={<><PreviewAction label="Edit task" variant="primary" /><PreviewAction label="Change status" /><PreviewAction label={task.blocked ? 'Unblock' : 'Mark blocked'} /></>}>
      <div className="chip-list"><StatusBadge domain="work" status={task.status} />{task.blocked && <Flag name="Blocked" />}{task.priority === 'high' && <Flag name="High" label="High priority" />}</div>
      {task.notes && <p>{task.notes}</p>}
      <Fields items={[['Due', <DueLabel due={task.due} done={task.status === 'Done'} key="due" />], ['Milestone', milestone?.title ?? 'None']]} />
      {task.subtasks.length > 0 && (
        <div><h3>Subtasks</h3><ul className="checklist">{task.subtasks.map((s) => <li key={s.text} data-done={s.done}>{s.done ? <Check size={16} aria-label="Done" /> : <Circle size={16} aria-label="Not done" />}{s.text}</li>)}</ul></div>
      )}
      <LensBlock
        why={[<RelationChip type="Project" id={task.projectId} key="p" />, ...(milestone ? [<RelationChip type="Milestone" id={milestone.id} key="m" />] : []), ...task.requirementIds.map((id) => <RelationChip type="Requirement" id={id} label={id} key={id} />)]}
        becomes={[...task.fileIds.map((id) => <RelationChip type="File" id={id} key={id} />), ...task.changeIds.map((id) => <RelationChip type="Change" id={id} key={id} />)]}
        emptyWhy="Not linked to a requirement yet." emptyBecomes="No files or changes yet."
      />
      {task.session && <p className="note">Added for this session only. It disappears when you reload.</p>}
    </DetailPanel>
  )
}

export function MilestonePanel({ milestone, onClose }) {
  const state = milestoneState(milestone)
  const tasks = tasksOfMilestone(milestone.id)
  return (
    <DetailPanel title={milestone.title} kicker={`Milestone · ${get('project', milestone.projectId).name}`} onClose={onClose}
      actions={<><PreviewAction label="Edit milestone" variant="primary" /><PreviewAction label="Mark done" /></>}>
      <div className="chip-list"><StatusBadge domain="derived" status={state} />{milestone.blocked && <Flag name="Blocked" />}</div>
      <p>{milestone.description}</p>
      <Fields items={[['Starts', formatDate(milestone.start)], ['Due', <DueLabel due={milestone.due} done={state === 'Done'} key="d" />], ['After', milestone.afterId ? get('milestone', milestone.afterId).title : null]]} />
      <div><h3>Tasks</h3><div className="chip-list">{tasks.length ? tasks.map((t) => <RelationChip type="Task" id={t.id} key={t.id} />) : <span className="muted">No tasks yet.</span>}</div></div>
    </DetailPanel>
  )
}

export function RequirementPanel({ requirement, onClose }) {
  const links = requirementLinks(requirement)
  return (
    <DetailPanel title={requirement.title} kicker={`${requirement.id} · ${get('project', requirement.projectId).name}`} onClose={onClose}
      actions={<><PreviewAction label="Mark met" variant="primary" /><PreviewAction label="Mark verified" /><PreviewAction label="Link work" /></>}>
      <div className="chip-list"><StatusBadge domain="requirement" status={requirement.status} />{requirement.verified && <Flag name="Verified" />}{requirement.type && <span className="chip"><span>{requirement.type}</span></span>}</div>
      <p>{requirement.description}</p>
      <div><h3>Acceptance criteria</h3>
        {requirement.acceptance.length
          ? <ul className="checklist">{requirement.acceptance.map((c) => <li key={c.text} data-done={c.met}>{c.met ? <Check size={16} aria-label="Met" /> : <Circle size={16} aria-label="Not met" />}{c.text}</li>)}</ul>
          : <p>No acceptance criteria defined. Add at least one before this can be marked met.</p>}
      </div>
      <LensBlock
        why={[<RelationChip type="Project" id={requirement.projectId} key="p" />, ...(links.milestone ? [<RelationChip type="Milestone" id={links.milestone.id} key="m" />] : [])]}
        becomes={[...links.tasks.map((t) => <RelationChip type="Task" id={t.id} key={t.id} />), ...links.files.map((f) => <RelationChip type="File" id={f.id} key={f.id} />)]}
        emptyWhy="Linked to the project objective." emptyBecomes="No work or files yet."
      />
      {(links.gaps.task || links.gaps.file) && <p className="gap-list">{links.gaps.task && <span className="gap">No task yet</span>}{links.gaps.file && <span className="gap">No final file yet</span>}</p>}
    </DetailPanel>
  )
}

export function FilePanel({ file, onClose }) {
  let preview
  if (file.kind === 'link') preview = <UnsupportedPreview kind="external links" reason={`Opens an external site (${file.host}). Tsumugi does not store this file.`} />
  else if (file.progress) preview = <UnsupportedPreview kind="files still uploading" reason={`Upload is ${file.progress}% complete (sample progress).`} />
  else if (previewable(file)) preview = <div className="preview-area"><FileThumb file={file} large /><small>Preview area — sample illustration</small></div>
  else preview = <UnsupportedPreview kind={`.${file.ext} files`} reason="This type can’t be previewed in the browser. Download it to open it in another app." />
  const links = file.requirementIds.map((id) => <RelationChip type="Requirement" id={id} label={id} key={id} />)
  const tasks = file.taskIds.map((id) => <RelationChip type="Task" id={id} key={id} />)
  return (
    <DetailPanel title={file.name} kicker={`${kindLabel(file.kind)} · ${get('project', file.projectId).name}`} onClose={onClose}
      actions={<>{file.body ? <a className="button button--small button--primary" href={`/library?doc=${file.id}`}>Open</a> : <PreviewAction label="Download" variant="primary" />}<PreviewAction label={isFinalFile(file) ? 'Unmark final file' : 'Mark as final file'} /></>}>
      {preview}
      <p>{file.description}</p>
      <Fields items={[['Type', `${kindLabel(file.kind)} (.${file.ext})`], ['Size', file.bytes ? formatBytes(file.bytes) : null], ['Updated', formatDate(file.updatedAt)], ['Final file', isFinalFile(file) ? 'Yes' : 'No']]} />
      <div className="chip-list">{file.tags.map((t) => <span className="chip" key={t}><span>#{t}</span></span>)}</div>
      <LensBlock why={links} becomes={tasks} emptyWhy="Not linked to a requirement." emptyBecomes="Not linked to a task." />
      <p className="note">Only metadata is shown here. Files themselves belong in object storage, not in the browser.</p>
    </DetailPanel>
  )
}

export function ChangePanel({ change, onClose }) {
  return (
    <DetailPanel title={change.summary} kicker={`Change · ${get('project', change.projectId).name}`} onClose={onClose}
      actions={<PreviewAction label={change.reviewed ? 'Mark not reviewed' : 'Mark reviewed'} variant="primary" />}>
      <div className="chip-list">{change.reviewed ? <Flag name="Reviewed" /> : <StatusBadge domain="change" status="Recorded" />}</div>
      <Fields items={[['When', <time dateTime={change.at} key="t">{change.at.replace('T', ' ').slice(0, 16)}</time>], ['Affected', `${change.recordType} ${change.recordId}`], ['Versions', change.toVersion != null ? `v${change.fromVersion} → v${change.toVersion}` : null]]} />
      <LensBlock
        why={[...change.taskIds.map((id) => <RelationChip type="Task" id={id} key={id} />), ...change.requirementIds.map((id) => <RelationChip type="Requirement" id={id} label={id} key={id} />)]}
        becomes={[<RelationChip type={change.recordType} id={change.recordId} key="r" />]}
        emptyWhy="No linked work." emptyBecomes=""
      />
      {change.diff && <a className="button button--small button--secondary" href={`/projects/${change.projectId}?view=history&mode=compare&rev=${change.id}`}>Open comparison</a>}
    </DetailPanel>
  )
}
