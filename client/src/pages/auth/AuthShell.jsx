import PublicHeader from '../../components/public/PublicHeader'
import PublicFooter from '../../components/public/PublicFooter'
import { FormBanner } from '../../components/forms/forms'
import { usePageMeta } from '../../hooks/usePageMeta'
import { useLocation } from '../../app/router'
import '../../styles/auth.css'
import '../../styles/forms.css'

/** Shared frame for login, register, and recovery pages. */
export default function AuthShell({ pageTitle, title, intro, wide = false, aside = null, previewStates = [], currentState, note, children }) {
  usePageMeta({ title: `${pageTitle} | Tsumugi`, robots: 'noindex, nofollow' })
  const { pathname } = useLocation()

  return (
    <main className="auth-page public-page">
      <a className="skip-link" href="#auth-content">Skip to authentication form</a>
      <PublicHeader />

      <section className={wide ? 'auth-card auth-card--register section-shell' : 'auth-card section-shell'} id="auth-content" aria-labelledby="auth-title">
        <div className="auth-form-column">
          <FormBanner tone="info" title="Demo mode">Nothing is sent or saved. You can continue without entering any details.</FormBanner>
          <h1 id="auth-title">{title}</h1>
          <p className="auth-intro">{intro}</p>
          {children}
        </div>
        {aside}
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
