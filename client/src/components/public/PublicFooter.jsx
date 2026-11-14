import { legalLinks } from './legalLinks'

function LegalNav({ currentPath, className }) {
  return (
    <nav className={className} aria-label="Legal policies">
      <span className="footer__legal-label">Legal</span>
      {legalLinks.map(([href, label]) => (
        <a href={href} key={href} aria-current={href === currentPath ? 'page' : undefined}>{label}</a>
      ))}
    </nav>
  )
}

/** Shared footer: `full` for the landing page, `compact` for auth, legal, and Not Found pages. */
export default function PublicFooter({ variant = 'compact', currentPath }) {
  if (variant === 'full') {
    return (
      <footer className="footer section-shell">
        <div className="brand"><span className="brand__mark">ts</span><span>tsumugi</span></div>
        <p>Weaving ideas into finished work.</p>
        <div className="footer__auth" role="group" aria-label="Account">
          <a className="text-link" href="/login">Log in</a>
          <a className="text-link" href="/register">Create account</a>
        </div>
        <LegalNav className="footer__legal" currentPath={currentPath} />
        <span className="footer__credit">A Moeko Works project</span>
      </footer>
    )
  }

  return (
    <footer className="public-footer section-shell">
      <LegalNav className="public-footer__links" currentPath={currentPath} />
      <span className="footer__credit">A Moeko Works project</span>
    </footer>
  )
}
