import { Check, Circle, FileText, Image, Music, Table2, Video, Link2, File, Lock } from 'lucide-react'
import { get, milestoneProgress, milestoneStatus, criteriaProgress, requirementLinks, tasksOfMilestone } from '../data/selectors'
import { formatBytes, formatDate, timeAgo } from '../data/format'
import { Avatar, DueLabel, PriorityBadge, ProgressBar, RelationChip, StatusBadge } from './badges'
import { DetailPanel, Fields, PreviewAction } from './layout'
import { UnsupportedPreview } from './states'

/** A row that is a link when `href` is given, otherwise a selectable button. */
function RowShell({ href, onSelect, id, selected, className, children }) {
  const props = href ? { href } : { type: 'button', onClick: () => onSelect(id), 'aria-pressed': Boolean(selected) }
  const Element = href ? 'a' : 'button'
  return <Element className={`row ${className} ${selected ? 'row--selected' : ''}`} {...props}>{children}</Element>
}

export function TaskRow({ task, selected, onSelect, href, showProject = false }) {
  const milestone = task.milestoneId ? get('milestone', task.milestoneId) : null
  const done = task.subtasks.filter((s) => s.done).length
  return (
    <RowShell href={href} onSelect={onSelect} id={task.id} selected={selected} className="task-row">
      <span className="row__main">
        <span className="row__title">{task.title}</span>
        <span className="row__meta">
          {showProject && <span>{get('project', task.projectId).name}</span>}
          {milestone && <span>{milestone.title}</span>}
          {task.subtasks.length > 0 && <span>{done}/{task.subtasks.length} subtasks</span>}
        </span>
      </span>
      <span className="row__side">
        <StatusBadge domain="task" status={task.status} />
        <PriorityBadge priority={task.priority} />
        <DueLabel due={task.due} done={task.status === 'Completed'} />
        <Avatar userId={task.assigneeId} size="sm" />
      </span>
    </RowShell>
  )
}

export function MilestoneRow({ milestone, selected, onSelect, href, showProject = false }) {
  const status = milestoneStatus(milestone)
  const progress = milestoneProgress(milestone.id)
  return (
    <RowShell href={href} onSelect={onSelect} id={milestone.id} selected={selected} className="milestone-row">
      <span className="date-block" aria-hidden="true"><strong>{new Date(`${milestone.due}T00:00:00`).getDate()}</strong><span>{new Date(`${milestone.due}T00:00:00`).toLocaleDateString('en-GB', { month: 'short' })}</span></span>
      <span className="row__main">
        <span className="row__title">{milestone.title}</span>
        <span className="row__meta">
          {showProject && <span>{get('project', milestone.projectId).name}</span>}
          <span>Due <DueLabel due={milestone.due} done={status === 'Completed'} /></span>
          {milestone.dependencyIds.length > 0 && <span>Depends on {milestone.dependencyIds.map((id) => get('milestone', id).title).join(', ')}</span>}
        </span>
      </span>
      <span className="row__side">
        <StatusBadge domain="milestone" status={status} />
        <PriorityBadge priority={milestone.priority} />
        <ProgressBar value={progress.done} max={progress.total} label={`${milestone.title} task progress`} />
      </span>
    </RowShell>
  )
}

export function RequirementRow({ requirement, selected, onSelect, href, showProject = false }) {
  const criteria = criteriaProgress(requirement)
  return (
    <RowShell href={href} onSelect={onSelect} id={requirement.id} selected={selected} className="req-row">
      <span className="row__main">
        <span className="row__title"><code className="req-id">{requirement.id}</code> {requirement.title}</span>
        <span className="row__meta">
          {showProject && <span>{get('project', requirement.projectId).name}</span>}
          <span>{requirement.type}</span>
          <span>{criteria.total ? `Acceptance ${criteria.met}/${criteria.total}` : 'No acceptance criteria'}</span>
        </span>
      </span>
      <span className="row__side">
        <StatusBadge domain="lifecycle" status={requirement.lifecycle} />
        <StatusBadge domain="verification" status={requirement.verification} />
        <PriorityBadge priority={requirement.priority} />
      </span>
    </RowShell>
  )
}

const KIND_ICONS = { Image, Document: FileText, Audio: Music, Video, Dataset: Table2, Reference: Link2, Export: File }
const assetPreviewable = (asset) => asset.access === 'Preview' && ['png', 'jpg', 'md', 'pdf'].includes(asset.ext)

export function AssetThumb({ asset, large = false }) {
  const Icon = asset.access === 'Restricted' ? Lock : KIND_ICONS[asset.kind] || File
  return <span className={`thumb thumb--${asset.kind.toLowerCase()} ${large ? 'thumb--large' : ''}`} aria-hidden="true"><Icon size={large ? 40 : 28} /><small>{asset.ext === 'link' ? 'link' : `.${asset.ext}`}</small></span>
}

export function AssetTile({ asset, selected, onSelect }) {
  return (
    <button type="button" className={`tile ${selected ? 'tile--selected' : ''}`} aria-pressed={selected} onClick={() => onSelect(asset.id)}>
      <AssetThumb asset={asset} />
      <span className="tile__name">{asset.name}</span>
      <span className="row__meta"><span>{get('project', asset.projectId).name}</span></span>
      <span className="row__meta">
        <span>{asset.access === 'Uploading' ? `${asset.progress}% uploaded` : formatBytes(asset.bytes)}</span>
        <StatusBadge domain="access" status={asset.access} />
      </span>
      {asset.access === 'Uploading' && <ProgressBar value={asset.progress} max={100} label={`${asset.name} upload`} />}
    </button>
  )
}

export function RevisionEntry({ revision, selected, onSelect }) {
  const author = get('user', revision.authorId)
  return (
    <li className="feed__item">
      <Avatar userId={revision.authorId} size="sm" />
      <button type="button" className={`row row--button feed__card ${selected ? 'row--selected' : ''}`} aria-pressed={selected} onClick={() => onSelect(revision.id)}>
        <span className="row__main">
          <span className="row__title">{author.name} · {revision.summary}</span>
          <span className="row__meta">
            <span>{revision.recordType}: {revision.recordId}</span>
            <span>{get('project', revision.projectId).name}</span>
            {revision.toVersion != null && <span>v{revision.fromVersion} → v{revision.toVersion}</span>}
            <time dateTime={revision.at} title={revision.at.replace('T', ' ')}>{timeAgo(revision.at)}</time>
          </span>
        </span>
        <span className="row__side"><StatusBadge domain="revision" status={revision.state} /></span>
      </button>
    </li>
  )
}

/* Detail panels: each shows the full record, its relationships as chips, and preview-only actions. */

export function TaskPanel({ task, onClose }) {
  const milestone = task.milestoneId ? get('milestone', task.milestoneId) : null
  return (
    <DetailPanel title={task.title} kicker={`Task · ${get('project', task.projectId).name}`} onClose={onClose}
      actions={<><PreviewAction label="Edit task" variant="primary" /><PreviewAction label="Change status" /></>}>
      <div className="chip-list"><StatusBadge domain="task" status={task.status} /><PriorityBadge priority={task.priority} /></div>
      <p>{task.description}</p>
      <Fields items={[
        ['Due', <DueLabel due={task.due} done={task.status === 'Completed'} key="due" />],
        ['Assignee', get('user', task.assigneeId)?.name ?? 'Unassigned'],
        ['Creator', get('user', task.creatorId)?.name],
        ['Milestone', milestone?.title ?? 'None'],
      ]} />
      {task.subtasks.length > 0 && (
        <div><h3>Subtasks</h3><ul className="checklist">{task.subtasks.map((s) => <li key={s.text} data-done={s.done}>{s.done ? <Check size={16} aria-label="Done" /> : <Circle size={16} aria-label="Not done" />}{s.text}</li>)}</ul></div>
      )}
      <div><h3>Linked records</h3>
        <div className="chip-list">
          <RelationChip type="Project" id={task.projectId} />
          {milestone && <RelationChip type="Milestone" id={milestone.id} />}
          {task.requirementIds.map((id) => <RelationChip type="Requirement" id={id} label={id} key={id} />)}
          {task.assetIds.map((id) => <RelationChip type="Asset" id={id} key={id} />)}
          {task.revisionIds.map((id) => <RelationChip type="Revision" id={id} key={id} />)}
        </div>
      </div>
    </DetailPanel>
  )
}

export function MilestonePanel({ milestone, onClose }) {
  const status = milestoneStatus(milestone)
  const list = tasksOfMilestone(milestone.id)
  return (
    <DetailPanel title={milestone.title} kicker={`Milestone · ${get('project', milestone.projectId).name}`} onClose={onClose}
      actions={<><PreviewAction label="Edit milestone" variant="primary" /><PreviewAction label="Mark complete" /></>}>
      <div className="chip-list"><StatusBadge domain="milestone" status={status} /><PriorityBadge priority={milestone.priority} /></div>
      <p>{milestone.description}</p>
      <Fields items={[['Starts', formatDate(milestone.start)], ['Due', <DueLabel due={milestone.due} done={status === 'Completed'} key="d" />]]} />
      <div><h3>Tasks ({list.length})</h3>
        {list.length ? <div className="chip-list">{list.map((t) => <RelationChip type="Task" id={t.id} key={t.id} />)}</div> : <p>No tasks linked yet.</p>}
      </div>
      <div><h3>Dependencies</h3>
        {milestone.dependencyIds.length ? <div className="chip-list">{milestone.dependencyIds.map((id) => <RelationChip type="Milestone" id={id} key={id} />)}</div> : <p>None.</p>}
      </div>
      <div><h3>Deliverables</h3>
        {milestone.deliverableIds.length ? <div className="chip-list">{milestone.deliverableIds.map((id) => <RelationChip type="Deliverable" id={id} label={get('deliverable', id).title} key={id} />)}</div> : <p>None yet.</p>}
      </div>
    </DetailPanel>
  )
}

export function RequirementPanel({ requirement, onClose }) {
  const links = requirementLinks(requirement)
  return (
    <DetailPanel title={requirement.title} kicker={`${requirement.id} · ${get('project', requirement.projectId).name}`} onClose={onClose}
      actions={<><PreviewAction label="Mark verified" variant="primary" /><PreviewAction label="Link work" /></>}>
      <div className="chip-list">
        <StatusBadge domain="lifecycle" status={requirement.lifecycle} /><StatusBadge domain="verification" status={requirement.verification} /><PriorityBadge priority={requirement.priority} />
      </div>
      <p>{requirement.description}</p>
      <div><h3>Acceptance criteria</h3>
        {requirement.acceptance.length
          ? <ul className="checklist">{requirement.acceptance.map((c) => <li key={c.text} data-done={c.met}>{c.met ? <Check size={16} aria-label="Met" /> : <Circle size={16} aria-label="Not met" />}{c.text}</li>)}</ul>
          : <p>No acceptance criteria defined. Add at least one before this can be verified.</p>}
      </div>
      <div><h3>Traceability</h3>
        <div className="chip-list">
          {links.milestone ? <RelationChip type="Milestone" id={links.milestone.id} /> : <span className="gap">No milestone</span>}
          {links.tasks.length ? links.tasks.map((t) => <RelationChip type="Task" id={t.id} key={t.id} />) : <span className="gap">No implementing task</span>}
          {links.revisions.map((r) => <RelationChip type="Revision" id={r.id} key={r.id} />)}
          {links.deliverable ? <RelationChip type="Deliverable" id={links.deliverable.id} label={links.deliverable.title} /> : <span className="gap">No deliverable</span>}
        </div>
      </div>
    </DetailPanel>
  )
}

export function AssetPanel({ asset, onClose }) {
  const previewable = assetPreviewable(asset)
  let preview
  if (asset.access === 'Restricted') preview = <UnsupportedPreview kind="restricted files" reason="You don’t have access to this file. Ask the project owner to share it." />
  else if (asset.access === 'Linked') preview = <UnsupportedPreview kind="external links" reason={`Opens an external site (${asset.host}). Tsumugi does not store this file.`} />
  else if (asset.access === 'Uploading') preview = <UnsupportedPreview kind="files still uploading" reason={`Upload is ${asset.progress}% complete (sample progress).`} />
  else if (previewable) preview = <div className="preview-area"><AssetThumb asset={asset} large /><small>Preview area — sample illustration</small></div>
  else preview = <UnsupportedPreview kind={`.${asset.ext} files`} reason="This type can’t be previewed in the browser. Download it to open it in another app." />
  return (
    <DetailPanel title={asset.name} kicker={`${asset.kind} · ${get('project', asset.projectId).name}`} onClose={onClose}
      actions={<><PreviewAction label="Download" variant="primary" /><PreviewAction label="Change access" /></>}>
      {preview}
      <p>{asset.description}</p>
      <Fields items={[['Type', `${asset.kind} (.${asset.ext})`], ['Size', formatBytes(asset.bytes)], ['Access', <StatusBadge domain="access" status={asset.access} key="a" />], ['Updated', formatDate(asset.updatedAt)]]} />
      <div className="chip-list">{asset.tags.map((t) => <span className="chip" key={t}><span>#{t}</span></span>)}</div>
      <p className="note">Only metadata is shown here. Files themselves belong in object storage, not in the browser.</p>
    </DetailPanel>
  )
}

export function RevisionPanel({ revision, onClose }) {
  return (
    <DetailPanel title={revision.summary} kicker={`Revision · ${get('project', revision.projectId).name}`} onClose={onClose}
      actions={revision.state === 'Pending review' ? <><PreviewAction label="Approve" variant="primary" /><PreviewAction label="Request changes" /></> : null}>
      <div className="chip-list"><StatusBadge domain="revision" status={revision.state} /></div>
      <Fields items={[
        ['Author', get('user', revision.authorId).name],
        ['When', <time dateTime={revision.at} key="t">{revision.at.replace('T', ' ').slice(0, 16)}</time>],
        ['Affected', `${revision.recordType} ${revision.recordId}`],
        ['Versions', revision.toVersion != null ? `v${revision.fromVersion} → v${revision.toVersion}` : null],
      ]} />
      <div><h3>Linked records</h3>
        <div className="chip-list">
          <RelationChip type="Project" id={revision.projectId} />
          {revision.taskIds.map((id) => <RelationChip type="Task" id={id} key={id} />)}
          {revision.requirementIds.map((id) => <RelationChip type="Requirement" id={id} label={id} key={id} />)}
        </div>
      </div>
      {revision.diff && <a className="button button--small button--secondary" href={`/revisions?view=compare&rev=${revision.id}`}>Open comparison</a>}
    </DetailPanel>
  )
}
