import { useState } from 'react'
import { LayoutGrid, Plus, Table2 } from 'lucide-react'
import { useQueryParam } from '../../../hooks/useQueryParam'
import { StatusBadge } from '../components/badges'
import { PageHeader, PreviewAction, SplitLayout, StatStrip, Toolbar, ViewTabs } from '../components/layout'
import { AssetPanel, AssetThumb, AssetTile } from '../components/records'
import { NoResults, StateGate } from '../components/states'
import { useWorkspace } from '../context'
import { assets } from '../data/fixtures'
import { formatBytes, formatDate } from '../data/format'
import { get, scoped } from '../data/selectors'

const VIEWS = [{ id: 'library', label: 'Library', icon: LayoutGrid }, { id: 'list', label: 'List', icon: Table2 }]
const GROUPS = {
  images: ['Image'], documents: ['Document'], media: ['Audio', 'Video'], data: ['Dataset'], references: ['Reference', 'Export'],
}
const SORTS = {
  updated: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
  name: (a, b) => a.name.localeCompare(b.name),
  size: (a, b) => b.bytes - a.bytes,
}

export default function AssetsPage() {
  const { scope } = useWorkspace()
  const [view, setView] = useQueryParam('view', 'library')
  const [filter, setFilter] = useQueryParam('filter', 'all')
  const [selectedId, select] = useQueryParam('select')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('updated')

  const base = scoped(assets, scope)
  const count = (key) => base.filter((a) => GROUPS[key].includes(a.kind)).length
  const chips = [
    { value: 'all', label: 'All', count: base.length }, { value: 'images', label: 'Images', count: count('images') },
    { value: 'documents', label: 'Documents', count: count('documents') }, { value: 'media', label: 'Audio & video', count: count('media') },
    { value: 'data', label: 'Datasets', count: count('data') }, { value: 'references', label: 'References & exports', count: count('references') },
  ]
  const q = search.trim().toLowerCase()
  const list = base
    .filter((a) => filter === 'all' || GROUPS[filter]?.includes(a.kind))
    .filter((a) => !q || [a.name, a.description, a.kind, ...a.tags].join(' ').toLowerCase().includes(q))
    .sort(SORTS[sort])
  const dirty = filter !== 'all' || search
  const reset = () => { setFilter('all'); setSearch('') }
  const selected = selectedId ? get('asset', selectedId) : null

  return (
    <>
      <PageHeader
        eyebrow="Files"
        title="Assets"
        description="Project files, media, and references. Only metadata is shown; files live in object storage."
        action={<PreviewAction label="Add asset" icon={Plus} variant="primary" iconOnlyOnMobile title="Add asset" body="A drop zone and form for the file, project, tags, and access level would open here. In the demo no file is read or stored." />}
      />
      <ViewTabs tabs={VIEWS} value={view} onChange={setView} label="Asset views" />
      <StateGate empty={{ title: 'No assets yet', body: 'Add files and links to keep project material in one place.', action: <PreviewAction label="Add asset" icon={Plus} variant="primary" /> }}>
        <Toolbar search={search} onSearch={setSearch} placeholder="Search assets and tags" chips={chips} chipValue={filter} onChip={setFilter} chipLabel="Asset type" dirty={dirty} onReset={reset}>
          <select aria-label="Sort assets" value={sort} onChange={(e) => setSort(e.target.value)}><option value="updated">Sort: Updated</option><option value="name">Sort: Name</option><option value="size">Sort: Size</option></select>
        </Toolbar>
        <StatStrip stats={[
          { label: 'Assets', value: base.length }, { label: 'Total size', value: formatBytes(base.reduce((sum, a) => sum + a.bytes, 0)) },
          { label: 'Linked', value: base.filter((a) => a.access === 'Linked').length, hint: 'external' }, { label: 'Restricted', value: base.filter((a) => a.access === 'Restricted').length },
        ]} />
        <SplitLayout panel={selected ? <AssetPanel asset={selected} onClose={() => select(null)} /> : null}>
          {list.length === 0 ? <NoResults onClear={reset} /> : view === 'library' ? (
            <div className="tile-grid">{list.map((a) => <AssetTile asset={a} selected={selectedId === a.id} onSelect={select} key={a.id} />)}</div>
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th scope="col">Name</th><th scope="col">Type</th><th scope="col">Project</th><th scope="col">Size</th><th scope="col">Access</th><th scope="col">Updated</th></tr></thead>
                <tbody>{list.map((a) => (
                  <tr key={a.id}>
                    <td><button type="button" className="link-button" onClick={() => select(a.id)}><AssetThumb asset={a} /> {a.name}</button></td><td>{a.kind}</td><td>{get('project', a.projectId).name}</td>
                    <td>{formatBytes(a.bytes)}</td><td><StatusBadge domain="access" status={a.access} /></td><td>{formatDate(a.updatedAt)}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </SplitLayout>
      </StateGate>
    </>
  )
}
