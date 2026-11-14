import { DEMO_TODAY, daysBetween, formatDate } from '../data/format'
import { get, milestoneState } from '../data/selectors'

const pct = (value, min, span) => Math.min(100, Math.max(0, ((daysBetween(min, value)) / span) * 100))

/**
 * Milestones on a date axis with a Today marker. Wide screens draw bars; narrow screens fall back to a
 * vertical list (see .tl-list). Both are real lists, so keyboard and screen reader users get the same data.
 */
export default function Timeline({ milestones, onSelect, selectedId, label = 'Milestones timeline', showProject = false }) {
  if (!milestones.length) return null
  const sorted = [...milestones].sort((a, b) => a.start.localeCompare(b.start))
  const min = sorted.reduce((m, x) => (x.start < m ? x.start : m), DEMO_TODAY)
  const max = sorted.reduce((m, x) => (x.due > m ? x.due : m), DEMO_TODAY)
  const span = Math.max(daysBetween(min, max), 1)
  const todayAt = pct(DEMO_TODAY, min, span)
  return (
    <>
      <div className="tl" role="group" aria-label={label}>
        <div className="tl__axis" aria-hidden="true"><span>{formatDate(min)}</span><span>{formatDate(max)}</span></div>
        <ol className="tl__rows">
          {sorted.map((m) => {
            const left = pct(m.start, min, span)
            const width = Math.min(Math.max(pct(m.due, min, span) - left, 14), 100 - left)
            const state = milestoneState(m)
            return (
              <li key={m.id}>
                <button type="button" className={`tl__bar tl__bar--${state.toLowerCase()} ${selectedId === m.id ? 'tl__bar--selected' : ''}`} style={{ left: `${left}%`, width: `${width}%` }} onClick={() => onSelect?.(m.id)} aria-pressed={selectedId === m.id}>
                  <span>{m.title}</span>
                  <small>{showProject ? `${get('project', m.projectId).name} · ` : ''}{state} · {formatDate(m.start)} – {formatDate(m.due)}</small>
                </button>
              </li>
            )
          })}
        </ol>
        <span className="tl__today" style={{ left: `${todayAt}%` }}><span>Today</span></span>
      </div>
      <ul className="tl-list">
        {sorted.map((m) => (
          <li key={m.id}>
            <button type="button" onClick={() => onSelect?.(m.id)} aria-pressed={selectedId === m.id}>
              <strong>{m.title}</strong><span>{showProject ? `${get('project', m.projectId).name} · ` : ''}{milestoneState(m)} · due {formatDate(m.due)}</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
