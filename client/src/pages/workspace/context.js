import { createContext, useContext } from 'react'

export const WorkspaceContext = createContext(null)

/** Workspace-wide UI state: project scope and the preview-only action dialog. */
export function useWorkspace() {
  const value = useContext(WorkspaceContext)
  if (!value) throw new Error('useWorkspace must be used inside the workspace shell')
  return value
}
