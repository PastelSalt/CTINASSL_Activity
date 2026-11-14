import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, AudioWaveform, BookOpen, Calendar, Check, Code, FlaskConical, Play, ShieldCheck, Sparkles } from 'lucide-react'
import { gsap } from 'gsap'
import PublicHeader from '../../components/public/PublicHeader'
import PublicFooter from '../../components/public/PublicFooter'
import { Depth, Words } from '../../components/motion/Motion'
import { usePageMeta } from '../../hooks/usePageMeta'
import { initLandingMotion } from './landingMotion'
import '../../styles/motion.css'
import '../../styles/landing.css'

const sections = [
  { id: 'story', label: 'Story' },
  { id: 'traceability', label: 'Traceability' },
  { id: 'tour', label: 'Inside' },
  { id: 'lifecycle', label: 'Lifecycle' },
  { id: 'possibilities', label: 'Possibilities' },
]

const chain = ['Objective', 'Requirement', 'Milestone', 'Task', 'Revision', 'Deliverable']

// Sample thread used by the interactive traceability section. All content is illustrative.
const stages = [
  { label: 'Objective', title: 'Ship a welcoming first chapter', meta: ['Project Garden', 'Creative'], why: 'The reason the work exists at all.', next: 'It becomes requirements you can actually check.' },
  { label: 'Requirement', title: 'REQ-001 · Opening scene sets the tone', meta: ['In progress', 'Unverified'], why: 'It answers the objective in a testable way.', next: 'It becomes a milestone and the tasks that deliver it.' },
  { label: 'Milestone', title: 'Chapter one review', meta: ['Due 13 Nov', 'High priority'], why: 'A checkpoint where the requirement is judged.', next: 'It breaks down into tasks with owners and dates.' },
  { label: 'Task', title: 'Review opening scene notes', meta: ['In progress', 'Assigned to Mika'], why: 'The next piece of work that moves the milestone.', next: 'It produces recorded revisions.' },
  { label: 'Revision', title: 'Opening brief · v3 → v4', meta: ['Pending review', 'Linked to the task'], why: 'A recorded change you can trace back to its task.', next: 'It rolls up into a deliverable.' },
  { label: 'Deliverable', title: 'Chapter one script', meta: ['Delivered', 'Satisfies REQ-001'], why: 'What the work became.', next: 'The loop closes: the objective is met, with proof.' },
]

const lifecycleSteps = [
  ['Concept', 'Name the idea and give it a direction.'],
  ['Requirements', 'Make the intended outcome clear.'],
  ['Milestones', 'Turn direction into meaningful checkpoints.'],
  ['Tasks', 'Move the next piece of work forward.'],
  ['Revisions', 'See what changed and why.'],
  ['Deliverables', 'Preserve what the work became.'],
]

const worlds = [
  { icon: Code, title: 'Software', text: 'Shape requirements into reliable releases.', chain: ['Requirement', 'Task', 'Release'], out: 'A tagged release you can trace to its requirements' },
  { icon: BookOpen, title: 'Creative', text: 'Carry ideas from worldbuilding to finished scenes.', chain: ['Outline', 'Scene draft', 'Script'], out: 'A finished chapter with its drafts on record' },
  { icon: FlaskConical, title: 'Research', text: 'Connect questions, methods, findings, and deliverables.', chain: ['Question', 'Interviews', 'Findings'], out: 'A report whose claims point to evidence' },
  { icon: AudioWaveform, title: 'Multimedia', text: 'Keep assets, reviews, and versions moving together.', chain: ['Brief', 'Edit pass', 'Master'], out: 'A final cut with every review attached' },
]

function ThreadMark({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 320 180" aria-hidden="true">
      <path d="M8 128C48 34 85 34 121 112s62 91 91 14 57-95 100-40" />
      <path d="M8 74c44 76 77 72 113 8s65-77 96-3 55 74 95 39" />
      <circle cx="8" cy="128" r="6" />
      <circle cx="312" cy="86" r="6" />
    </svg>
  )
}

const Pill = ({ tone = 'neutral', children }) => <span className={`pill pill--${tone}`}>{children}</span>

function HeroScene() {
  return (
    <div className="scene" role="img" aria-label="Illustration of the Tsumugi workspace using sample content">
      <Depth d={-14} speed={60}><div className="scene__orb scene__orb--pink" /></Depth>
      <Depth d={12} speed={-90}><div className="scene__orb scene__orb--blue" /></Depth>
      <Depth d={-4} speed={40}><ThreadMark className="scene__thread" /></Depth>
      <Depth d={6} speed={80}>
        <div className="scene__window">
          <div className="mock-bar"><i /><i /><i /><span>project garden · tasks · sample</span></div>
          <div className="mock-body">
            <div className="mock-rail"><b /><b /><b /><b /><b /></div>
            <div className="mock-main">
              <div className="mock-stats"><div><strong>12</strong><span>Open</span></div><div><strong>2</strong><span>Overdue</span></div><div><strong>1</strong><span>Blocked</span></div></div>
              <ul className="mock-rows">
                <li><i className="dot dot--progress" /><span>Review opening scene notes</span><Pill tone="warning">Today</Pill></li>
                <li><i className="dot dot--danger" /><span>Write character profiles</span><Pill tone="danger">Overdue</Pill></li>
                <li><i className="dot dot--success" /><span>Lock outline v2</span><Pill tone="success">Done</Pill></li>
              </ul>
              <div className="mock-chain">{chain.map((c) => <span key={c}>{c}</span>)}</div>
            </div>
          </div>
        </div>
      </Depth>
      <Depth d={22} speed={150}><div className="scene__float scene__float--a"><ShieldCheck size={16} aria-hidden="true" /> REQ-001 verified</div></Depth>
      <Depth d={-18} speed={60}><div className="scene__float scene__float--b"><Calendar size={16} aria-hidden="true" /> Chapter one review · tomorrow</div></Depth>
      <Depth d={16} speed={110}><div className="scene__float scene__float--c"><Check size={16} aria-hidden="true" /> Revision approved · v4</div></Depth>
    </div>
  )
}

function Ticker() {
  const row = chain.flatMap((item) => [<span key={item}>{item}</span>, <i key={`${item}-a`} aria-hidden="true">→</i>])
  return (
    <div className="ticker" aria-label="The thread: objective, requirement, milestone, task, revision, deliverable">
      <div className="ticker__track">
        <div className="ticker__row">{row}</div>
        <div className="ticker__row" aria-hidden="true">{row}</div>
      </div>
    </div>
  )
}

function Scraps() {
  const scraps = ['Notes in one app', 'Files in another', 'Tasks somewhere else', 'The “why” in a chat from March']
  return (
    <div className="scraps" aria-hidden="true">
      <ThreadMark className="scraps__thread" />
      {scraps.map((text, i) => <div className={`scrap scrap--${i + 1}`} key={text}>{text}</div>)}
      <div className="scraps__one"><Sparkles size={18} /> One thread</div>
    </div>
  )
}

function TraceExplorer({ pinned, scrollStage }) {
  const [local, setLocal] = useState(1)
  const [auto, setAuto] = useState(true)
  const [manual, setManual] = useState(null)
  const rootRef = useRef(null)
  // While the section is pinned, scrolling picks the stage; a click wins until the scroll moves to another stage.
  const active = pinned ? (manual && manual.base === scrollStage ? manual.index : scrollStage) : local

  useEffect(() => {
    if (pinned || !auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    let timer = 0
    const observer = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer)
      if (entry.isIntersecting) timer = window.setInterval(() => setLocal((i) => (i + 1) % stages.length), 3200)
    }, { threshold: 0.4 })
    observer.observe(rootRef.current)
    return () => { observer.disconnect(); window.clearInterval(timer) }
  }, [auto, pinned])

  const choose = (index) => {
    if (pinned) setManual({ base: scrollStage, index })
    else { setAuto(false); setLocal(index) }
  }
  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { event.preventDefault(); choose((active + 1) % stages.length) }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { event.preventDefault(); choose((active + stages.length - 1) % stages.length) }
  }
  const stage = stages[active]

  return (
    <div className={pinned ? 'trace-x trace-x--pinned' : 'trace-x'} ref={rootRef}>
      <ol className="trace-x__nodes" aria-label="Stages of a sample thread" onKeyDown={onKeyDown}>
        {stages.map((s, i) => (
          <li key={s.label}>
            <button type="button" className={`trace-node ${i < active ? 'is-past' : ''}`} aria-pressed={i === active} onClick={() => choose(i)} onFocus={() => setAuto(false)}>
              <span className="trace-node__knot">{i + 1}</span>
              <span className="trace-node__label">{s.label}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="trace-card" aria-live="polite">
        <p className="trace-card__kicker">{stage.label} · sample from Project Garden</p>
        <h3>{stage.title}</h3>
        <p className="trace-card__meta">{stage.meta.map((m) => <Pill key={m} tone={m.includes('Pending') || m.includes('Due') ? 'warning' : m.includes('Delivered') || m.includes('Satisf') ? 'success' : 'neutral'}>{m}</Pill>)}</p>
        <dl className="trace-card__why">
          <div><dt>Why it exists</dt><dd>{stage.why}</dd></div>
          <div><dt>What it becomes</dt><dd>{stage.next}</dd></div>
        </dl>
      </div>
    </div>
  )
}

const tourTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'trace', label: 'Requirements' },
]

function TourScreen({ id }) {
  if (id === 'overview') {
    return (
      <div className="mock-screen">
        <div className="mock-stats mock-stats--4"><div><strong>12</strong><span>Open tasks</span></div><div><strong>6</strong><span>Due this week</span></div><div><strong>2</strong><span>Overdue</span></div><div><strong>1</strong><span>Active projects</span></div></div>
        <p className="mock-title">Needs attention</p>
        <ul className="mock-rows">
          <li><i className="dot dot--danger" /><span>Write character profiles</span><Pill tone="danger">Overdue</Pill></li>
          <li><i className="dot dot--danger" /><span>Map sign-in states</span><Pill tone="danger">Blocked</Pill></li>
          <li><i className="dot dot--progress" /><span>Review opening scene notes</span><Pill tone="warning">Due today</Pill></li>
        </ul>
      </div>
    )
  }
  if (id === 'tasks') {
    const cols = [['To do', ['Reconcile character names', 'Proof dialogue']], ['In progress', ['Review opening scene notes', 'Write character profiles']], ['In review', ['Collect reference art']]]
    return (
      <div className="mock-screen mock-board">
        {cols.map(([name, cards]) => (
          <div key={name}><p className="mock-title">{name} <span>{cards.length}</span></p>{cards.map((c) => <div className="mock-card" key={c}>{c}<Pill tone={name === 'In review' ? 'warning' : name === 'To do' ? 'info' : 'progress'}>{name}</Pill></div>)}</div>
        ))}
      </div>
    )
  }
  return (
    <div className="mock-screen">
      <p className="mock-title">Traceability matrix</p>
      <div className="mock-matrix">
        <div className="mock-matrix__head"><span>Requirement</span><span>Milestone</span><span>Tasks</span><span>Deliverable</span></div>
        <div><b>REQ-001 Opening scene sets the tone</b><span>Chapter one review</span><span>2 tasks</span><span>Chapter one script</span></div>
        <div><b>REQ-002 Names stay consistent</b><span>Character bible</span><span>2 tasks</span><span className="gap">No deliverable</span></div>
        <div><b>REQ-003 PDF export in 10 s</b><span>Chapter two draft</span><span className="gap">No task</span><span className="gap">No deliverable</span></div>
      </div>
    </div>
  )
}

function Tour() {
  const [tab, setTab] = useState('overview')
  const windowRef = useRef(null)

  // Entering content staggers in whenever the tab changes (skipped for reduced motion and on first render).
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !windowRef.current) return undefined
    const context = gsap.context(() => {
      gsap.from('.mock-stats div, .mock-rows li, .mock-card, .mock-matrix > div', { y: 18, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out', clearProps: 'all' })
    }, windowRef)
    return () => context.revert()
  }, [tab])

  const onKeyDown = (event) => {
    const index = tourTabs.findIndex((t) => t.id === tab)
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    event.preventDefault()
    const next = tourTabs[(index + step + tourTabs.length) % tourTabs.length].id
    setTab(next)
    document.getElementById(`tour-tab-${next}`)?.focus()
  }
  return (
    <div className="tour">
      <div className="tour__tabs" role="tablist" aria-label="Product tour" onKeyDown={onKeyDown}>
        {tourTabs.map((t) => <button type="button" role="tab" id={`tour-tab-${t.id}`} aria-selected={tab === t.id} aria-controls="tour-panel" tabIndex={tab === t.id ? 0 : -1} onClick={() => setTab(t.id)} key={t.id}>{t.label}</button>)}
      </div>
      <div className="tour__window" ref={windowRef} role="tabpanel" id="tour-panel" aria-labelledby={`tour-tab-${tab}`}>
        <div className="mock-bar"><i /><i /><i /><span>{tab} · sample data</span></div>
        <TourScreen id={tab} />
      </div>
    </div>
  )
}

export default function LandingPage() {
  usePageMeta({ title: 'Tsumugi | Weaving ideas into finished work', robots: 'index, follow' })
  const [activeSection, setActiveSection] = useState('story')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [pinned, setPinned] = useState(false)
  const [scrollStage, setScrollStage] = useState(0)
  const mainRef = useRef(null)
  const heroRef = useRef(null)

  useEffect(() => {
    let frame = 0
    const updateProgress = () => {
      frame = 0
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0
      // Bounding boxes (not offsets) so pinned sections report their real on-screen position.
      const current = sections.map(({ id }) => document.getElementById(id)).filter(Boolean).filter((s) => s.getBoundingClientRect().top <= 180).at(-1)
      setScrollProgress(progress * 100)
      setActiveSection(current?.id || sections[0].id)
    }
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(updateProgress) }
    updateProgress()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  // Pointer parallax for the hero scene: fine pointers only, never with reduced motion.
  useEffect(() => {
    const hero = heroRef.current
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!hero || !canHover || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    let frame = 0
    const move = (event) => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const box = hero.getBoundingClientRect()
        hero.style.setProperty('--px', ((event.clientX - box.left) / box.width - 0.5) * 2)
        hero.style.setProperty('--py', ((event.clientY - box.top) / box.height - 0.5) * 2)
      })
    }
    const leave = () => { hero.style.setProperty('--px', 0); hero.style.setProperty('--py', 0) }
    hero.addEventListener('pointermove', move)
    hero.addEventListener('pointerleave', leave)
    return () => { window.cancelAnimationFrame(frame); hero.removeEventListener('pointermove', move); hero.removeEventListener('pointerleave', leave) }
  }, [])

  // Scroll-driven motion (smooth scroll, pins, scrubs). Created once and reverted on unmount.
  useLayoutEffect(() => initLandingMotion({ scope: mainRef, onStage: setScrollStage, onPinned: setPinned }), [])

  return (
    <main ref={mainRef}>
      <a className="skip-link" href="#content">Skip to content</a>
      <div className="cursor" aria-hidden="true"><span /></div>
      <svg className="page-thread" viewBox="0 0 40 1000" preserveAspectRatio="none" aria-hidden="true">
        <path d="M20 0C40 90 0 170 20 260S40 430 20 520 0 690 20 780s20 120 0 220" />
      </svg>
      <span className="page-thread__dot" aria-hidden="true" />
      <PublicHeader variant="landing" sections={sections} activeSection={activeSection} progress={scrollProgress} />

      <section className="hero" id="top" aria-labelledby="hero-title" ref={heroRef}>
        <div className="hero__inner section-shell">
          <div className="hero__copy">
            <p className="eyebrow"><Sparkles size={14} strokeWidth={2.5} aria-hidden="true" /> Creative &amp; technical production management</p>
            <h1 id="hero-title"><Words text="Weaving ideas into" /> <em><Words text="finished work." /></em></h1>
            <p className="hero__lead">Tsumugi brings projects, requirements, milestones, tasks, assets, and revisions into one living thread — so you can always see why a piece of work exists and what it became.</p>
            <div className="hero__actions">
              <a className="button button--primary" href="/register">Create your workspace <ArrowUpRight size={17} strokeWidth={2.5} aria-hidden="true" /></a>
              <a className="button button--secondary" href="/home"><Play size={15} strokeWidth={2.5} aria-hidden="true" /> Explore the demo</a>
            </div>
            <ul className="hero__facts">
              <li><Check size={15} strokeWidth={3} aria-hidden="true" /> Early preview with sample data</li>
              <li><Check size={15} strokeWidth={3} aria-hidden="true" /> No sign-in needed to look around</li>
            </ul>
          </div>
          <HeroScene />
        </div>
        <a className="hero__scroll" href="#story">Scroll to explore <ArrowDown size={15} strokeWidth={2.5} aria-hidden="true" /></a>
      </section>

      <Ticker />

      <div id="content">
        <section className="story section-shell" id="story" aria-labelledby="story-title">
          <div className="story__copy">
            <p className="eyebrow" data-reveal>A workspace for the whole making</p>
            <h2 id="story-title" data-split><Words text="The work is more than a checklist." /></h2>
            <p data-reveal>Every project has a reason, a rhythm, and a record of how it became real. Tsumugi helps you hold those pieces together, whether you are shipping software, writing a story, researching a question, or making something entirely your own.</p>
            <p data-reveal>Notes in one place, files in another, tasks somewhere else — and the reason behind it all lost along the way. Tsumugi ties them back into a single thread.</p>
          </div>
          <Scraps />
        </section>

        <section className="traceability section-shell" id="traceability" aria-labelledby="traceability-title">
          <div className="traceability__copy">
            <p className="eyebrow" data-reveal>The Tsumugi difference</p>
            <h2 id="traceability-title" data-split><Words text="See the why behind the work." /></h2>
            <p data-reveal>Traceability turns scattered activity into a story you can follow. {pinned ? 'Scroll to step through' : 'Pick a stage to see'} how one objective becomes a requirement, a milestone, a task, a revision, and a deliverable.</p>
          </div>
          <TraceExplorer pinned={pinned} scrollStage={scrollStage} />
        </section>

        <section className="tour-section section-shell" id="tour" aria-labelledby="tour-title">
          <div className="section-heading">
            <p className="eyebrow" data-reveal>A look inside</p>
            <h2 id="tour-title" data-split><Words text="One calm place for the whole thread." /></h2>
            <p data-reveal>Overview, tasks, and a traceability matrix that shows exactly where a requirement has no work behind it yet. The screens below use sample data.</p>
          </div>
          <Tour />
        </section>

        <section className="lifecycle section-shell" id="lifecycle" aria-labelledby="lifecycle-title">
          <div className="section-heading">
            <p className="eyebrow" data-reveal>From first thought to final form</p>
            <h2 id="lifecycle-title" data-split><Words text="Let every step have a place." /></h2>
          </div>
          <ol className="lifecycle__track">
            {lifecycleSteps.map(([step, description], index) => (
              <li className={`lifecycle-card lifecycle-card--${(index % 4) + 1}`} key={step}>
                <span className="lifecycle-card__knot" aria-hidden="true">{index + 1}</span>
                <h3>{step}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="possibilities section-shell" id="possibilities" aria-labelledby="possibilities-title">
          <div className="section-heading">
            <p className="eyebrow" data-reveal>Made for different kinds of making</p>
            <h2 id="possibilities-title" data-split><Words text="One thread. Many worlds." /></h2>
          </div>
          <div className="possibilities__grid">
            {worlds.map(({ icon: Icon, title, text, chain: steps, out }, index) => (
              <article className={`world-card world-card--${index + 1}`} key={title}>
                <span className="world-card__icon"><Icon size={26} strokeWidth={2.2} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
                <ol className="world-card__chain" aria-label={`Example thread for ${title}`}>
                  {steps.map((s) => <li key={s}>{s}</li>)}
                </ol>
                <p className="world-card__out"><strong>Becomes:</strong> {out}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="closing" aria-labelledby="closing-title">
          <ThreadMark className="closing__thread" />
          <div className="closing__body section-shell">
            <p className="eyebrow" data-reveal>Your next thread starts here</p>
            <h2 id="closing-title" data-split><Words text="Make room for the work that matters." /></h2>
            <div className="closing__actions">
              <a className="button button--primary" href="/register">Create your workspace <ArrowUpRight size={17} strokeWidth={2.5} aria-hidden="true" /></a>
              <a className="button button--ghost" href="/home">Explore the demo</a>
              <a className="text-link" href="/login">Log in</a>
            </div>
            <p className="closing__note">Early preview · sample data · nothing is saved</p>
          </div>
        </section>
      </div>

      <PublicFooter variant="full" />
    </main>
  )
}
