import { Archive, Pencil } from 'lucide-react'
import { useQueryParam } from '../../../hooks/useQueryParam'
import { Avatar, AvatarStack, DueLabel, PriorityBadge, RelationChip, StatusBadge } from '../components/badges'
import { PageHeader, PreviewAction, Section, ViewTabs } from '../components/layout'
import { MilestoneRow, RequirementRow, TaskRow } from '../components/records'
import { EmptyState, StateGate } from '../components/states'
import TraceChain from '../components/TraceChain'
import { activities, assets, deliverables, documents, milestones, requirements, revisions, tasks } from '../data/fixtures'
import { formatDate, timeAgo } from '../data/format'
import { get, nextMilestone, projectCounts, projectProgress, recordHref } from '../data/selectors'
import { STATUS } from '../data/status'

const TABS = [
  ['overview', 'Overview', null], ['workflow', 'Workflow', null], ['milestones', 'Milestones', 'milestones'], ['tasks', 'Tasks', 'tasks'],
  ['requirements', 'Requirements', 'requirements'], ['assets', 'Assets', 'assets'], ['docs', 'Docs', 'documents'], ['revisions', 'Revisions', 'revisions'], ['deliverables', 'Deliverables', 'deliverables'],
]
const TAB_FOR_STAGE = { requirements: 'requirements', milestones: 'milestones', tasks: 'tasks', revisions: 'revisions', deliverables: 'deliverables' }

function PhaseStepper({ project }) {
  return (
    <ol className="phases">
      {project.phases.map((phase, index) => {
        const state = index < project.phaseIndex ? 'complete' : index === project.phaseIndex ? 'current' : 'upcoming'
        const inPhase = milestones.filter((m) => m.projectId === project.id && m.phase === index)
        return (
          <li className={`phases__step phases__step--${state}`} key={phase} aria-current={state === 'current' ? 'step' : undefined}>
            <span className="phases__marker" aria-hidden="true">{state === 'complete' ? '✓' : index + 1}</span>
            <strong>{phase}</strong>
            <small>{state === 'complete' ? 'Complete' : state === 'current' ? 'Current phase' : 'Upcoming'}</small>
            <span className="phases__items">{inPhase.length ? inPhase.map((m) => <RelationChip type="Milestone" id={m.id} key={m.id} />) : <span className="row__meta">No milestones</span>}</span>
          </li>
        )
      })}
    </ol>
  )
}

function LinkTable({ columns, rows, empty }) {
  if (!rows.length) return <EmptyState title={empty} />
  return (
    <div className="table-wrap">
      <table className="table">
        <thead><tr>{columns.map((c) => <th scope="col" key={c}>{c}</th>)}</tr></thead>
        <tbody>{rows.map((cells, i) => <tr key={i}>{cells.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

function Overview({ project, counts, setView }) {
  const next = nextMilestone(project.id)
  const feed = activities.filter((a) => a.projectId === project.id).slice(0, 4)
  return (
    <div className="two-col">
      <Section title="Traceability" id="pw-trace">
        <TraceChain counts={{ objective: 1, ...counts }} onSelect={(stage) => setView(TAB_FOR_STAGE[stage])} />
        <h3>Objective</h3>
        <p>{project.objective}</p>
        {next && <p className="row__meta"><span>Next milestone:</span> <RelationChip type="Milestone" id={next.id} /> <DueLabel due={next.due} /></p>}
      </Section>
      <Section title="Recent activity" id="pw-activity">
        {feed.length ? (
          <ul className="rows rows--tight">{feed.map((a) => <li className="activity__item" key={a.id}><Avatar userId={a.actorId} size="sm" /><span><strong>{get('user', a.actorId).name.split(' ')[0]}</strong> {a.verb} <RelationChip type={a.recordType} id={a.recordId} /> <span className="activity__time">{timeAgo(a.at)}</span></span></li>)}</ul>
        ) : <EmptyState title="No activity yet" />}
      </Section>
    </div>
  )
}

export default function ProjectWorkspacePage({ projectId }) {
  const [view, setView] = useQueryParam('view', 'overview')
  const project = get('project', projectId)

  if (!project) {
    return (
      <>
        <PageHeader crumbs={[['Projects', '/projects'], ['Not found']]} title="Project not found" description="This project doesn’t exist in the demo workspace." />
        <EmptyState title="We couldn’t find that project" body="Pick one of the demo projects instead." action={<div className="chip-list">{['project-garden', 'tsumugi-api', 'color-and-memory'].map((id) => <RelationChip type="Project" id={id} key={id} />)}</div>} />
      </>
    )
  }

  const counts = projectCounts(project.id)
  const progress = projectProgress(project.id)
  const mine = (list) => list.filter((item) => item.projectId === project.id)
  const tab = TABS.find(([id]) => id === view) ? view : 'overview'
  const tabs = TABS.map(([id, label, key]) => ({ id, label, count: key ? counts[key] : undefined }))
  const health = STATUS.health[project.health] ? project.health : 'On track'
  const empties = { milestones: 'No milestones yet', tasks: 'No tasks yet', requirements: 'No requirements yet', assets: 'No assets yet', docs: 'No documents yet', revisions: 'No revisions yet', deliverables: 'No deliverables yet' }

  let content
  if (tab === 'overview') content = <Overview project={project} counts={counts} setView={setView} />
  else if (tab === 'workflow') content = <PhaseStepper project={project} />
  else if (tab === 'milestones') content = mine(milestones).length ? <ul className="rows">{mine(milestones).sort((a, b) => a.due.localeCompare(b.due)).map((m) => <li key={m.id}><MilestoneRow milestone={m} href={recordHref('Milestone', m.id)} /></li>)}</ul> : <EmptyState title={empties.milestones} />
  else if (tab === 'tasks') content = mine(tasks).length ? <ul className="rows">{mine(tasks).map((t) => <li key={t.id}><TaskRow task={t} href={recordHref('Task', t.id)} /></li>)}</ul> : <EmptyState title={empties.tasks} />
  else if (tab === 'requirements') content = mine(requirements).length ? <ul className="rows">{mine(requirements).map((r) => <li key={r.id}><RequirementRow requirement={r} href={recordHref('Requirement', r.id)} /></li>)}</ul> : <EmptyState title={empties.requirements} />
  else if (tab === 'assets') content = <LinkTable columns={['Name', 'Type', 'Access', 'Updated']} empty={empties.assets} rows={mine(assets).map((a) => [<a href={recordHref('Asset', a.id)} key="n">{a.name}</a>, a.kind, <StatusBadge domain="access" status={a.access} key="s" />, formatDate(a.updatedAt)])} />
  else if (tab === 'docs') content = <LinkTable columns={['Document', 'Type', 'Status', 'Updated']} empty={empties.docs} rows={mine(documents).map((d) => [<a href={recordHref('Document', d.id)} key="n">{d.title}</a>, d.type, <StatusBadge domain="document" status={d.status} key="s" />, formatDate(d.updatedAt)])} />
  else if (tab === 'revisions') content = <LinkTable columns={['Change', 'Author', 'State', 'When']} empty={empties.revisions} rows={mine(revisions).map((r) => [<a href={recordHref('Revision', r.id)} key="n">{r.summary}</a>, get('user', r.authorId).name, <StatusBadge domain="revision" status={r.state} key="s" />, timeAgo(r.at)])} />
  else content = <LinkTable columns={['Deliverable', 'Satisfies', 'State']} empty={empties.deliverables} rows={mine(deliverables).map((d) => [d.title, <span className="chip-list" key="r">{requirements.filter((r) => r.deliverableId === d.id).map((r) => <RelationChip type="Requirement" id={r.id} label={r.id} key={r.id} />)}</span>, <StatusBadge domain="deliverable" status={d.state} key="s" />])} />

  return (
    <>
      <PageHeader
        crumbs={[['Projects', '/projects'], [project.name]]}
        title={project.name}
        description={project.description}
        action={<><PreviewAction label="Edit project" icon={Pencil} variant="primary" iconOnlyOnMobile title="Edit project" body="The project form would open here with the current values. Nothing is saved in the demo." /><PreviewAction label="Archive" icon={Archive} iconOnlyOnMobile title="Archive this project?" body="Archived projects move out of active work and can be restored later. This is a confirmation layout only — nothing is archived." /></>}
      />
      <section className="project-header" aria-label="Project summary">
        <span className={`tile-mark tile-mark--lg tile-mark--${project.tone}`} aria-hidden="true">{project.name.slice(0, 2).toUpperCase()}</span>
        <div className="project-header__meta">
          <div className="chip-list"><StatusBadge domain="project" status={project.status} /><PriorityBadge priority={project.priority} /><StatusBadge domain="health" status={health} /></div>
          <p className="row__meta"><span>{project.category}</span><span>{formatDate(project.start)} – {formatDate(project.end)}</span><span>Phase {project.phaseIndex + 1}/{project.phases.length}: {project.phases[project.phaseIndex]}</span><span>{progress.total ? `${progress.done}/${progress.total} tasks done` : 'No tasks yet'}</span></p>
        </div>
        <div className="project-header__people"><span className="row__meta">Owner</span><Avatar userId={project.ownerId} /> <AvatarStack ids={project.collaboratorIds} /></div>
      </section>
      <ViewTabs tabs={tabs} value={tab} onChange={setView} label="Project sections" />
      <StateGate empty={{ title: empties[tab] || 'Nothing here yet' }}>
        {content}
      </StateGate>
    </>
  )
}
