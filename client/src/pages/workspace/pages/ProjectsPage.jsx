import { useState } from 'react'
import { Archive, Columns3, Clock, LayoutGrid, Plus, RotateCcw, Table2 } from 'lucide-react'
import { useQueryParam } from '../../../hooks/useQueryParam'
import { AvatarStack, PriorityBadge, ProgressBar, StatusBadge } from '../components/badges'
import { PageHeader, PreviewAction, StatStrip, Toolbar, ViewTabs } from '../components/layout'
import { NoResults, StateGate, EmptyState } from '../components/states'
import { projects } from '../data/fixtures'
import { formatDate, timeAgo } from '../data/format'
import { get, nextMilestone, projectProgress } from '../data/selectors'
import { PROJECT_STATUSES } from '../data/status'

const VIEWS = [
  { id: 'directory', label: 'Directory', icon: LayoutGrid },
  { id: 'board', label: 'Board', icon: Columns3 },
  { id: 'recent', label: 'Recent', icon: Clock },
  { id: 'archived', label: 'Archived', icon: Archive },
]
const PRIORITY_RANK = { Urgent: 0, High: 1, Medium: 2, Low: 3 }
const SORTS = {
  updated: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
  name: (a, b) => a.name.localeCompare(b.name),
  priority: (a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority],
}

function ProjectCard({ project, compact = false }) {
  const progress = projectProgress(project.id)
  const next = nextMilestone(project.id)
  return (
    <a className={`project-card ${compact ? 'project-card--compact' : ''}`} href={`/projects/${project.id}`}>
      <span className="project-card__top">
        <span className={`tile-mark tile-mark--${project.tone}`} aria-hidden="true">{project.name.slice(0, 2).toUpperCase()}</span>
        <span className="row__main"><span className="row__title">{project.name}</span><span className="row__meta"><span>{project.category}</span></span></span>
        <StatusBadge domain="project" status={project.status} />
      </span>
      {!compact && <span className="project-card__desc">{project.description}</span>}
      <span className="row__meta"><span>{project.phases[project.phaseIndex]}</span>{next && !compact && <span>Next: {next.title} · {formatDate(next.due)}</span>}</span>
      <span className="project-card__foot">
        <ProgressBar value={progress.done} max={progress.total} label={`${project.name} task progress`} />
        <span className="project-card__people"><PriorityBadge priority={project.priority} /><AvatarStack ids={[project.ownerId, ...project.collaboratorIds]} /></span>
      </span>
    </a>
  )
}

function ProjectTable({ list }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead><tr><th scope="col">Project</th><th scope="col">Category</th><th scope="col">Status</th><th scope="col">Priority</th><th scope="col">Progress</th><th scope="col">Owner</th><th scope="col">Updated</th></tr></thead>
        <tbody>
          {list.map((p) => {
            const progress = projectProgress(p.id)
            return (
              <tr key={p.id}>
                <td><a href={`/projects/${p.id}`}>{p.name}</a></td><td>{p.category}</td><td><StatusBadge domain="project" status={p.status} /></td>
                <td><PriorityBadge priority={p.priority} /></td><td><ProgressBar value={progress.done} max={progress.total} label={`${p.name} progress`} /></td>
                <td>{get('user', p.ownerId).name}</td><td>{formatDate(p.updatedAt)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default function ProjectsPage() {
  const [view, setView] = useQueryParam('view', 'directory')
  const [status, setStatus] = useQueryParam('filter', 'all')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('updated')
  const [layout, setLayout] = useState('cards')

  const active = projects.filter((p) => p.status !== 'Archived')
  const q = search.trim().toLowerCase()
  const matches = (p) => (category === 'all' || p.category === category)
    && (!q || [p.name, p.description, p.category, get('user', p.ownerId).name, ...p.tags].join(' ').toLowerCase().includes(q))
  const filtered = active.filter(matches).filter((p) => status === 'all' || p.status === status).sort(SORTS[sort])
  const chips = [{ value: 'all', label: 'All', count: active.length }, ...PROJECT_STATUSES.filter((s) => s !== 'Archived').map((s) => ({ value: s, label: s, count: active.filter((p) => p.status === s).length }))]
  const dirty = status !== 'all' || search || category !== 'all'
  const reset = () => { setStatus('all'); setSearch(''); setCategory('all') }

  let content
  if (view === 'archived') {
    const archived = projects.filter((p) => p.status === 'Archived')
    content = archived.length ? (
      <ul className="rows">{archived.map((p) => (
        <li key={p.id}><div className="row row--muted">
          <span className="row__main"><a className="row__title" href={`/projects/${p.id}`}>{p.name}</a><span className="row__meta"><span>{p.category}</span><span>Archived {formatDate(p.archivedAt)}</span></span></span>
          <span className="row__side"><StatusBadge domain="project" status="Archived" /><PreviewAction label="Restore" icon={RotateCcw} title="Restore project" body="This would move the project back to active work. In the demo nothing is restored." /></span>
        </div></li>
      ))}</ul>
    ) : <EmptyState icon={Archive} title="Nothing archived" body="Archived projects are kept here, separate from active work." />
  } else if (view === 'recent') {
    const recent = active.slice().sort((a, b) => b.lastAccessedAt.localeCompare(a.lastAccessedAt)).slice(0, 5)
    content = <ul className="rows">{recent.map((p) => <li key={p.id}><a className="row" href={`/projects/${p.id}`}><span className="row__main"><span className="row__title">{p.name}</span><span className="row__meta"><span>Opened <time dateTime={p.lastAccessedAt}>{timeAgo(p.lastAccessedAt)}</time></span><span>{p.phases[p.phaseIndex]}</span></span></span><span className="row__side"><StatusBadge domain="project" status={p.status} /></span></a></li>)}</ul>
  } else if (!filtered.length) {
    content = <NoResults onClear={reset} />
  } else if (view === 'board') {
    content = (
      <div className="board board--projects">
        {PROJECT_STATUSES.filter((s) => s !== 'Archived' && s !== 'Completed').concat('Completed').map((s) => {
          const items = filtered.filter((p) => p.status === s)
          return <section className="board__col" data-active="true" key={s} aria-labelledby={`pb-${s}`}><h2 id={`pb-${s}`}><StatusBadge domain="project" status={s} /><span>{items.length}</span></h2><div className="rows rows--tight">{items.length ? items.map((p) => <ProjectCard project={p} compact key={p.id} />) : <p className="board__empty">None</p>}</div></section>
        })}
      </div>
    )
  } else {
    content = layout === 'cards' ? <div className="card-grid">{filtered.map((p) => <ProjectCard project={p} key={p.id} />)}</div> : <ProjectTable list={filtered} />
  }

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Projects"
        description={`${active.length} projects · ${active.filter((p) => p.status === 'Active').length} active`}
        action={<PreviewAction label="New project" icon={Plus} variant="primary" iconOnlyOnMobile title="Create project" body="A form for the name, category, owner, and workflow phases would open here. In the demo nothing is created." />}
      />
      <ViewTabs tabs={VIEWS} value={view} onChange={setView} label="Project views" />
      <StateGate empty={{ title: 'No projects yet', body: 'Create your first project to start planning.', action: <PreviewAction label="New project" icon={Plus} variant="primary" /> }}>
        {(view === 'directory' || view === 'board') && (
          <Toolbar search={search} onSearch={setSearch} placeholder="Search projects, tags, owners" chips={chips} chipValue={status} onChip={setStatus} chipLabel="Project status" dirty={dirty} onReset={reset}>
            <select aria-label="Category" value={category} onChange={(e) => setCategory(e.target.value)}><option value="all">Any category</option><option>Creative</option><option>Software</option><option>Research</option></select>
            <select aria-label="Sort projects" value={sort} onChange={(e) => setSort(e.target.value)}><option value="updated">Sort: Updated</option><option value="name">Sort: Name</option><option value="priority">Sort: Priority</option></select>
            {view === 'directory' && (
              <span className="toggle" role="group" aria-label="Layout">
                <button type="button" aria-pressed={layout === 'cards'} onClick={() => setLayout('cards')}><LayoutGrid size={15} aria-hidden="true" /> Cards</button>
                <button type="button" aria-pressed={layout === 'table'} onClick={() => setLayout('table')}><Table2 size={15} aria-hidden="true" /> Table</button>
              </span>
            )}
          </Toolbar>
        )}
        {view === 'directory' && <StatStrip stats={[{ label: 'Projects', value: active.length }, { label: 'Active', value: active.filter((p) => p.status === 'Active').length }, { label: 'On hold', value: active.filter((p) => p.status === 'On hold').length }, { label: 'Showing', value: filtered.length }]} />}
        {content}
      </StateGate>
    </>
  )
}
