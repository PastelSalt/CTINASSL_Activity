import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { parseDocument, renderBlocks } from '../../../lib/markdown'
import { get } from '../data/selectors'
import { formatDate } from '../data/format'
import { StatusBadge, RelationChip } from './badges'
import { LensBlock } from './records'
import { PreviewAction } from './layout'

/** Reads one Markdown document: outline, Preview or Source, and a lens of what it is linked to. */
export default function DocReader({ doc, backHref = '/library' }) {
  const [mode, setMode] = useState('preview')
  const parsed = parseDocument(doc.body)
  const project = get('project', doc.projectId)
  return (
    <article className="reader">
      <a className="ws-link" href={backHref}><ArrowLeft size={15} aria-hidden="true" /> Back to Library</a>
      <header className="reader__head">
        <div>
          <p className="eyebrow">{project.name} · v{doc.version}</p>
          <h2>{parsed.title}</h2>
          <p className="chip-list"><StatusBadge domain="document" status={doc.status} /><span className="muted">Updated {formatDate(doc.updatedAt)}</span></p>
        </div>
        <div className="reader__actions">
          <div className="segmented" role="group" aria-label="Document mode">
            <button type="button" aria-pressed={mode === 'preview'} onClick={() => setMode('preview')}>Preview</button>
            <button type="button" aria-pressed={mode === 'source'} onClick={() => setMode('source')}>Source</button>
          </div>
          <PreviewAction label="Edit" variant="primary" />
        </div>
      </header>
      <div className="reader__layout">
        {parsed.sections.length > 1 && (
          <nav className="reader__outline" aria-label="Outline"><h3>On this page</h3><ul>{parsed.sections.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.heading}</a></li>)}</ul></nav>
        )}
        <div className="reader__doc">
          {mode === 'source'
            ? <pre className="reader__source" tabIndex={0}>{doc.body}</pre>
            : parsed.sections.map((s) => <section key={s.id} id={s.id}><h3>{s.heading}</h3>{renderBlocks(s.lines, s.id)}</section>)}
          {parsed.sections.length === 0 && mode === 'preview' && <p className="muted">This document has no sections yet.</p>}
        </div>
      </div>
      <LensBlock
        why={doc.requirementIds.map((id) => <RelationChip type="Requirement" id={id} label={id} key={id} />)}
        becomes={doc.taskIds.map((id) => <RelationChip type="Task" id={id} key={id} />)}
        emptyWhy="Not linked to a requirement." emptyBecomes="Not linked to a task."
      />
    </article>
  )
}
