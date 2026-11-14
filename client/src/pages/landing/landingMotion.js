import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Scroll-driven motion for the landing page (PLAN-A-01 section 14).
 *
 * Everything here is presentation only: React owns content and semantic state, and every effect
 * is created inside one gsap.context() so it is reverted on unmount and on breakpoint changes.
 * Under `prefers-reduced-motion` nothing is created and the page renders statically.
 */

const SECTION_WASH = [
  ['top', '#f8f6fb'], ['story', '#fff6da'], ['traceability', '#ffeef7'],
  ['tour', '#eaf5ff'], ['lifecycle', '#f4ecfc'], ['possibilities', '#f8f6fb'],
]
const ANCHORS = new Set(['top', 'story', 'traceability', 'tour', 'lifecycle', 'possibilities'])

const reveal = (trigger, start = 'top 86%') => ({ trigger, start, toggleActions: 'play none none reverse' })

function prepareDraw(selector) {
  return gsap.utils.toArray(selector).map((path) => {
    const length = path.getTotalLength()
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
    return { path, length }
  })
}

export function initLandingMotion({ scope, onStage, onPinned }) {
  const context = gsap.context(() => {
    const media = gsap.matchMedia()

    media.add({
      reduce: '(prefers-reduced-motion: reduce)',
      desktop: '(min-width: 1024px)',
      wide: '(min-width: 1100px)',
      xl: '(min-width: 1280px)',
      tall: '(min-height: 760px)',
      fine: '(hover: hover) and (pointer: fine)',
      mobile: '(max-width: 620px)',
    }, ({ conditions }) => {
      const { reduce, desktop, wide, xl, tall, fine, mobile } = conditions
      if (reduce) return undefined

      const cleanups = []

      /* ---------- Smooth scroll ---------- */
      const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
      lenis.on('scroll', ScrollTrigger.update)
      const tick = (time) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
      cleanups.push(() => { gsap.ticker.remove(tick); gsap.ticker.lagSmoothing(500, 33); lenis.destroy() })

      // In-page links: scroll to the section (or to the start of its pin) with the smooth scroller.
      const onAnchor = (event) => {
        const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null
        if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey) return
        const id = link.getAttribute('href').slice(1)
        if (!ANCHORS.has(id)) return
        const element = id === 'top' ? null : document.getElementById(id)
        if (id !== 'top' && !element) return
        event.preventDefault()
        const pin = ScrollTrigger.getAll().find((trigger) => trigger.pin && trigger.trigger === element)
        const y = id === 'top' ? 0 : pin ? pin.start : element.getBoundingClientRect().top + window.scrollY - 70
        lenis.scrollTo(y, { duration: 1.4 })
      }
      document.addEventListener('click', onAnchor)
      cleanups.push(() => document.removeEventListener('click', onAnchor))

      /* ---------- Hero: staged intro ---------- */
      const intro = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.1 })
      intro
        .from('.hero .eyebrow', { y: 20, opacity: 0, duration: 0.6 })
        .from('.hero h1 .w__in', { yPercent: 115, duration: 1.05, stagger: 0.08 }, '-=0.35')
        .from('.hero__lead, .hero__actions > *, .hero__facts', { y: 28, opacity: 0, duration: 0.7, stagger: 0.09 }, '-=0.7')
        .from('.scene__orb', { scale: 0.4, opacity: 0, duration: 1.1, stagger: 0.12, ease: 'back.out(1.6)' }, 0.2)
        .from('.scene__window', { y: 90, rotation: 5, scale: 0.88, opacity: 0, duration: 1.2, ease: 'back.out(1.3)' }, 0.35)
        .fromTo('.scene__float', { scale: 0.4, opacity: 0, rotation: (i) => [-16, 14, -12][i % 3] }, { scale: 1, opacity: 1, rotation: (i) => [4, -5, 3][i % 3], duration: 0.7, stagger: 0.16, ease: 'back.out(2)' }, 1.05)
      // Failsafe on a plain timer (the animation ticker pauses in background tabs): never leave the hero hidden.
      const failsafe = window.setTimeout(() => intro.progress(1), 5000)
      cleanups.push(() => window.clearTimeout(failsafe))

      const heroPaths = prepareDraw('.scene__thread path')
      heroPaths.forEach(({ path }, i) => gsap.to(path, { strokeDashoffset: 0, duration: 2, delay: 0.5 + i * 0.25, ease: 'power2.inOut' }))
      gsap.to('.scene__float', { yPercent: 7, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: { each: 0.5, from: 'random' } })

      /* ---------- Hero: scroll parallax and fade ---------- */
      const heroScrub = gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 } })
      heroScrub
        .to('.hero__copy', { y: -70, opacity: 0.25, ease: 'none' }, 0)
        .to('.hero__scroll', { opacity: 0, ease: 'none' }, 0)
      gsap.utils.toArray('.drift').forEach((layer) => {
        heroScrub.to(layer, { y: -Number(layer.dataset.speed || 0), ease: 'none' }, 0)
      })

      /* ---------- Ticker: loops, reacts to scroll velocity ---------- */
      const loop = gsap.to('.ticker__track', { xPercent: -50, ease: 'none', duration: 38, repeat: -1 })
      const setSkew = gsap.quickSetter('.ticker__row', 'skewX', 'deg')
      let boost = 0
      let direction = 1
      ScrollTrigger.create({ onUpdate: (self) => { boost = Math.min(Math.abs(self.getVelocity()) / 220, 9); direction = self.direction } })
      const decay = () => {
        boost *= 0.93
        const live = boost > 0.08
        loop.timeScale((live ? direction : 1) * (1 + boost))
        setSkew(live ? -direction * Math.min(boost, 7) * 1.1 : 0)
      }
      gsap.ticker.add(decay)
      cleanups.push(() => gsap.ticker.remove(decay))

      /* ---------- Headings and generic reveals ---------- */
      gsap.utils.toArray('[data-split]').forEach((heading) => {
        gsap.fromTo(heading.querySelectorAll('.w__in'), { yPercent: 115 }, {
          yPercent: 0, duration: 0.95, stagger: 0.06, ease: 'power4.out', immediateRender: false, scrollTrigger: reveal(heading, 'top 88%'),
        })
      })
      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.fromTo(element, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', immediateRender: false, scrollTrigger: reveal(element, 'top 90%') })
      })

      /* ---------- Page-long thread, section colour wash ---------- */
      if (xl) {
        // The needle follows the drawn path itself: its position is read from the path at the scroll progress.
        const [{ path, length }] = prepareDraw('.page-thread path')
        const dot = document.querySelector('.page-thread__dot')
        const state = { p: 0 }
        const render = () => {
          const point = path.getPointAtLength(state.p * length)
          gsap.set(path, { strokeDashoffset: length * (1 - state.p) })
          gsap.set(dot, { x: point.x, y: (point.y / 1000) * window.innerHeight })
        }
        render()
        gsap.to(state, { p: 1, ease: 'none', onUpdate: render, scrollTrigger: { start: 0, end: 'max', scrub: 0.4 } })
      }
      SECTION_WASH.forEach(([id, color]) => {
        const trigger = id === 'top' ? '.hero' : `#${id}`
        ScrollTrigger.create({ trigger, start: 'top 55%', end: 'bottom 55%', onToggle: (self) => { if (self.isActive) gsap.to(document.body, { backgroundColor: color, duration: 0.9, overwrite: 'auto' }) } })
      })
      cleanups.push(() => gsap.set(document.body, { clearProps: 'backgroundColor' }))

      /* ---------- Story: scraps converge onto one thread ---------- */
      const scrapOffsets = { x: [-300, 320, -340, 280], y: [-170, -80, 130, 210], r: [-30, 24, -20, 32] }
      const scrapTurn = [-4, 3, -2, 5]
      const storyPaths = prepareDraw('.scraps__thread path')
      if (desktop) {
        const story = gsap.timeline({ scrollTrigger: { trigger: '#story', id: 'pin-story', start: 'top 70', end: '+=95%', pin: true, scrub: 0.7, anticipatePin: 1 } })
        story
          .from('.scrap', { x: (i) => scrapOffsets.x[i], y: (i) => scrapOffsets.y[i], rotation: (i) => scrapOffsets.r[i], opacity: 0, duration: 1.4, stagger: 0.24, ease: 'power2.out' }, 0)
          .to('.scrap', { rotation: (i) => scrapTurn[i], duration: 0.5 }, '>-0.2')
        storyPaths.forEach(({ path }) => story.to(path, { strokeDashoffset: 0, duration: 1.2, ease: 'none' }, '-=0.3'))
        story.from('.scraps__one', { scale: 0.4, opacity: 0, duration: 0.5, ease: 'back.out(2)' }, '-=0.4')
      } else {
        gsap.from('.scrap', { y: 50, opacity: 0, rotation: (i) => scrapOffsets.r[i], duration: 0.8, stagger: 0.12, ease: 'back.out(1.5)', scrollTrigger: reveal('.scraps', 'top 85%') })
        storyPaths.forEach(({ path }) => gsap.to(path, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.out', scrollTrigger: reveal('.scraps', 'top 70%') }))
        gsap.from('.scraps__one', { scale: 0.5, opacity: 0, duration: 0.6, delay: 0.4, ease: 'back.out(2)', scrollTrigger: reveal('.scraps', 'top 65%') })
      }

      /* ---------- Traceability: scroll steps through the six stages (pinned) ---------- */
      if (desktop && tall) {
        let last = -1
        ScrollTrigger.create({
          trigger: '#traceability', id: 'pin-traceability', start: 'top 70', end: '+=170%', pin: true, anticipatePin: 1,
          onUpdate: (self) => {
            gsap.set('.trace-x', { '--p': self.progress })
            const index = Math.min(5, Math.floor(self.progress * 6))
            if (index !== last) { last = index; onStage(index) }
          },
        })
        onPinned(true)
        cleanups.push(() => onPinned(false))
      }
      gsap.from('.trace-card', { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: reveal('.trace-x', 'top 80%') })

      /* ---------- Tour: window tilts up into place as you arrive ---------- */
      gsap.fromTo('.tour__window', { rotationX: mobile ? 5 : 10, scale: 0.94, y: 40, opacity: 0.4, transformPerspective: 1200, transformOrigin: '50% 0%' }, {
        rotationX: 0, scale: 1, y: 0, opacity: 1, ease: 'none',
        scrollTrigger: { trigger: '.tour__window', start: 'top 95%', end: 'top 40%', scrub: 0.6 },
      })
      gsap.from('.tour__tabs button', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.6)', scrollTrigger: reveal('.tour__tabs', 'top 90%') })

      /* ---------- Lifecycle: thread fills, knots pop ---------- */
      gsap.fromTo('.lifecycle__track', { '--fill': 0 }, { '--fill': 1, ease: 'none', scrollTrigger: { trigger: '.lifecycle__track', start: 'top 72%', end: 'bottom 62%', scrub: 0.6 } })
      gsap.from('.lifecycle-card', { y: 60, opacity: 0, rotation: (i) => (i % 2 ? 3 : -3), duration: 0.9, stagger: 0.14, ease: 'back.out(1.4)', scrollTrigger: reveal('.lifecycle__track', wide ? 'top 78%' : 'top 85%') })
      gsap.from('.lifecycle-card__knot', { scale: 0, duration: 0.6, stagger: 0.14, delay: 0.2, ease: 'back.out(3)', scrollTrigger: reveal('.lifecycle__track', wide ? 'top 78%' : 'top 85%') })

      /* ---------- Possibilities: staggered entrance, drifting columns, tilt ---------- */
      gsap.from('.world-card', { y: 80, opacity: 0, rotation: (i) => (i % 2 ? 4 : -4), scale: 0.94, duration: 1, stagger: 0.14, ease: 'power3.out', scrollTrigger: reveal('.possibilities__grid', 'top 82%') })
      if (desktop) {
        gsap.utils.toArray('.world-card').forEach((card, i) => {
          gsap.to(card, { yPercent: i % 2 ? -7 : 5, ease: 'none', scrollTrigger: { trigger: '.possibilities__grid', start: 'top bottom', end: 'bottom top', scrub: true } })
        })
      }

      /* ---------- Closing: curtain opens, thread draws, actions pop ---------- */
      gsap.fromTo('.closing', { clipPath: 'inset(9% 5% 0% 5% round 56px)' }, {
        clipPath: 'inset(0% 0% 0% 0% round 48px 48px 0 0)', ease: 'none',
        scrollTrigger: { trigger: '.closing', start: 'top 100%', end: 'top 30%', scrub: 0.5 },
      })
      prepareDraw('.closing__thread path').forEach(({ path }) => gsap.to(path, { strokeDashoffset: 0, duration: 2, ease: 'power2.out', scrollTrigger: reveal('.closing', 'top 70%') }))
      gsap.from('.closing__actions > *', { scale: 0.7, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(2)', scrollTrigger: reveal('.closing__actions', 'top 92%') })

      /* ---------- Pointer-only: cursor ring, magnetic buttons, card tilt ---------- */
      if (fine) {
        const cursor = document.querySelector('.cursor')
        if (cursor) {
          gsap.set(cursor, { xPercent: -50, yPercent: -50 })
          const moveX = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' })
          const moveY = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' })
          const onMove = (event) => { moveX(event.clientX); moveY(event.clientY); cursor.classList.add('is-on') }
          const onOver = (event) => cursor.classList.toggle('is-active', Boolean(event.target instanceof Element && event.target.closest('a, button, [role="tab"]')))
          const onLeave = () => cursor.classList.remove('is-on')
          window.addEventListener('pointermove', onMove)
          document.addEventListener('pointerover', onOver)
          document.documentElement.addEventListener('pointerleave', onLeave)
          cleanups.push(() => {
            window.removeEventListener('pointermove', onMove)
            document.removeEventListener('pointerover', onOver)
            document.documentElement.removeEventListener('pointerleave', onLeave)
            cursor.classList.remove('is-on', 'is-active')
          })
        }

        gsap.utils.toArray('.hero__actions .button, .closing__actions .button, .nav-pill .button').forEach((button) => {
          const moveX = gsap.quickTo(button, 'x', { duration: 0.45, ease: 'power3' })
          const moveY = gsap.quickTo(button, 'y', { duration: 0.45, ease: 'power3' })
          const onMove = (event) => {
            const box = button.getBoundingClientRect()
            moveX((event.clientX - (box.left + box.width / 2)) * 0.3)
            moveY((event.clientY - (box.top + box.height / 2)) * 0.4)
          }
          const onLeave = () => { moveX(0); moveY(0) }
          button.addEventListener('pointermove', onMove)
          button.addEventListener('pointerleave', onLeave)
          cleanups.push(() => { button.removeEventListener('pointermove', onMove); button.removeEventListener('pointerleave', onLeave) })
        })

        gsap.utils.toArray('.world-card').forEach((card) => {
          gsap.set(card, { transformPerspective: 900 })
          const tiltX = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3' })
          const tiltY = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3' })
          const onMove = (event) => {
            const box = card.getBoundingClientRect()
            tiltY(((event.clientX - box.left) / box.width - 0.5) * 12)
            tiltX(-((event.clientY - box.top) / box.height - 0.5) * 12)
          }
          const onLeave = () => { tiltX(0); tiltY(0) }
          card.addEventListener('pointermove', onMove)
          card.addEventListener('pointerleave', onLeave)
          cleanups.push(() => { card.removeEventListener('pointermove', onMove); card.removeEventListener('pointerleave', onLeave) })
        })
      }

      // Layout shifts when fonts arrive; measure pins and triggers again.
      document.fonts?.ready.then(() => ScrollTrigger.refresh())

      return () => cleanups.forEach((fn) => fn())
    })
  }, scope)

  return () => context.revert()
}
