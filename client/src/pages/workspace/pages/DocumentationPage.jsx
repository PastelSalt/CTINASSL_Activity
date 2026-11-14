import { useMemo, useState } from 'react'
import { BookOpen, Library, Plus } from 'lucide-react'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { useQueryParam } from '../../../hooks/useQueryParam'
import { parseDocument, renderBlocks } from '../../../lib/markdown'
import { Avatar, RelationChip, StatusBadge } from '../components/badges'
import { PageHeader, PreviewAction, Toolbar, ViewTabs } from '../components/layout'
import { EmptyState, NoResults, StateGate } from '../components/states'
import { useWorkspace } from '../context'
import { documents, revisions } from '../data/fixtures'
import { formatDate } from '../data/format'
import { get, scoped } from '../data/selectors'

const VIEWS = [{ id: 'library', label: 'Library', icon: Library }, { id: 'reader', label: 'Reader', icon: BookOpen }]
const TYPES = { briefs: 'Project brief', specs: 'Technical specification', research: 'Research notes', decisions: 'Architecture decision', release: 'Release notes' }
const SORTS = {
  updated: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
  title: (a, b) => a.title.localeCompare(b.title),
}

function Reader({ doc }) {
  const [mode, setMode] = useState('preview')
  const wide = useMediaQuery('(min-width: 1024px)')
  const parsed = useMemo(() => parseDocument(doc.body), [doc])
  const pending = revisions.filter((r) => r.recordId === doc.id && r.state === 'Pending review').length
  return (
    <div className="reader">
      <nav className="reader__outline" aria-label="Document outline">
        <details open={wide}>
          <summary>Outline</summary>
          <ol>{parsed.sections.map((s) => <li key={s.id}><a href={`#doc-${s.id}`}>{s.heading}</a></li>)}</ol>
        </details>
      </nav>
      <article className="reader__doc" aria-labelledby="reader-title">
        <header>
          <div className="chip-list"><StatusBadge domain="document" status={doc.status} /><span className="chip"><span>{doc.type}</span></span></div>
          <h2 id="reader-title">{doc.title}</h2>
          <p className="row__meta"><Avatar userId={doc.authorId} size="sm" /><span>{get('user', doc.authorId).name}</span><span>Updated {formatDate(doc.updatedAt)}</span><span>v{doc.version}{pending ? ` · ${pending} pending review` : ''}</span><span>Markdown</span></p>
          <span className="toggle" role="group" aria-label="Document view">
            <button type="button" aria-pressed={mode === 'preview'} onClick={() => setMode('preview')}>Preview</button>
            <button type="button" aria-pressed={mode === 'source'} onClick={() => setMode('source')}>Source</button>
          </span>
        </header>
        {mode === 'preview'
          ? <div className="prose">{parsed.sections.map((s) => <section key={s.id} id={`doc-${s.id}`}><h3>{s.heading}</h3>{renderBlocks(s.lines, s.id)}</section>)}</div>
          : <pre className="source" tabIndex={0}>{doc.body}</pre>}
        <footer className="reader__links">
          <p className="note">Read-only preview. Markdown is the initial editing format; editing arrives with the editing feature.</p>
          <div className="chip-list">
            <RelationChip type="Project" id={doc.projectId} />
            {doc.milestoneId && <RelationChip type="Milestone" id={doc.milestoneId} />}
            {doc.requirementIds.map((id) => <RelationChip type="Requirement" id={id} label={id} key={id} />)}
            {doc.taskIds.map((id) => <RelationChip type="Task" id={id} key={id} />)}
          </div>
        </footer>
      </article>
    </div>
  )
}

export default function DocumentationPage() {
  const { scope } = useWorkspace()
  const [view, setView] = useQueryParam('view', 'library')
  const [docId, setDocId] = useQueryParam('doc')
  const [filter, setFilter] = useQueryParam('filter', 'all')
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState('updated')

  const base = scoped(documents, scope)
  const chips = [{ value: 'all', label: 'All', count: base.length }, ...Object.entries(TYPES).map(([value, type]) => ({ value, label: { briefs: 'Briefs', specs: 'Specs', research: 'Research', decisions: 'Decisions', release: 'Release notes' }[value], count: base.filter((d) => d.type === type).length }))]
  const q = search.trim().toLowerCase()
  const list = base
    .filter((d) => filter === 'all' || d.type === TYPES[filter])
    .filter((d) => status === 'all' || d.status === status)
    .filter((d) => !q || [d.title, d.type, get('user', d.authorId).name].join(' ').toLowerCase().includes(q))
    .sort(SORTS[sort])
  const dirty = filter !== 'all' || search || status !== 'all'
  const reset = () => { setFilter('all'); setSearch(''); setStatus('all') }
  const current = (docId && documents.find((d) => d.id === docId)) || list[0] || base[0]

  return (
    <>
      <PageHeader
        eyebrow="Knowledge"
        title="Documentation"
        description="Briefs, specifications, research notes, and decisions, grouped by project and type."
        action={<PreviewAction label="New document" icon={Plus} variant="primary" iconOnlyOnMobile title="New document" body={<><p>A form for the title, type, and project would open here, followed by a Markdown editor.</p><p>Editing is not available yet, so nothing you type would be kept.</p></>} />}
      />
      <ViewTabs tabs={VIEWS} value={view} onChange={setView} label="Documentation views" />
      <StateGate empty={{ title: 'No documents yet', body: 'Write project briefs, decisions, and notes so the team can find them.', action: <PreviewAction label="New document" icon={Plus} variant="primary" /> }}>
        {view === 'library' ? (
          <>
            <Toolbar search={search} onSearch={setSearch} placeholder="Search documents and authors" chips={chips} chipValue={filter} onChip={setFilter} chipLabel="Document type" dirty={dirty} onReset={reset}>
              <select aria-label="Status" value={status} onChange={(e) => setStatus(e.target.value)}><option value="all">Any status</option><option>Draft</option><option>In review</option><option>Completed</option></select>
              <select aria-label="Sort documents" value={sort} onChange={(e) => setSort(e.target.value)}><option value="updated">Sort: Updated</option><option value="title">Sort: Title</option></select>
            </Toolbar>
            {list.length === 0 ? <NoResults onClear={reset} /> : (
              <div className="table-wrap">
                <table className="table">
                  <thead><tr><th scope="col">Document</th><th scope="col">Type</th><th scope="col">Project</th><th scope="col">Status</th><th scope="col">Author</th><th scope="col">Updated</th></tr></thead>
                  <tbody>{list.map((d) => (
                    <tr key={d.id}>
                      <td><a href={`/documentation?view=reader&doc=${d.id}`}>{d.title}</a></td><td>{d.type}</td><td>{get('project', d.projectId).name}</td>
                      <td><StatusBadge domain="document" status={d.status} /></td><td>{get('user', d.authorId).name}</td><td>{formatDate(d.updatedAt)}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            )}
          </>
        ) : current ? (
          <>
            <label className="compare__select"><span>Document</span>
              <select value={current.id} onChange={(e) => setDocId(e.target.value)}>{base.map((d) => <option value={d.id} key={d.id}>{d.title} — {get('project', d.projectId).name}</option>)}</select>
            </label>
            <Reader doc={current} key={current.id} />
          </>
        ) : <EmptyState title="No document selected" body="Choose a document from the library." />}
      </StateGate>
    </>
  )
}
