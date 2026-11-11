import { ArrowLeft, ArrowUpRight, Eye, EyeOff, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

const legalLinks = [
  ['/privacy-policy', 'Privacy Policy'],
  ['/terms-of-service', 'Terms of Service'],
  ['/cookie-and-local-storage-policy', 'Cookie & Local Storage'],
]

function ThreadIllustration() {
  return (
    <div className="auth-illustration" aria-hidden="true">
      <svg viewBox="0 0 360 260">
        <path d="M20 176C66 54 108 62 142 154s62 91 91 14 57-95 107-38" />
        <path d="M20 112c44 76 77 72 113 8s65-77 96-3 55 74 111 39" />
        <circle cx="20" cy="176" r="8" />
        <circle cx="340" cy="130" r="8" />
      </svg>
      <div className="auth-illustration__card">
        <span className="eyebrow"><Sparkles size={13} /> LIVE THREAD</span>
        <strong>Idea → finished work</strong>
        <small>Keep every meaningful step together.</small>
      </div>
    </div>
  )
}

function AuthLegalFooter() {
  return (
    <footer className="auth-footer section-shell">
      <span className="footer__credit">A Moeko Works project</span>
      <nav aria-label="Legal policies">
        {legalLinks.map(([href, label]) => <a href={href} key={href}>{label}</a>)}
      </nav>
    </footer>
  )
}

export default function AuthPage({ mode }) {
  const isRegister = mode === 'register'
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const previousTitle = document.title
    document.title = `${isRegister ? 'Create account' : 'Log in'} | Tsumugi`
    return () => {
      document.title = previousTitle
    }
  }, [isRegister])

  return (
    <main className="auth-page">
      <a className="skip-link" href="#auth-content">Skip to authentication form</a>
      <header className="auth-header section-shell">
        <a className="brand" href="/">
          <span className="brand__mark">ts</span>
          <span>tsumugi</span>
        </a>
        <a className="text-link" href="/"><ArrowLeft size={16} strokeWidth={2.5} /> Back to home</a>
      </header>

      <section className={isRegister ? 'auth-card auth-card--register section-shell' : 'auth-card section-shell'} id="auth-content" aria-labelledby="auth-title">
        <div className="auth-form-column">
          <p className="eyebrow">Moeko Works · Tsumugi</p>
          <p className="auth-draft">Static presentation · authentication is not connected</p>
          <h1 id="auth-title">{isRegister ? 'Start your next thread.' : 'Welcome back to the thread.'}</h1>
          <p className="auth-intro">
            {isRegister
              ? 'Create a home for the ideas, requirements, and deliverables you are bringing together.'
              : 'Sign in to continue shaping the work that matters.'}
          </p>

          <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
            {isRegister && (
              <div className="auth-field-row">
                <label>Display name<input type="text" name="name" autoComplete="name" placeholder="Your name" /></label>
              </div>
            )}
            <label>Email address<input type="email" name="email" autoComplete="email" placeholder="you@example.com" /></label>
            <label>Password
              <span className="auth-password">
                <input type={showPassword ? 'text' : 'password'} name="password" autoComplete={isRegister ? 'new-password' : 'current-password'} placeholder="Enter your password" />
                <button type="button" className="auth-password__toggle" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((visible) => !visible)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
            </label>
            {isRegister && (
              <label>Confirm password<input type={showPassword ? 'text' : 'password'} name="passwordConfirmation" autoComplete="new-password" placeholder="Repeat your password" /></label>
            )}
            {!isRegister && <a className="auth-support-link" href="/forgot-password">Forgot password?</a>}
            {isRegister && (
              <label className="auth-checkbox">
                <input type="checkbox" name="agreement" />
                <span>I agree to the <a href="/terms-of-service">Terms of Service</a> and acknowledge the <a href="/privacy-policy">Privacy Policy</a>.</span>
              </label>
            )}
            <div className="auth-actions">
              <span>{isRegister ? 'Already have an account?' : 'New to Tsumugi?'}</span>
              <a className="text-link" href={isRegister ? '/login' : '/register'}>{isRegister ? 'Log in' : 'Create account'}</a>
              {isRegister ? <button className="button button--primary" type="button">Create account <ArrowUpRight size={16} strokeWidth={2.5} /></button> : <a className="button button--primary" href="/dashboard">Log in <ArrowUpRight size={16} strokeWidth={2.5} /></a>}
            </div>
          </form>
        </div>
        {isRegister && <ThreadIllustration />}
      </section>

      <p className="auth-security-note section-shell">
        {isRegister ? 'Your project thread starts with a clear place to begin.' : 'Use a private device and keep your sign-in details secure.'}
      </p>
      <AuthLegalFooter />
    </main>
  )
}
