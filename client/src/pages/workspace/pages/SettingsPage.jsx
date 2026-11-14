import { useState } from 'react'
import { Bell, Lock, Palette, Scale, SlidersHorizontal, User } from 'lucide-react'
import { TextField } from '../../../components/forms/forms'
import { legalLinks } from '../../../components/public/legalLinks'
import { useQueryParam } from '../../../hooks/useQueryParam'
import { PageHeader, PreviewAction, ViewTabs } from '../components/layout'
import { StateGate } from '../components/states'
import '../../../styles/forms.css'

const GROUPS = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'workspace', label: 'Workspace', icon: SlidersHorizontal },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'privacy', label: 'Privacy & legal', icon: Scale },
  { id: 'security', label: 'Security', icon: Lock },
]

const DEFAULTS = {
  name: 'Demo user', swatch: 'pink', view: 'list', category: 'Creative', weekStart: 'Monday',
  reminders: true, reviews: true, mentions: true, digest: false, delivery: 'in-app', density: 'comfortable', textSize: 'medium', motion: 'system',
}

function Toggle({ label, help, checked, onChange }) {
  return (
    <div className="setting">
      <div><strong>{label}</strong>{help && <p>{help}</p>}</div>
      <button type="button" role="switch" aria-checked={checked} aria-label={label} className="switch" onClick={() => onChange(!checked)}><span /></button>
    </div>
  )
}

function Segmented({ label, help, value, options, onChange }) {
  return (
    <div className="setting">
      <div><strong id={`seg-${label}`}>{label}</strong>{help && <p>{help}</p>}</div>
      <span className="toggle" role="radiogroup" aria-labelledby={`seg-${label}`}>
        {options.map(([id, text]) => <button type="button" role="radio" aria-checked={value === id} aria-pressed={value === id} onClick={() => onChange(id)} key={id}>{text}</button>)}
      </span>
    </div>
  )
}

function SelectRow({ label, help, value, options, onChange }) {
  return (
    <div className="setting">
      <div><label htmlFor={`sel-${label}`}><strong>{label}</strong></label>{help && <p>{help}</p>}</div>
      <select id={`sel-${label}`} className="ws-select" value={value} onChange={(e) => onChange(e.target.value)}>{options.map((o) => <option key={o}>{o}</option>)}</select>
    </div>
  )
}

export default function SettingsPage() {
  const [group, setGroup] = useQueryParam('view', 'account')
  const [prefs, setPrefs] = useState(DEFAULTS)
  const set = (key) => (value) => setPrefs((p) => ({ ...p, [key]: value }))
  const edited = Object.keys(DEFAULTS).filter((k) => prefs[k] !== DEFAULTS[k])
  const mark = (...keys) => keys.some((k) => edited.includes(k)) && <span className="edited">Edited</span>

  let content
  if (group === 'workspace') {
    content = (
      <section className="settings-card" aria-labelledby="g-workspace"><h2 id="g-workspace">Workspace {mark('view', 'category', 'weekStart')}</h2>
        <Segmented label="Default view" help="Used when a page offers a list and a board." value={prefs.view} options={[['list', 'List'], ['board', 'Board']]} onChange={set('view')} />
        <SelectRow label="Default project category" value={prefs.category} options={['Creative', 'Software', 'Research']} onChange={set('category')} />
        <SelectRow label="Week starts on" value={prefs.weekStart} options={['Monday', 'Sunday']} onChange={set('weekStart')} />
      </section>
    )
  } else if (group === 'notifications') {
    content = (
      <section className="settings-card" aria-labelledby="g-notif"><h2 id="g-notif">Notifications {mark('reminders', 'reviews', 'mentions', 'digest', 'delivery')}</h2>
        <Toggle label="Task reminders" help="A reminder before a task is due." checked={prefs.reminders} onChange={set('reminders')} />
        <Toggle label="Review requests" help="When a revision needs your review." checked={prefs.reviews} onChange={set('reviews')} />
        <Toggle label="Mentions" help="When someone mentions you." checked={prefs.mentions} onChange={set('mentions')} />
        <Toggle label="Weekly digest" help="A summary of workspace activity." checked={prefs.digest} onChange={set('digest')} />
        <Segmented label="Delivery" value={prefs.delivery} options={[['in-app', 'In-app'], ['email', 'Email']]} onChange={set('delivery')} />
      </section>
    )
  } else if (group === 'appearance') {
    content = (
      <section className="settings-card" aria-labelledby="g-look"><h2 id="g-look">Appearance {mark('density', 'textSize', 'motion')}</h2>
        <Segmented label="Density" value={prefs.density} options={[['comfortable', 'Comfortable'], ['compact', 'Compact']]} onChange={set('density')} />
        <Segmented label="Text size" value={prefs.textSize} options={[['small', 'S'], ['medium', 'M'], ['large', 'L']]} onChange={set('textSize')} />
        <Segmented label="Reduced motion" help="System follows your device setting." value={prefs.motion} options={[['system', 'System'], ['on', 'On'], ['off', 'Off']]} onChange={set('motion')} />
        <div className={`sample sample--${prefs.density} sample--${prefs.textSize}`} aria-label="Preview of the chosen density and text size">
          <p className="eyebrow">Sample</p><strong>Review opening scene notes</strong><span>Project Garden · due tomorrow</span><span>This sample changes here only; the rest of the app is unchanged.</span>
        </div>
      </section>
    )
  } else if (group === 'privacy') {
    content = (
      <section className="settings-card" aria-labelledby="g-priv"><h2 id="g-priv">Privacy &amp; legal</h2>
        <p>The demo stores nothing in your browser: no cookies, no local or session storage. Controls on this page reset when you reload.</p>
        <ul className="legal-list">{legalLinks.map(([href, label]) => <li key={href}><a href={href}>{label}</a></li>)}</ul>
      </section>
    )
  } else if (group === 'security') {
    content = (
      <section className="settings-card settings-card--security" aria-labelledby="g-sec"><h2 id="g-sec"><Lock size={18} aria-hidden="true" /> Security</h2>
        <p>These actions affect your sign-in. In the demo they only show a preview; no password is requested and nothing changes.</p>
        <div className="setting"><div><strong>Password</strong><p>Choose a new password.</p></div><PreviewAction label="Change password" title="Change password" body="A form with your current and new password would open here. The demo never asks for or receives a password." /></div>
        <div className="setting"><div><strong>Sessions</strong><p>Sign out of every device.</p></div><PreviewAction label="Sign out everywhere" title="Sign out of all devices?" body="This would end every active session. Confirmation layout only — nothing is signed out." /></div>
        <div className="setting"><div><strong>Your data</strong><p>Download a copy of your workspace data.</p></div><PreviewAction label="Export my data" title="Export your data" body="A request to export your records would start here. Nothing is exported in the demo." /></div>
        <div className="setting setting--danger"><div><strong>Delete account</strong><p>Permanently remove your account and data.</p></div><PreviewAction label="Delete account" title="Delete your account?" body="This would permanently delete the account and its data. Confirmation layout only — nothing is deleted." /></div>
      </section>
    )
  } else {
    content = (
      <section className="settings-card" aria-labelledby="g-account"><h2 id="g-account">Profile {mark('name', 'swatch')}</h2>
        <div className="setting setting--stack"><TextField label="Display name" name="name" autoComplete="name" value={prefs.name} onChange={(e) => set('name')(e.target.value)} /></div>
        <div className="setting"><div><strong>Avatar color</strong></div>
          <span className="swatches" role="radiogroup" aria-label="Avatar color">{['pink', 'blue', 'yellow', 'lilac'].map((c) => <button type="button" role="radio" aria-checked={prefs.swatch === c} aria-label={c} className={`swatch swatch--${c}`} onClick={() => set('swatch')(c)} key={c} />)}</span>
        </div>
        <div className="setting"><div><strong>Email</strong></div><span className="muted">demo@example.test (read-only)</span></div>
        <div className="setting"><div><strong>Role</strong></div><span className="muted">Workspace member (read-only)</span></div>
      </section>
    )
  }

  return (
    <>
      <PageHeader eyebrow="Account" title="Settings" description="Preferences for you and this workspace." />
      <StateGate empty={{ title: 'Settings are unavailable', body: 'Preferences appear once your account is set up.' }}>
        <div className="form-banner form-banner--info" role="note"><span><strong>Preview only.</strong> Changes are not saved and reset when you reload.</span>{edited.length > 0 && <button className="ws-link-button" type="button" onClick={() => setPrefs(DEFAULTS)}>Reset to demo values</button>}</div>
        <div className="settings">
          <ViewTabs tabs={GROUPS} value={group} onChange={setGroup} label="Settings groups" vertical />
          <div className="settings__content">{content}</div>
        </div>
      </StateGate>
    </>
  )
}
