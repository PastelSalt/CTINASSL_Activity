import { useEffect, useId, useRef, useState } from 'react'
import { CircleAlert, CircleCheck, Eye, EyeOff, Info } from 'lucide-react'

/**
 * Presentation-only form building blocks (PLAN-A-03). They render layout and states only:
 * no component here reads, stores, or sends what the user types.
 */

function describedBy(...ids) {
  return ids.filter(Boolean).join(' ') || undefined
}

export function FieldError({ id, children }) {
  if (!children) return null
  return <p className="field-error" id={id}><CircleAlert size={15} aria-hidden="true" /> <span>{children}</span></p>
}

export function TextField({ label, name, type = 'text', autoComplete, placeholder, hint, error, ...rest }) {
  const id = useId()
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        spellCheck="false"
        autoCapitalize="none"
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy(hint && `${id}-hint`, error && `${id}-error`)}
        {...rest}
      />
      {hint && <p className="field-hint" id={`${id}-hint`}>{hint}</p>}
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </div>
  )
}

const passwordRules = [
  ['At least 12 characters', (value) => value.length >= 12],
  ['Upper and lower case letters', (value) => /[a-z]/.test(value) && /[A-Z]/.test(value)],
  ['A number or symbol', (value) => /[\d\W_]/.test(value)],
]

export function PasswordField({ label, name, autoComplete, hint, error, showRequirements = false }) {
  const id = useId()
  const [visible, setVisible] = useState(false)
  const [capsLock, setCapsLock] = useState(false)
  const [typed, setTyped] = useState('')

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <span className="field-password">
        <input
          id={id}
          name={name}
          type={visible ? 'text' : 'password'}
          autoComplete={autoComplete}
          spellCheck="false"
          autoCapitalize="none"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy(hint && `${id}-hint`, error && `${id}-error`, showRequirements && `${id}-rules`)}
          onKeyUp={(event) => setCapsLock(event.getModifierState?.('CapsLock') ?? false)}
          onBlur={() => setCapsLock(false)}
          onChange={showRequirements ? (event) => setTyped(event.target.value) : undefined}
        />
        <button type="button" className="field-password__toggle" aria-pressed={visible} aria-label={visible ? 'Hide password' : 'Show password'} onClick={() => setVisible((value) => !value)}>
          {visible ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
        </button>
      </span>
      {capsLock && <p className="field-hint field-hint--warning"><Info size={15} aria-hidden="true" /> Caps Lock is on.</p>}
      {hint && <p className="field-hint" id={`${id}-hint`}>{hint}</p>}
      {showRequirements && (
        <ul className="field-rules" id={`${id}-rules`} aria-label="Password requirements">
          {passwordRules.map(([text, test]) => {
            const met = test(typed)
            return <li key={text} data-met={met}>{met ? <CircleCheck size={14} aria-hidden="true" /> : <span className="field-rules__dot" aria-hidden="true" />}{text}<span className="sr-only">{met ? ' (met)' : ' (not met yet)'}</span></li>
          })}
        </ul>
      )}
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </div>
  )
}

export function Checkbox({ name, error, children }) {
  const id = useId()
  return (
    <div className="field field--checkbox">
      <span className="field-check">
        <input id={id} name={name} type="checkbox" aria-invalid={error ? 'true' : undefined} aria-describedby={error ? `${id}-error` : undefined} />
        <label htmlFor={id}>{children}</label>
      </span>
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </div>
  )
}

const bannerIcons = { error: CircleAlert, success: CircleCheck, info: Info }

/** Inline status banner. Errors use role="alert" and take focus when `focus` is set. */
export function FormBanner({ tone = 'info', title, children, focus = false }) {
  const ref = useRef(null)
  const Icon = bannerIcons[tone]
  useEffect(() => {
    if (focus) ref.current?.focus()
  }, [focus])
  return (
    <div ref={ref} className={`form-banner form-banner--${tone}`} role={tone === 'error' ? 'alert' : 'status'} tabIndex={focus ? -1 : undefined}>
      <Icon size={20} aria-hidden="true" />
      <div>{title && <strong>{title}</strong>}{children && <p>{children}</p>}</div>
    </div>
  )
}

/** Full-card result layout used by success and pending presentation states. */
export function StatusPanel({ icon: Icon = CircleCheck, title, children, actions }) {
  return (
    <div className="status-panel" role="status">
      <Icon size={34} aria-hidden="true" />
      <h2>{title}</h2>
      <p>{children}</p>
      {actions && <div className="status-panel__actions">{actions}</div>}
    </div>
  )
}
