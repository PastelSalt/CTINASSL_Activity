import { useState } from 'react'
import { ArrowLeftRight, Hourglass, History, Plus } from 'lucide-react'
import { useQueryParam } from '../../../hooks/useQueryParam'
import { Avatar, RelationChip, StatusBadge } from '../components/badges'
import { PageHeader, PreviewAction, SplitLayout, Toolbar, ViewTabs } from '../components/layout'
import { RevisionEntry, RevisionPanel } from '../components/records'
import { EmptyState, NoResults, StateGate, UnsupportedPreview } from '../components/states'
import { useWorkspace } from '../context'
import { revisions } from '../data/fixtures'
import { dayGroup, timeAgo } from '../data/format'
import { get, scoped } from '../data/selectors'

const VIEWS = [
  { id: 'history', label: 'History', icon: History },
  { id: 'review', label: 'Review queue', icon: Hourglass },
  { id: 'compare', label: 'Compare', icon: ArrowLeftRight },
]
const MARKS = { '+': '+', '-': '−', '=': ' ' }
const LABELS = { '+': 'Added', '-': 'Removed', '=': 'Unchanged' }

function DiffPane({ title, lines }) {
  return (
    <div className="diff__pane">
      <h3>{title}</h3>
      <ol className="diff__lines">
        {lines.map((line, i) => (
          <li className={`diff__line diff__line--${line.mark === '+' ? 'add' : line.mark === '-' ? 'del' : 'same'}`} key={i}>
            <span className="diff__mark" aria-label={LABELS[line.mark]}>{MARKS[line.mark]}</span><code>{line.text}</code>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Compare({ list, revId, setRevId }) {
  const options = list.filter((r) => r.toVersion != null || r.recordType === 'Asset')
  const current = options.find((r) => r.id === revId) || options[0]
  if (!current) return <EmptyState title="Nothing to compare" body="Comparisons are available for revisions that changed a document." />
  const changed = current.diff ? current.diff.filter((l) => l.mark !== '=').length : 0
  return (
    <div className="compare">
      <label className="compare__select"><span>Revision</span>
        <select value={current.id} onChange={(e) => setRevId(e.target.value)}>
          {options.map((r) => <option value={r.id} key={r.id}>{r.summary}{r.toVersion != null ? ` (v${r.fromVersion} → v${r.toVersion})` : ''}</option>)}
        </select>
      </label>
      {current.diff ? (
        changed === 0 ? <EmptyState title="No differences" /> : (
          <>
            <p className="result-count" role="status">{changed} changed line{changed === 1 ? '' : 's'} · v{current.fromVersion} → v{current.toVersion}</p>
            <div className="diff">
              <DiffPane title={`Before · v${current.fromVersion}`} lines={current.diff.filter((l) => l.mark !== '+')} />
              <DiffPane title={`After · v${current.toVersion}`} lines={current.diff.filter((l) => l.mark !== '-')} />
            </div>
          </>
        )
      ) : <UnsupportedPreview kind="this file type" reason="Comparison is available for text documents only. Binary and media files such as images, audio, and spreadsheets can’t be compared." />}
    </div>
  )
}

export default function RevisionsPage() {
  const { scope } = useWorkspace()
  const [view, setView] = useQueryParam('view', 'history')
  const [filter, setFilter] = useQueryParam('filter', 'all')
  const [selectedId, select] = useQueryParam('select')
  const [revId, setRevId] = useQueryParam('rev')
  const [search, setSearch] = useState('')
  const [order, setOrder] = useState('newest')
  const [type, setType] = useState('all')

  const base = scoped(revisions, scope)
  const states = ['Recorded', 'Pending review', 'Approved', 'Rejected']
  const chips = [{ value: 'all', label: 'All', count: base.length }, ...states.map((s) => ({ value: s, label: s, count: base.filter((r) => r.state === s).length }))]
  const q = search.trim().toLowerCase()
  const list = base
    .filter((r) => filter === 'all' || r.state === filter)
    .filter((r) => type === 'all' || r.recordType === type)
    .filter((r) => !q || [r.summary, r.recordId, get('user', r.authorId).name].join(' ').toLowerCase().includes(q))
    .sort((a, b) => (order === 'newest' ? b.at.localeCompare(a.at) : a.at.localeCompare(b.at)))
  const dirty = filter !== 'all' || search || type !== 'all'
  const reset = () => { setFilter('all'); setSearch(''); setType('all') }
  const selected = selectedId ? get('revision', selectedId) : null
  const pending = base.filter((r) => r.state === 'Pending review')
  const days = [...new Set(list.map((r) => dayGroup(r.at)))]
  const tabs = VIEWS.map((v) => (v.id === 'review' ? { ...v, count: pending.length } : v))

  return (
    <>
      <PageHeader
        eyebrow="History"
        title="Revisions"
        description="Who changed what, when, and whether it has been reviewed."
        action={<PreviewAction label="Log revision" icon={Plus} variant="primary" iconOnlyOnMobile title="Log revision" body="A form for the affected record, summary, and linked work would open here. In the demo nothing is recorded." />}
      />
      <ViewTabs tabs={tabs} value={view} onChange={setView} label="Revision views" />
      <StateGate empty={{ title: 'No revisions yet', body: 'Changes to documents, tasks, and assets are recorded here.' }}>
        {view !== 'compare' && (
          <Toolbar search={search} onSearch={setSearch} placeholder="Search changes, records, people" chips={view === 'history' ? chips : undefined} chipValue={filter} onChip={setFilter} chipLabel="Review state" dirty={dirty} onReset={reset}>
            {view === 'history' && <>
              <select aria-label="Record type" value={type} onChange={(e) => setType(e.target.value)}><option value="all">Any record</option>{['Document', 'Task', 'Asset', 'Requirement', 'Milestone'].map((t) => <option key={t}>{t}</option>)}</select>
              <select aria-label="Order" value={order} onChange={(e) => setOrder(e.target.value)}><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select>
            </>}
          </Toolbar>
        )}
        <SplitLayout panel={selected ? <RevisionPanel revision={selected} onClose={() => select(null)} /> : null}>
          {view === 'compare' ? <Compare list={base} revId={revId} setRevId={setRevId} />
            : view === 'review' ? (
              pending.length === 0 ? <EmptyState title="Review queue is clear" body="Nothing is waiting for review." /> : (
                <ul className="rows">{pending.map((r) => (
                  <li key={r.id} className="row review-card">
                    <span className="row__main"><span className="row__title">{r.summary}</span><span className="row__meta"><Avatar userId={r.authorId} size="sm" /><span>{get('user', r.authorId).name}</span><span>{timeAgo(r.at)}</span>{r.diff && <span>{r.diff.filter((l) => l.mark === '+').length} added · {r.diff.filter((l) => l.mark === '-').length} removed</span>}</span><span className="chip-list"><RelationChip type="Project" id={r.projectId} /><RelationChip type={r.recordType} id={r.recordId} /></span></span>
                    <span className="row__side"><StatusBadge domain="revision" status={r.state} />{r.diff && <a className="button button--small button--secondary" href={`/revisions?view=compare&rev=${r.id}`}>Compare</a>}<PreviewAction label="Approve" variant="primary" /><PreviewAction label="Request changes" /></span>
                  </li>
                ))}</ul>
              )
            ) : list.length === 0 ? <NoResults onClear={reset} /> : (
              <ol className="feed">
                {days.map((day) => (
                  <li key={day}>
                    <h2 className="feed__day">{day}</h2>
                    <ol className="feed__list">{list.filter((r) => dayGroup(r.at) === day).map((r) => <RevisionEntry revision={r} selected={selectedId === r.id} onSelect={select} key={r.id} />)}</ol>
                  </li>
                ))}
              </ol>
            )}
        </SplitLayout>
      </StateGate>
    </>
  )
}
