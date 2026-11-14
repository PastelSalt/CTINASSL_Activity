import { useEffect, useRef } from 'react'
import { ArrowUpRight, Search, SlidersHorizontal, X } from 'lucide-react'
import { usePageMeta } from '../../../hooks/usePageMeta'
import { useCountUp, useInkSlide, usePageEntrance, usePanelEntrance, useViewChangeMotion } from '../useWorkspaceMotion'
import { useWorkspace } from '../context'

/** Button that opens the preview-only dialog (PLAN-A-04 section 1). Never performs the action. */
export function PreviewAction({ label, icon: Icon = ArrowUpRight, title, body, variant = 'secondary', iconOnlyOnMobile = false }) {
  const { preview } = useWorkspace()
  return (
    <button
      className={`button button--small ${variant === 'primary' ? 'button--primary' : 'button--secondary'}${iconOnlyOnMobile ? ' ws-action--collapse' : ''}`}
      type="button"
      aria-haspopup="dialog"
      aria-label={iconOnlyOnMobile ? label : undefined}
      onClick={() => preview(title || `${label} isn’t connected yet`, body || 'This is a layout preview of the action. Nothing is created, changed, or saved in the demo.')}
    >
      <Icon size={16} aria-hidden="true" /><span>{label}</span>
    </button>
  )
}

export function PageHeader({ title, description, eyebrow, crumbs, action, metaTitle }) {
  usePageMeta({ title: `${metaTitle || title} | Tsumugi`, robots: 'noindex, nofollow' })
  usePageEntrance()
  return (
    <header className="ws-page-header">
      {crumbs
        ? <nav aria-label="Breadcrumb" className="ws-crumbs"><ol>{crumbs.map(([label, href], index) => <li key={label}>{href ? <a href={href}>{label}</a> : <span aria-current="page">{label}</span>}{index < crumbs.length - 1 && <span aria-hidden="true"> /</span>}</li>)}</ol></nav>
        : eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <div className="ws-page-header__row">
        <div><h1>{title}</h1>{description && <p>{description}</p>}</div>
        {action && <div className="ws-page-header__actions">{action}</div>}
      </div>
    </header>
  )
}

/** Views of one destination. Each view changes the layout or content model, never just a status subset. */
export function ViewTabs({ tabs, value, onChange, label = 'Views', vertical = false }) {
  const listRef = useRef(null)
  const inkRef = useRef(null)
  useViewChangeMotion(value)
  useInkSlide(listRef, inkRef, vertical)
  return (
    <nav className={vertical ? 'ws-views ws-views--vertical' : 'ws-views'} aria-label={label}>
      <ul ref={listRef}>
        {tabs.map(({ id, label: text, icon: Icon, count }) => (
          <li key={id}>
            <button type="button" aria-current={value === id ? 'page' : undefined} onClick={() => onChange(id)}>
              {Icon && <Icon size={16} aria-hidden="true" />}<span>{text}</span>{count != null && <span className="ws-views__count">{count}</span>}
            </button>
          </li>
        ))}
        {!vertical && <li className="ws-views__ink" ref={inkRef} aria-hidden="true" />}
      </ul>
    </nav>
  )
}

/** One Filter button with an active count; the controls open in a popover (a bottom sheet on mobile). */
export function FilterPopover({ count, onReset, children }) {
  const ref = useRef(null)
  useEffect(() => {
    const close = (event) => { if (ref.current?.open && !ref.current.contains(event.target)) ref.current.open = false }
    const onKey = (event) => { if (event.key === 'Escape' && ref.current?.open) { ref.current.open = false; ref.current.querySelector('summary')?.focus() } }
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', onKey) }
  }, [])
  return (
    <details className="filter-pop" ref={ref}>
      <summary className="button button--small button--secondary"><SlidersHorizontal size={15} aria-hidden="true" /> Filter{count > 0 && <span className="filter-pop__count" aria-label={`${count} active`}>{count}</span>}</summary>
      <div className="filter-pop__panel">
        {children}
        {count > 0 && <button className="ws-link-button" type="button" onClick={onReset}><X size={14} aria-hidden="true" /> Clear filters</button>}
      </div>
    </details>
  )
}

/** The single control row: search, one Filter button, then optional sort or display controls. */
export function Toolbar({ search, onSearch, placeholder, filter, children }) {
  return (
    <div className="ws-toolbar">
      <div className="ws-toolbar__row">
        {onSearch && (
          <label className="ws-search-field">
            <Search size={16} aria-hidden="true" /><span className="sr-only">{placeholder}</span>
            <input type="search" value={search} onChange={(event) => onSearch(event.target.value)} placeholder={placeholder} />
          </label>
        )}
        {filter && <FilterPopover count={filter.count} onReset={filter.onReset}>{filter.content}</FilterPopover>}
        {children}
      </div>
    </div>
  )
}

/** Labelled select used inside filter popovers. */
export function FilterField({ label, value, onChange, options }) {
  return (
    <label className="filter-field"><span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>{options.map(([val, text]) => <option value={val} key={val}>{text}</option>)}</select>
    </label>
  )
}

export function StatStrip({ stats }) {
  const ref = useRef(null)
  useCountUp(ref)
  return (
    <ul className="stats" ref={ref}>
      {stats.map(({ label, value, hint, onClick }) => (
        <li key={label}>
          {onClick
            ? <button type="button" onClick={onClick}><strong>{value}</strong><span>{label}</span>{hint && <small>{hint}</small>}</button>
            : <div><strong>{value}</strong><span>{label}</span>{hint && <small>{hint}</small>}</div>}
        </li>
      ))}
    </ul>
  )
}

export function Section({ title, action, children, className = '', id }) {
  return (
    <section className={`ws-section ${className}`} aria-labelledby={id}>
      <div className="ws-section__head"><h2 id={id}>{title}</h2>{action}</div>
      {children}
    </section>
  )
}

/** Content plus an optional docked detail panel (sheet below 1280px). */
export function SplitLayout({ panel, children }) {
  return (
    <div className={panel ? 'ws-split ws-split--open' : 'ws-split'}>
      <div className="ws-split__main">{children}</div>
      {panel}
    </div>
  )
}

export function DetailPanel({ title, kicker, onClose, children, actions }) {
  const ref = useRef(null)
  const panelRef = useRef(null)
  usePanelEntrance(panelRef)

  useEffect(() => {
    const opener = document.activeElement
    ref.current?.focus({ preventScroll: true })
    const onKey = (event) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      if (opener instanceof HTMLElement && document.contains(opener)) opener.focus({ preventScroll: true })
    }
  }, [onClose])

  return (
    <>
      <div className="ws-scrim" onClick={onClose} aria-hidden="true" />
      <aside className="ws-panel" ref={panelRef} aria-label={`${title} details`}>
        <div className="ws-panel__head">
          <div>{kicker && <p className="eyebrow">{kicker}</p>}<h2 tabIndex={-1} ref={ref}>{title}</h2></div>
          <button className="ws-icon-button" type="button" aria-label="Close details" onClick={onClose}><X size={18} aria-hidden="true" /></button>
        </div>
        <div className="ws-panel__body">{children}</div>
        {actions && <div className="ws-panel__actions">{actions}</div>}
      </aside>
    </>
  )
}

export function Fields({ items }) {
  return (
    <dl className="fields">
      {items.filter(([, value]) => value !== undefined && value !== null && value !== false).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
    </dl>
  )
}
