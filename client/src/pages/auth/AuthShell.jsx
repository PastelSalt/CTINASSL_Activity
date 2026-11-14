import { useLayoutEffect, useRef } from 'react'
import PublicHeader from '../../components/public/PublicHeader'
import PublicFooter from '../../components/public/PublicFooter'
import { FormBanner } from '../../components/forms/forms'
import { Depth, Words } from '../../components/motion/Motion'
import { usePageMeta } from '../../hooks/usePageMeta'
import { useLocation } from '../../app/router'
import AuthArt from './AuthArt'
import { initAuthMotion } from './authMotion'
import '../../styles/motion.css'
import '../../styles/auth.css'
import '../../styles/forms.css'

/** Shared frame for login, register, and recovery pages. `art` adds the illustrated side panel. */
export default function AuthShell({ pageTitle, title, intro, art, previewStates = [], currentState, note, children }) {
  usePageMeta({ title: `${pageTitle} | Tsumugi`, robots: 'noindex, nofollow' })
  const { pathname } = useLocation()
  const pageRef = useRef(null)

  useLayoutEffect(() => initAuthMotion({ scope: pageRef }), [])

  return (
    <main className="auth-page public-page" ref={pageRef}>
      <a className="skip-link" href="#auth-content">Skip to authentication form</a>
      <div className="cursor" aria-hidden="true" />
      <div className="page-bg" aria-hidden="true">
        <Depth d={-10}><div className="page-bg__orb page-bg__orb--a" /></Depth>
        <Depth d={14}><div className="page-bg__orb page-bg__orb--b" /></Depth>
        <svg className="page-bg__thread" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <path d="M-20 260C160 60 300 60 440 220s300 160 440-10 220-120 340-60" />
        </svg>
      </div>
      <PublicHeader />

      <section className={art ? 'auth-card auth-card--register section-shell' : 'auth-card section-shell'} id="auth-content" aria-labelledby="auth-title">
        <div className="auth-form-column">
          <FormBanner tone="info" title="Demo mode">Nothing is sent or saved. You can continue without entering any details.</FormBanner>
          <h1 id="auth-title"><Words text={title} /></h1>
          <p className="auth-intro">{intro}</p>
          {children}
        </div>
        {art && <AuthArt variant={art} />}
      </section>

      <div className="auth-meta section-shell">
        {note && <p className="auth-security-note">{note}</p>}
        {previewStates.length > 0 && (
          <details className="auth-preview">
            <summary>Preview states (demo)</summary>
            <ul>
              {previewStates.map(([value, label]) => (
                <li key={value}>
                  <a href={value === 'default' ? pathname : `${pathname}?preview=${value}`} aria-current={currentState === value ? 'true' : undefined}>{label}</a>
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
      <PublicFooter />
    </main>
  )
}
