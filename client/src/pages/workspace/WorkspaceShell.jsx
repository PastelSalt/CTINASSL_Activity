import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Ellipsis, Search, Sparkles, X } from 'lucide-react'
import { legalLinks } from '../../components/public/legalLinks'
import { useQueryParam } from '../../hooks/useQueryParam'
import { modules, mobilePrimary, settingsModule } from './nav'
import { useWorkspace } from './context'
import { projects } from './data/fixtures'

const isActive = (pathname, href) => pathname === href || (href === '/projects' && pathname.startsWith('/projects/'))

function NavLink({ item, pathname, iconOnly = false }) {
  const Icon = item.icon
  const active = isActive(pathname, item.href)
  return (
    <a className={active ? 'ws-nav__link ws-nav__link--active' : 'ws-nav__link'} href={item.href} aria-current={active ? 'page' : undefined} title={item.label}>
      <Icon size={19} strokeWidth={2.2} aria-hidden="true" />
      <span className={iconOnly ? 'sr-only' : undefined}>{item.label}</span>
    </a>
  )
}

function Rail({ pathname }) {
  return (
    <aside className="ws-rail">
      <a className="brand" href="/dashboard" aria-label="Tsumugi overview"><span className="brand__mark">ts</span><span className="ws-rail__word">tsumugi</span></a>
      <nav className="ws-nav" aria-label="Workspace modules">
        {modules.map((item) => <NavLink item={item} pathname={pathname} key={item.href} />)}
      </nav>
      <nav className="ws-nav ws-nav--bottom" aria-label="Account and settings">
        <NavLink item={settingsModule} pathname={pathname} />
      </nav>
    </aside>
  )
}

function TopBar({ pathname }) {
  const { scope, setScope, preview } = useWorkspace()
  const menuRef = useRef(null)

  useEffect(() => {
    if (menuRef.current) menuRef.current.open = false
  }, [pathname])

  return (
    <header className="ws-topbar">
      <a className="brand ws-topbar__brand" href="/dashboard" aria-label="Tsumugi overview"><span className="brand__mark">ts</span></a>
      <label className="ws-scope">
        <span className="sr-only">Project scope</span>
        <select value={scope} onChange={(event) => setScope(event.target.value)}>
          <option value="all">All projects</option>
          {projects.filter((project) => project.status !== 'Archived').map((project) => <option value={project.id} key={project.id}>{project.name}</option>)}
        </select>
      </label>
      <button className="ws-search" type="button" aria-haspopup="dialog" onClick={() => preview('Search is not connected yet', 'Global search across projects, tasks, requirements, and documents will appear here. For now use the search field on each page.')}>
        <Search size={16} aria-hidden="true" /><span>Search</span>
      </button>
      <span className="ws-demo-chip"><Sparkles size={13} aria-hidden="true" /> Demo</span>
      <details className="ws-menu" ref={menuRef}>
        <summary aria-label="Account menu"><span className="avatar avatar--pink">DU</span><ChevronDown size={14} aria-hidden="true" /></summary>
        <div className="ws-menu__panel">
          <p className="ws-menu__who"><strong>Demo user</strong><span>Demo session — no account</span></p>
          <a href="/settings">Preferences</a>
          <a href="/">Back to landing page</a>
          <a href="/login">Leave demo</a>
        </div>
      </details>
    </header>
  )
}

function MobileTabs({ pathname }) {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef(null)
  const primary = modules.filter((item) => mobilePrimary.includes(item.href))
  const more = [...modules.filter((item) => !mobilePrimary.includes(item.href)), settingsModule]

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <>
      <nav className="ws-tabs" aria-label="Workspace modules">
        {primary.map((item) => {
          const Icon = item.icon
          const active = isActive(pathname, item.href)
          return <a className={active ? 'ws-tabs__link ws-tabs__link--active' : 'ws-tabs__link'} href={item.href} aria-current={active ? 'page' : undefined} key={item.href}><Icon size={20} aria-hidden="true" /><span>{item.label}</span></a>
        })}
        <button className={more.some((item) => isActive(pathname, item.href)) ? 'ws-tabs__link ws-tabs__link--active' : 'ws-tabs__link'} type="button" aria-haspopup="dialog" onClick={() => setOpen(true)}><Ellipsis size={20} aria-hidden="true" /><span>More</span></button>
      </nav>
      <dialog className="ws-sheet" ref={dialogRef} aria-label="More modules" onClose={() => setOpen(false)} onClick={(event) => { if (event.target === dialogRef.current) setOpen(false) }}>
        <div className="ws-sheet__body">
          <div className="ws-sheet__head"><strong>More</strong><button type="button" className="ws-icon-button" aria-label="Close" onClick={() => setOpen(false)}><X size={18} aria-hidden="true" /></button></div>
          <nav className="ws-sheet__links" aria-label="More modules">
            {more.map((item) => <NavLink item={item} pathname={pathname} key={item.href} />)}
          </nav>
        </div>
      </dialog>
    </>
  )
}

function DemoBanner() {
  const [state, setState] = useQueryParam('preview')
  return (
    <div className="ws-demo" role="note">
      <span><Sparkles size={14} aria-hidden="true" /> <strong>Demo workspace.</strong> Sample data — nothing is saved.</span>
      <label>
        <span>Preview state</span>
        <select value={state ?? 'normal'} onChange={(event) => setState(event.target.value === 'normal' ? null : event.target.value)}>
          <option value="normal">Normal</option>
          <option value="loading">Loading</option>
          <option value="empty">Empty</option>
          <option value="error">Error</option>
          <option value="unauthorized">Unauthorized</option>
        </select>
      </label>
    </div>
  )
}

export default function WorkspaceShell({ pathname, children }) {
  return (
    <div className="ws">
      <a className="skip-link" href="#ws-content">Skip to workspace content</a>
      <Rail pathname={pathname} />
      <div className="ws-main">
        <TopBar pathname={pathname} />
        <main className="ws-content" id="ws-content">
          <DemoBanner />
          {children}
        </main>
        <footer className="ws-footer">
          <nav aria-label="Legal policies">
            {legalLinks.map(([href, label]) => <a href={href} key={href}>{label}</a>)}
            <a href="/">Back to landing page</a>
          </nav>
        </footer>
      </div>
      <MobileTabs key={pathname} pathname={pathname} />
    </div>
  )
}
