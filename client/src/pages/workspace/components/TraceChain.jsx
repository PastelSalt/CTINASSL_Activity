const stages = [
  ['objective', 'Objective'], ['requirements', 'Requirements'], ['milestones', 'Milestones'],
  ['tasks', 'Tasks'], ['revisions', 'Revisions'], ['deliverables', 'Deliverables'],
]

/** Objective → requirement → milestone → task → revision → deliverable, with counts. */
export default function TraceChain({ counts, onSelect }) {
  return (
    <ol className="trace" aria-label="Traceability chain">
      {stages.map(([key, label]) => {
        const count = counts[key]
        const body = <><strong>{count}</strong><span>{label}</span></>
        return (
          <li key={key}>
            {onSelect && key !== 'objective' ? <button type="button" onClick={() => onSelect(key)}>{body}</button> : <div>{body}</div>}
          </li>
        )
      })}
    </ol>
  )
}
