import { lazy, Suspense } from 'react'
import WorkspaceProvider from './WorkspaceProvider'
import WorkspaceShell from './WorkspaceShell'
import { Skeleton } from './components/states'
import '../../styles/workspace.css'
import '../../styles/workspace-pages.css'

// The shell stays mounted while the page inside it changes; each page is its own chunk.
const pages = {
  '/dashboard': lazy(() => import('./pages/OverviewPage')),
  '/projects': lazy(() => import('./pages/ProjectsPage')),
  '/milestones': lazy(() => import('./pages/MilestonesPage')),
  '/tasks': lazy(() => import('./pages/TasksPage')),
  '/requirements': lazy(() => import('./pages/RequirementsPage')),
  '/assets': lazy(() => import('./pages/AssetsPage')),
  '/revisions': lazy(() => import('./pages/RevisionsPage')),
  '/documentation': lazy(() => import('./pages/DocumentationPage')),
  '/reports': lazy(() => import('./pages/ReportsPage')),
  '/settings': lazy(() => import('./pages/SettingsPage')),
}
const ProjectWorkspacePage = lazy(() => import('./pages/ProjectWorkspacePage'))

export default function WorkspaceApp({ pathname }) {
  const projectMatch = pathname.match(/^\/projects\/([^/]+)$/)
  const Page = projectMatch ? ProjectWorkspacePage : pages[pathname]

  return (
    <WorkspaceProvider>
      <WorkspaceShell pathname={pathname}>
        <Suspense fallback={<Skeleton />}>
          {projectMatch ? <Page key={projectMatch[1]} projectId={projectMatch[1]} /> : <Page />}
        </Suspense>
      </WorkspaceShell>
    </WorkspaceProvider>
  )
}
