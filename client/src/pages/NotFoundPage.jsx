import { ArrowUpRight } from 'lucide-react'
import PublicHeader from '../components/public/PublicHeader'
import PublicFooter from '../components/public/PublicFooter'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFoundPage() {
  usePageMeta({ title: 'Page not found | Tsumugi', robots: 'noindex, nofollow' })

  return (
    <main className="public-page">
      <a className="skip-link" href="#not-found">Skip to content</a>
      <PublicHeader />
      <section className="not-found section-shell" id="not-found" aria-labelledby="not-found-title">
        <p className="eyebrow">Error 404</p>
        <h1 id="not-found-title">This thread doesn&apos;t lead anywhere.</h1>
        <p>The page you followed does not exist or has moved. Head back to the start, or continue to the demo sign-in.</p>
        <div className="not-found__actions">
          <a className="button button--primary" href="/">Back to home <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden="true" /></a>
          <a className="text-link" href="/login">Log in</a>
        </div>
      </section>
      <PublicFooter />
    </main>
  )
}
