import { lazy, Suspense, useEffect } from 'react'
import { installLinkInterception, navigate, useLocation } from './app/router'

// Each route group is its own chunk so a visitor only downloads the code for the page they open.
const LandingPage = lazy(() => import('./pages/landing/LandingPage'))
const LoginPage = lazy(() => import('./pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPasswordPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/legal/PrivacyPolicyPage'))
const TermsOfServicePage = lazy(() => import('./pages/legal/TermsOfServicePage'))
const CookiePolicyPage = lazy(() => import('./pages/legal/CookieAndLocalStoragePolicyPage'))
const WorkspaceApp = lazy(() => import('./pages/workspace/WorkspaceApp'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const staticRoutes = {
  '/': LandingPage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/forgot-password': ForgotPasswordPage,
  '/reset-password': ResetPasswordPage,
  '/privacy-policy': PrivacyPolicyPage,
  '/terms-of-service': TermsOfServicePage,
  '/cookie-and-local-storage-policy': CookiePolicyPage,
}

const workspacePaths = ['/home', '/projects', '/tasks', '/library', '/insights', '/account', '/help']

// Paths from the earlier ten-module workspace keep working by redirecting to their new home.
const legacyRedirects = {
  '/dashboard': '/home',
  '/milestones': '/projects?view=timeline',
  '/requirements': '/projects',
  '/revisions': '/projects',
  '/assets': '/library',
  '/documentation': '/library',
  '/reports': '/insights',
  '/settings': '/account',
}

function Redirect({ to }) {
  useEffect(() => { navigate(to, { replace: true }) }, [to])
  return <div className="route-loading" aria-busy="true" />
}

function Route({ pathname }) {
  const Page = staticRoutes[pathname]
  if (Page) return <Page />

  if (legacyRedirects[pathname]) return <Redirect to={legacyRedirects[pathname]} />
  if (workspacePaths.includes(pathname) || /^\/projects\/[^/]+$/.test(pathname)) return <WorkspaceApp pathname={pathname} />
  return <NotFoundPage />
}

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => installLinkInterception(), [])

  return (
    <Suspense fallback={<div className="route-loading" aria-busy="true" />}>
      <Route pathname={pathname} />
    </Suspense>
  )
}
