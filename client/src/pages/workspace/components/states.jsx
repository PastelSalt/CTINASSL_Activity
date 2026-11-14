import { CircleAlert, FileQuestion, Inbox, SearchX } from 'lucide-react'
import { usePreviewState } from '../../../hooks/usePreviewState'

export function EmptyState({ icon: Icon = Inbox, title, body, action }) {
  return (
    <div className="state" role="status">
      <Icon size={30} aria-hidden="true" />
      <h3>{title}</h3>
      {body && <p>{body}</p>}
      {action}
    </div>
  )
}

export function NoResults({ onClear }) {
  return (
    <EmptyState icon={SearchX} title="No results" body="Nothing matches the current search and filters." action={onClear && <button className="button button--small button--secondary" type="button" onClick={onClear}>Clear filters</button>} />
  )
}

export function ErrorState() {
  return (
    <div className="state state--error" role="alert">
      <CircleAlert size={30} aria-hidden="true" />
      <h3>This page couldn’t load</h3>
      <p>Something went wrong while loading the records. This is a demo state; nothing is actually wrong.</p>
      <button className="button button--small button--secondary" type="button" disabled>Try again</button>
    </div>
  )
}

export function UnsupportedPreview({ kind, reason }) {
  return (
    <div className="state state--compact" role="status">
      <FileQuestion size={26} aria-hidden="true" />
      <h3>No preview for {kind}</h3>
      <p>{reason}</p>
    </div>
  )
}

export function Skeleton({ rows = 5 }) {
  return (
    <div className="skeleton" aria-busy="true" aria-label="Loading">
      <div className="skeleton__strip">{[0, 1, 2].map((i) => <span key={i} />)}</div>
      {Array.from({ length: rows }, (_, i) => <span className="skeleton__row" key={i} />)}
    </div>
  )
}

/** Shows a designed state instead of the page content when the developer-tools state previewer is set. */
export function StateGate({ empty, children, firstRun }) {
  const state = usePreviewState(['loading', 'empty', 'error'])
  if (state === 'loading') return <Skeleton />
  if (state === 'empty') return firstRun ?? <EmptyState title={empty.title} body={empty.body} action={empty.action} />
  if (state === 'error') return <ErrorState />
  return children
}
