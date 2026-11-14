import { useEffect, useRef } from 'react'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { usePageMeta } from '../../../hooks/usePageMeta'
import { useWorkspace } from '../context'

/** Button that opens the preview-only dialog (PLAN-A-04 section 9). Never performs the action. */
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
  usePageMeta({ title: `${metaTitle || title} | Tsumugi demo workspace`, robots: 'noindex, nofollow' })
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

/** Local views of one module. Each view changes the layout or content model, never just a status subset. */
export function ViewTabs({ tabs, value, onChange, label = 'Views', vertical = false }) {
  return (
    <nav className={vertical ? 'ws-views ws-views--vertical' : 'ws-views'} aria-label={label}>
      <ul>
        {tabs.map(({ id, label: text, icon: Icon, count }) => (
          <li key={id}>
            <button type="button" aria-current={value === id ? 'page' : undefined} onClick={() => onChange(id)}>
              {Icon && <Icon size={16} aria-hidden="true" />}<span>{text}</span>{count != null && <span className="ws-views__count">{count}</span>}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function FilterChips({ chips, value, onChange, label = 'Filter' }) {
  return (
    <div className="chips" role="group" aria-label={label}>
      {chips.map((chip) => (
        <button type="button" className="chips__chip" aria-pressed={value === chip.value} onClick={() => onChange(chip.value)} key={chip.value}>
          {chip.label}{chip.count != null && <span>{chip.count}</span>}
        </button>
      ))}
    </div>
  )
}

export function Toolbar({ search, onSearch, placeholder, chips, chipValue, onChip, chipLabel, children, onReset, dirty }) {
  return (
    <div className="ws-toolbar">
      <div className="ws-toolbar__row">
        {onSearch && (
          <label className="ws-search-field">
            <Search size={16} aria-hidden="true" /><span className="sr-only">{placeholder}</span>
            <input type="search" value={search} onChange={(event) => onSearch(event.target.value)} placeholder={placeholder} />
          </label>
        )}
        {children}
        {dirty && onReset && <button className="ws-link-button" type="button" onClick={onReset}><X size={14} aria-hidden="true" /> Clear filters</button>}
      </div>
      {chips && <FilterChips chips={chips} value={chipValue} onChange={onChip} label={chipLabel} />}
    </div>
  )
}

export function StatStrip({ stats }) {
  return (
    <ul className="stats">
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
      <aside className="ws-panel" aria-label={`${title} details`}>
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
