import { useState } from 'react'
import Modal from './Modal'
import { navigate } from '../../../app/router'
import { addProject } from '../data/store'
import { templates } from '../data/templates'

export default function NewProjectDialog({ open, onClose }) {
  const [kind, setKind] = useState('software')
  const [name, setName] = useState('')

  const create = (event) => {
    event.preventDefault()
    const template = templates.find((t) => t.kind === kind)
    const title = name.trim() || `Untitled ${template.label.toLowerCase()} project`
    const milestones = template.milestone ? [{ title: template.milestone, due: '2026-12-15' }] : []
    const id = addProject(
      { name: title, kind: template.kind, category: template.category, status: 'Planning', phases: template.phases, description: `${template.label} project created from a template.` },
      milestones,
      template.tasks.map((t) => ({ title: t, due: null })),
    )
    setName('')
    onClose()
    navigate(`/projects/${id}`)
  }

  return (
    <Modal open={open} onClose={onClose} label="New project" className="ws-modal--project">
      <form onSubmit={create}>
        <div className="ws-modal__head"><h2 className="ws-modal__title">New project</h2><p className="ws-modal__lede">Choose a template. It adds a few starter steps you can change or delete.</p></div>
        <fieldset className="template-picker"><legend>Pick a starting point</legend>
          {templates.map((t) => (
            <label className="template" key={t.kind}>
              <input type="radio" name="template" value={t.kind} checked={kind === t.kind} onChange={() => setKind(t.kind)} />
              <span><strong>{t.label}</strong><small>{t.text}</small></span>
            </label>
          ))}
        </fieldset>
        <label className="field"><span>Project name</span><input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Give it a short name" autoComplete="off" /></label>
        <p className="muted">Created for this session only. It disappears when you reload.</p>
        <div className="ws-modal__actions"><button className="button button--small button--secondary" type="button" onClick={onClose}>Cancel</button><button className="button button--small button--primary" type="submit">Create project</button></div>
      </form>
    </Modal>
  )
}
