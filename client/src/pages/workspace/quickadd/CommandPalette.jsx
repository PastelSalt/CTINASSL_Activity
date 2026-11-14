import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import Modal from './Modal'
import { navigate } from '../../../app/router'
import { modules } from '../nav'
import { data } from '../data/store'
import { activeProjects, recents } from '../data/selectors'

export default function CommandPalette({ open, onClose, onQuickAdd, onNewProject }) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)

  const items = useMemo(() => {
    const go = (to) => () => { onClose(); navigate(to) }
    const base = [
      { id: 'a-quick', group: 'Actions', label: 'Quick add a task', run: onQuickAdd },
      { id: 'a-project', group: 'Actions', label: 'New project', run: onNewProject },
      ...modules.map((m) => ({ id: `g-${m.href}`, group: 'Go to', label: m.label, run: go(m.href) })),
      { id: 'g-account', group: 'Go to', label: 'Account', run: go('/account') },
      { id: 'g-calendar', group: 'Go to', label: 'Calendar', run: go('/tasks?view=calendar') },
      { id: 'g-help', group: 'Go to', label: 'Help', run: go('/help') },
      ...activeProjects().map((p) => ({ id: p.id, group: 'Projects', label: p.name, run: go(`/projects/${p.id}`) })),
      ...data().files.map((f) => ({ id: f.id, group: 'Library', label: f.name, run: go(f.body ? `/library?doc=${f.id}` : `/library?select=${f.id}`) })),
    ]
    const q = query.trim().toLowerCase()
    if (!q) {
      const recentIds = new Set(recents(4).map((r) => r.id))
      return [...base.filter((i) => recentIds.has(i.id)).map((i) => ({ ...i, group: 'Recent' })), ...base.filter((i) => i.group === 'Actions' || i.group === 'Go to')]
    }
    return base.filter((i) => i.label.toLowerCase().includes(q)).slice(0, 12)
  }, [query, onClose, onQuickAdd, onNewProject])

  const active = Math.min(index, Math.max(items.length - 1, 0))
  const onKey = (event) => {
    if (event.key === 'ArrowDown') { event.preventDefault(); setIndex((active + 1) % Math.max(items.length, 1)) }
    else if (event.key === 'ArrowUp') { event.preventDefault(); setIndex((active - 1 + items.length) % Math.max(items.length, 1)) }
    else if (event.key === 'Enter' && items[active]) { event.preventDefault(); items[active].run() }
  }

  let lastGroup = null
  return (
    <Modal open={open} onClose={() => { setQuery(''); setIndex(0); onClose() }} label="Search or jump to" className="ws-modal--palette">
      <div className="palette">
        <div className="quick-field"><Search size={18} aria-hidden="true" />
          <input autoFocus role="combobox" aria-expanded="true" aria-controls="palette-list" aria-activedescendant={items[active] ? `pal-${items[active].id}` : undefined} aria-label="Search or jump to" autoComplete="off" value={query} onChange={(e) => { setQuery(e.target.value); setIndex(0) }} onKeyDown={onKey} placeholder="Search projects, files, or type a command" />
        </div>
        <ul id="palette-list" role="listbox" className="palette__list" aria-label="Results">
          {items.map((item, i) => {
            const header = item.group !== lastGroup ? <li role="presentation" className="palette__group" key={`h-${item.group}-${i}`}>{item.group}</li> : null
            lastGroup = item.group
            return [header, <li role="option" id={`pal-${item.id}`} aria-selected={i === active} key={`${item.group}-${item.id}`} className={i === active ? 'palette__item palette__item--active' : 'palette__item'} onMouseMove={() => setIndex(i)} onClick={item.run}>{item.label}</li>]
          })}
          {!items.length && <li role="presentation" className="palette__empty">No matches for “{query}”.</li>}
        </ul>
      </div>
    </Modal>
  )
}
