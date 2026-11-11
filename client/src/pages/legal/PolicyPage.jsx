import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { policyPages } from './policyPages'

function PolicyFooter({ currentPath }) {
  return (
    <footer className="policy-footer section-shell">
      <nav className="policy-footer__links" aria-label="Legal policies">
        <span className="footer__legal-label">Legal</span>
        {Object.entries(policyPages).map(([path, page]) => (
          <a className={path === currentPath ? 'policy-footer__link policy-footer__link--active' : 'policy-footer__link'} href={path} key={path}>
            {page.label.split(' / ')[0]}
          </a>
        ))}
      </nav>
      <span className="footer__credit">A Moeko Works project</span>
    </footer>
  )
}

export default function PolicyPage({ currentPath }) {
  const page = policyPages[currentPath]

  useEffect(() => {
    const previousTitle = document.title
    document.title = `${page.label} | Tsumugi`
    return () => {
      document.title = previousTitle
    }
  }, [page.label])

  return (
    <main className="policy-page">
      <a className="skip-link" href="#policy-content">Skip to policy content</a>
      <header className="policy-header section-shell">
        <a className="brand" href="/">
          <span className="brand__mark">ts</span>
          <span>tsumugi</span>
        </a>
        <a className="text-link" href="/"><ArrowLeft size={16} strokeWidth={2.5} /> Back to home</a>
      </header>
      <article className="policy-document section-shell" id="policy-content">
        <header className="policy-document__header">
          <p className="eyebrow">Moeko Works · Tsumugi</p>
          <p className="policy-document__status">{page.draft}</p>
          <h1>{page.title}</h1>
          <p className="policy-document__description">{page.description}</p>
          <p className="policy-document__meta">Proposed effective date: <strong>[YYYY-MM-DD]</strong></p>
        </header>
        <div className="policy-document__body">
          {page.sections.map(([heading, content], index) => (
            <section aria-labelledby={`policy-section-${index}`} key={heading}>
              <p className="policy-document__number">0{index + 1}</p>
              <div>
                <h2 id={`policy-section-${index}`}>{heading}</h2>
                <p>{content}</p>
              </div>
            </section>
          ))}
        </div>
        <aside className="policy-notice">
          These are planning drafts, not legal advice. Replace placeholders and review the content against the deployed product and applicable law before publication.
        </aside>
      </article>
      <PolicyFooter currentPath={currentPath} />
    </main>
  )
}
