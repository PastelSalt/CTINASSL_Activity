import { useEffect, useLayoutEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, Menu, Sparkles, X } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { authRoutes, workspaceRoutes, policyRoutes } from './pages'
import '@fontsource/fredoka/400.css'
import '@fontsource/fredoka/500.css'
import '@fontsource/fredoka/600.css'
import '@fontsource/fredoka/700.css'

gsap.registerPlugin(ScrollTrigger)

const sections = [
  { id: 'story', label: 'Story' },
  { id: 'traceability', label: 'Traceability' },
  { id: 'lifecycle', label: 'Lifecycle' },
  { id: 'possibilities', label: 'Possibilities' },
]

const projectTypes = [
  ['Software', 'Shape requirements into reliable releases.'],
  ['Creative', 'Carry ideas from worldbuilding to finished scenes.'],
  ['Research', 'Connect questions, methods, findings, and deliverables.'],
  ['Multimedia', 'Keep assets, reviews, and versions moving together.'],
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

function ProductPreview() {
  return (
    <div className="preview-card" aria-label="Illustrated preview of a Tsumugi project workspace">
      <div className="preview-card__topline">
        <span className="preview-card__dot preview-card__dot--pink" />
        <span className="preview-card__dot preview-card__dot--blue" />
        <span className="preview-card__dot preview-card__dot--yellow" />
        <span className="preview-card__label">project / garden</span>
      </div>
      <div className="preview-card__body">
        <div className="preview-card__heading">
          <span className="eyebrow">ACTIVE THREAD</span>
          <strong>Build a world that holds together.</strong>
          <small className="preview-card__context">Objective: create a welcoming first chapter</small>
        </div>
        <div className="preview-card__flow">
          <span>Objective</span>
          <i />
          <span>Milestone</span>
          <i />
          <span>Requirement</span>
          <i />
          <span className="preview-card__flow--active">Deliverable</span>
        </div>
        <div className="preview-card__rows">
          <div><span className="preview-card__bar preview-card__bar--long" /><small>Requirement linked</small></div>
          <div><span className="preview-card__bar preview-card__bar--medium" /><small>Milestone in progress</small></div>
          <div><span className="preview-card__bar preview-card__bar--short" /><small>Deliverable ready</small></div>
        </div>
      </div>
    </div>
  )
}

function LandingPage() {
  const [activeSection, setActiveSection] = useState('story')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0
      const sectionThreshold = window.scrollY + 180
      const currentSection = [...sections]
        .map(({ id }) => document.getElementById(id))
        .filter(Boolean)
        .filter((section) => section.offsetTop <= sectionThreshold)
        .at(-1)

      setScrollProgress(progress * 100)
      setActiveSection(currentSection?.id || sections[0].id)
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
      document.documentElement.style.setProperty('--scroll-progress', `${progress}`)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add({
        reduce: '(prefers-reduced-motion: reduce)',
        mobile: '(max-width: 620px)',
        desktop: '(min-width: 621px)',
      }, ({ conditions }) => {
        const { reduce, mobile } = conditions

        if (reduce) {
          gsap.set('.reveal', { clearProps: 'all' })
          gsap.set('.thread-mark path, .closing__thread path', { clearProps: 'all' })
          return
        }

        gsap.fromTo('.intro, .traceability__copy, .section-heading', {
          y: 42,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: '#content',
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.from('.hero__copy > *, .hero__actions > *', {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'back.out(1.4)',
          delay: 0.15,
        })

        gsap.from('.preview-card__heading > *, .preview-card__flow > *, .preview-card__rows > div', {
          y: 16,
          opacity: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.45,
        })

        gsap.from('.preview-card', {
          y: mobile ? 18 : 34,
          rotation: mobile ? 1 : 3,
          duration: 1.1,
          ease: 'back.out(1.2)',
          delay: 0.25,
        })

        gsap.to('.preview-card', {
          y: mobile ? -8 : -18,
          rotation: mobile ? 1 : 2,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        })

        gsap.to('.thread-mark', {
          y: mobile ? -12 : -28,
          x: mobile ? 4 : 12,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })

        gsap.utils.toArray('.thread-mark path, .closing__thread path').forEach((path) => {
          const length = path.getTotalLength()
          gsap.fromTo(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          }, {
            strokeDashoffset: 0,
            duration: 1.4,
            ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: path.closest('section') || '.hero',
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          })
        })

        gsap.fromTo('.chain-item', {
          x: -18,
          opacity: 0,
        }, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: '#traceability',
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.fromTo('.lifecycle-card', {
          y: 32,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          rotation: (index) => index % 2 ? 1 : -1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'back.out(1.3)',
          immediateRender: false,
          scrollTrigger: {
            trigger: '#lifecycle',
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.fromTo('.possibility-card', {
          y: 26,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          rotation: (index) => index % 2 ? 1 : -1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'back.out(1.25)',
          immediateRender: false,
          scrollTrigger: {
            trigger: '#possibilities',
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.fromTo('.closing__thread', {
          scale: 0.88,
          opacity: 0,
        }, {
          scale: 1,
          opacity: 0.22,
          duration: 1.1,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: '.closing',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.fromTo('.closing .button', {
          y: 18,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'back.out(1.4)',
          immediateRender: false,
          scrollTrigger: {
            trigger: '.closing',
            start: 'top 68%',
            toggleActions: 'play none none reverse',
          },
        })
        ScrollTrigger.refresh()
      })
    })

    return () => context.revert()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <main>
      <a className="skip-link" href="#content">Skip to content</a>
      <header className={`site-header ${menuOpen ? 'site-header--open' : ''}`}>
        <nav className="nav-pill" aria-label="Main navigation">
          <a className="brand" href="#top" onClick={closeMenu}>
            <span className="brand__mark">ts</span>
            <span>tsumugi</span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-links"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            <span className="sr-only">Toggle navigation</span>
            {menuOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
          </button>
          <div className={`nav-content ${menuOpen ? 'nav-content--open' : ''}`} id="primary-links">
            <div className="nav-links">
              {sections.map(({ id, label }) => (
                <a
                  className={activeSection === id ? 'nav-link nav-link--active' : 'nav-link'}
                  href={`#${id}`}
                  key={id}
                  aria-current={activeSection === id ? 'true' : undefined}
                  onClick={closeMenu}
                >
                  {label}
                </a>
              ))}
            </div>
            <span className="nav-meter" aria-label={`${Math.round(scrollProgress)} percent page progress`}>
              <span style={{ width: `${scrollProgress}%` }} />
            </span>
            <a className="text-link nav-login" href="/login">Log in</a>
            <a className="button button--small button--dark" href="/register">Create your workspace <ArrowUpRight size={14} strokeWidth={2.5} /></a>
          </div>
        </nav>
      </header>

      <section className="hero section-shell" id="top" aria-labelledby="hero-title">
        <div className="hero__copy reveal">
          <p className="eyebrow"><Sparkles size={14} strokeWidth={2.5} /> Creative &amp; technical production management</p>
          <h1 id="hero-title">Weaving ideas into <em>finished work.</em></h1>
          <p className="hero__lead">
            Tsumugi brings projects, requirements, milestones, tasks, assets, and revisions into one living thread.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="/register">Create your workspace <ArrowUpRight size={17} strokeWidth={2.5} /></a>
            <a className="text-link" href="/login">Log in</a>
            <a className="text-link" href="#lifecycle">Follow the thread <ArrowDown size={16} strokeWidth={2.5} /></a>
          </div>
        </div>
        <div className="hero__visual reveal reveal--delay">
          <div className="hero__orb hero__orb--pink" />
          <div className="hero__orb hero__orb--blue" />
          <ThreadMark className="thread-mark" />
          <ProductPreview />
        </div>
        <p className="hero__scroll-note">Scroll to explore <ArrowDown size={15} strokeWidth={2.5} /></p>
      </section>

      <div id="content">
        <section className="intro section-shell reveal" id="story" aria-labelledby="story-title">
          <p className="eyebrow">A workspace for the whole making</p>
          <h2 id="story-title">The work is more than a checklist.</h2>
          <p>
            Every project has a reason, a rhythm, and a record of how it became real. Tsumugi helps you hold those
            pieces together, whether you are shipping software, writing a story, researching a question, or making
            something entirely your own.
          </p>
        </section>

        <section className="traceability section-shell" id="traceability" aria-labelledby="traceability-title">
          <div className="traceability__copy reveal">
            <p className="eyebrow">The Tsumugi difference</p>
            <h2 id="traceability-title">See the why behind the work.</h2>
            <p>
              Traceability turns scattered activity into a story you can understand. Follow an outcome from its
              original objective to the requirement, task, revision, and deliverable that answer it.
            </p>
            <button className="text-link text-link--button" type="button">See how it connects <ArrowUpRight size={16} strokeWidth={2.5} /></button>
          </div>
          <div className="traceability__chain reveal reveal--delay" aria-label="Traceability chain">
            {['Objective', 'Requirement', 'Milestone', 'Task', 'Revision', 'Deliverable'].map((item, index) => (
              <div className="chain-item" key={item}>
                <span>{item}</span>
                {index < 5 && <i aria-hidden="true">→</i>}
              </div>
            ))}
          </div>
        </section>

        <section className="lifecycle section-shell" id="lifecycle" aria-labelledby="lifecycle-title">
          <div className="section-heading reveal">
            <p className="eyebrow">From first thought to final form</p>
            <h2 id="lifecycle-title">Let every step have a place.</h2>
          </div>
          <div className="lifecycle__track">
            {['Concept', 'Requirements', 'Milestones', 'Tasks', 'Revisions', 'Deliverables'].map((step, index) => (
              <article className="lifecycle-card reveal" key={step} style={{ '--delay': `${index * 80}ms` }}>
                <span className="lifecycle-card__number">0{index + 1}</span>
                <h3>{step}</h3>
                <p>{[
                  'Name the idea and give it a direction.',
                  'Make the intended outcome clear.',
                  'Turn direction into meaningful checkpoints.',
                  'Move the next piece of work forward.',
                  'See what changed and why.',
                  'Preserve what the work became.',
                ][index]}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="possibilities section-shell" id="possibilities" aria-labelledby="possibilities-title">
          <div className="section-heading reveal">
            <p className="eyebrow">Made for different kinds of making</p>
            <h2 id="possibilities-title">One thread. Many worlds.</h2>
          </div>
          <div className="possibilities__grid">
            {projectTypes.map(([title, description], index) => (
              <article className={`possibility-card possibility-card--${index + 1} reveal`} key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <i aria-hidden="true"><ArrowUpRight size={20} strokeWidth={2.5} /></i>
              </article>
            ))}
          </div>
        </section>

        <section className="closing section-shell reveal" aria-labelledby="closing-title">
          <ThreadMark className="closing__thread" />
          <p className="eyebrow">Your next thread starts here</p>
          <h2 id="closing-title">Make room for the work that matters.</h2>
          <a className="button button--primary" href="/register">Create your workspace <ArrowUpRight size={17} strokeWidth={2.5} /></a>
        </section>
      </div>

      <footer className="footer section-shell">
        <div className="brand"><span className="brand__mark">ts</span><span>tsumugi</span></div>
        <p>Weaving ideas into finished work.</p>
        <div className="footer__auth" aria-label="Authentication">
          <a className="text-link" href="/login">Log in</a>
          <a className="text-link" href="/register">Create account</a>
        </div>
        <nav className="footer__legal" aria-label="Legal policies">
          <span className="footer__legal-label">Legal</span>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
          <a href="/cookie-and-local-storage-policy">Cookie &amp; Local Storage</a>
        </nav>
        <span className="footer__credit">A Moeko Works project</span>
      </footer>
    </main>
  )
}

function App() {
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/'
  const PolicyRoute = policyRoutes[currentPath]
  const AuthRoute = authRoutes[currentPath]
  const WorkspaceRoute = workspaceRoutes[currentPath]
  if (PolicyRoute) return <PolicyRoute />
  if (AuthRoute) return <AuthRoute />
  if (WorkspaceRoute) return <WorkspaceRoute currentPath={currentPath} />
  return <LandingPage />
}

export default App