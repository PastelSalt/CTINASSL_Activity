import { createContext, useContext } from 'react'

export const WorkspaceContext = createContext(null)

/** Workspace-wide UI actions: preview dialog, developer tools, Quick add, palette, new project. */
export function useWorkspace() {
  const value = useContext(WorkspaceContext)
  if (!value) throw new Error('useWorkspace must be used inside the workspace shell')
  return value
}
