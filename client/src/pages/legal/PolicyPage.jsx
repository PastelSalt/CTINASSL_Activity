import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link2, TriangleAlert } from 'lucide-react'
import PublicHeader from '../../components/public/PublicHeader'
import { Depth, Words } from '../../components/motion/Motion'
import PublicFooter from '../../components/public/PublicFooter'
import { legalLinks } from '../../components/public/legalLinks'
import { usePageMeta } from '../../hooks/usePageMeta'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { parseDocument, renderBlocks } from '../../lib/markdown'
import { LEGAL_STATUS, legalDocuments, storageInventory } from './legalMeta'
import { initLegalMotion } from './legalMotion'
import '../../styles/motion.css'
import '../../styles/policy.css'

const INVENTORY_ID = 'storage-inventory'
const cleanValue = (value) => value.replace(/`?\[[^\]]+\]`?/g, 'To be confirmed').replace(/`/g, '')

function SectionHeading({ heading, id }) {
  const match = heading.match(/^(\d+)\.\s*(.*)$/)
  return (
    <h2 id={`${id}-title`}>
      {match && <span className="policy-section__number" aria-hidden="true">{match[1].padStart(2, '0')}</span>}
      {match ? match[2] : heading}
      <a className="policy-section__anchor" href={`#${id}`} aria-label={`Link to section: ${match ? match[2] : heading}`}><Link2 size={16} aria-hidden="true" /></a>
    </h2>
  )
}

function StorageInventory() {
  return (
    <section className="policy-section" id={INVENTORY_ID} aria-labelledby={`${INVENTORY_ID}-title`}>
      <SectionHeading heading="Storage inventory" id={INVENTORY_ID} />
      <p>This table lists everything the Tsumugi client stores in your browser. It is kept in step with the application.</p>
      <div className="policy-table" tabIndex={0} role="region" aria-label="Storage inventory table">
        <table>
          <thead><tr><th scope="col">Name</th><th scope="col">Purpose</th><th scope="col">Duration</th><th scope="col">Category</th></tr></thead>
          <tbody>
            {storageInventory.length === 0
              ? <tr><td colSpan={4}>None. This version of Tsumugi does not set cookies or use local or session storage.</td></tr>
              : storageInventory.map((item) => <tr key={item.name}><td><code>{item.name}</code></td><td>{item.purpose}</td><td>{item.duration}</td><td>{item.category}</td></tr>)}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default function PolicyPage({ currentPath, source }) {
  const info = legalDocuments[currentPath]
  const doc = useMemo(() => parseDocument(source), [source])
  const isDraft = LEGAL_STATUS === 'draft'
  const isWide = useMediaQuery('(min-width: 1024px)')
  const [activeId, setActiveId] = useState('')
  const pageRef = useRef(null)
  const hasInventory = currentPath === '/cookie-and-local-storage-policy'
  const toc = [...doc.sections.map(({ heading, id }) => ({ heading, id })), ...(hasInventory ? [{ heading: 'Storage inventory', id: INVENTORY_ID }] : [])]
  const statusLine = doc.meta.find(([key]) => /draft status/i.test(key))?.[1]
  const details = doc.meta.filter(([key]) => !/draft status|^service$/i.test(key))

  usePageMeta({
    title: `${info.label} | Tsumugi`,
    description: info.description,
    robots: isDraft ? 'noindex, nofollow' : 'index, follow',
  })

  useEffect(() => {
    const targets = toc.map(({ id }) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveId(visible.target.id)
    }, { rootMargin: '-15% 0px -70% 0px' })
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc, hasInventory])

  useLayoutEffect(() => initLegalMotion({ scope: pageRef }), [])

  return (
    <main className="policy-page public-page" ref={pageRef}>
      <a className="skip-link" href="#policy-content">Skip to policy content</a>
      <div className="cursor" aria-hidden="true" />
      <div className="policy-progress" aria-hidden="true" />
      <div className="page-bg" aria-hidden="true">
        <Depth d={-10}><div className="page-bg__orb page-bg__orb--a" /></Depth>
        <Depth d={14}><div className="page-bg__orb page-bg__orb--b" /></Depth>
        <svg className="page-bg__thread" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <path d="M-20 260C160 60 300 60 440 220s300 160 440-10 220-120 340-60" />
        </svg>
      </div>
      <PublicHeader />

      <div className="policy-layout section-shell">
        {isDraft && (
          <div className="policy-banner" role="note">
            <TriangleAlert size={20} aria-hidden="true" />
            <p><strong>{statusLine || 'Planning draft'}.</strong> This is not legal advice and not a binding agreement. Details still to be decided are marked “To be confirmed”.</p>
          </div>
        )}

        <nav className="policy-toc" aria-label="On this page">
          <details open={isWide}>
            <summary>On this page</summary>
            <ol>
              {toc.map(({ heading, id }) => (
                <li key={id}><a href={`#${id}`} aria-current={activeId === id ? 'location' : undefined}>{heading.replace(/^\d+\.\s*/, '')}</a></li>
              ))}
            </ol>
            <p className="policy-toc__other">Other policies</p>
            <ul>
              {legalLinks.filter(([href]) => href !== currentPath).map(([href, label]) => <li key={href}><a href={href}>{label}</a></li>)}
            </ul>
          </details>
        </nav>

        <article className="policy-document" id="policy-content">
          <header className="policy-document__header">
            <p className="eyebrow">Moeko Works · Tsumugi · {info.label}</p>
            <h1><Words text={info.title} /></h1>
            <p className="policy-document__description">{info.description}</p>
            <dl className="policy-document__meta">
              <div><dt>Version</dt><dd>{info.version}</dd></div>
              {details.map(([key, value]) => <div key={key}><dt>{key.replace(/^Proposed /, '')}</dt><dd>{cleanValue(value)}</dd></div>)}
            </dl>
          </header>

          {doc.sections.map(({ heading, id, lines }) => (
            <section className="policy-section" id={id} aria-labelledby={`${id}-title`} key={id}>
              <SectionHeading heading={heading} id={id} />
              {renderBlocks(lines, id)}
            </section>
          ))}
          {hasInventory && <StorageInventory />}
        </article>
      </div>

      <PublicFooter currentPath={currentPath} />
    </main>
  )
}
