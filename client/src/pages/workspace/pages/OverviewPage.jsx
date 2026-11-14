import { Plus } from 'lucide-react'
import { navigate } from '../../../app/router'
import { Avatar, DueLabel, ProgressBar, RelationChip, StatusBadge } from '../components/badges'
import { PageHeader, PreviewAction, Section, StatStrip } from '../components/layout'
import { StateGate, EmptyState } from '../components/states'
import { useWorkspace } from '../context'
import { milestones, projects, tasks } from '../data/fixtures'
import { DEMO_TODAY, dayGroup, formatDate, timeAgo } from '../data/format'
import { attentionItems, dueSoon, get, isOpen, milestoneStatus, nextMilestone, overdueRecords, projectProgress, recentActivity, recordHref, scoped } from '../data/selectors'

function AttentionList({ items }) {
  if (!items.length) return <EmptyState title="All caught up" body="Nothing is overdue, blocked, or due in the next day." />
  return (
    <ul className="rows">
      {items.map(({ kind, record, reason }) => (
        <li key={`${kind}-${record.id}`}>
          <a className="row attention-row" href={recordHref(kind === 'task' ? 'Task' : 'Milestone', record.id)}>
            <span className="row__main">
              <span className="row__title">{record.title}</span>
              <span className="row__meta"><span>{kind === 'task' ? 'Task' : 'Milestone'}</span><span>{get('project', record.projectId).name}</span></span>
            </span>
            <span className="row__side">
              <StatusBadge domain={kind === 'task' ? 'task' : 'milestone'} status={kind === 'task' ? record.status : milestoneStatus(record)} />
              <span className="due due--overdue">{reason}</span>
              <DueLabel due={record.due} />
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}

function ProjectPulse({ scope }) {
  const list = projects.filter((p) => p.status !== 'Archived' && (scope === 'all' || p.id === scope))
  return (
    <ul className="rows">
      {list.map((project) => {
        const progress = projectProgress(project.id)
        const next = nextMilestone(project.id)
        return (
          <li key={project.id}>
            <a className="row pulse-row" href={`/projects/${project.id}`}>
              <span className={`tile-mark tile-mark--${project.tone}`} aria-hidden="true">{project.name.slice(0, 2).toUpperCase()}</span>
              <span className="row__main">
                <span className="row__title">{project.name}</span>
                <span className="row__meta"><span>{project.phases[project.phaseIndex]}</span>{next && <span>Next: {next.title} · {formatDate(next.due)}</span>}</span>
              </span>
              <span className="row__side"><StatusBadge domain="project" status={project.status} /><ProgressBar value={progress.done} max={progress.total} label={`${project.name} task progress`} /></span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}

function ActivityFeed({ scope }) {
  const items = recentActivity(scope, 7)
  const groups = [...new Set(items.map((item) => dayGroup(item.at)))]
  return (
    <div className="activity">
      {groups.map((group) => (
        <div key={group}>
          <h3 className="activity__day">{group}</h3>
          <ul className="rows rows--tight">
            {items.filter((item) => dayGroup(item.at) === group).map((item) => (
              <li className="activity__item" key={item.id}>
                <Avatar userId={item.actorId} size="sm" />
                <span><strong>{get('user', item.actorId).name.split(' ')[0]}</strong> {item.verb} <RelationChip type={item.recordType} id={item.recordId} /> <time dateTime={item.at} className="activity__time">{timeAgo(item.at)}</time></span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function OverviewPage() {
  const { scope } = useWorkspace()
  const taskList = scoped(tasks, scope)
  const projectList = projects.filter((p) => scope === 'all' || p.id === scope)
  const attention = attentionItems(scope)
  const upcoming = scoped(milestones, scope).filter((m) => !m.done).sort((a, b) => a.due.localeCompare(b.due)).slice(0, 3)
  const longDate = new Date(`${DEMO_TODAY}T00:00:00`).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <>
      <PageHeader
        eyebrow={longDate}
        title="Overview"
        description={attention.length ? `${attention.length} item${attention.length === 1 ? '' : 's'} need attention across ${new Set(attention.map((a) => a.record.projectId)).size} project${new Set(attention.map((a) => a.record.projectId)).size === 1 ? '' : 's'}.` : 'Nothing needs attention right now.'}
        action={<PreviewAction label="New project" icon={Plus} variant="primary" iconOnlyOnMobile title="Create project" body="A form for the project name, category, owner, and workflow phases would open here. In the demo nothing is created." />}
      />
      <StateGate empty={{ title: 'Welcome to Tsumugi', body: 'Create a project, add milestones, then add tasks. Everything you add will show up here.', action: <PreviewAction label="New project" icon={Plus} variant="primary" /> }}>
        <StatStrip stats={[
          { label: 'Open tasks', value: taskList.filter(isOpen).length, onClick: () => navigate('/tasks') },
          { label: 'Due this week', value: taskList.filter(dueSoon).length, onClick: () => navigate('/tasks?filter=soon') },
          { label: 'Overdue', value: overdueRecords(scope).length, hint: 'tasks and milestones', onClick: () => navigate('/tasks?filter=overdue') },
          { label: 'Active projects', value: projectList.filter((p) => p.status === 'Active').length, hint: `of ${projectList.length}`, onClick: () => navigate('/projects') },
        ]} />
        <div className="overview-grid">
          <Section title="Needs attention" id="ov-attention" action={<a href="/tasks">All tasks</a>}><AttentionList items={attention} /></Section>
          <Section title="Project pulse" id="ov-pulse" action={<a href="/projects">All projects</a>}><ProjectPulse scope={scope} /></Section>
          <Section title="Upcoming milestones" id="ov-milestones" action={<a href="/milestones">Timeline</a>}>
            {upcoming.length ? (
              <ul className="rows rows--tight">
                {upcoming.map((m) => (
                  <li key={m.id}><a className="row" href={recordHref('Milestone', m.id)}>
                    <span className="row__main"><span className="row__title">{m.title}</span><span className="row__meta"><span>{get('project', m.projectId).name}</span></span></span>
                    <span className="row__side"><StatusBadge domain="milestone" status={milestoneStatus(m)} /><DueLabel due={m.due} /></span>
                  </a></li>
                ))}
              </ul>
            ) : <EmptyState title="No upcoming milestones" />}
          </Section>
          <Section title="Recent activity" id="ov-activity" action={<a href="/revisions">History</a>}><ActivityFeed scope={scope} /></Section>
        </div>
      </StateGate>
    </>
  )
}
