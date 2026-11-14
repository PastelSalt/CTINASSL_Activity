import { useState } from 'react'
import { BarChart3, ClipboardList, GitFork, Plus, TriangleAlert } from 'lucide-react'
import { useQueryParam } from '../../../hooks/useQueryParam'
import { RelationChip, StackedBar } from '../components/badges'
import { PageHeader, PreviewAction, Section, SplitLayout, StatStrip, Toolbar, ViewTabs } from '../components/layout'
import { RequirementPanel, RequirementRow } from '../components/records'
import { EmptyState, NoResults, StateGate } from '../components/states'
import { useWorkspace } from '../context'
import { projects, requirements } from '../data/fixtures'
import { get, requirementLinks, scoped, verificationCoverage } from '../data/selectors'

const VIEWS = [
  { id: 'register', label: 'Register', icon: ClipboardList },
  { id: 'traceability', label: 'Traceability', icon: GitFork },
  { id: 'coverage', label: 'Coverage', icon: BarChart3 },
]

function Gap({ label }) {
  return <span className="gap"><TriangleAlert size={13} aria-hidden="true" /> {label}</span>
}

function Matrix({ list, onSelect }) {
  return (
    <div className="table-wrap matrix" tabIndex={0} role="region" aria-label="Traceability matrix">
      <table className="table">
        <thead><tr><th scope="col">Requirement</th><th scope="col">Milestone</th><th scope="col">Tasks</th><th scope="col">Revisions</th><th scope="col">Deliverable</th></tr></thead>
        <tbody>
          {list.map((req) => {
            const links = requirementLinks(req)
            return (
              <tr key={req.id}>
                <th scope="row"><button type="button" className="link-button" onClick={() => onSelect(req.id)}><code className="req-id">{req.id}</code> {req.title}</button></th>
                <td>{links.milestone ? <RelationChip type="Milestone" id={links.milestone.id} /> : <Gap label="No milestone" />}</td>
                <td>{links.tasks.length ? <span className="chip-list">{links.tasks.map((t) => <RelationChip type="Task" id={t.id} key={t.id} />)}</span> : <Gap label="No task" />}</td>
                <td>{links.revisions.length ? <span className="chip-list">{links.revisions.map((r) => <RelationChip type="Revision" id={r.id} key={r.id} />)}</span> : <span className="row__meta">None</span>}</td>
                <td>{links.deliverable ? <RelationChip type="Deliverable" id={links.deliverable.id} label={links.deliverable.title} /> : <Gap label="No deliverable" />}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default function RequirementsPage() {
  const { scope } = useWorkspace()
  const [view, setView] = useQueryParam('view', 'register')
  const [filter, setFilter] = useQueryParam('filter', 'all')
  const [selectedId, select] = useQueryParam('select')
  const [search, setSearch] = useState('')
  const [type, setType] = useState('all')

  const base = scoped(requirements, scope)
  const withGaps = base.filter((r) => { const g = requirementLinks(r).gaps; return g.task || g.deliverable })
  const chips = [
    { value: 'all', label: 'All', count: base.length },
    { value: 'Verified', label: 'Verified', count: base.filter((r) => r.verification === 'Verified').length },
    { value: 'Unverified', label: 'Unverified', count: base.filter((r) => r.verification === 'Unverified').length },
    { value: 'Failed', label: 'Failed', count: base.filter((r) => r.verification === 'Failed').length },
    { value: 'gaps', label: 'With gaps', count: withGaps.length },
  ]
  const q = search.trim().toLowerCase()
  const list = base
    .filter((r) => filter === 'all' || (filter === 'gaps' ? withGaps.includes(r) : r.verification === filter))
    .filter((r) => type === 'all' || r.type === type)
    .filter((r) => !q || [r.id, r.title, r.description].join(' ').toLowerCase().includes(q))
  const dirty = filter !== 'all' || search || type !== 'all'
  const reset = () => { setFilter('all'); setSearch(''); setType('all') }
  const selected = selectedId ? get('requirement', selectedId) : null
  const cov = verificationCoverage(scope)

  return (
    <>
      <PageHeader
        eyebrow="Trace"
        title="Requirements"
        description="What each requirement is, how it is implemented, and whether it is satisfied."
        action={<PreviewAction label="Add requirement" icon={Plus} variant="primary" iconOnlyOnMobile title="Add requirement" body="A form for the title, type, description, and acceptance criteria would open here. In the demo nothing is created." />}
      />
      <ViewTabs tabs={VIEWS} value={view} onChange={setView} label="Requirement views" />
      <StateGate empty={{ title: 'No requirements yet', body: 'Requirements describe what the project must achieve.', action: <PreviewAction label="Add requirement" icon={Plus} variant="primary" /> }}>
        <Toolbar search={search} onSearch={setSearch} placeholder="Search requirements" chips={chips} chipValue={filter} onChip={setFilter} chipLabel="Verification filter" dirty={dirty} onReset={reset}>
          <select aria-label="Requirement type" value={type} onChange={(e) => setType(e.target.value)}><option value="all">Any type</option><option>Functional</option><option>Non-functional</option></select>
        </Toolbar>
        <StatStrip stats={[{ label: 'Requirements', value: base.length }, { label: 'Verified', value: cov.verified }, { label: 'Unverified', value: cov.unverified }, { label: 'With gaps', value: withGaps.length, hint: 'no task or deliverable' }]} />
        <SplitLayout panel={selected ? <RequirementPanel requirement={selected} onClose={() => select(null)} /> : null}>
          {view === 'coverage' ? (
            <>
              {projects.filter((p) => scoped(requirements, scope).some((r) => r.projectId === p.id)).map((p) => {
                const c = verificationCoverage(p.id)
                return <Section title={p.name} id={`cov-${p.id}`} key={p.id}><StackedBar label={`${p.name} verification`} segments={[{ label: 'Verified', value: c.verified, tone: 'success' }, { label: 'Unverified', value: c.unverified, tone: 'warning' }, { label: 'Failed', value: c.failed, tone: 'danger' }]} /></Section>
              })}
              <Section title="Requirements without implementing work" id="cov-gaps">
                {withGaps.length ? <ul className="rows rows--tight">{withGaps.map((r) => <li key={r.id}><RequirementRow requirement={r} onSelect={select} showProject /></li>)}</ul> : <EmptyState title="Every requirement is traced" />}
              </Section>
            </>
          ) : list.length === 0 ? <NoResults onClear={reset} /> : view === 'traceability' ? <Matrix list={list} onSelect={select} /> : (
            <ul className="rows">{list.map((r) => <li key={r.id}><RequirementRow requirement={r} selected={selectedId === r.id} onSelect={select} showProject={scope === 'all'} /></li>)}</ul>
          )}
        </SplitLayout>
      </StateGate>
    </>
  )
}
