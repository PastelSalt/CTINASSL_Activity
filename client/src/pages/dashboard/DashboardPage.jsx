import { Activity, Archive, ArrowUpRight, BarChart3, BookOpen, Boxes, CheckSquare, ChevronDown, ClipboardList, FolderKanban, LayoutDashboard, Menu, Milestone, Settings, Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { dashboardActivity, dashboardMilestones, dashboardProjects, dashboardSections, dashboardTasks, moduleFixtures } from './dashboardData'

const navigation = [
  ['/dashboard', 'Dashboard', LayoutDashboard],
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
    <nav className={`dashboard-dock ${mobileOpen ? 'dashboard-dock--open' : ''}`} aria-label="Application navigation">
      <button className="dashboard-dock__menu" type="button" aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}>
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}<span>{mobileOpen ? 'Close' : 'More'}</span>
      </button>
      {visibleNavigation.map(([href, label, Icon]) => (
        <a className={currentPath === href ? 'dashboard-dock__link dashboard-dock__link--active' : 'dashboard-dock__link'} href={href} aria-current={currentPath === href ? 'page' : undefined} key={href}>
          <Icon size={18} strokeWidth={2.2} /><span>{label}</span>
        </a>
      ))}
    </nav>
  )
}

function MetricCard({ label, value, note, tone }) {
  return <article className={`dashboard-metric dashboard-metric--${tone}`}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>
}

function SectionNavigation({ sections, activeSection, onSelect }) {
  return (
    <nav className="dashboard-section-nav" aria-label="Page sections">
      <p className="dashboard-section-nav__label">This page</p>
      {sections.map((section) => (
        <button className={activeSection === section ? 'dashboard-section-nav__link dashboard-section-nav__link--active' : 'dashboard-section-nav__link'} type="button" aria-current={activeSection === section ? 'page' : undefined} onClick={() => onSelect(section)} key={section}>
          <span className="dashboard-section-nav__dot" />{section}
        </button>
      ))}
    </nav>
  )
}

function DashboardOverview({ activeSection }) {
  if (activeSection !== 'Overview') {
    const descriptions = {
      'Project pulse': 'Projects grouped by their current status and next production thread.',
      'Upcoming milestones': 'Milestones and deadlines that need attention across the workspace.',
      'Tasks needing attention': 'Open, urgent, and overdue tasks that can move work forward.',
      'Recent activity': 'A chronological record of changes across the demo workspace.',
      'Quick actions': 'Presentation-only entry points for creating projects and tasks.',
    }
    return <div className="dashboard-placeholder dashboard-placeholder--section"><Sparkles size={34} /><h2>{activeSection}</h2><p>{descriptions[activeSection]}</p><small>Section content is staged for visual exploration.</small></div>
  }

  return (
    <>
      <div className="dashboard-metrics">
        <MetricCard label="Total projects" value="03" note="Count of fixture projects" tone="pink" />
        <MetricCard label="Active projects" value="01" note="Projects with Active status" tone="blue" />
        <MetricCard label="Open tasks" value="12" note="Tasks not marked Completed" tone="yellow" />
        <MetricCard label="Overdue" value="02" note="Open records past due date" tone="lilac" />
      </div>
      <div className="dashboard-grid">
        <section className="dashboard-panel dashboard-panel--projects"><div className="dashboard-panel__heading"><div><p className="eyebrow">Project pulse</p><h2>Status overview</h2></div><a href="/projects">See all <ArrowUpRight size={15} /></a></div><div className="project-list">{dashboardProjects.map((project) => <article className="project-row" key={project.name}><span className={`project-dot project-dot--${project.color}`} /><div><strong>{project.name}</strong><small>{project.type} · Next: {project.next}</small></div><span className="project-status">{project.status}</span><span className="project-progress">{project.progress}%</span></article>)}</div></section>
        <section className="dashboard-panel"><div className="dashboard-panel__heading"><div><p className="eyebrow">The next knot</p><h2>Milestones</h2></div><a href="/milestones">View <ArrowUpRight size={15} /></a></div><div className="dashboard-stack">{dashboardMilestones.map(([title, project, date, tone]) => <div className="dashboard-line" key={title}><span className={`project-dot project-dot--${tone}`} /><div><strong>{title}</strong><small>{project}</small></div><time>{date}</time></div>)}</div></section>
        <section className="dashboard-panel"><div className="dashboard-panel__heading"><div><p className="eyebrow">Keep moving</p><h2>Tasks</h2></div><a href="/tasks">View <ArrowUpRight size={15} /></a></div><div className="dashboard-stack">{dashboardTasks.map(([title, due, tone]) => <div className="dashboard-line" key={title}><span className={`task-mark task-mark--${tone}`} /><div><strong>{title}</strong><small>{due}</small></div></div>)}</div></section>
        <section className="dashboard-panel"><div className="dashboard-panel__heading"><div><p className="eyebrow">The living record</p><h2>Recent activity</h2></div><a href="/reports">Reports <ArrowUpRight size={15} /></a></div><div className="dashboard-stack">{dashboardActivity.map(([text, project, time]) => <div className="dashboard-line" key={text}><Activity size={17} className="activity-icon" /><div><strong>{text}</strong><small>{project}</small></div><time>{time}</time></div>)}</div></section>
      </div>
    </>
  )
}

function ModuleView({ fixture, activeSection }) {
  return (
    <section className="dashboard-module" aria-labelledby="module-view-title">
      <div className="dashboard-module__toolbar">
        <div><p className="eyebrow">Page section</p><h2 id="module-view-title">{activeSection}</h2><p className="dashboard-module__description">{fixture.title} content is presented as a static exploration.</p></div>
        <span className="dashboard-module__scope">Demo records only</span>
      </div>
      <div className="dashboard-table-wrap">
        <table className="dashboard-table">
          <thead><tr>{fixture.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
          <tbody>{fixture.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${cell}`}>{index === 0 ? <strong>{cell}</strong> : cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <p className="dashboard-module__note"><Sparkles size={15} /> {fixture.note}</p>
    </section>
  )
}

export default function DashboardPage({ currentPath = '/dashboard' }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(() => dashboardSections[currentPath]?.[0] || 'Overview')
  const fixture = moduleFixtures[currentPath]
  const sections = dashboardSections[currentPath] || ['Overview']
  const pageTitle = currentPath === '/dashboard' ? 'A clear view of the work.' : fixture?.title || 'Coming soon'
  const pageDescription = currentPath === '/dashboard' ? "Placeholder data for exploring Tsumugi's authenticated workspace." : fixture?.description || 'This route is reserved for a future authenticated module.'

  return (
    <main className="dashboard-page">
      <a className="skip-link" href="#dashboard-content">Skip to dashboard content</a>
      <header className="dashboard-header section-shell">
        <a className="brand" href="/"><span className="brand__mark">ts</span><span>tsumugi</span></a>
        <div className="dashboard-header__context"><span className="dashboard-demo-badge"><Sparkles size={13} /> Demo workspace</span><button className="dashboard-account" type="button" aria-label="Open account menu">PS <ChevronDown size={14} /></button></div>
      </header>
      <div className="dashboard-layout section-shell">
        <section className="dashboard-content" id="dashboard-content" aria-labelledby="dashboard-title">
          <div className="dashboard-heading">
            <div><p className="eyebrow">{currentPath === '/dashboard' ? 'Tuesday, 11 November' : fixture?.eyebrow || 'Authenticated workspace'}</p><h1 id="dashboard-title">{pageTitle}</h1><p>{pageDescription}</p></div>
            <div className="dashboard-actions"><button className="button button--primary" type="button">{fixture?.action || 'New project'} <ArrowUpRight size={16} /></button><button className="button dashboard-action-secondary" type="button">New task <CheckSquare size={16} /></button></div>
          </div>
          <div className="dashboard-section-layout">
            <SectionNavigation sections={sections} activeSection={activeSection} onSelect={setActiveSection} />
            <div className="dashboard-section-content">
              {currentPath === '/dashboard' ? <DashboardOverview activeSection={activeSection} /> : fixture ? <ModuleView fixture={fixture} activeSection={activeSection} /> : <div className="dashboard-placeholder"><Archive size={34} /><h2>This view is next in the thread.</h2><p>This placeholder route keeps the application shell ready while the module is designed.</p></div>}
            </div>
          </div>
        </section>
      </div>
      <footer className="dashboard-footer section-shell"><span>Placeholder session · No data is saved</span><nav aria-label="Legal policies"><a href="/privacy-policy">Privacy</a><a href="/terms-of-service">Terms</a><a href="/cookie-and-local-storage-policy">Storage</a><a href="/">Back to landing</a></nav></footer>
      <NavigationDock currentPath={currentPath} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
    </main>
  )
}
