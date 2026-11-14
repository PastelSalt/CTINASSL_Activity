import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Menu, X } from 'lucide-react'

function Brand({ onClick }) {
  return (
    <a className="brand" href={onClick ? '#top' : '/'} onClick={onClick}>
      <span className="brand__mark">ts</span>
      <span>tsumugi</span>
    </a>
  )
}

/** Compact header for auth, legal, and Not Found pages. */
function CompactHeader() {
  return (
    <header className="public-header section-shell">
      <Brand />
      <a className="text-link" href="/"><ArrowLeft size={16} strokeWidth={2.5} aria-hidden="true" /> Back to home</a>
    </header>
  )
}

/** Floating anchored navigation for the landing page. */
function LandingHeader({ sections, activeSection, progress }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef(null)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      toggleRef.current?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className={`site-header ${menuOpen ? 'site-header--open' : ''}`}>
      <nav className="nav-pill" aria-label="Main navigation">
        <Brand onClick={closeMenu} />
        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-links"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span className="sr-only">Toggle navigation</span>
          {menuOpen ? <X size={20} strokeWidth={2.5} aria-hidden="true" /> : <Menu size={20} strokeWidth={2.5} aria-hidden="true" />}
        </button>
        <div className={`nav-content ${menuOpen ? 'nav-content--open' : ''}`} id="primary-links">
          <div className="nav-links">
            {sections.map(({ id, label }) => (
              <a
                className={activeSection === id ? 'nav-link nav-link--active' : 'nav-link'}
                href={`#${id}`}
                key={id}
                aria-current={activeSection === id ? 'true' : undefined}
                onClick={closeMenu}
              >
                {label}
              </a>
            ))}
          </div>
          <span className="nav-meter" role="img" aria-label={`${Math.round(progress)} percent page progress`}>
            <span style={{ width: `${progress}%` }} />
          </span>
          <a className="text-link nav-login" href="/login">Log in</a>
          <a className="button button--small button--dark" href="/register">Create your workspace <ArrowUpRight size={14} strokeWidth={2.5} aria-hidden="true" /></a>
        </div>
      </nav>
    </header>
  )
}

export default function PublicHeader({ variant = 'compact', ...landingProps }) {
  return variant === 'landing' ? <LandingHeader {...landingProps} /> : <CompactHeader />
}
