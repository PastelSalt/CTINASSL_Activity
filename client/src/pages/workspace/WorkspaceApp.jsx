import { lazy, Suspense } from 'react'
import WorkspaceProvider from './WorkspaceProvider'
import WorkspaceShell from './WorkspaceShell'
import { Skeleton } from './components/states'
import { useStoreVersion } from './data/store'
import '../../styles/forms.css'
import '../../styles/workspace.css'
import '../../styles/workspace-pages.css'

// The shell stays mounted while the page inside it changes; each page is its own chunk.
const pages = {
  '/home': lazy(() => import('./pages/HomePage')),
  '/projects': lazy(() => import('./pages/ProjectsPage')),
  '/tasks': lazy(() => import('./pages/TasksPage')),
  '/library': lazy(() => import('./pages/LibraryPage')),
  '/insights': lazy(() => import('./pages/InsightsPage')),
  '/account': lazy(() => import('./pages/AccountPage')),
  '/help': lazy(() => import('./pages/HelpPage')),
}
const ProjectPage = lazy(() => import('./pages/ProjectPage'))

export default function WorkspaceApp({ pathname }) {
  useStoreVersion() // re-render pages when session data (Quick add, new projects) changes
  const projectMatch = pathname.match(/^\/projects\/([^/]+)$/)
  const Page = projectMatch ? ProjectPage : pages[pathname]

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
