import { Calendar, Check, ShieldCheck, Sparkles } from 'lucide-react'
import { Depth } from '../../components/motion/Motion'

const content = {
  login: {
    bar: 'welcome back · sample',
    rows: [['progress', 'Review opening scene notes', 'Today', 'warning'], ['danger', 'Write character profiles', 'Overdue', 'danger'], ['success', 'Lock outline v2', 'Done', 'success']],
    chips: [[ShieldCheck, 'REQ-001 verified'], [Calendar, 'Review · tomorrow']],
  },
  register: {
    bar: 'your first thread · sample',
    rows: [['info', 'Objective: ship a first chapter', 'Idea', 'info'], ['progress', 'Requirement: set the tone', 'Draft', 'progress'], ['neutral', 'Task: outline chapter one', 'Next', 'warning']],
    chips: [[Sparkles, 'Idea → finished work'], [Check, 'Nothing is saved yet']],
  },
}

/** Decorative panel beside the form: a small workspace window, floating status chips, and a drawn thread. */
export default function AuthArt({ variant }) {
  const { bar, rows, chips } = content[variant]
  const [[IconA, labelA], [IconB, labelB]] = chips
  return (
    <div className={`auth-art auth-art--${variant}`} role="img" aria-label="Illustration of a Tsumugi thread using sample content">
      <Depth d={-12}><div className="auth-art__orb" /></Depth>
      <Depth d={-4}>
        <svg className="auth-art__thread" viewBox="0 0 360 260" aria-hidden="true">
          <path d="M10 190C60 60 110 70 150 160s70 100 100 20 60-110 100-50" />
          <path d="M10 120c46 78 80 74 116 8s66-80 98-4 58 76 126 34" />
          <circle cx="10" cy="190" r="7" /><circle cx="350" cy="130" r="7" />
        </svg>
      </Depth>
      <Depth d={8}>
        <div className="auth-art__window">
          <div className="auth-art__bar"><i /><i /><i /><span>{bar}</span></div>
          <ul className="auth-art__rows">
            {rows.map(([dot, text, tag, tone]) => (
              <li key={text}><i className={`adot adot--${dot}`} /><span>{text}</span><b className={`apill apill--${tone}`}>{tag}</b></li>
            ))}
          </ul>
        </div>
      </Depth>
      <Depth d={20}><div className="auth-art__chip auth-art__chip--a"><IconA size={15} aria-hidden="true" /> {labelA}</div></Depth>
      <Depth d={-16}><div className="auth-art__chip auth-art__chip--b"><IconB size={15} aria-hidden="true" /> {labelB}</div></Depth>
    </div>
  )
}
