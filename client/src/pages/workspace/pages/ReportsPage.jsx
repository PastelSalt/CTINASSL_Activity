import { BarChart3, Download, Gauge, GitFork, Layers, ListTree } from 'lucide-react'
import { useQueryParam } from '../../../hooks/useQueryParam'
import { ProgressBar, RelationChip, StackedBar, StatusBadge } from '../components/badges'
import { PageHeader, PreviewAction, Section, ViewTabs } from '../components/layout'
import { RequirementRow } from '../components/records'
import { EmptyState, StateGate } from '../components/states'
import { useWorkspace } from '../context'
import { milestones, projects, requirements, tasks } from '../data/fixtures'
import { DEMO_TODAY, daysFromToday, dayGroup, timeAgo } from '../data/format'
import { get, overdueRecords, projectProgress, recentActivity, requirementLinks, scoped, verificationCoverage, workload } from '../data/selectors'

const VIEWS = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'progress', label: 'Progress', icon: Gauge },
  { id: 'workload', label: 'Workload', icon: Layers },
  { id: 'coverage', label: 'Coverage', icon: GitFork },
  { id: 'activity', label: 'Activity', icon: ListTree },
]
const RANGES = { 7: 'Last 7 days', 30: 'Last 30 days', 90: 'Last 90 days', all: 'All time' }

function Definition({ formula, sources, scopeLabel, note }) {
  return (
    <details className="definition">
      <summary>Definition</summary>
      <dl>
        <div><dt>Formula</dt><dd>{formula}</dd></div>
        <div><dt>Sources</dt><dd>{sources}</dd></div>
        <div><dt>Scope</dt><dd>{scopeLabel}</dd></div>
      </dl>
      <p>{note || 'Calculated from demo data.'}</p>
    </details>
  )
}

function ReportCard({ title, value, qualifier, bar, definition, onView }) {
  return (
    <article className="report-card">
      <h3>{title}</h3>
      <p className="report-card__value"><strong>{value}</strong><span>{qualifier}</span></p>
      {bar}
      <div className="report-card__foot"><Definition {...definition} />{onView && <button type="button" className="ws-link-button" onClick={onView}>View details</button>}</div>
    </article>
  )
}

export default function ReportsPage() {
  const { scope } = useWorkspace()
  const [view, setView] = useQueryParam('view', 'overview')
  const [range, setRange] = useQueryParam('range', '30')
  const scopeLabel = scope === 'all' ? 'All active projects' : get('project', scope).name

  const taskList = scoped(tasks, scope)
  const done = taskList.filter((t) => t.status === 'Completed').length
  const msList = scoped(milestones, scope)
  const msDone = msList.filter((m) => m.done).length
  const cov = verificationCoverage(scope)
  const overdue = overdueRecords(scope)
  const load = workload(scope)

  const cards = {
    completion: { title: 'Project completion', value: taskList.length ? `${Math.round((done / taskList.length) * 100)}%` : 'Not enough data', qualifier: taskList.length ? `${done} of ${taskList.length} tasks` : 'No tasks in scope', bar: taskList.length ? <ProgressBar value={done} max={taskList.length} label="Tasks completed" /> : null, definition: { formula: 'completed tasks ÷ total tasks', sources: 'tasks', scopeLabel }, view: 'progress' },
    milestones: { title: 'Milestone progress', value: msList.length ? `${Math.round((msDone / msList.length) * 100)}%` : 'Not enough data', qualifier: msList.length ? `${msDone} of ${msList.length} milestones` : 'No milestones in scope', bar: msList.length ? <ProgressBar value={msDone} max={msList.length} label="Milestones completed" /> : null, definition: { formula: 'completed milestones ÷ total milestones', sources: 'milestones', scopeLabel }, view: 'progress' },
    coverage: { title: 'Requirement coverage', value: cov.total ? `${Math.round((cov.verified / cov.total) * 100)}%` : 'Not enough data', qualifier: cov.total ? `${cov.verified} of ${cov.total} verified` : 'No requirements in scope', bar: cov.total ? <ProgressBar value={cov.verified} max={cov.total} label="Requirements verified" /> : null, definition: { formula: 'verified requirements ÷ total requirements', sources: 'requirements', scopeLabel }, view: 'coverage' },
    overdue: { title: 'Overdue work', value: String(overdue.length), qualifier: 'open records past their due date', bar: null, definition: { formula: 'open tasks and milestones with a due date before today', sources: 'tasks, milestones', scopeLabel, note: `“Today” is ${DEMO_TODAY} in the demo.` }, view: 'workload' },
  }

  let content
  if (view === 'overview') {
    content = <div className="report-grid">{Object.values(cards).map(({ view: target, ...card }) => <ReportCard {...card} onView={() => setView(target)} key={card.title} />)}</div>
  } else if (view === 'progress') {
    const list = projects.filter((p) => p.status !== 'Archived' && (scope === 'all' || p.id === scope))
    content = (
      <>
        <Section title="Task completion by project" id="rp-prog" action={<Definition {...cards.completion.definition} />}>
          <div className="table-wrap"><table className="table"><thead><tr><th scope="col">Project</th><th scope="col">Done</th><th scope="col">Total</th><th scope="col">Completion</th></tr></thead>
            <tbody>{list.map((p) => { const pr = projectProgress(p.id); return <tr key={p.id}><td><a href={`/projects/${p.id}`}>{p.name}</a></td><td>{pr.done}</td><td>{pr.total}</td><td>{pr.total ? <ProgressBar value={pr.done} max={pr.total} label={`${p.name} completion`} /> : <span className="row__meta">Not enough data — no tasks</span>}</td></tr> })}</tbody></table></div>
        </Section>
        <Section title="Milestone completion" id="rp-ms" action={<Definition {...cards.milestones.definition} />}>
          {msList.length ? <ProgressBar value={msDone} max={msList.length} label="Milestones completed" /> : <EmptyState title="Not enough data" body="No milestones in this scope." />}
        </Section>
      </>
    )
  } else if (view === 'workload') {
    const tones = { Backlog: 'neutral', 'To do': 'info', 'In progress': 'progress', 'In review': 'warning', Blocked: 'danger', Completed: 'success' }
    const ptones = { Low: 'neutral', Medium: 'info', High: 'warning', Urgent: 'danger' }
    content = (
      <>
        <Section title="Tasks by status" id="rp-status"><StackedBar label="Tasks by status" segments={Object.entries(load.byStatus).map(([label, value]) => ({ label, value, tone: tones[label] }))} /></Section>
        <Section title="Tasks by priority" id="rp-priority"><StackedBar label="Tasks by priority" segments={Object.entries(load.byPriority).map(([label, value]) => ({ label, value, tone: ptones[label] }))} /></Section>
        <Section title="Overdue work" id="rp-overdue" action={<Definition {...cards.overdue.definition} />}>
          {overdue.length ? <ul className="rows rows--tight">{overdue.map(({ type, record }) => <li className="row" key={record.id}><span className="row__main"><span className="row__title">{record.title}</span><span className="row__meta"><span>{type}</span><span>{get('project', record.projectId).name}</span></span></span><span className="row__side"><span className="due due--overdue">{-daysFromToday(record.due)} days overdue</span></span></li>)}</ul> : <EmptyState title="Nothing overdue" />}
        </Section>
      </>
    )
  } else if (view === 'coverage') {
    const gaps = scoped(requirements, scope).filter((r) => { const g = requirementLinks(r).gaps; return g.task || g.deliverable })
    content = (
      <>
        <Section title="Verification" id="rp-ver" action={<Definition {...cards.coverage.definition} />}>
          <StackedBar label="Requirement verification" segments={[{ label: 'Verified', value: cov.verified, tone: 'success' }, { label: 'Unverified', value: cov.unverified, tone: 'warning' }, { label: 'Failed', value: cov.failed, tone: 'danger' }]} />
        </Section>
        <Section title="Requirements without implementing work" id="rp-gaps">
          {gaps.length ? <ul className="rows rows--tight">{gaps.map((r) => <li key={r.id}><RequirementRow requirement={r} href={`/requirements?select=${r.id}`} showProject /></li>)}</ul> : <EmptyState title="Every requirement is traced" />}
        </Section>
      </>
    )
  } else {
    const items = recentActivity(scope, 20).filter((a) => range === 'all' || daysFromToday(a.at) >= -Number(range))
    const days = [...new Set(items.map((a) => dayGroup(a.at)))]
    content = (
      <Section title="Activity" id="rp-activity" action={<Definition formula="most recent 20 events in the date range" sources="activities" scopeLabel={`${scopeLabel} · ${RANGES[range]}`} note="A bounded query; older events are available through the Revisions history." />}>
        {items.length === 0 ? <EmptyState title="No activity in this range" body="Try a longer date range." /> : days.map((day) => (
          <div key={day}><h3 className="activity__day">{day}</h3>
            <ul className="rows rows--tight">{items.filter((a) => dayGroup(a.at) === day).map((a) => <li className="row" key={a.id}><span className="row__main"><span className="row__title">{get('user', a.actorId).name} {a.verb} <RelationChip type={a.recordType} id={a.recordId} /></span><span className="row__meta"><span>{get('project', a.projectId).name}</span><time dateTime={a.at}>{timeAgo(a.at)}</time></span></span></li>)}</ul>
          </div>
        ))}
      </Section>
    )
  }

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Reports"
        description="Progress and coverage, calculated from the records with their definitions shown."
        action={<PreviewAction label="Export report" icon={Download} iconOnlyOnMobile title="Export report" body="Choose CSV or PDF here. Export is not available in the demo and no file is created." />}
      />
      <ViewTabs tabs={VIEWS} value={view} onChange={setView} label="Report views" />
      <div className="scope-bar" role="group" aria-label="Report scope">
        <span><StatusBadge domain="project" status="Active" /> <strong>{scopeLabel}</strong> · demo data</span>
        <label>Date range
          <select value={range} onChange={(e) => setRange(e.target.value)} disabled={view !== 'activity'}>{Object.entries(RANGES).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select>
        </label>
        <small>{view === 'activity' ? 'Date range applies to the Activity view.' : 'Date range applies to the Activity view only; other reports cover all time.'}</small>
      </div>
      <StateGate empty={{ title: 'No report data', body: 'Reports appear once projects have tasks, milestones, and requirements.' }}>{content}</StateGate>
    </>
  )
}
