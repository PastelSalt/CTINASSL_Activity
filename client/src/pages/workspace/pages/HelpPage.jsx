import { useState } from 'react'
import { Search } from 'lucide-react'
import source from '../../../../../docs/individual-workspace-guide.md?raw'
import { parseDocument, renderBlocks } from '../../../lib/markdown'
import { PageHeader } from '../components/layout'
import { NoResults } from '../components/states'

const guide = parseDocument(source)

/** Help page: renders docs/individual-workspace-guide.md, so the guide and the page never drift apart. */
export default function HelpPage() {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const sections = q ? guide.sections.filter((s) => `${s.heading} ${s.lines.join(' ')}`.toLowerCase().includes(q)) : guide.sections

  return (
    <>
      <PageHeader title="Help" description="How the individual workspace works, from your first task to finishing a project." />
      <label className="ws-search-field help-search">
        <Search size={16} aria-hidden="true" /><span className="sr-only">Search the guide</span>
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the guide" />
      </label>
      <div className="reader__layout help">
        <nav className="reader__outline" aria-label="Guide sections">
          <h3>Sections</h3>
          <ul>{guide.sections.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.heading.replace(/^\d+\.\s*/, '')}</a></li>)}</ul>
        </nav>
        <div className="reader__doc help-doc">
          {guide.meta.length > 0 && <p className="chip-list help-meta">{guide.meta.map(([k, v]) => <span className="chip" key={k}><span>{k}: {v}</span></span>)}</p>}
          {sections.length ? sections.map((s) => <section key={s.id} id={s.id}><h2>{s.heading}</h2>{renderBlocks(s.lines, s.id)}</section>) : <NoResults onClear={() => setQuery('')} />}
        </div>
      </div>
    </>
  )
}
