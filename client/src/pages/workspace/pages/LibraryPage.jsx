import { useState } from 'react'
import { LayoutGrid, List } from 'lucide-react'
import { useQueryParam } from '../../../hooks/useQueryParam'
import { navigate } from '../../../app/router'
import { PageHeader, Toolbar, FilterField, PreviewAction, SplitLayout } from '../components/layout'
import { NoResults, StateGate } from '../components/states'
import { FilePanel, FileThumb, FileTile } from '../components/records'
import { kindLabel } from '../data/kinds'
import { Flag, StatusBadge } from '../components/badges'
import DocReader from '../components/DocReader'
import { data } from '../data/store'
import { activeProjects, get, isFinalFile } from '../data/selectors'
import { formatBytes, formatDate } from '../data/format'

const KINDS = [['all', 'All types'], ['document', 'Documents'], ['image', 'Images'], ['media', 'Audio and video'], ['data', 'Data'], ['link', 'Links']]

export default function LibraryPage() {
  const [doc] = useQueryParam('doc')
  const [select, setSelect] = useQueryParam('select')
  const [kind, setKind] = useQueryParam('kind', 'all')
  const [project, setProject] = useQueryParam('project', 'all')
  const [final, setFinal] = useQueryParam('final')
  const [mode, setMode] = useQueryParam('mode', 'grid')
  const [search, setSearch] = useState('')

  const reading = doc ? get('file', doc) : null
  if (reading?.body) return <><PageHeader title="Library" metaTitle={reading.name} crumbs={[['Library', '/library'], [reading.name]]} /><DocReader doc={reading} /></>

  const list = data().files.filter((f) => (kind === 'all' || f.kind === kind) && (project === 'all' || f.projectId === project) && (!final || isFinalFile(f))
    && (!search || `${f.name} ${f.tags.join(' ')}`.toLowerCase().includes(search.toLowerCase())))
  const filterCount = (kind !== 'all') + (project !== 'all') + Boolean(final)
  const reset = () => { setKind(null); setProject(null); setFinal(null); setSearch('') }
  const selected = select ? get('file', select) : null
  const open = (id) => { const f = get('file', id); if (f?.body) navigate(`/library?doc=${id}`); else setSelect(id) }

  return (
    <>
      <PageHeader title="Library" description="Notes, documents, and files from every project in one place." action={<PreviewAction label="Add file" variant="primary" />} />
      <StateGate empty={{ title: 'Your library is empty', body: 'Notes and files you add to a project appear here.', action: <PreviewAction label="Add file" variant="primary" /> }}>
        <Toolbar search={search} onSearch={setSearch} placeholder="Search files and notes"
          filter={{ count: filterCount, onReset: reset, content: (
            <>
              <FilterField label="Type" value={kind} onChange={(v) => setKind(v === 'all' ? null : v)} options={KINDS} />
              <FilterField label="Project" value={project} onChange={(v) => setProject(v === 'all' ? null : v)} options={[['all', 'All projects'], ...activeProjects().map((p) => [p.id, p.name])]} />
              <label className="filter-check"><input type="checkbox" checked={Boolean(final)} onChange={(e) => setFinal(e.target.checked ? '1' : null)} /> Final files only</label>
            </>
          ) }}>
          <div className="segmented" role="group" aria-label="Layout">
            <button type="button" aria-pressed={mode === 'grid'} onClick={() => setMode(null)}><LayoutGrid size={15} aria-hidden="true" /> Grid</button>
            <button type="button" aria-pressed={mode === 'list'} onClick={() => setMode('list')}><List size={15} aria-hidden="true" /> List</button>
          </div>
        </Toolbar>
        <SplitLayout panel={selected && <FilePanel file={selected} onClose={() => setSelect(null)} />}>
          {!list.length ? <NoResults onClear={reset} /> : mode === 'list' ? (
            <ul className="rows">{list.map((f) => (
              <li key={f.id}>
                <button type="button" className={`row row--button ${select === f.id ? 'row--selected' : ''}`} onClick={() => open(f.id)} aria-pressed={select === f.id}>
                  <FileThumb file={f} />
                  <span className="row__main"><span className="row__title">{f.name}</span><span className="row__meta"><span>{get('project', f.projectId).name}</span><span>{kindLabel(f.kind)}</span><span>{f.bytes ? formatBytes(f.bytes) : f.host}</span><span>Updated {formatDate(f.updatedAt)}</span></span></span>
                  <span className="row__side">{f.body && <StatusBadge domain="document" status={f.status} />}{!f.body && isFinalFile(f) && <Flag name="Final" label="Final file" />}</span>
                </button>
              </li>
            ))}</ul>
          ) : <div className="tile-grid">{list.map((f) => <FileTile key={f.id} file={f} selected={select === f.id} onSelect={open} />)}</div>}
        </SplitLayout>
      </StateGate>
    </>
  )
}
