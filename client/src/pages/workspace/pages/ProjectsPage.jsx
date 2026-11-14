import { useState } from 'react'
import { GanttChart, LayoutGrid, Plus } from 'lucide-react'
import { useQueryParam } from '../../../hooks/useQueryParam'
import { PageHeader, Toolbar, FilterField, ViewTabs } from '../components/layout'
import { NoResults, StateGate } from '../components/states'
import { ProgressBar, StatusBadge, Flag } from '../components/badges'
import Timeline from '../components/Timeline'
import { MilestonePanel } from '../components/records'
import { SplitLayout } from '../components/layout'
import { useWorkspace } from '../context'
import { data } from '../data/store'
import { get, nextMilestone, projectHealth, projectProgress } from '../data/selectors'
import { PROJECT_STATUSES } from '../data/status'
import { formatDate } from '../data/format'

const VIEWS = [{ id: 'list', label: 'Projects', icon: LayoutGrid }, { id: 'timeline', label: 'Timeline', icon: GanttChart }]
const CATEGORIES = ['Software', 'Creative', 'Research', 'Multimedia', 'Other']

function ProjectCard({ project }) {
  const progress = projectProgress(project.id)
  const next = nextMilestone(project.id)
  const health = projectHealth(project.id)
  return (
    <a className={`card project-card tone-${project.tone}`} href={`/projects/${project.id}`}>
      <span className="project-card__top"><span className="eyebrow">{project.category}</span>{project.session && <span className="session-tag">Session only</span>}</span>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <span className="chip-list">
        <StatusBadge domain="project" status={project.archived ? 'Archived' : project.status} />
        {project.status === 'Active' && health === 'At risk' && <Flag name="Blocked" label="At risk" />}
      </span>
      <ProgressBar value={progress.done} max={progress.total} label={`${project.name} progress`} />
      <small className="muted">{next ? `Next: ${next.title}, ${formatDate(next.due)}` : 'No upcoming milestone'}</small>
    </a>
  )
}

export default function ProjectsPage() {
  const { openNewProject } = useWorkspace()
  const [view, setView] = useQueryParam('view', 'list')
  const [status, setStatus] = useQueryParam('status', 'all')
  const [category, setCategory] = useQueryParam('category', 'all')
  const [archived, setArchived] = useQueryParam('archived')
  const [select, setSelect] = useQueryParam('select')
  const [search, setSearch] = useState('')

  const list = data().projects.filter((p) => (archived ? true : !p.archived)
    && (status === 'all' || p.status === status)
    && (category === 'all' || p.category === category)
    && (!search || p.name.toLowerCase().includes(search.toLowerCase())))
  const filterCount = (status !== 'all') + (category !== 'all') + Boolean(archived)
  const reset = () => { setStatus(null); setCategory(null); setArchived(null); setSearch('') }
  const milestones = data().milestones.filter((m) => list.some((p) => p.id === m.projectId))
  const selected = select ? get('milestone', select) : null

  return (
    <>
      <PageHeader title="Projects" description="Everything you are working on, with its next step." action={<button className="button button--primary button--small" type="button" onClick={openNewProject}><Plus size={16} aria-hidden="true" /> New project</button>} />
      <ViewTabs tabs={VIEWS} value={view} onChange={(v) => setView(v === 'list' ? null : v)} label="Project views" />
      <StateGate empty={{ title: 'No projects yet', body: 'Start from a template and the first steps are filled in.', action: <button className="button button--small button--primary" type="button" onClick={openNewProject}>New project</button> }}>
        <Toolbar search={search} onSearch={setSearch} placeholder="Search projects"
          filter={{ count: filterCount, onReset: reset, content: (
            <>
              <FilterField label="Status" value={status} onChange={(v) => setStatus(v === 'all' ? null : v)} options={[['all', 'Any status'], ...PROJECT_STATUSES.map((s) => [s, s])]} />
              <FilterField label="Category" value={category} onChange={(v) => setCategory(v === 'all' ? null : v)} options={[['all', 'Any category'], ...CATEGORIES.map((c) => [c, c])]} />
              <label className="filter-check"><input type="checkbox" checked={Boolean(archived)} onChange={(e) => setArchived(e.target.checked ? '1' : null)} /> Show archived</label>
            </>
          ) }} />
        {!list.length ? <NoResults onClear={reset} /> : view === 'timeline' ? (
          <SplitLayout panel={selected && <MilestonePanel milestone={selected} onClose={() => setSelect(null)} />}>
            <Timeline milestones={milestones} selectedId={select} onSelect={setSelect} label="Milestones across projects" showProject />
          </SplitLayout>
        ) : (
          <div className="card-grid">{list.map((p) => <ProjectCard project={p} key={p.id} />)}</div>
        )}
      </StateGate>
    </>
  )
}
