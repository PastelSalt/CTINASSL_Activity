import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import PreviewDialog from '../../components/forms/PreviewDialog'
import { WorkspaceContext } from './context'

// Quick add, the palette, and the template picker load on first use (PLAN-A-04L section 6).
const QuickAdd = lazy(() => import('./quickadd/QuickAdd'))
const CommandPalette = lazy(() => import('./quickadd/CommandPalette'))
const NewProjectDialog = lazy(() => import('./quickadd/NewProjectDialog'))

const isTyping = (target) => target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))

export default function WorkspaceProvider({ children }) {
  const [dev, setDev] = useState(() => new URLSearchParams(window.location.search).has('dev'))
  const [dialog, setDialog] = useState(null)
  const [quick, setQuick] = useState({ open: false, mounted: false, projectId: null })
  const [palette, setPalette] = useState({ open: false, mounted: false })
  const [newProject, setNewProject] = useState({ open: false, mounted: false })

  /** Opens the preview-only dialog (PLAN-A-04 section 1). Nothing is ever saved. */
  const preview = useCallback((title, body) => setDialog({ title, body }), [])
  const openQuickAdd = useCallback((projectId = null) => setQuick({ open: true, mounted: true, projectId }), [])
  const openPalette = useCallback(() => setPalette({ open: true, mounted: true }), [])
  const openNewProject = useCallback(() => setNewProject({ open: true, mounted: true }), [])

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openPalette(); return }
      if (event.key === 'q' && !event.metaKey && !event.ctrlKey && !event.altKey && !isTyping(event.target)) { event.preventDefault(); openQuickAdd() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openPalette, openQuickAdd])

  const value = useMemo(() => ({ preview, dev, setDev, openQuickAdd, openPalette, openNewProject }), [preview, dev, openQuickAdd, openPalette, openNewProject])

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
      <PreviewDialog open={Boolean(dialog)} onClose={() => setDialog(null)} title={dialog?.title ?? ''}>
        {typeof dialog?.body === 'string' ? <p>{dialog.body}</p> : dialog?.body}
      </PreviewDialog>
      <Suspense fallback={null}>
        {quick.mounted && <QuickAdd open={quick.open} projectId={quick.projectId} onClose={() => setQuick((q) => ({ ...q, open: false }))} />}
        {palette.mounted && <CommandPalette open={palette.open} onClose={() => setPalette((p) => ({ ...p, open: false }))} onQuickAdd={() => { setPalette((p) => ({ ...p, open: false })); openQuickAdd() }} onNewProject={() => { setPalette((p) => ({ ...p, open: false })); openNewProject() }} />}
        {newProject.mounted && <NewProjectDialog open={newProject.open} onClose={() => setNewProject((n) => ({ ...n, open: false }))} />}
      </Suspense>
    </WorkspaceContext.Provider>
  )
}
