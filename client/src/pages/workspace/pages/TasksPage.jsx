import { useMemo, useState } from 'react'
import { CalendarDays, Columns3, ListChecks, Plus } from 'lucide-react'
import { useQueryParam } from '../../../hooks/useQueryParam'
import { Avatar, DueLabel, PriorityBadge, StatusBadge } from '../components/badges'
import { PageHeader, PreviewAction, SplitLayout, StatStrip, Toolbar, ViewTabs } from '../components/layout'
import { TaskPanel, TaskRow } from '../components/records'
import { NoResults, StateGate } from '../components/states'
import { useWorkspace } from '../context'
import { tasks, users } from '../data/fixtures'
import { daysFromToday } from '../data/format'
import { dueSoon, get, isOpen, isOverdue, scoped } from '../data/selectors'
import { PRIORITY, TASK_STATUSES } from '../data/status'

const VIEWS = [
  { id: 'list', label: 'List', icon: ListChecks },
  { id: 'board', label: 'Board', icon: Columns3 },
  { id: 'schedule', label: 'Schedule', icon: CalendarDays },
]
const PRIORITY_ORDER = ['Urgent', 'High', 'Medium', 'Low']
const SORTS = {
  due: (a, b) => (a.due || '9999').localeCompare(b.due || '9999'),
  priority: (a, b) => PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority),
  status: (a, b) => TASK_STATUSES.indexOf(a.status) - TASK_STATUSES.indexOf(b.status),
}

function ScheduleView({ list, selectedId, onSelect, showProject }) {
  const buckets = [
    ['Overdue', (t) => t.due && daysFromToday(t.due) < 0],
    ['Today', (t) => t.due && daysFromToday(t.due) === 0],
    ['This week', (t) => t.due && daysFromToday(t.due) > 0 && daysFromToday(t.due) <= 7],
    ['Later', (t) => t.due && daysFromToday(t.due) > 7],
    ['No date', (t) => !t.due],
  ]
  return (
    <div className="schedule">
      {buckets.map(([name, test]) => {
        const group = list.filter(test)
        if (!group.length) return null
        return (
          <section key={name} aria-labelledby={`sched-${name}`}>
            <h2 className="schedule__head" id={`sched-${name}`}>{name} <span>{group.length}</span></h2>
            <ul className="rows">{group.map((task) => <li key={task.id}><TaskRow task={task} selected={selectedId === task.id} onSelect={onSelect} showProject={showProject} /></li>)}</ul>
          </section>
        )
      })}
    </div>
  )
}

function BoardView({ list, selectedId, onSelect }) {
  const [column, setColumn] = useState('In progress')
  return (
    <div className="board-wrap">
      <div className="board-select" role="group" aria-label="Board column">
        {TASK_STATUSES.map((status) => (
          <button type="button" className="chips__chip" aria-pressed={column === status} onClick={() => setColumn(status)} key={status}>{status}<span>{list.filter((t) => t.status === status).length}</span></button>
        ))}
      </div>
      <div className="board">
        {TASK_STATUSES.map((status) => {
          const items = list.filter((t) => t.status === status)
          return (
            <section className="board__col" data-active={column === status} aria-labelledby={`col-${status}`} key={status}>
              <h2 id={`col-${status}`}><StatusBadge domain="task" status={status} /><span>{items.length}</span></h2>
              <ul className="rows rows--tight">
                {items.length === 0 && <li className="board__empty">Nothing here</li>}
                {items.map((task) => (
                  <li key={task.id}>
                    <button type="button" className={`row board-card ${selectedId === task.id ? 'row--selected' : ''}`} aria-pressed={selectedId === task.id} onClick={() => onSelect(task.id)}>
                      <span className="row__title">{task.title}</span>
                      <span className="row__meta"><PriorityBadge priority={task.priority} /><DueLabel due={task.due} done={status === 'Completed'} /><Avatar userId={task.assigneeId} size="sm" /></span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </div>
  )
}

export default function TasksPage() {
  const { scope } = useWorkspace()
  const [view, setView] = useQueryParam('view', 'list')
  const [filter, setFilter] = useQueryParam('filter', 'all')
  const [selectedId, select] = useQueryParam('select')
  const [search, setSearch] = useState('')
  const [assignee, setAssignee] = useState('all')
  const [priority, setPriority] = useState('all')
  const [sort, setSort] = useState('due')

  const base = scoped(tasks, scope)
  const chips = [
    { value: 'all', label: 'All', count: base.length },
    { value: 'overdue', label: 'Overdue', count: base.filter(isOverdue).length },
    { value: 'soon', label: 'Due soon', count: base.filter(dueSoon).length },
    { value: 'blocked', label: 'Blocked', count: base.filter((t) => t.status === 'Blocked').length },
    { value: 'completed', label: 'Completed', count: base.filter((t) => t.status === 'Completed').length },
  ]
  const test = { all: () => true, overdue: isOverdue, soon: dueSoon, blocked: (t) => t.status === 'Blocked', completed: (t) => t.status === 'Completed' }[filter] || (() => true)

  const list = useMemo(() => {
    const q = search.trim().toLowerCase()
    return base
      .filter(test)
      .filter((t) => assignee === 'all' || t.assigneeId === assignee)
      .filter((t) => priority === 'all' || t.priority === priority)
      .filter((t) => !q || [t.title, t.description, get('project', t.projectId).name, get('user', t.assigneeId)?.name].join(' ').toLowerCase().includes(q))
      .sort(SORTS[sort])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base.length, scope, filter, search, assignee, priority, sort])

  const dirty = filter !== 'all' || search || assignee !== 'all' || priority !== 'all'
  const reset = () => { setFilter('all'); setSearch(''); setAssignee('all'); setPriority('all') }
  const selected = selectedId ? get('task', selectedId) : null
  const showProject = scope === 'all'

  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Tasks"
        description="Everything that needs doing, with its status, priority, and deadline."
        action={<PreviewAction label="New task" icon={Plus} variant="primary" iconOnlyOnMobile title="Create task" body="A form for the title, project, milestone, priority, due date, and assignee would open here. In the demo nothing is created." />}
      />
      <ViewTabs tabs={VIEWS} value={view} onChange={setView} label="Task views" />
      <StateGate empty={{ title: 'No tasks yet', body: 'Tasks you add to a project appear here.', action: <PreviewAction label="New task" icon={Plus} variant="primary" /> }}>
        <Toolbar search={search} onSearch={setSearch} placeholder="Search tasks, projects, people" chips={chips} chipValue={filter} onChip={setFilter} chipLabel="Task filters" dirty={dirty} onReset={reset}>
          <select aria-label="Assignee" value={assignee} onChange={(e) => setAssignee(e.target.value)}><option value="all">Any assignee</option>{users.map((u) => <option value={u.id} key={u.id}>{u.name}</option>)}</select>
          <select aria-label="Priority" value={priority} onChange={(e) => setPriority(e.target.value)}><option value="all">Any priority</option>{Object.keys(PRIORITY).map((p) => <option key={p}>{p}</option>)}</select>
          {view !== 'schedule' && <select aria-label="Sort tasks" value={sort} onChange={(e) => setSort(e.target.value)}><option value="due">Sort: Due date</option><option value="priority">Sort: Priority</option><option value="status">Sort: Status</option></select>}
        </Toolbar>
        <StatStrip stats={[
          { label: 'Open', value: base.filter(isOpen).length },
          { label: 'Due this week', value: base.filter(dueSoon).length },
          { label: 'Blocked', value: base.filter((t) => t.status === 'Blocked').length },
          { label: 'Completed', value: base.filter((t) => t.status === 'Completed').length },
        ]} />
        <SplitLayout panel={selected ? <TaskPanel task={selected} onClose={() => select(null)} /> : null}>
          {list.length === 0 ? <NoResults onClear={reset} /> : (
            <>
              <p className="result-count" role="status">{list.length} of {base.length} tasks</p>
              {view === 'list' && <ul className="rows">{list.map((task) => <li key={task.id}><TaskRow task={task} selected={selectedId === task.id} onSelect={select} showProject={showProject} /></li>)}</ul>}
              {view === 'board' && <BoardView list={list} selectedId={selectedId} onSelect={select} />}
              {view === 'schedule' && <ScheduleView list={list} selectedId={selectedId} onSelect={select} showProject={showProject} />}
            </>
          )}
        </SplitLayout>
      </StateGate>
    </>
  )
}
