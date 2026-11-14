import { PageHeader, Section } from '../components/layout'
import { StateGate } from '../components/states'
import { FilterField } from '../components/layout'
import { ProgressBar, DueLabel, StatusBadge } from '../components/badges'
import { useQueryParam } from '../../../hooks/useQueryParam'
import { data } from '../data/store'
import { activeProjects, coverage, overdueRecords, projectHealth, projectProgress, scoped } from '../data/selectors'

const DEFINITIONS = [
  ['Progress', 'Done tasks divided by all tasks in scope.'],
  ['Coverage', 'A requirement is complete when it is met, verified, and has a task and a final file.'],
  ['Overdue', 'Open tasks and milestones with a date before today.'],
]

export default function InsightsPage() {
  const [project, setProject] = useQueryParam('project', 'all')
  const tasks = scoped(data().tasks, project)
  const done = tasks.filter((t) => t.status === 'Done').length
  const cov = coverage(project)
  const overdue = overdueRecords(project)
  const rows = activeProjects().filter((p) => project === 'all' || p.id === project)

  return (
    <>
      <PageHeader title="Insights" description="Three numbers that tell you where things stand." />
      <StateGate empty={{ title: 'No data yet', body: 'Insights appear once you have projects and tasks.' }}>
        <div className="toolbar-lite"><FilterField label="Project" value={project} onChange={(v) => setProject(v === 'all' ? null : v)} options={[['all', 'All projects'], ...activeProjects().map((p) => [p.id, p.name])]} /></div>
        <div className="insight-grid">
          <article className="card insight"><h2>Progress</h2><p className="insight__value">{tasks.length ? Math.round((done / tasks.length) * 100) : 0}%</p><ProgressBar value={done} max={tasks.length} label="Tasks done" /><small className="muted">{done} of {tasks.length} tasks done</small></article>
          <article className="card insight"><h2>Coverage</h2><p className="insight__value">{cov.complete}/{cov.total}</p><ProgressBar value={cov.complete} max={cov.total} label="Requirements complete" /><small className="muted">{cov.withGaps} requirement{cov.withGaps === 1 ? '' : 's'} with gaps</small></article>
          <article className="card insight"><h2>Overdue</h2><p className="insight__value">{overdue.length}</p><small className="muted">{overdue.length ? 'Open the list below to catch up.' : 'Nothing is late.'}</small></article>
        </div>
        {overdue.length > 0 && (
          <Section title="Overdue items" id="in-overdue">
            <ul className="rows rows--tight">{overdue.map(({ type, record }) => (
              <li key={record.id}><a className="row" href={type === 'Task' ? `/tasks?select=${record.id}` : `/projects/${record.projectId}?view=work&select=${record.id}`}>
                <span className="row__main"><span className="row__title">{record.title}</span><span className="row__meta"><span>{type}</span></span></span>
                <span className="row__side"><DueLabel due={record.due} /></span></a></li>
            ))}</ul>
          </Section>
        )}
        <Section title="By project" id="in-projects">
          <div className="table-wrap"><table className="table"><thead><tr><th scope="col">Project</th><th scope="col">Status</th><th scope="col">Health</th><th scope="col">Tasks done</th></tr></thead>
            <tbody>{rows.map((p) => { const pr = projectProgress(p.id); return (
              <tr key={p.id}><th scope="row"><a href={`/projects/${p.id}`}>{p.name}</a></th><td><StatusBadge domain="project" status={p.status} /></td><td>{p.status === 'Active' ? <StatusBadge domain="health" status={projectHealth(p.id)} /> : '—'}</td><td><ProgressBar value={pr.done} max={pr.total} label={`${p.name} tasks done`} /></td></tr>
            ) })}</tbody></table></div>
        </Section>
        <Section title="How these are counted" id="in-defs">
          <dl className="fields">{DEFINITIONS.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}</dl>
        </Section>
      </StateGate>
    </>
  )
}
