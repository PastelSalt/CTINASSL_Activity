import { useEffect, useRef } from 'react'
import { BarChart3, CalendarDays, ChevronsUpDown, CircleHelp, Plus, Scale, Search, Settings, TerminalSquare, TriangleAlert, User } from 'lucide-react'
import { legalLinks } from '../../components/public/legalLinks'
import { useQueryParam } from '../../hooks/useQueryParam'
import { modules, mobileBar } from './nav'
import { useWorkspace } from './context'
import { resetSession, sessionCount } from './data/store'
import { figures } from './data/selectors'
import { DEMO_TODAY } from './data/format'

const isActive = (pathname, href) => pathname === href || (href === '/projects' && pathname.startsWith('/projects/'))

function NavLink({ item, pathname }) {
  const Icon = item.icon
  const active = isActive(pathname, item.href)
  return (
    <a className={active ? 'ws-nav__link ws-nav__link--active' : 'ws-nav__link'} href={item.href} aria-current={active ? 'page' : undefined} title={item.label}>
      <Icon size={19} strokeWidth={2.2} aria-hidden="true" /><span>{item.label}</span>
    </a>
  )
}

function AccountMenu({ pathname, placement }) {
  const { dev, setDev } = useWorkspace()
  const menuRef = useRef(null)
  useEffect(() => { if (menuRef.current) menuRef.current.open = false }, [pathname])
  useEffect(() => {
    const close = (event) => { if (menuRef.current?.open && !menuRef.current.contains(event.target)) menuRef.current.open = false }
    const onKey = (event) => { if (event.key === 'Escape' && menuRef.current?.open) { menuRef.current.open = false; menuRef.current.querySelector('summary')?.focus() } }
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', onKey) }
  }, [])
  const rail = placement === 'rail'
  return (
    <details className={rail ? 'ws-menu ws-menu--rail' : 'ws-menu ws-menu--top'} ref={menuRef}>
      <summary aria-label="Account menu">
        <span className="avatar" aria-hidden="true"><User size={16} /></span>
        {rail && <span className="ws-menu__label"><strong>Demo user</strong><small>Individual</small></span>}
        {rail && <ChevronsUpDown size={15} aria-hidden="true" className="ws-menu__chevron" />}
      </summary>
      <div className="ws-menu__panel">
        <p className="ws-menu__who"><strong>Demo workspace</strong><span>Individual · sample data, nothing is saved</span></p>
        {!rail && <a href="/insights"><BarChart3 size={15} aria-hidden="true" /> Insights</a>}
        <a href="/account"><Settings size={15} aria-hidden="true" /> Account and preferences</a>
        <a href="/help"><CircleHelp size={15} aria-hidden="true" /> Help</a>
        <button type="button" onClick={() => setDev(!dev)} aria-pressed={dev}><TerminalSquare size={15} aria-hidden="true" /> Developer tools: {dev ? 'on' : 'off'}</button>
        <div className="ws-menu__group" role="group" aria-label="Legal policies">
          <p><Scale size={13} aria-hidden="true" /> Legal</p>
          {legalLinks.map(([href, label]) => <a href={href} key={href}>{label}</a>)}
        </div>
        <a href="/">Back to landing page</a>
        <a href="/login">Leave demo</a>
      </div>
    </details>
  )
}

function Rail({ pathname }) {
  const { openQuickAdd } = useWorkspace()
  return (
    <aside className="ws-rail">
      <a className="brand" href="/home" aria-label="Tsumugi home"><span className="brand__mark">ts</span><span className="ws-rail__word">tsumugi</span></a>
      <button className="ws-quick" type="button" aria-haspopup="dialog" aria-keyshortcuts="q" onClick={() => openQuickAdd()} title="Quick add (Q)">
        <Plus size={19} strokeWidth={2.6} aria-hidden="true" /><span>Quick add</span>
      </button>
      <nav className="ws-nav" aria-label="Workspace">
        {modules.map((item) => <NavLink item={item} pathname={pathname} key={item.href} />)}
      </nav>
      <div className="ws-rail__foot"><AccountMenu pathname={pathname} placement="rail" /></div>
    </aside>
  )
}

const todayLabel = new Date(`${DEMO_TODAY}T00:00:00`).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })

/** Right side of the top bar: today's date and the two numbers that need attention. */
function TopStatus() {
  const f = figures()
  return (
    <div className="ws-status" aria-label="Today">
      <span className="ws-status__date"><CalendarDays size={15} aria-hidden="true" /> {todayLabel}</span>
      <a className="ws-status__chip" href="/tasks"><strong>{f.dueToday}</strong> due today</a>
      <a className={f.overdue ? 'ws-status__chip ws-status__chip--alert' : 'ws-status__chip'} href="/tasks"><TriangleAlert size={14} aria-hidden="true" /><strong>{f.overdue}</strong> overdue</a>
    </div>
  )
}

function TopBar({ pathname }) {
  const { openPalette } = useWorkspace()
  return (
    <header className="ws-topbar">
      <a className="brand ws-topbar__brand" href="/home" aria-label="Tsumugi home"><span className="brand__mark">ts</span></a>
      <button className="ws-search" type="button" aria-label="Search or jump to" aria-haspopup="dialog" aria-keyshortcuts="Control+K" onClick={openPalette}>
        <Search size={16} aria-hidden="true" /><span>Search projects, tasks and files…</span><kbd>Ctrl K</kbd>
      </button>
      <TopStatus />
      <div className="ws-topbar__account"><AccountMenu pathname={pathname} placement="top" /></div>
    </header>
  )
}

function MobileBar({ pathname }) {
  const { openQuickAdd } = useWorkspace()
  const items = mobileBar.map((href) => modules.find((m) => m.href === href))
  const link = (item) => {
    const Icon = item.icon
    const active = isActive(pathname, item.href)
    return <a className={active ? 'ws-tabs__link ws-tabs__link--active' : 'ws-tabs__link'} href={item.href} aria-current={active ? 'page' : undefined} key={item.href}><Icon size={20} aria-hidden="true" /><span>{item.label}</span></a>
  }
  return (
    <nav className="ws-tabs" aria-label="Workspace">
      {items.slice(0, 2).map(link)}
      <button className="ws-tabs__plus" type="button" aria-label="Quick add" aria-haspopup="dialog" onClick={() => openQuickAdd()}><Plus size={24} strokeWidth={2.8} aria-hidden="true" /></button>
      {items.slice(2).map(link)}
    </nav>
  )
}

function DevBar() {
  const [state, setState] = useQueryParam('preview')
  return (
    <div className="ws-dev" role="note">
      <strong>Developer tools</strong>
      <label><span>Preview state</span>
        <select value={state ?? 'normal'} onChange={(event) => setState(event.target.value === 'normal' ? null : event.target.value)}>
          <option value="normal">Normal</option><option value="loading">Loading</option><option value="empty">Empty / first run</option><option value="error">Error</option>
        </select>
      </label>
      <button type="button" onClick={resetSession}>Reset sample data{sessionCount() ? ` (${sessionCount()} session item${sessionCount() === 1 ? '' : 's'})` : ''}</button>
    </div>
  )
}

export default function WorkspaceShell({ pathname, children }) {
  const { dev } = useWorkspace()

  // Soft shadow under the top bar once the page has scrolled.
  useEffect(() => {
    const bar = document.querySelector('.ws-topbar')
    if (!bar) return undefined
    let frame = 0
    const update = () => { frame = 0; bar.dataset.scrolled = String(window.scrollY > 8) }
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll) }
  }, [])

  return (
    <div className="ws">
      <a className="skip-link" href="#ws-content">Skip to workspace content</a>
      <Rail pathname={pathname} />
      <div className="ws-main">
        <TopBar pathname={pathname} />
        <main className="ws-content" id="ws-content">
          {dev && <DevBar />}
          {children}
        </main>
      </div>
      <MobileBar pathname={pathname} />
    </div>
  )
}
