import { useState } from 'react'
import { CalendarRange, FolderKanban, ListChecks, Plus } from 'lucide-react'
import { useQueryParam } from '../../../hooks/useQueryParam'
import { ProgressBar, StatusBadge } from '../components/badges'
import { PageHeader, PreviewAction, SplitLayout, StatStrip, Toolbar, ViewTabs } from '../components/layout'
import { MilestonePanel, MilestoneRow } from '../components/records'
import { NoResults, StateGate } from '../components/states'
import { useWorkspace } from '../context'
import { milestones, projects } from '../data/fixtures'
import { DEMO_TODAY, daysBetween, daysFromToday, formatDate, formatMonth } from '../data/format'
import { get, milestoneStatus, scoped } from '../data/selectors'

const VIEWS = [
  { id: 'register', label: 'Register', icon: ListChecks },
  { id: 'timeline', label: 'Timeline', icon: CalendarRange },
  { id: 'project', label: 'By project', icon: FolderKanban },
]
const STATUSES = ['Upcoming', 'In progress', 'Overdue', 'Blocked', 'Completed']

function Timeline({ list, onSelect, selectedId }) {
  const first = list.reduce((min, m) => (m.start < min ? m.start : min), list[0].start)
  const last = list.reduce((max, m) => (m.due > max ? m.due : max), list[0].due)
  const start = `${first.slice(0, 7)}-01`
  const endDate = new Date(`${last.slice(0, 7)}-01T00:00:00`)
  endDate.setMonth(endDate.getMonth() + 1)
  const end = endDate.toISOString().slice(0, 10)
  const total = daysBetween(start, end)
  const pos = (iso) => `${(daysBetween(start, iso) / total) * 100}%`
  const width = (a, b) => `${Math.max((daysBetween(a, b) / total) * 100, 1.5)}%`

  const months = []
  for (let cursor = new Date(`${start}T00:00:00`); cursor < new Date(`${end}T00:00:00`); cursor.setMonth(cursor.getMonth() + 1)) months.push(cursor.toISOString().slice(0, 10))
  const lanes = [...new Set(list.map((m) => m.projectId))]
  const todayInRange = DEMO_TODAY >= start && DEMO_TODAY <= end

  return (
    <>
      <div className="tl" role="group" aria-label="Milestone timeline">
        <div className="tl__axis">
          <div className="tl__label" />
          <div className="tl__months">{months.map((m) => <span key={m} style={{ left: pos(m) }}>{formatMonth(m)}</span>)}</div>
        </div>
        {lanes.map((projectId) => (
          <div className="tl__lane" key={projectId}>
            <div className="tl__label">{get('project', projectId).name}</div>
            <div className="tl__track">
              {todayInRange && <span className="tl__today" style={{ left: pos(DEMO_TODAY) }}><i>Today</i></span>}
              {list.filter((m) => m.projectId === projectId).map((m) => (
                <button type="button" className={`tl__bar ${selectedId === m.id ? 'tl__bar--selected' : ''}`} style={{ left: pos(m.start), width: width(m.start, m.due) }} onClick={() => onSelect(m.id)} title={`${m.title}: ${formatDate(m.start)} – ${formatDate(m.due)}`} key={m.id} aria-pressed={selectedId === m.id}>
                  <StatusBadge domain="milestone" status={milestoneStatus(m)} /><span>{m.title}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <ol className="tl-list">
        {list.slice().sort((a, b) => a.due.localeCompare(b.due)).map((m, i, arr) => (
          <li key={m.id}>
            {daysFromToday(m.due) >= 0 && (i === 0 || daysFromToday(arr[i - 1].due) < 0) && <p className="tl-list__today">Today · {formatDate(DEMO_TODAY)}</p>}
            <MilestoneRow milestone={m} selected={selectedId === m.id} onSelect={onSelect} showProject />
          </li>
        ))}
      </ol>
    </>
  )
}

export default function MilestonesPage() {
  const { scope } = useWorkspace()
  const [view, setView] = useQueryParam('view', 'register')
  const [filter, setFilter] = useQueryParam('filter', 'all')
  const [selectedId, select] = useQueryParam('select')
  const [search, setSearch] = useState('')

  const base = scoped(milestones, scope)
  const chips = [{ value: 'all', label: 'All', count: base.length }, ...STATUSES.map((s) => ({ value: s, label: s, count: base.filter((m) => milestoneStatus(m) === s).length }))]
  const q = search.trim().toLowerCase()
  const list = base
    .filter((m) => filter === 'all' || milestoneStatus(m) === filter)
    .filter((m) => !q || [m.title, m.description, get('project', m.projectId).name].join(' ').toLowerCase().includes(q))
    .sort((a, b) => a.due.localeCompare(b.due))
  const dirty = filter !== 'all' || search
  const reset = () => { setFilter('all'); setSearch('') }
  const selected = selectedId ? get('milestone', selectedId) : null
  const next = base.filter((m) => !m.done && m.due >= DEMO_TODAY).sort((a, b) => a.due.localeCompare(b.due))[0]

  return (
    <>
      <PageHeader
        eyebrow="Plan"
        title="Milestones"
        description="Checkpoints with dates, so you can see what is next, late, or blocked."
        action={<PreviewAction label="New milestone" icon={Plus} variant="primary" iconOnlyOnMobile title="Create milestone" body="A form for the title, project, dates, priority, and dependencies would open here. In the demo nothing is created." />}
      />
      <ViewTabs tabs={VIEWS} value={view} onChange={setView} label="Milestone views" />
      <StateGate empty={{ title: 'No milestones yet', body: 'Add a milestone to mark an important checkpoint.', action: <PreviewAction label="New milestone" icon={Plus} variant="primary" /> }}>
        <Toolbar search={search} onSearch={setSearch} placeholder="Search milestones" chips={chips} chipValue={filter} onChip={setFilter} chipLabel="Milestone status" dirty={dirty} onReset={reset} />
        <StatStrip stats={[
          { label: 'Upcoming', value: base.filter((m) => milestoneStatus(m) === 'Upcoming').length },
          { label: 'Overdue', value: base.filter((m) => milestoneStatus(m) === 'Overdue').length },
          { label: 'Blocked', value: base.filter((m) => milestoneStatus(m) === 'Blocked').length },
          { label: 'Completed', value: base.filter((m) => m.done).length },
          { label: 'Next due', value: next ? formatDate(next.due) : '—', hint: next?.title },
        ]} />
        <SplitLayout panel={selected ? <MilestonePanel milestone={selected} onClose={() => select(null)} /> : null}>
          {list.length === 0 ? <NoResults onClear={reset} /> : (
            <>
              {view === 'register' && <ul className="rows">{list.map((m) => <li key={m.id}><MilestoneRow milestone={m} selected={selectedId === m.id} onSelect={select} showProject={scope === 'all'} /></li>)}</ul>}
              {view === 'timeline' && <Timeline list={list} selectedId={selectedId} onSelect={select} />}
              {view === 'project' && projects.filter((p) => list.some((m) => m.projectId === p.id)).map((p) => {
                const group = list.filter((m) => m.projectId === p.id)
                const done = group.filter((m) => m.done).length
                return (
                  <section className="group" key={p.id} aria-labelledby={`g-${p.id}`}>
                    <div className="group__head"><h2 id={`g-${p.id}`}>{p.name}</h2><ProgressBar value={done} max={group.length} label={`${p.name} milestones completed`} /></div>
                    <ul className="rows">{group.map((m) => <li key={m.id}><MilestoneRow milestone={m} selected={selectedId === m.id} onSelect={select} /></li>)}</ul>
                  </section>
                )
              })}
            </>
          )}
        </SplitLayout>
      </StateGate>
    </>
  )
}
