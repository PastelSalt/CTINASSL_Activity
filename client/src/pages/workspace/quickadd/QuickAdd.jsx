import { useState } from 'react'
import { Plus } from 'lucide-react'
import Modal from './Modal'
import { addTask } from '../data/store'
import { activeProjects } from '../data/selectors'
import { formatDate } from '../data/format'
import { parseQuickAdd } from './parse'

export default function QuickAdd({ open, onClose, projectId }) {
  const projects = activeProjects()
  const fallback = projectId ?? projects[0]?.id
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')
  const parsed = parseQuickAdd(text, fallback)
  const project = projects.find((p) => p.id === parsed.projectId)

  const submit = (event) => {
    event.preventDefault()
    if (!parsed.title) return
    addTask({ title: parsed.title, priority: parsed.priority, due: parsed.due, projectId: parsed.projectId })
    setMessage(`Added “${parsed.title}” to ${project?.name ?? 'your project'} for this session.`)
    setText('')
  }

  return (
    <Modal open={open} onClose={() => { setText(''); setMessage(''); onClose() }} label="Quick add" className="ws-modal--quick">
      <form onSubmit={submit}>
        <div className="ws-modal__head"><label className="ws-modal__label" htmlFor="quick-add-input">Quick add a task</label><p className="ws-modal__lede">One line is enough. Details are picked up as you type.</p></div>
        <div className="quick-field">
          <Plus size={18} aria-hidden="true" />
          <input id="quick-add-input" autoFocus autoComplete="off" value={text} onChange={(e) => { setText(e.target.value); setMessage('') }} placeholder="Write the task, e.g. Proof chapter one #garden tomorrow !" />
        </div>
        <ul className="quick-chips" aria-label="Detected details">
          <li className="chip"><span>{project?.name ?? 'No project'}</span></li>
          <li className="chip"><span>{parsed.due ? formatDate(parsed.due) : 'No date'}</span></li>
          {parsed.priority === 'high' && <li className="chip"><span>High priority</span></li>}
        </ul>
        <p className="muted quick-hint">Use #project, a day word (today, tomorrow, fri), and ! for high priority. Enter adds, Esc closes.</p>
        <p className="quick-status" role="status" aria-live="polite">{message}</p>
        <div className="ws-modal__actions"><button className="button button--small button--secondary" type="button" onClick={onClose}>Close</button><button className="button button--small button--primary" type="submit" disabled={!parsed.title}>Add task</button></div>
      </form>
    </Modal>
  )
}
