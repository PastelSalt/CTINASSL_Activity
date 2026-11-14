import { useState } from 'react'
import { CalendarClock, CalendarDays, CalendarRange, LayoutList, Plus, Sun } from 'lucide-react'
import { useQueryParam } from '../../../hooks/useQueryParam'
import { PageHeader, SplitLayout, Toolbar, FilterField, ViewTabs, Section } from '../components/layout'
import { EmptyState, NoResults, StateGate } from '../components/states'
import { TaskPanel, TaskRow } from '../components/records'
import CalendarView from '../components/CalendarView'
import { data, addTask } from '../data/store'
import { activeProjects, get, isOpen, isOverdue, todayList, upNext } from '../data/selectors'
import { WORK_STATUSES } from '../data/status'
import { dayGroup, DEMO_TODAY } from '../data/format'

const VIEWS = [
  { id: 'today', label: 'Today', icon: Sun },
  { id: 'upcoming', label: 'Upcoming', icon: CalendarClock },
  { id: 'calendar', label: 'Calendar', icon: CalendarRange },
  { id: 'all', label: 'All', icon: LayoutList },
]

function InlineAdd() {
  const [text, setText] = useState('')
  const submit = (event) => {
    event.preventDefault()
    const title = text.trim()
    if (!title) return
    addTask({ title, due: DEMO_TODAY, projectId: activeProjects()[0]?.id ?? 'project-garden' })
    setText('')
  }
  return (
    <form className="inline-add" onSubmit={submit}>
      <label className="sr-only" htmlFor="inline-add">Add a task for today</label>
      <Plus size={18} aria-hidden="true" />
      <input id="inline-add" value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a task for today and press Enter" autoComplete="off" />
      <span className="inline-add__hint" aria-live="polite">Session only</span>
    </form>
  )
}

function Board({ tasks, selectedId, onSelect }) {
  return (
    <div className="board">
      {WORK_STATUSES.map((status) => {
        const list = tasks.filter((t) => t.status === status)
        return (
          <section className="board__col" key={status} aria-label={`${status}, ${list.length} tasks`}>
            <h3>{status} <span>{list.length}</span></h3>
            <ul className="rows rows--tight">{list.map((t) => <li key={t.id}><TaskRow task={t} selected={selectedId === t.id} onSelect={onSelect} showProject /></li>)}</ul>
            {!list.length && <p className="board__empty">Nothing here</p>}
          </section>
        )
      })}
    </div>
  )
}

export default function TasksPage() {
  const [view, setView] = useQueryParam('view', 'today')
  const [select, setSelect] = useQueryParam('select')
  const [project, setProject] = useQueryParam('project', 'all')
  const [status, setStatus] = useQueryParam('status', 'all')
  const [mode, setMode] = useQueryParam('mode', 'list')
  const [month, setMonth] = useQueryParam('month')
  const [day, setDay] = useQueryParam('day')
  const [search, setSearch] = useState('')

  const matches = (t) => (project === 'all' || t.projectId === project) && (status === 'all' || t.status === status) && (!search || t.title.toLowerCase().includes(search.toLowerCase()))
  const selected = select ? get('task', select) : null
  const filterCount = (project !== 'all') + (status !== 'all')
  const reset = () => { setProject(null); setStatus(null) }
  const open = (id) => setSelect(id)
  const close = () => setSelect(null)

  let body
  if (view === 'today') {
    const t = todayList(project)
    const groups = [['Overdue', t.overdue], ['Today', t.today], ['In progress', t.doing]].map(([l, list]) => [l, list.filter(matches)]).filter(([, l]) => l.length)
    body = (
      <>
        <InlineAdd />
        {groups.length ? groups.map(([label, list]) => (
          <Section title={label} id={`g-${label}`} key={label} className="group">
            <ul className="rows">{list.map((task) => <li key={task.id}><TaskRow task={task} selected={select === task.id} onSelect={open} showProject /></li>)}</ul>
          </Section>
        )) : <EmptyState title="All clear for today" body="Add a task above, or look at Upcoming." />}
      </>
    )
  } else if (view === 'upcoming') {
    const items = upNext(30, project).filter(({ kind, record }) => kind === 'milestone' || matches(record))
    const grouped = []
    items.forEach((item) => { const key = dayGroup(item.due); const last = grouped[grouped.length - 1]; if (last?.[0] === key) last[1].push(item); else grouped.push([key, [item]]) })
    body = grouped.length ? grouped.map(([label, list]) => (
      <Section title={label === 'Today' ? 'Today' : label} id={`u-${label}`} key={label} className="group">
        <ul className="rows">{list.map(({ kind, record }) => (
          <li key={record.id}>{kind === 'task'
            ? <TaskRow task={record} selected={select === record.id} onSelect={open} showProject />
            : <a className="row" href={`/projects/${record.projectId}?view=work&select=${record.id}`}><span className="row__main"><span className="row__title">{record.title}</span><span className="row__meta"><span>Milestone</span><span>{get('project', record.projectId).name}</span></span></span></a>}
          </li>
        ))}</ul>
      </Section>
    )) : <EmptyState icon={CalendarDays} title="Nothing coming up" body="No tasks or milestones are due in the next 30 days." />
  } else if (view === 'calendar') {
    body = <CalendarView month={month} onMonth={setMonth} day={day} onDay={setDay} matches={matches} project={project} selectedId={select} onSelectTask={open} />
  } else {
    const list = data().tasks.filter(matches)
    body = !list.length ? <NoResults onClear={() => { reset(); setSearch('') }} /> : mode === 'board'
      ? <Board tasks={list} selectedId={select} onSelect={open} />
      : (
        <>
          {list.filter(isOpen).length > 0 && <ul className="rows">{list.filter(isOpen).sort((a, b) => Number(isOverdue(b)) - Number(isOverdue(a)) || (a.due || '9').localeCompare(b.due || '9')).map((t) => <li key={t.id}><TaskRow task={t} selected={select === t.id} onSelect={open} showProject /></li>)}</ul>}
          {list.some((t) => !isOpen(t)) && (
            <details className="done-fold"><summary>Done ({list.filter((t) => !isOpen(t)).length})</summary>
              <ul className="rows">{list.filter((t) => !isOpen(t)).map((t) => <li key={t.id}><TaskRow task={t} selected={select === t.id} onSelect={open} showProject /></li>)}</ul>
            </details>
          )}
        </>
      )
  }

  return (
    <>
      <PageHeader title="Tasks" description="Everything you have to do, across all projects." />
      <ViewTabs tabs={VIEWS} value={view} onChange={(v) => setView(v === 'today' ? null : v)} label="Task views" />
      <StateGate empty={{ title: 'No tasks yet', body: 'Press Q to add your first one.' }}>
        <Toolbar search={search} onSearch={setSearch} placeholder="Search tasks"
          filter={{ count: filterCount, onReset: reset, content: (
            <>
              <FilterField label="Project" value={project} onChange={(v) => setProject(v === 'all' ? null : v)} options={[['all', 'All projects'], ...activeProjects().map((p) => [p.id, p.name])]} />
              {view === 'all' && <FilterField label="Status" value={status} onChange={(v) => setStatus(v === 'all' ? null : v)} options={[['all', 'Any status'], ...WORK_STATUSES.map((s) => [s, s])]} />}
            </>
          ) }}>
          {view === 'all' && (
            <div className="segmented" role="group" aria-label="Layout">
              <button type="button" aria-pressed={mode === 'list'} onClick={() => setMode(null)}>List</button>
              <button type="button" aria-pressed={mode === 'board'} onClick={() => setMode('board')}>Board</button>
            </div>
          )}
        </Toolbar>
        <SplitLayout panel={selected && <TaskPanel task={selected} onClose={close} />}>{body}</SplitLayout>
      </StateGate>
    </>
  )
}
