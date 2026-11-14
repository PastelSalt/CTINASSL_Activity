import { Activity, Archive, ArrowUpRight, BarChart3, BookOpen, Boxes, CheckSquare, ChevronDown, ClipboardList, File, FileAudio, FileSpreadsheet, FileText, FolderKanban, Image, LayoutDashboard, Link, Menu, Milestone, Plus, RotateCcw, Search, Settings, SlidersHorizontal, Sparkles, X } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { milestoneRecords, projectWorkspaceRecords, projectWorkspaceSections, workspaceActivity, workspaceMilestones, workspaceProjects, workspaceSections, workspaceTasks, workspaceTaskRecords, workspaceRequirementRecords, workspaceAssetRecords, workspaceRevisionRecords, workspaceDocumentRecords, workspaceReportDefinitions, workspaceReportOverdue, moduleFixtures } from './workspaceData'

const navigation = [
  ['/dashboard', 'Overview', LayoutDashboard],
  ['/projects', 'Projects', FolderKanban],
  ['/milestones', 'Milestones', Milestone],
  ['/tasks', 'Tasks', CheckSquare],
  ['/requirements', 'Requirements', ClipboardList],
  ['/assets', 'Assets', Boxes],
  ['/revisions', 'Revisions', Archive],
  ['/documentation', 'Docs', BookOpen],
  ['/reports', 'Reports', BarChart3],
  ['/settings', 'Settings', Settings],
]

function NavigationDock({ currentPath, mobileOpen, setMobileOpen }) {
  const visibleNavigation = navigation
  return (
    <nav className={`workspace-dock ${mobileOpen ? 'workspace-dock--open' : ''}`} aria-label="Application navigation">
      <button className="workspace-dock__menu" type="button" aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}>
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}<span>{mobileOpen ? 'Close' : 'More'}</span>
      </button>
      {visibleNavigation.map(([href, label, Icon]) => (
        <a className={currentPath === href ? 'workspace-dock__link workspace-dock__link--active' : 'workspace-dock__link'} href={href} aria-current={currentPath === href ? 'page' : undefined} key={href}>
          <Icon size={18} strokeWidth={2.2} /><span>{label}</span>
        </a>
      ))}
    </nav>
  )
}

function MetricCard({ label, value, note, tone }) {
  return <article className={`workspace-metric workspace-metric--${tone}`}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>
}

function SectionNavigation({ sections, activeSection, onSelect }) {
  return (
    <nav className="workspace-section-nav" aria-label="Page sections">
      <p className="workspace-section-nav__label">This page</p>
      {sections.map((section) => (
        <button className={activeSection === section ? 'workspace-section-nav__link workspace-section-nav__link--active' : 'workspace-section-nav__link'} type="button" aria-current={activeSection === section ? 'page' : undefined} onClick={() => onSelect(section)} key={section}>
          <span className="workspace-section-nav__dot" />{section}
        </button>
      ))}
    </nav>
  )
}

function OverviewPage({ activeSection }) {
  if (activeSection !== 'Overview') {
    const descriptions = {
      'Project pulse': 'Projects grouped by their current status and next production thread.',
      'Upcoming milestones': 'Milestones and deadlines that need attention across the workspace.',
      'Tasks needing attention': 'Open, urgent, and overdue tasks that can move work forward.',
      'Recent activity': 'A chronological record of changes across the demo workspace.',
      'Quick actions': 'Presentation-only entry points for creating projects and tasks.',
    }
    return <div className="workspace-placeholder workspace-placeholder--section"><Sparkles size={34} /><h2>{activeSection}</h2><p>{descriptions[activeSection]}</p><small>Section content is staged for visual exploration.</small></div>
  }

  return (
    <>
      <div className="workspace-metrics">
        <MetricCard label="Total projects" value="03" note="Count of fixture projects" tone="pink" />
        <MetricCard label="Active projects" value="01" note="Projects with Active status" tone="blue" />
        <MetricCard label="Open tasks" value="12" note="Tasks not marked Completed" tone="yellow" />
        <MetricCard label="Overdue" value="02" note="Open records past due date" tone="lilac" />
      </div>
      <div className="workspace-grid">
        <section className="workspace-panel workspace-panel--projects"><div className="workspace-panel__heading"><div><p className="eyebrow">Project pulse</p><h2>Status overview</h2></div><a href="/projects">See all <ArrowUpRight size={15} /></a></div><div className="project-list">{workspaceProjects.map((project) => <article className="project-row" key={project.name}><span className={`project-dot project-dot--${project.color}`} /><div><strong>{project.name}</strong><small>{project.type} · Next: {project.next}</small></div><span className="project-status">{project.status}</span><span className="project-progress">{project.progress}%</span></article>)}</div></section>
        <section className="workspace-panel"><div className="workspace-panel__heading"><div><p className="eyebrow">The next knot</p><h2>Milestones</h2></div><a href="/milestones">View <ArrowUpRight size={15} /></a></div><div className="workspace-stack">{workspaceMilestones.map(([title, project, date, tone]) => <div className="workspace-line" key={title}><span className={`project-dot project-dot--${tone}`} /><div><strong>{title}</strong><small>{project}</small></div><time>{date}</time></div>)}</div></section>
        <section className="workspace-panel"><div className="workspace-panel__heading"><div><p className="eyebrow">Keep moving</p><h2>Tasks</h2></div><a href="/tasks">View <ArrowUpRight size={15} /></a></div><div className="workspace-stack">{workspaceTasks.map(([title, due, tone]) => <div className="workspace-line" key={title}><span className={`task-mark task-mark--${tone}`} /><div><strong>{title}</strong><small>{due}</small></div></div>)}</div></section>
        <section className="workspace-panel"><div className="workspace-panel__heading"><div><p className="eyebrow">The living record</p><h2>Recent activity</h2></div><a href="/reports">Reports <ArrowUpRight size={15} /></a></div><div className="workspace-stack">{workspaceActivity.map(([text, project, time]) => <div className="workspace-line" key={text}><Activity size={17} className="activity-icon" /><div><strong>{text}</strong><small>{project}</small></div><time>{time}</time></div>)}</div></section>
        <section className="workspace-panel workspace-panel--actions"><div className="workspace-panel__heading"><div><p className="eyebrow">Quick actions</p><h2>Start new work</h2></div></div><div className="workspace-panel-actions"><button className="button button--primary" type="button"><Plus size={15} /> Create project</button><button className="button button--secondary" type="button"><CheckSquare size={15} /> Create task</button><p className="workspace-panel-actions__note">Prototype only — actions do not persist until a settings API exists.</p></div></section>
      </div>
    </>
  )
}

function ModuleView({ fixture, activeSection }) {
  return (
    <section className="workspace-module" aria-labelledby="module-view-title">
      <div className="workspace-module__toolbar">
        <div><p className="eyebrow">Page section</p><h2 id="module-view-title">{activeSection}</h2><p className="workspace-module__description">{fixture.title} content is presented as a static exploration.</p></div>
        <span className="workspace-module__scope">Demo records only</span>
      </div>
      <div className="workspace-table-wrap">
        <table className="workspace-table">
          <thead><tr>{fixture.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
          <tbody>{fixture.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${cell}`}>{index === 0 ? <strong>{cell}</strong> : cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <p className="workspace-module__note"><Sparkles size={15} /> {fixture.note}</p>
    </section>
  )
}

function ProjectDirectory({ activeSection }) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All statuses')
  const [category, setCategory] = useState('All categories')
  const [view, setView] = useState('cards')

  const filteredProjects = workspaceProjects.filter((project) => {
    const searchable = [project.name, project.description, project.type, project.owner, ...project.tags].join(' ').toLowerCase()
    const matchesQuery = searchable.includes(query.toLowerCase().trim())
    const matchesStatus = status === 'All statuses' || project.status === status
    const matchesCategory = category === 'All categories' || project.type === category
    return matchesQuery && matchesStatus && matchesCategory
  })

  const resetFilters = () => {
    setQuery('')
    setStatus('All statuses')
    setCategory('All categories')
  }

  if (activeSection === 'Search and filters') {
    return <section className="workspace-projects__focus"><p className="eyebrow">Find a thread</p><h2>Search and filters</h2><p>Search across project names, descriptions, tags, and owners. These controls are presentation-only in this exploration.</p><div className="workspace-projects__filter-summary"><strong>{filteredProjects.length}</strong><span>matching project{filteredProjects.length === 1 ? '' : 's'}</span><button className="button button--small" type="button" onClick={resetFilters}><RotateCcw size={14} /> Reset filters</button></div></section>
  }

  const projects = activeSection === 'Archived projects' ? filteredProjects.filter((project) => project.archived) : activeSection === 'Recently accessed' ? filteredProjects.filter((project) => !project.archived) : activeSection === 'Status groups' ? filteredProjects : filteredProjects.filter((project) => !project.archived)

  return (
    <section className="workspace-projects" aria-labelledby="projects-directory-title">
      <div className="workspace-projects__toolbar">
        <div>
          <p className="eyebrow">{activeSection === 'Directory' ? 'All active work' : activeSection}</p>
          <h2 id="projects-directory-title">{activeSection === 'Directory' ? 'Project directory' : activeSection}</h2>
        </div>
        <div className="workspace-projects__view-toggle" aria-label="Project display mode">
          <button className={view === 'cards' ? 'is-active' : ''} type="button" onClick={() => setView('cards')}>Cards</button>
          <button className={view === 'table' ? 'is-active' : ''} type="button" onClick={() => setView('table')}>Table</button>
        </div>
      </div>
      <div className="workspace-projects__controls">
        <label className="workspace-projects__search"><Search size={17} /><span className="sr-only">Search projects</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects, tags, or owners" /></label>
        <label><span className="sr-only">Filter by status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option>All statuses</option><option>Idea</option><option>Planning</option><option>Active</option><option>On Hold</option><option>Completed</option><option>Archived</option></select></label>
        <label><span className="sr-only">Filter by category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option>All categories</option><option>Creative</option><option>Software</option><option>Research</option></select></label>
        <button className="workspace-projects__filter-button" type="button"><SlidersHorizontal size={16} /> More filters</button>
      </div>
      {projects.length === 0 ? <div className="workspace-placeholder workspace-placeholder--empty"><Search size={30} /><h3>No projects match</h3><p>Try a different search or clear the filters.</p><button className="button button--small" type="button" onClick={resetFilters}>Clear filters</button></div> : view === 'cards' ? <div className="workspace-projects__cards">{projects.map((project) => <a className="workspace-project-card" href={`/projects/${project.id}`} key={project.id}><div className={`workspace-project-card__swatch workspace-project-card__swatch--${project.color}`}><span>{project.type}</span><strong>{project.name.slice(0, 2).toUpperCase()}</strong></div><div className="workspace-project-card__body"><div className="workspace-project-card__title"><h3>{project.name}</h3><span className={`workspace-project-card__status workspace-project-card__status--${project.color}`}>{project.status}</span></div><p>{project.description}</p><div className="workspace-project-card__meta"><span>{project.owner}</span><span>{project.priority} priority</span><span>Updated {project.updatedAt}</span></div><div className="workspace-project-card__footer"><span>Next: {project.next}</span><strong>{project.progress}%</strong></div></div></a>)}</div> : <div className="workspace-table-wrap"><table className="workspace-table workspace-projects__table"><thead><tr><th scope="col">Project</th><th scope="col">Category</th><th scope="col">Status</th><th scope="col">Priority</th><th scope="col">Owner</th><th scope="col">Updated</th></tr></thead><tbody>{projects.map((project) => <tr key={project.id}><td><a href={`/projects/${project.id}`}><strong>{project.name}</strong><small>{project.description}</small></a></td><td>{project.type}</td><td>{project.status}</td><td>{project.priority}</td><td>{project.owner}</td><td>{project.updatedAt}</td></tr>)}</tbody></table></div>}
      <p className="workspace-module__note"><Sparkles size={15} /> Project records are placeholders. Create, archive, restore, and detail actions are not persisted yet.</p>
    </section>
  )
}

function ProjectWorkspace({ projectId, activeSection }) {
  const project = workspaceProjects.find((item) => item.id === projectId)
  const records = projectWorkspaceRecords[projectId]

  if (!project || !records) return <div className="workspace-placeholder workspace-placeholder--empty"><Archive size={34} /><h2>Project thread not found</h2><p>This project does not exist in the current demo workspace.</p><a className="button button--small" href="/projects">Back to projects</a></div>

  const renderRows = (rows, columns) => <div className="workspace-table-wrap"><table className="workspace-table workspace-project-workspace__table"><thead><tr>{columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${cell}`}>{index === 0 ? <strong>{cell}</strong> : cell}</td>)}</tr>)}</tbody></table></div>
  const content = {
    'Workflow phases': <div className="workspace-project-workspace__phases">{records.phases.map((phase, index) => <div className={index === records.currentPhase ? 'is-current' : index < records.currentPhase ? 'is-complete' : ''} key={phase}><span>{String(index + 1).padStart(2, '0')}</span><strong>{phase}</strong>{index === records.currentPhase && <small>Current phase</small>}</div>)}</div>,
    Milestones: renderRows(records.milestones, ['Milestone', 'Due', 'State']),
    Tasks: renderRows(records.tasks, ['Task', 'Priority', 'Status']),
    Requirements: renderRows(records.requirements, ['ID', 'Requirement', 'Verification']),
    Assets: renderRows(records.assets, ['Asset', 'Type', 'Access']),
    Documentation: renderRows(records.documents, ['Document', 'Type', 'Updated']),
    Revisions: renderRows(records.revisions, ['Change', 'Author', 'Review']),
    Deliverables: renderRows(records.deliverables, ['Deliverable', 'Requirement', 'State']),
  }[activeSection]

  return (
    <section className="workspace-project-workspace" aria-labelledby="project-workspace-title">
      <div className="workspace-project-workspace__identity">
        <div className={`workspace-project-workspace__cover workspace-project-workspace__cover--${project.color}`}><strong>{project.name.slice(0, 2).toUpperCase()}</strong></div>
        <div><p className="eyebrow">{project.type} project · {project.owner}</p><h2 id="project-workspace-title">{project.name}</h2><p>{project.description}</p><div className="workspace-project-workspace__meta"><span>{project.status}</span><span>{project.priority} priority</span><span>{records.collaborators.join(' · ')}</span></div></div>
        <div className="workspace-project-workspace__actions"><button className="button button--small" type="button">Edit project</button><button className="workspace-project-workspace__archive" type="button">Archive</button></div>
      </div>
      {activeSection === 'Overview' ? <><div className="workspace-project-workspace__summary"><article><span>Project health</span><strong>{records.health}</strong><small>Based on fixture status and current phase</small></article><article><span>Current phase</span><strong>{records.phase}</strong><small>{records.currentPhase + 1} of {records.phases.length} phases</small></article><article><span>Next milestone</span><strong>{records.nextMilestone}</strong><small>Due {records.due}</small></article></div><div className="workspace-project-workspace__overview-grid"><section><p className="eyebrow">Objective</p><h3>Why this project exists</h3><p>{records.objective}</p><div className="workspace-traceability"><span>Objective</span><i>→</i><span>Requirement</span><i>→</i><span>Milestone</span><i>→</i><span>Task</span><i>→</i><span>Deliverable</span></div></section><section><p className="eyebrow">Recent activity</p><h3>The thread so far</h3><div className="workspace-stack">{records.activity.map(([text, time]) => <div className="workspace-line" key={text}><Activity size={16} className="activity-icon" /><div><strong>{text}</strong><small>{time}</small></div></div>)}</div></section></div></> : <section className="workspace-project-workspace__section"><p className="eyebrow">Project records</p><h3>{activeSection}</h3>{content || <div className="workspace-placeholder workspace-placeholder--section"><Sparkles size={30} /><p>This project section is staged for visual exploration.</p></div>}</section>}
      <p className="workspace-module__note"><Sparkles size={15} /> Project records are placeholders. Changes, archive actions, and related records are not persisted.</p>
    </section>
  )
}

function MilestonesPage({ activeSection }) {
  const [view, setView] = useState('list')
  const records = activeSection === 'Upcoming' ? milestoneRecords.filter((milestone) => milestone.status === 'Upcoming') : activeSection === 'Overdue' ? milestoneRecords.filter((milestone) => milestone.status === 'Overdue' || milestone.status === 'Blocked') : activeSection === 'Completed' ? milestoneRecords.filter((milestone) => milestone.status === 'Completed') : milestoneRecords

  if (activeSection === 'Timeline') {
    return <section className="workspace-milestones" aria-labelledby="milestone-timeline-title"><div className="workspace-milestones__toolbar"><div><p className="eyebrow">Chronological thread</p><h2 id="milestone-timeline-title">Milestone timeline</h2></div><button className="button button--small" type="button" onClick={() => setView(view === 'timeline' ? 'list' : 'timeline')}>{view === 'timeline' ? 'List view' : 'Timeline view'}</button></div><div className="workspace-milestone-timeline">{milestoneRecords.map((milestone) => <a className="workspace-milestone-timeline__item" href={`/projects/${milestone.projectId}`} key={milestone.id}><span className={`workspace-milestone-timeline__marker workspace-milestone-timeline__marker--${milestone.tone}`} /><time>{milestone.due}</time><div><strong>{milestone.title}</strong><small>{milestone.project} · {milestone.status}</small></div></a>)}</div><p className="workspace-module__note"><Sparkles size={15} /> Timeline dates are placeholder records and do not represent saved schedules.</p></section>
  }

  return <section className="workspace-milestones" aria-labelledby="milestones-list-title"><div className="workspace-milestones__toolbar"><div><p className="eyebrow">{activeSection === 'All milestones' ? 'Every checkpoint' : activeSection}</p><h2 id="milestones-list-title">{activeSection === 'All milestones' ? 'Milestone register' : activeSection}</h2></div><div className="workspace-milestones__actions"><button className="button button--small" type="button" onClick={() => setView(view === 'list' ? 'timeline' : 'list')}>{view === 'list' ? 'Timeline view' : 'List view'}</button></div></div><div className="workspace-milestones__summary"><article><span>Visible</span><strong>{records.length}</strong><small>milestones in this view</small></article><article><span>Needs attention</span><strong>{milestoneRecords.filter((milestone) => milestone.status === 'Overdue' || milestone.status === 'Blocked').length}</strong><small>late or blocked</small></article><article><span>Completed</span><strong>{milestoneRecords.filter((milestone) => milestone.status === 'Completed').length}</strong><small>closed checkpoints</small></article></div>{records.length === 0 ? <div className="workspace-placeholder workspace-placeholder--empty"><Sparkles size={30} /><h3>No milestones here</h3><p>This section has no matching demo records yet.</p></div> : <div className="workspace-milestone-list">{records.map((milestone) => <article className="workspace-milestone-card" key={milestone.id}><div className={`workspace-milestone-card__marker workspace-milestone-card__marker--${milestone.tone}`} /><div className="workspace-milestone-card__main"><div className="workspace-milestone-card__title"><div><p className="eyebrow">{milestone.project}</p><h3>{milestone.title}</h3></div><span className={`workspace-milestone-card__status workspace-milestone-card__status--${milestone.tone}`}>{milestone.status}</span></div><p>{milestone.description}</p><div className="workspace-milestone-card__meta"><span>Starts {milestone.start}</span><span>Due {milestone.due}</span><span>{milestone.priority} priority</span></div><div className="workspace-milestone-card__relations"><span>{milestone.tasks} linked tasks</span><span>Depends on {milestone.dependencies}</span><span>Deliverable: {milestone.deliverable}</span></div></div><a className="workspace-milestone-card__project" href={`/projects/${milestone.projectId}`}>Open project <ArrowUpRight size={14} /></a></article>)}</div>}<p className="workspace-module__note"><Sparkles size={15} /> Milestone actions are presentation-only. Dependencies and deliverables will become linked records in the production data model.</p></section>
}

function TasksPage({ activeSection, setActiveSection }) {
  const [query, setQuery] = useState('')

  const isKanban = activeSection === 'Kanban view'
  const statusOrder = ['Backlog', 'To Do', 'In Progress', 'In Review', 'Blocked', 'Completed']
  const statusTone = (status) => ({ Backlog: 'lilac', 'To Do': 'yellow', 'In Progress': 'blue', 'In Review': 'pink', Blocked: 'lilac', Completed: 'green' })[status]

  let records = workspaceTaskRecords
  if (activeSection === 'Due soon') {
    records = records.filter((task) => task.due === 'Today' || task.due === 'Tomorrow')
  } else if (activeSection === 'Blocked') {
    records = records.filter((task) => task.status === 'Blocked')
  } else if (activeSection === 'Completed') {
    records = records.filter((task) => task.status === 'Completed')
  }

  if (query) {
    const q = query.toLowerCase().trim()
    records = records.filter((task) => [task.title, task.project, task.milestone, task.assignee, task.creator].join(' ').toLowerCase().includes(q))
  }

  const taskCard = (task) => (
    <article className={`workspace-task-card workspace-task-card--${statusTone(task.status)}`} key={task.id}>
      <span className={`workspace-task-card__marker workspace-task-card__marker--${statusTone(task.status)}`} aria-hidden="true" />
      <div className="workspace-task-card__main">
        <div className="workspace-task-card__title">
          <div>
            <p className="eyebrow">{task.project}</p>
            <h3>{task.title}</h3>
          </div>
          <span className={`workspace-task-card__status workspace-task-card__status--${statusTone(task.status)}`}>{task.status}</span>
        </div>
        {task.milestone && <p className="workspace-task-card__milestone"><span>Milestone:</span> {task.milestone}</p>}
        <p>{task.description}</p>
        <div className="workspace-task-card__meta"><span>{task.due}</span><span>{task.priority} priority</span><span>{task.subtasksComplete} of {task.subtasks} subtasks</span><span>{task.assignee}</span></div>
      </div>
    </article>
  )

  const resetFilters = () => setQuery('')

  const kanbanColumns = statusOrder.map((status) => ({ status, tasks: records.filter((task) => task.status === status) }))

  const emptyState = (title, body) => <div className="workspace-placeholder workspace-placeholder--empty"><CheckSquare size={30} /><h3>{title}</h3><p>{body}</p><button className="button button--small" type="button" onClick={resetFilters}><RotateCcw size={14} /> Clear filters</button></div>

  return (
    <section className="workspace-tasks" aria-labelledby="tasks-title">
      <div className="workspace-tasks__toolbar">
        <div>
          <p className="eyebrow">{activeSection === 'All tasks' ? 'Every open thread' : activeSection}</p>
          <h2 id="tasks-title">{activeSection === 'All tasks' ? 'Task register' : activeSection}</h2>
        </div>
        <div className="workspace-tasks__actions">
          <div className="workspace-tasks__view-toggle" aria-label="Task display mode">
            <button className={activeSection !== 'Kanban view' ? 'is-active' : ''} type="button" onClick={() => setActiveSection('List view')}>List</button>
            <button className={activeSection === 'Kanban view' ? 'is-active' : ''} type="button" onClick={() => setActiveSection('Kanban view')}>Kanban</button>
          </div>
          <button className="button button--small" type="button"><CheckSquare size={15} /> New task</button>
        </div>
      </div>
      <div className="workspace-tasks__controls">
        <label className="workspace-tasks__search"><Search size={17} /><span className="sr-only">Search tasks</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tasks, projects, or assignees" /></label>
        <button className="workspace-tasks__filter-button" type="button"><SlidersHorizontal size={16} /> More filters</button>
      </div>
      <div className="workspace-tasks__summary">
        <article><span>Visible</span><strong>{records.length}</strong><small>tasks in this view</small></article>
        <article><span>Needs attention</span><strong>{workspaceTaskRecords.filter((task) => task.status === 'Blocked' || task.status === 'Overdue' || task.due === 'Today').length}</strong><small>blocked or due today</small></article>
        <article><span>Completed</span><strong>{workspaceTaskRecords.filter((task) => task.status === 'Completed').length}</strong><small>closed tasks</small></article>
        <article><span>In progress</span><strong>{workspaceTaskRecords.filter((task) => task.status === 'In Progress').length}</strong><small>open threads</small></article>
      </div>
      {records.length === 0 ? emptyState('No tasks here', 'This section has no matching demo records yet.') : isKanban ? (
        <div className="workspace-task-kanban">{kanbanColumns.map((column) => (
          <div className={`workspace-task-kanban__column workspace-task-kanban__column--${column.status.replace(/\s/g, '')}`} key={column.status}>
            <div className="workspace-task-kanban__column-head"><span>{column.status}</span><strong>{column.tasks.length}</strong></div>
            <div className="workspace-task-kanban__column-body">{column.tasks.map((task) => (
              <article className={`workspace-task-card workspace-task-card--kanban workspace-task-card--${statusTone(task.status)}`} key={task.id}>
                <span className={`workspace-task-card__marker workspace-task-card__marker--${statusTone(task.status)}`} aria-hidden="true" />
                <div className="workspace-task-card__main">
                  <div className="workspace-task-card__title"><div><h3>{task.title}</h3></div><span className={`workspace-task-card__status workspace-task-card__status--${statusTone(task.status)}`}>{task.status}</span></div>
                  {task.milestone && <p className="workspace-task-card__milestone"><span>Milestone:</span> {task.milestone}</p>}
                  <p>{task.description}</p>
                  <div className="workspace-task-card__meta"><span>{task.due}</span><span>{task.priority} priority</span><span>{task.assignee}</span></div>
                </div>
              </article>
            ))}</div>
          </div>
        ))}</div>
      ) : (
        <div className="workspace-task-list">{records.map((task) => taskCard(task))}</div>
      )}
      <p className="workspace-module__note"><Sparkles size={15} /> Task records are placeholders. Create, edit, status changes, and links to requirements, assets, and revisions are not persisted yet.</p>
    </section>
  )
}
function RequirementsPage({ activeSection }) {
  const [query, setQuery] = useState('')

  let records = workspaceRequirementRecords
  if (activeSection === 'Functional') {
    records = records.filter((req) => req.type === 'Functional')
  } else if (activeSection === 'Non-functional') {
    records = records.filter((req) => req.type === 'Non-functional')
  } else if (activeSection === 'Verification status') {
    records = records.filter((req) => req.verification !== 'Verified')
  }

  if (query) {
    const q = query.toLowerCase().trim()
    records = records.filter((req) => [req.id, req.title, req.description, req.project, req.milestone].join(' ').toLowerCase().includes(q))
  }

  const statusTone = (status) => ({ Specified: 'lilac', 'In Progress': 'blue', Verified: 'green', Unverified: 'yellow', Blocked: 'lilac', Rejected: 'pink' })[status]
  const verificationLabel = (req) => `${req.verification.charAt(0).toUpperCase()}${req.verification.slice(1)}`

  const resetFilters = () => setQuery('')

  const traceabilityRows = workspaceRequirementRecords.map((req) => ({
    id: req.id,
    title: req.title,
    type: req.type,
    status: req.status,
    verification: req.verification,
    project: req.project,
    milestone: req.milestone,
    tasks: req.linkedTasks,
    deliverable: req.linkedDeliverable,
    hasImplementingWork: req.linkedTasks.length > 0 || req.linkedDeliverable,
    hasObjective: true,
  }))

  const reqCard = (req) => (
    <article className={`workspace-req-card workspace-req-card--${statusTone(req.status)}`} key={req.id}>
      <span className={`workspace-req-card__marker workspace-req-card__marker--${statusTone(req.status)}`} aria-hidden="true" />
      <div className="workspace-req-card__main">
        <div className="workspace-req-card__top">
          <strong>{req.id}</strong>
          <span className={`workspace-req-card__type workspace-req-card__type--${req.type === 'Functional' ? 'functional' : 'nonfunctional'}`}>{req.type}</span>
        </div>
        <div className="workspace-req-card__identity">
          <div>
            <p className="eyebrow">{req.project}</p>
            <h3>{req.title}</h3>
          </div>
          <span className={`workspace-req-card__status workspace-req-card__status--${statusTone(req.status)}`}>{req.status}</span>
        </div>
        <div className="workspace-req-card__verification">
          <span>Verification:</span> <strong>{verificationLabel(req)}</strong>
        </div>
        <p>{req.description}</p>
        {req.acceptanceCriteria.length > 0 && (
          <div className="workspace-req-card__criteria"><strong>Acceptance:</strong> {req.acceptanceCriteria.join(' · ')}</div>
        )}
        <div className="workspace-req-card__meta"><span>{req.milestone}</span><span>{req.priority} priority</span><span>{req.linkedTasks.length} linked task{req.linkedTasks.length === 1 ? '' : 's'}</span></div>
      </div>
    </article>
  )

  const emptyState = (title, body) => <div className="workspace-placeholder workspace-placeholder--empty"><ClipboardList size={30} /><h3>{title}</h3><p>{body}</p><button className="button button--small" type="button" onClick={resetFilters}><RotateCcw size={14} /> Clear filters</button></div>

  return (
    <section className="workspace-requirements" aria-labelledby="requirements-title">
      <div className="workspace-requirements__toolbar">
        <div>
          <p className="eyebrow">{activeSection === 'All requirements' ? 'Every specification' : activeSection}</p>
          <h2 id="requirements-title">{activeSection === 'All requirements' ? 'Requirement register' : activeSection}</h2>
        </div>
        <div className="workspace-requirements__actions">
          <button className="button button--small" type="button"><ClipboardList size={15} /> Add requirement</button>
        </div>
      </div>
      <div className="workspace-requirements__controls">
        <label className="workspace-requirements__search"><Search size={17} /><span className="sr-only">Search requirements</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search requirements, projects, or milestones" /></label>
        <button className="workspace-requirements__filter-button" type="button"><SlidersHorizontal size={16} /> More filters</button>
      </div>
      <div className="workspace-requirements__summary">
        <article><span>Visible</span><strong>{records.length}</strong><small>requirements in this view</small></article>
        <article><span>Verified</span><strong>{workspaceRequirementRecords.filter((req) => req.verification === 'Verified').length}</strong><small>satisfied records</small></article>
        <article><span>Unverified</span><strong>{workspaceRequirementRecords.filter((req) => req.verification !== 'Verified').length}</strong><small>not yet confirmed</small></article>
        <article><span>Blocked or rejected</span><strong>{workspaceRequirementRecords.filter((req) => req.status === 'Blocked' || req.status === 'Rejected').length}</strong><small>needs attention</small></article>
      </div>
      {activeSection === 'Traceability' ? (
        <div className="workspace-req-traceability">
          <div className="workspace-req-traceability__head">
            <span>Requirement</span>
            <span>Project</span>
            <span>Milestone</span>
            <span>Linked work</span>
            <span>Deliverable</span>
            <span>Gap</span>
          </div>
          <div className="workspace-req-traceability__body">
            {traceabilityRows.map((row) => (
              <div className="workspace-req-traceability__row" key={row.id}>
                <span>{row.id}</span>
                <span>{row.project}</span>
                <span>{row.milestone}</span>
                <span>{row.tasks.length > 0 ? row.tasks.join(', ') : '—'}</span>
                <span>{row.deliverable || '—'}</span>
                <span className={row.hasImplementingWork ? 'workspace-req-traceability__gap--none' : 'workspace-req-traceability__gap--present'}>{row.hasImplementingWork ? 'No gap' : 'Gap'}</span>
              </div>
            ))}
          </div>
          <p className="workspace-module__note"><Sparkles size={15} /> Traceability is queryable from stored requirement, task, and deliverable relationships.</p>
        </div>
      ) : records.length === 0 ? emptyState('No requirements here', 'This section has no matching demo records yet.') : (
        <div className="workspace-req-list">{records.map((req) => reqCard(req))}</div>
      )}
      <p className="workspace-module__note"><Sparkles size={15} /> Requirement records are placeholders. Create, edit, verification, history, and relationship actions are not persisted yet.</p>
    </section>
  )
}

const assetIcons = {
  FileText,
  Image,
  Link,
  File,
  FileSpreadsheet,
  FileAudio,
}

function AssetsPage({ activeSection }) {
  const [query, setQuery] = useState('')

  let records = workspaceAssetRecords
  if (activeSection === 'Images and illustrations') {
    records = records.filter((asset) => asset.type === 'Image')
  } else if (activeSection === 'Documents and PDFs') {
    records = records.filter((asset) => asset.type === 'Document')
  } else if (activeSection === 'Audio and video') {
    records = records.filter((asset) => asset.type === 'Audio' || asset.type === 'Video')
  } else if (activeSection === 'Datasets and spreadsheets') {
    records = records.filter((asset) => asset.type === 'Dataset')
  } else if (activeSection === 'References and exports') {
    records = records.filter((asset) => asset.type === 'Export' || asset.type === 'Repository reference')
  }

  if (query) {
    const q = query.toLowerCase().trim()
    records = records.filter((asset) => [asset.name, asset.type, asset.category, asset.project, asset.description, ...asset.tags].join(' ').toLowerCase().includes(q))
  }

  const resetFilters = () => setQuery('')

  const assetCard = (asset) => {
    const AssetIcon = assetIcons[asset.icon] || Boxes
    return (
      <article className={`workspace-asset-card workspace-asset-card--${asset.category.replace(/\s/g, '').toLowerCase()}`} key={asset.id}>
        <div className="workspace-asset-card__thumb"><AssetIcon size={20} /></div>
      <div className="workspace-asset-card__main">
        <div className="workspace-asset-card__top">
          <strong>{asset.name}</strong>
          <span className={`workspace-asset-card__type workspace-asset-card__type--${asset.category.replace(/\s/g, '').toLowerCase()}`}>{asset.type}</span>
        </div>
        <p className="workspace-asset-card__project">{asset.project}</p>
        <p>{asset.description}</p>
        <div className="workspace-asset-card__tags">{asset.tags.map((tag) => <span key={tag} className="workspace-asset-card__tag">{tag}</span>)}</div>
        <div className="workspace-asset-card__meta"><span>{asset.size}</span><span>{asset.preview}</span><span>{asset.access}</span><span>{asset.updated}</span></div>
      </div>
      <button className="workspace-asset-card__action" type="button" aria-label={`Open ${asset.name}`}><SlidersHorizontal size={14} /></button>
    </article>
  )
}

  const emptyState = (title, body) => <div className="workspace-placeholder workspace-placeholder--empty"><Boxes size={30} /><h3>{title}</h3><p>{body}</p><button className="button button--small" type="button" onClick={resetFilters}><RotateCcw size={14} /> Clear filters</button></div>

  return (
    <section className="workspace-assets" aria-labelledby="assets-title">
      <div className="workspace-assets__toolbar">
        <div>
          <p className="eyebrow">{activeSection === 'All assets' ? 'Every file' : activeSection}</p>
          <h2 id="assets-title">{activeSection === 'All assets' ? 'Asset library' : activeSection}</h2>
        </div>
        <div className="workspace-assets__actions">
          <button className="button button--small" type="button"><Boxes size={15} /> Add asset</button>
        </div>
      </div>
      <div className="workspace-assets__controls">
        <label className="workspace-assets__search"><Search size={17} /><span className="sr-only">Search assets</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search assets, tags, or projects" /></label>
        <button className="workspace-assets__filter-button" type="button"><SlidersHorizontal size={16} /> More filters</button>
      </div>
      <div className="workspace-assets__summary">
        <article><span>Visible</span><strong>{records.length}</strong><small>assets in this view</small></article>
        <article><span>Previewable</span><strong>{workspaceAssetRecords.filter((asset) => asset.preview === 'Preview').length}</strong><small>direct preview available</small></article>
        <article><span>Linked</span><strong>{workspaceAssetRecords.filter((asset) => asset.access === 'Linked').length}</strong><small>external references</small></article>
        <article><span>Downloads</span><strong>{workspaceAssetRecords.filter((asset) => asset.access === 'Download').length}</strong><small>object storage files</small></article>
      </div>
      {records.length === 0 ? emptyState('No assets here', 'This section has no matching demo records yet.') : (
        <div className="workspace-asset-list">{records.map((asset) => assetCard(asset))}</div>
      )}
      <p className="workspace-module__note"><Sparkles size={15} /> Asset records are placeholders. Upload, preview, download, and access controls are not persisted yet. Binary files belong in dedicated object storage.</p>
    </section>
  )
}

function RevisionsPage({ activeSection }) {
  const [query, setQuery] = useState('')

  let records = workspaceRevisionRecords
  if (activeSection === 'Recent changes') {
    records = records.sort((a, b) => {
      const order = { '12 min ago': 0, '1 hr ago': 1, Yesterday: 2, '03 Nov': 3, '20 Nov': 4, '28 Oct': 5 }
      return (order[a.timestamp] ?? 99) - (order[b.timestamp] ?? 99)
    })
  } else if (activeSection === 'Pending review') {
    records = records.filter((rev) => rev.state === 'Pending review')
  } else if (activeSection === 'Approved') {
    records = records.filter((rev) => rev.state === 'Approved')
  }

  if (query) {
    const q = query.toLowerCase().trim()
    records = records.filter((rev) => [rev.change, rev.author, rev.affectedRecord, rev.project, rev.state].join(' ').toLowerCase().includes(q))
  }

  const stateTone = (state) => ({ Approved: 'green', 'Pending review': 'yellow', Recorded: 'lilac', Rejected: 'pink' })[state]
  const resetFilters = () => setQuery('')

  const emptyState = (title, body) => <div className="workspace-placeholder workspace-placeholder--empty"><Archive size={30} /><h3>{title}</h3><p>{body}</p><button className="button button--small" type="button" onClick={resetFilters}><RotateCcw size={14} /> Clear filters</button></div>

  return (
    <section className="workspace-revisions" aria-labelledby="revisions-title">
      <div className="workspace-revisions__toolbar">
        <div>
          <p className="eyebrow">{activeSection === 'All revisions' ? 'Every change' : activeSection}</p>
          <h2 id="revisions-title">{activeSection === 'All revisions' ? 'Revision history' : activeSection}</h2>
        </div>
        <div className="workspace-revisions__actions">
          <button className="button button--small" type="button"><Archive size={15} /> Log revision</button>
        </div>
      </div>
      <div className="workspace-revisions__controls">
        <label className="workspace-revisions__search"><Search size={17} /><span className="sr-only">Search revisions</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search changes, authors, or records" /></label>
        <button className="workspace-revisions__filter-button" type="button"><SlidersHorizontal size={16} /> More filters</button>
      </div>
      <div className="workspace-revisions__summary">
        <article><span>Visible</span><strong>{records.length}</strong><small>revisions in this view</small></article>
        <article><span>Pending review</span><strong>{workspaceRevisionRecords.filter((rev) => rev.state === 'Pending review').length}</strong><small>awaiting approval</small></article>
        <article><span>Approved</span><strong>{workspaceRevisionRecords.filter((rev) => rev.state === 'Approved').length}</strong><small>recorded changes</small></article>
        <article><span>Recorded or rejected</span><strong>{workspaceRevisionRecords.filter((rev) => rev.state === 'Recorded' || rev.state === 'Rejected').length}</strong><small>other states</small></article>
      </div>
      {records.length === 0 ? emptyState('No revisions here', 'This section has no matching demo records yet.') : (
        <div className="workspace-revision-list">{records.map((rev) => (
          <article className={`workspace-revision-card workspace-revision-card--${stateTone(rev.state)}`} key={rev.id}>
            <span className={`workspace-revision-card__marker workspace-revision-card__marker--${stateTone(rev.state)}`} aria-hidden="true" />
            <div className="workspace-revision-card__main">
              <div className="workspace-revision-card__top">
                <strong>{rev.author}</strong>
                <span className={`workspace-revision-card__state workspace-revision-card__state--${stateTone(rev.state)}`}>{rev.state}</span>
              </div>
              <p className="workspace-revision-card__change">{rev.change}</p>
              <div className="workspace-revision-card__meta"><span>{rev.timestamp}</span><span>{rev.affectedRecord}</span><span>{rev.project}</span></div>
              <div className="workspace-revision-card__refs">
                <span>Previous: {rev.previousRef}</span>
                <span>Current: {rev.currentRef}</span>
              </div>
              <div className="workspace-revision-card__links">
                {rev.linkedTask && <span>Task: {rev.linkedTask}</span>}
                {rev.linkedRequirement && <span>Requirement: {rev.linkedRequirement}</span>}
                {rev.linkedAsset && <span>Asset: {rev.linkedAsset}</span>}
                {rev.linkedDeliverable && <span>Deliverable: {rev.linkedDeliverable}</span>}
              </div>
            </div>
          </article>
        ))}</div>
      )}
      <p className="workspace-module__note"><Sparkles size={15} /> Revision records are placeholders. Edit, comparison, approval, and history actions are not persisted yet.</p>
    </section>
  )
}

function DocumentationPage({ activeSection }) {
  const [query, setQuery] = useState('')

  let records = workspaceDocumentRecords
  if (activeSection === 'Project briefs') {
    records = records.filter((doc) => doc.type === 'Project brief')
  } else if (activeSection === 'Technical specifications') {
    records = records.filter((doc) => doc.type === 'Technical specification')
  } else if (activeSection === 'Research notes') {
    records = records.filter((doc) => doc.type === 'Research notes')
  } else if (activeSection === 'Architecture decisions') {
    records = records.filter((doc) => doc.type === 'Architecture decision')
  } else if (activeSection === 'Testing and release notes') {
    records = records.filter((doc) => doc.type === 'Release notes')
  }

  if (query) {
    const q = query.toLowerCase().trim()
    records = records.filter((doc) => [doc.title, doc.type, doc.project, doc.author, doc.status].join(' ').toLowerCase().includes(q))
  }

  const statusTone = (status) => ({ Draft: 'yellow', 'In Progress': 'blue', Completed: 'green', Review: 'pink' })[status]
  const resetFilters = () => setQuery('')

  const emptyState = (title, body) => <div className="workspace-placeholder workspace-placeholder--empty"><BookOpen size={30} /><h3>{title}</h3><p>{body}</p><button className="button button--small" type="button" onClick={resetFilters}><RotateCcw size={14} /> Clear filters</button></div>

  return (
    <section className="workspace-documentation" aria-labelledby="documentation-title">
      <div className="workspace-documentation__toolbar">
        <div>
          <p className="eyebrow">{activeSection === 'All documents' ? 'Every record' : activeSection}</p>
          <h2 id="documentation-title">{activeSection === 'All documents' ? 'Document library' : activeSection}</h2>
        </div>
        <div className="workspace-documentation__actions">
          <button className="button button--small" type="button"><BookOpen size={15} /> New document</button>
        </div>
      </div>
      <div className="workspace-documentation__controls">
        <label className="workspace-documentation__search"><Search size={17} /><span className="sr-only">Search documents</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search documents, authors, or projects" /></label>
        <button className="workspace-documentation__filter-button" type="button"><SlidersHorizontal size={16} /> More filters</button>
      </div>
      <div className="workspace-documentation__summary">
        <article><span>Visible</span><strong>{records.length}</strong><small>documents in this view</small></article>
        <article><span>Drafts</span><strong>{workspaceDocumentRecords.filter((doc) => doc.status === 'Draft').length}</strong><small>not yet finalized</small></article>
        <article><span>Completed</span><strong>{workspaceDocumentRecords.filter((doc) => doc.status === 'Completed').length}</strong><small>finalized records</small></article>
        <article><span>Markdown</span><strong>{workspaceDocumentRecords.filter((doc) => doc.format === 'Markdown').length}</strong><small>markdown sources</small></article>
      </div>
      {records.length === 0 ? emptyState('No documents here', 'This section has no matching demo records yet.') : (
        <div className="workspace-document-list">{records.map((doc) => (
          <article className={`workspace-doc-card workspace-doc-card--${doc.category.replace(/\s/g, '').toLowerCase()}`} key={doc.id}>
            <div className="workspace-doc-card__head">
              <strong>{doc.title}</strong>
              <span className={`workspace-doc-card__status workspace-doc-card__status--${statusTone(doc.status)}`}>{doc.status}</span>
            </div>
            <div className="workspace-doc-card__main">
              <p className="workspace-doc-card__project">{doc.project}</p>
              <span className={`workspace-doc-card__type workspace-doc-card__type--${doc.type.replace(/\s/g, '').toLowerCase()}`}>{doc.type}</span>
              <p>{`${doc.format} source · ${doc.author} · updated ${doc.updated}`}</p>
              {doc.revisionContext && <span className="workspace-doc-card__revision">{doc.revisionContext}</span>}
            </div>
            <div className="workspace-doc-card__links">
              {doc.linkedRequirement && <span>Requirement: {doc.linkedRequirement}</span>}
              {doc.linkedTask && <span>Task: {doc.linkedTask}</span>}
              {doc.linkedMilestone && <span>Milestone: {doc.linkedMilestone}</span>}
              {doc.linkedDeliverable && <span>Deliverable: {doc.linkedDeliverable}</span>}
            </div>
          </article>
        ))}</div>
      )}
      <p className="workspace-module__note"><Sparkles size={15} /> Document records are placeholders. Markdown editing, preview, revision history, and link navigation are not persisted yet.</p>
    </section>
  )
}

function ReportsPage({ activeSection }) {
  const [query, setQuery] = useState('')
  const reportBySection = Object.fromEntries(workspaceReportDefinitions.map((report) => [report.section, report]))

  const [projectScope, setProjectScope] = useState('All projects')

  const resetFilters = () => {
    setQuery('')
    setProjectScope('All projects')
  }

  const report = reportBySection[activeSection]

  const emptyState = (title, body) => <div className="workspace-placeholder workspace-placeholder--empty"><BarChart3 size={30} /><h3>{title}</h3><p>{body}</p><button className="button button--small" type="button" onClick={resetFilters}><RotateCcw size={14} /> Clear filters</button></div>

  const renderRecordRow = (record, index) => (
    <div className="workspace-report-record" key={`${record.project || record.group || record.time}-${index}`}>
      <div className="workspace-report-record__main">
        <strong>{record.project || record.group || record.time}</strong>
        <span>{record.note || record.action || record.value}</span>
      </div>
      {record.value !== undefined && <span className="workspace-report-record__value">{record.value}</span>}
    </div>
  )

  return (
    <section className="workspace-reports" aria-labelledby="reports-title">
      <div className="workspace-reports__toolbar">
        <div>
          <p className="eyebrow">{activeSection === 'Overview' ? 'Production health' : activeSection}</p>
          <h2 id="reports-title">{activeSection === 'Overview' ? 'Reports' : activeSection}</h2>
        </div>
        <div className="workspace-reports__actions">
          <button className="button button--small" type="button"><BarChart3 size={15} /> Export report</button>
        </div>
      </div>
      <div className="workspace-reports__controls">
        <label className="workspace-reports__scope"><span className="sr-only">Project scope</span><select value={projectScope} onChange={(event) => setProjectScope(event.target.value)}><option>All projects</option><option>Project Garden</option><option>Tsumugi API</option><option>Color & Memory</option></select></label>
        <label className="workspace-reports__search"><Search size={17} /><span className="sr-only">Search reports</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search report records" /></label>
        <button className="workspace-reports__reset-button" type="button" onClick={resetFilters}><RotateCcw size={14} /> Reset scope</button>
      </div>
      {activeSection === 'Overview' ? (
        <div className="workspace-reports__overview">
          {workspaceReportDefinitions.map((definition) => (
            <article className={`workspace-report-panel workspace-report-panel--${definition.section.replace(/\s/g, '').toLowerCase()}`} key={definition.id}>
              <div className="workspace-report-panel__head">
                <strong>{definition.title}</strong>
                <span className="workspace-report-panel__formula">{definition.formula}</span>
              </div>
              <p className="workspace-report-panel__definition">{definition.description}</p>
              <div className="workspace-report-panel__source">Source: {definition.sourceRecords.join(', ')}</div>
              <div className="workspace-report-panel__records">{definition.records.map((record, index) => renderRecordRow(record, index))}</div>
              <p className="workspace-report-panel__note">Calculation based on placeholder fixture data only.</p>
            </article>
          ))}
        </div>
      ) : report ? (
        <div className="workspace-report-detail">
          <div className="workspace-report-detail__head">
            <strong>{report.title}</strong>
            <span className="workspace-report-detail__formula">{report.formula}</span>
          </div>
          <p className="workspace-report-detail__definition">{report.description}</p>
          <div className="workspace-report-detail__source">Source: {report.sourceRecords.join(', ')}</div>
          {report.records.length > 0 ? (
            <div className="workspace-report-detail__records">{report.records.map((record, index) => renderRecordRow(record, index))}</div>
          ) : (
            emptyState('No report data', 'This report has no matching records for the current scope.')
          )}
          <p className="workspace-report-detail__note">Calculation based on placeholder fixture data only.</p>
        </div>
      ) : (
        emptyState('No report here', 'This report is staged for visual exploration.')
      )}
      {activeSection === 'Overview' && workspaceReportOverdue.length > 0 && (
        <div className="workspace-reports__overdue">
          <strong>Overdue work</strong>
          <p>Open records past their due date.</p>
          <div className="workspace-report-detail__records">{workspaceReportOverdue.map((record) => (
            <div className="workspace-report-record" key={record.record}>
              <div className="workspace-report-record__main"><strong>{record.record}</strong><span>{record.type} · {record.project}</span></div>
              <span className="workspace-report-record__value">{record.due} · {record.state}</span>
            </div>
          ))}</div>
        </div>
      )}
      <p className="workspace-module__note"><Sparkles size={15} /> Reports are placeholder calculations. Formulas document sources but do not imply precision beyond available records.</p>
    </section>
  )
}

function SettingsPage({ activeSection }) {
  const [query, setQuery] = useState('')

  const settingsGroups = {
    'Account and profile': {
      title: 'Account and profile',
      description: 'Profile identity and account metadata for the demo session.',
      items: [
        { label: 'Profile name', value: 'Demo user', note: 'Display name across the workspace.' },
        { label: 'Account role', value: 'Workspace member', note: 'Placeholder role for visual exploration.' },
        { label: 'Session', value: 'Demo session', note: 'No credential is processed or persisted.' },
      ],
      note: 'Profile editing and session-management actions are reserved for a future settings API.',
    },
    'Workspace preferences': {
      title: 'Workspace preferences',
      description: 'Workspace name, defaults, project conventions, and future workflow defaults.',
      items: [
        { label: 'Workspace name', value: 'Demo workspace', note: 'Shown in the navigation dock and page headers.' },
        { label: 'Default view', value: 'List', note: 'Preferred record display mode for new pages.' },
        { label: 'Project conventions', value: 'Creative · Software · Research', note: 'Default project categories for new work.' },
      ],
      note: 'No workspace setting is persisted in this exploration.',
    },
    Notifications: {
      title: 'Notifications',
      description: 'Notification categories, reminders, and delivery preferences.',
      items: [
        { label: 'Task reminders', value: 'On', note: 'Reminders for upcoming due dates.' },
        { label: 'Review requests', value: 'On', note: 'Alerts when a task or revision needs review.' },
        { label: 'Digest email', value: 'Off', note: 'Weekly summary of workspace activity.' },
      ],
      note: 'Notification delivery preferences are reserved for a future settings API.',
    },
    'Appearance and density': {
      title: 'Appearance and density',
      description: 'Theme, contrast, density, and motion preferences.',
      items: [
        { label: 'Color scheme', value: 'Warm paper', note: 'Aligned with the centralized Tsumugi design system.' },
        { label: 'Density', value: 'Compact', note: 'Controls spacing across records and panels.' },
        { label: 'Reduced motion', value: 'Respected', note: 'Follows prefers-reduced-motion when enabled.' },
      ],
      note: 'Appearance values follow the shared design tokens and are not persisted here.',
    },
    'Legal and privacy': {
      title: 'Legal and privacy',
      description: 'Privacy Policy, Terms of Service, and Cookie & Local Storage Policy references.',
      items: [
        { label: 'Privacy Policy', value: '/privacy-policy', note: 'Draft policy for review before publication.' },
        { label: 'Terms of Service', value: '/terms-of-service', note: 'Draft terms for review before publication.' },
        { label: 'Cookie & Local Storage', value: '/cookie-and-local-storage-policy', note: 'Draft storage policy for review before publication.' },
      ],
      note: 'Prototype storage behavior is explained without claiming durable account settings.',
    },
  }

  const group = settingsGroups[activeSection] || settingsGroups['Account and profile']

  let filteredItems = group.items
  if (query) {
    const q = query.toLowerCase().trim()
    filteredItems = group.items.filter((item) => [item.label, item.value, item.note].join(' ').toLowerCase().includes(q))
  }

  const emptyState = (title, body) => <div className="workspace-placeholder workspace-placeholder--empty"><Settings size={30} /><h3>{title}</h3><p>{body}</p></div>

  return (
    <section className="workspace-settings" aria-labelledby="settings-title">
      <div className="workspace-settings__toolbar">
        <div>
          <p className="eyebrow">Preferences</p>
          <h2 id="settings-title">{group.title}</h2>
          <p>{group.description}</p>
        </div>
        <div className="workspace-settings__actions">
          <button className="button button--small" type="button"><Settings size={15} /> Save settings</button>
        </div>
      </div>
      <div className="workspace-settings__controls">
        <label className="workspace-settings__search"><Search size={17} /><span className="sr-only">Search settings</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search settings" /></label>
      </div>
      <div className="workspace-settings__group">
        {filteredItems.length === 0 ? emptyState('No settings match', 'Try a different search term.') : (
          <div className="workspace-setting-list">{filteredItems.map((item) => (
            <article className="workspace-setting-card" key={item.label}>
              <div className="workspace-setting-card__main">
                <strong>{item.label}</strong>
                <span>{item.note}</span>
              </div>
              <div className="workspace-setting-card__value">{item.value}</div>
            </article>
          ))}</div>
        )}
        <p className="workspace-module__note"><Sparkles size={15} /> {group.note}</p>
      </div>
    </section>
  )
}
export default function WorkspacePage({ currentPath = '/dashboard', projectId }) {
  const workspaceRef = useRef(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(() => workspaceSections[currentPath]?.[0] || 'Overview')
  const fixture = moduleFixtures[currentPath]
  const sections = currentPath === '/projects/:projectId' ? projectWorkspaceSections : workspaceSections[currentPath] || ['Overview']
  const project = projectId ? workspaceProjects.find((item) => item.id === projectId) : null
  const pageTitle = currentPath === '/dashboard' ? 'A clear view of the work.' : currentPath === '/projects/:projectId' ? project?.name || 'Project workspace' : fixture?.title || 'Coming soon'
  const pageDescription = currentPath === '/dashboard' ? "Placeholder data for exploring Tsumugi's authenticated workspace." : currentPath === '/projects/:projectId' ? project?.description || 'Explore the records connected to this project.' : fixture?.description || 'This route is reserved for a future authenticated module.'

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const media = gsap.matchMedia()
      media.add({
        reduce: '(prefers-reduced-motion: reduce)',
        mobile: '(max-width: 620px)',
      }, ({ conditions }) => {
        if (conditions.reduce) return
        const offset = conditions.mobile ? 10 : 14
        gsap.fromTo('.workspace-header, .workspace-heading', { y: 14, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power2.out',
          immediateRender: false,
        })
        gsap.fromTo('.workspace-section-nav, .workspace-section-content', { y: offset + 4, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.12,
          immediateRender: false,
        })
        gsap.fromTo('.workspace-metric, .workspace-panel, .workspace-module', { y: 12, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.06,
          ease: 'power2.out',
          delay: 0.2,
          immediateRender: false,
        })
      })
    }, workspaceRef)

    return () => context.revert()
  }, [currentPath])

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const context = gsap.context(() => {
      gsap.fromTo('.workspace-section-content', { y: 10, opacity: 0.72 }, {
        y: 0,
        opacity: 1,
        duration: 0.28,
        ease: 'power2.out',
        immediateRender: false,
      })
    }, workspaceRef)

    return () => context.revert()
  }, [activeSection])

  return (
    <main className="workspace-page" ref={workspaceRef}>
      <a className="skip-link" href="#workspace-content">Skip to workspace content</a>
      <header className="workspace-header section-shell">
        <a className="brand" href="/"><span className="brand__mark">ts</span><span>tsumugi</span></a>
        <div className="workspace-header__context"><span className="workspace-demo-badge"><Sparkles size={13} /> Demo workspace</span><button className="workspace-account" type="button" aria-label="Open account menu">PS <ChevronDown size={14} /></button></div>
      </header>
      <div className="workspace-layout section-shell">
        <section className="workspace-content" id="workspace-content" aria-labelledby="workspace-title">
          <div className="workspace-heading">
            <div><p className="eyebrow">{currentPath === '/dashboard' ? 'Tuesday, 11 November' : fixture?.eyebrow || 'Authenticated workspace'}</p><h1 id="workspace-title">{pageTitle}</h1><p>{pageDescription}</p></div>
            <div className="workspace-actions"><button className="button button--primary" type="button">{currentPath === '/projects/:projectId' ? 'Edit project' : fixture?.action || 'New project'} <ArrowUpRight size={16} /></button><button className="button workspace-action-secondary" type="button">{currentPath === '/projects/:projectId' ? 'Add task' : 'New task'} <CheckSquare size={16} /></button></div>
          </div>
          <div className="workspace-section-layout">
            <SectionNavigation sections={sections} activeSection={activeSection} onSelect={setActiveSection} />
            <div className="workspace-section-content">
              {currentPath === '/dashboard' ? <OverviewPage activeSection={activeSection} /> : currentPath === '/projects' ? <ProjectDirectory activeSection={activeSection} /> : currentPath === '/projects/:projectId' ? <ProjectWorkspace projectId={projectId} activeSection={activeSection} /> : currentPath === '/milestones' ? <MilestonesPage activeSection={activeSection} /> : currentPath === '/requirements' ? <RequirementsPage activeSection={activeSection} /> : currentPath === '/assets' ? <AssetsPage activeSection={activeSection} /> : currentPath === '/documentation' ? <DocumentationPage activeSection={activeSection} /> : currentPath === '/reports' ? <ReportsPage activeSection={activeSection} /> : currentPath === '/settings' ? <SettingsPage activeSection={activeSection} /> : currentPath === '/revisions' ? <RevisionsPage activeSection={activeSection} /> : currentPath === '/tasks' ? <TasksPage activeSection={activeSection} setActiveSection={setActiveSection} /> : fixture ? <ModuleView fixture={fixture} activeSection={activeSection} /> : <div className="workspace-placeholder"><Archive size={34} /><h2>This view is next in the thread.</h2><p>This placeholder route keeps the application shell ready while the module is designed.</p></div>}
            </div>
          </div>
        </section>
      </div>
      <footer className="workspace-footer section-shell"><span>Placeholder session · No data is saved</span><nav aria-label="Legal policies"><a href="/privacy-policy">Privacy</a><a href="/terms-of-service">Terms</a><a href="/cookie-and-local-storage-policy">Storage</a><a href="/">Back to landing</a></nav></footer>
      <NavigationDock currentPath={currentPath} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
    </main>
  )
}
