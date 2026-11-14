import { useState } from 'react'
import { ArrowUpRight, MailCheck, Sparkles } from 'lucide-react'
import AuthShell from './AuthShell'
import PreviewDialog from '../../components/forms/PreviewDialog'
import { Checkbox, FormBanner, PasswordField, StatusPanel, TextField } from '../../components/forms/forms'
import { usePreviewState } from '../../hooks/usePreviewState'
import { navigate } from '../../app/router'

const loginStates = [
  ['default', 'Default'],
  ['errors', 'Field errors'],
  ['invalid', 'Invalid credentials'],
  ['locked', 'Locked account'],
  ['unavailable', 'Service unavailable'],
]

const registerStates = [
  ['default', 'Default'],
  ['errors', 'Field errors'],
  ['exists', 'Email already used'],
  ['pending', 'Pending verification'],
  ['success', 'Success layout'],
]

const PASSWORD_HINT = 'Demo only — don’t enter a real password; this page never receives it.'

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
        <span className="eyebrow"><Sparkles size={13} /> Sample thread</span>
        <strong>Idea → finished work</strong>
        <small>Keep every meaningful step together.</small>
      </div>
    </div>
  )
}

function DemoActions({ onContinue }) {
  return <button className="button button--primary" type="button" onClick={onContinue}>Continue to demo workspace <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden="true" /></button>
}

function LoginPage() {
  const state = usePreviewState(loginStates.map(([value]) => value))
  const showErrors = state === 'errors'
  const banners = {
    invalid: ['error', 'Email or password not recognized', 'Check them and try again, or reset your password.'],
    locked: ['error', 'This account is temporarily locked', 'Too many attempts were made. Try again later or reset your password.'],
    unavailable: ['error', 'Sign-in is unavailable right now', 'Please try again in a few minutes.'],
    errors: ['error', 'Check the highlighted fields', 'Two fields need attention before you can continue.'],
  }
  const banner = banners[state]

  return (
    <AuthShell
      pageTitle="Log in"
      title="Welcome back to the thread."
      intro="Sign in to continue shaping the work that matters."
      previewStates={loginStates}
      currentState={state}
      note="Use a private device and keep your sign-in details secure."
    >
      {banner && <FormBanner tone={banner[0]} title={banner[1]} focus>{banner[2]}</FormBanner>}
      <form className="auth-form" noValidate onSubmit={(event) => { event.preventDefault(); navigate('/dashboard') }}>
        <TextField label="Email address" name="email" type="email" autoComplete="username" placeholder="you@example.com" error={showErrors ? 'Enter your email address.' : undefined} />
        <PasswordField label="Password" name="password" autoComplete="current-password" hint={PASSWORD_HINT} error={showErrors ? 'Enter your password.' : undefined} />
        <a className="auth-support-link" href="/forgot-password">Forgot password?</a>
        <div className="auth-actions">
          <span>New to Tsumugi? <a className="text-link" href="/register">Create account</a></span>
          <button className="button button--primary" type="submit">Log in <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden="true" /></button>
        </div>
        <button className="auth-demo-link" type="button" onClick={() => navigate('/dashboard')}>Continue as demo user</button>
      </form>
    </AuthShell>
  )
}

function RegisterPage() {
  const state = usePreviewState(registerStates.map(([value]) => value))
  const [dialogOpen, setDialogOpen] = useState(false)
  const showErrors = state === 'errors'

  if (state === 'pending' || state === 'success') {
    const pending = state === 'pending'
    return (
      <AuthShell pageTitle="Create account" title={pending ? 'Check your inbox.' : 'You’re in the thread.'} intro="This is a layout preview of the next step. No account was created." previewStates={registerStates} currentState={state} wide aside={<ThreadIllustration />}>
        <StatusPanel
          icon={pending ? MailCheck : undefined}
          title={pending ? 'Confirm your email address' : 'Account created'}
          actions={<DemoActions onContinue={() => navigate('/dashboard')} />}
        >
          {pending ? 'A verification link would be sent to your address. Nothing was sent in this demo.' : 'In the real flow this confirms the new account. In the demo, continue to the sample workspace.'}
        </StatusPanel>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      pageTitle="Create account"
      title="Start your next thread."
      intro="Create a home for the ideas, requirements, and deliverables you are bringing together."
      wide
      aside={<ThreadIllustration />}
      previewStates={registerStates}
      currentState={state}
      note="Your project thread starts with a clear place to begin."
    >
      {showErrors && <FormBanner tone="error" title="Check the highlighted fields" focus>Five fields need attention before an account could be created.</FormBanner>}
      {state === 'exists' && <FormBanner tone="error" title="That email is already in use" focus>Log in instead, or use a different address.</FormBanner>}
      <form className="auth-form" noValidate onSubmit={(event) => { event.preventDefault(); setDialogOpen(true) }}>
        <TextField label="Display name" name="name" autoComplete="name" placeholder="Your name" error={showErrors ? 'Enter a display name.' : undefined} />
        <TextField label="Email address" name="email" type="email" autoComplete="email" placeholder="you@example.com" error={showErrors ? 'Enter an email address like name@example.com.' : state === 'exists' ? 'This email already has an account.' : undefined} />
        <PasswordField label="Password" name="password" autoComplete="new-password" hint={PASSWORD_HINT} showRequirements error={showErrors ? 'Choose a stronger password.' : undefined} />
        <PasswordField label="Confirm password" name="passwordConfirmation" autoComplete="new-password" error={showErrors ? 'The passwords do not match.' : undefined} />
        <Checkbox name="agreement" error={showErrors ? 'Accept the Terms of Service to continue.' : undefined}>
          I agree to the <a href="/terms-of-service">Terms of Service</a> and acknowledge the <a href="/privacy-policy">Privacy Policy</a> and <a href="/cookie-and-local-storage-policy">Cookie &amp; Local Storage Policy</a>.
        </Checkbox>
        <div className="auth-actions">
          <span>Already have an account? <a className="text-link" href="/login">Log in</a></span>
          <button className="button button--primary" type="submit">Create account <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden="true" /></button>
        </div>
      </form>

      <PreviewDialog open={dialogOpen} onClose={() => setDialogOpen(false)} title="Account creation isn’t connected yet" actions={<DemoActions onContinue={() => navigate('/dashboard')} />}>
        <p>This is where a new account would be created. In this demo nothing you entered was read, stored, or sent, and no account exists.</p>
      </PreviewDialog>
    </AuthShell>
  )
}

export default function AuthPage({ mode }) {
  return mode === 'register' ? <RegisterPage /> : <LoginPage />
}
