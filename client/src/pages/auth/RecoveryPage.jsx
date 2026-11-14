import { useState } from 'react'
import { ArrowUpRight, MailCheck } from 'lucide-react'
import AuthShell from './AuthShell'
import PreviewDialog from '../../components/forms/PreviewDialog'
import { FormBanner, PasswordField, StatusPanel, TextField } from '../../components/forms/forms'
import { usePreviewState } from '../../hooks/usePreviewState'
import { navigate } from '../../app/router'

const forgotStates = [
  ['default', 'Default'],
  ['invalid', 'Malformed email'],
  ['sent', 'Confirmation'],
  ['unavailable', 'Service unavailable'],
]

const resetStates = [
  ['default', 'Default'],
  ['weak', 'Weak password'],
  ['mismatch', 'Mismatch'],
  ['expired', 'Expired link'],
  ['success', 'Success layout'],
]

const PASSWORD_HINT = 'Demo only — don’t enter a real password; this page never receives it.'

function ForgotPassword() {
  const state = usePreviewState(forgotStates.map(([value]) => value))
  const [dialogOpen, setDialogOpen] = useState(false)

  if (state === 'sent') {
    return (
      <AuthShell pageTitle="Reset your password" title="Check your inbox." intro="This is a layout preview. No email was sent." previewStates={forgotStates} currentState={state}>
        <StatusPanel icon={MailCheck} title="If an account exists, a link is on its way" actions={<a className="button button--primary" href="/login">Back to log in</a>}>
          The message wording is deliberately the same whether or not an account exists.
        </StatusPanel>
      </AuthShell>
    )
  }

  return (
    <AuthShell pageTitle="Reset your password" title="Forgot your password?" intro="Enter the email address for your account and we’ll send a link to choose a new password." previewStates={forgotStates} currentState={state}>
      {state === 'unavailable' && <FormBanner tone="error" title="Recovery is unavailable right now" focus>Please try again in a few minutes.</FormBanner>}
      <form className="auth-form" noValidate onSubmit={(event) => { event.preventDefault(); setDialogOpen(true) }}>
        <TextField label="Email address" name="email" type="email" autoComplete="email" placeholder="you@example.com" error={state === 'invalid' ? 'Enter an email address like name@example.com.' : undefined} />
        <div className="auth-actions">
          <span><a className="text-link" href="/login">Back to log in</a></span>
          <button className="button button--primary" type="submit">Send reset link <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden="true" /></button>
        </div>
      </form>
      <PreviewDialog open={dialogOpen} onClose={() => setDialogOpen(false)} title="No email is sent in this demo">
        <p>In the real flow a single-use link would be emailed to the address you entered. Nothing you typed was read or sent here.</p>
      </PreviewDialog>
    </AuthShell>
  )
}

function ResetPassword() {
  const state = usePreviewState(resetStates.map(([value]) => value))
  const [dialogOpen, setDialogOpen] = useState(false)

  if (state === 'expired' || state === 'success') {
    const expired = state === 'expired'
    return (
      <AuthShell pageTitle="Choose a new password" title={expired ? 'That link has expired.' : 'Password updated.'} intro="This is a layout preview. No password was changed." previewStates={resetStates} currentState={state}>
        <StatusPanel
          title={expired ? 'Request a new link' : 'You can log in again'}
          actions={<a className="button button--primary" href={expired ? '/forgot-password' : '/login'}>{expired ? 'Send a new link' : 'Back to log in'}</a>}
        >
          {expired ? 'Reset links work once and for a short time. Request another to continue.' : 'In the real flow this confirms the change. Nothing was saved in the demo.'}
        </StatusPanel>
      </AuthShell>
    )
  }

  return (
    <AuthShell pageTitle="Choose a new password" title="Choose a new password." intro="Pick something strong that you don’t use anywhere else." previewStates={resetStates} currentState={state}>
      <form className="auth-form" noValidate onSubmit={(event) => { event.preventDefault(); setDialogOpen(true) }}>
        <PasswordField label="New password" name="password" autoComplete="new-password" hint={PASSWORD_HINT} showRequirements error={state === 'weak' ? 'Choose a stronger password.' : undefined} />
        <PasswordField label="Confirm new password" name="passwordConfirmation" autoComplete="new-password" error={state === 'mismatch' ? 'The passwords do not match.' : undefined} />
        <div className="auth-actions">
          <span><a className="text-link" href="/login">Back to log in</a></span>
          <button className="button button--primary" type="submit">Update password <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden="true" /></button>
        </div>
      </form>
      <PreviewDialog open={dialogOpen} onClose={() => setDialogOpen(false)} title="No password is changed in this demo" actions={<button className="button button--primary button--small" type="button" onClick={() => navigate('/login')}>Back to log in</button>}>
        <p>In the real flow this would set the new password. Nothing you typed was read, stored, or sent here.</p>
      </PreviewDialog>
    </AuthShell>
  )
}

export default function RecoveryPage({ mode }) {
  return mode === 'reset' ? <ResetPassword /> : <ForgotPassword />
}
