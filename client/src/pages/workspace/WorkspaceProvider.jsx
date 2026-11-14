import { useCallback, useMemo, useState } from 'react'
import PreviewDialog from '../../components/forms/PreviewDialog'
import { WorkspaceContext } from './context'

export default function WorkspaceProvider({ children }) {
  const [scope, setScope] = useState('all')
  const [dialog, setDialog] = useState(null)

  /** Opens the preview-only dialog (PLAN-A-04 section 9). Nothing is ever saved. */
  const preview = useCallback((title, body) => setDialog({ title, body }), [])
  const value = useMemo(() => ({ scope, setScope, preview }), [scope, preview])

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
      <PreviewDialog open={Boolean(dialog)} onClose={() => setDialog(null)} title={dialog?.title ?? ''}>
        {typeof dialog?.body === 'string' ? <p>{dialog.body}</p> : dialog?.body}
      </PreviewDialog>
    </WorkspaceContext.Provider>
  )
}
