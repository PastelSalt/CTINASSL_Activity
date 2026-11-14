import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { pointerFx } from '../../lib/pointerFx'

gsap.registerPlugin(ScrollTrigger)

/**
 * Quiet motion for long-form legal reading: an entrance, a reading-progress bar, and gentle section
 * reveals. No smooth scrolling and no pinning, so anchors, find-in-page, and printing behave
 * normally. Presentation only; created in one gsap.context and reverted on unmount. Nothing runs
 * under prefers-reduced-motion.
 */
export function initLegalMotion({ scope }) {
  const context = gsap.context(() => {
    const media = gsap.matchMedia()

    media.add({ reduce: '(prefers-reduced-motion: reduce)', fine: '(hover: hover) and (pointer: fine)', desktop: '(min-width: 1024px)' }, ({ conditions }) => {
      const { reduce, fine, desktop } = conditions
      if (reduce) return undefined

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro
        .from('.public-header', { y: -20, opacity: 0, duration: 0.6 }, 0)
        .from('.page-bg__orb', { scale: 0.5, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'back.out(1.4)' }, 0)
        .from('.policy-banner', { y: 24, opacity: 0, duration: 0.7 }, 0.15)
        .from('.policy-toc', { x: desktop ? -30 : 0, y: desktop ? 0 : 20, opacity: 0, duration: 0.8 }, 0.25)
        .from('.policy-document', { y: 60, scale: 0.97, opacity: 0, duration: 0.9, ease: 'back.out(1.2)' }, 0.2)
        .from('.policy-document__header h1 .w__in', { yPercent: 115, duration: 0.9, stagger: 0.07, ease: 'power4.out' }, 0.5)
        .from('.policy-document__header .eyebrow, .policy-document__description, .policy-document__meta > div', { y: 20, opacity: 0, duration: 0.6, stagger: 0.07 }, 0.65)
        .from('.public-footer', { y: 12, opacity: 0, duration: 0.6 }, 1)
      // Failsafe on a plain timer (not the animation ticker, which pauses in background tabs): never leave the document hidden.
      const failsafe = window.setTimeout(() => intro.progress(1), 4000)

      gsap.utils.toArray('.page-bg__thread path').forEach((path) => {
        const length = path.getTotalLength()
        gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 2.2, delay: 0.4, ease: 'power2.inOut' })
      })
      gsap.to('.page-bg__orb--a', { y: 18, duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      gsap.to('.page-bg__orb--b', { y: -22, duration: 5.5, ease: 'sine.inOut', yoyo: true, repeat: -1 })

      // Reading progress along the top edge.
      gsap.to('.policy-progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } })

      // Sections ease in once, as they approach. Content is never hidden for print.
      gsap.utils.toArray('.policy-section').forEach((section) => {
        gsap.fromTo(section, { y: 28, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', clearProps: 'transform',
          scrollTrigger: { trigger: section, start: 'top 92%', toggleActions: 'play none none none' },
        })
      })
      const showAll = () => gsap.set('.policy-section', { clearProps: 'all' })
      window.addEventListener('beforeprint', showAll)

      const cleanups = [() => window.removeEventListener('beforeprint', showAll), () => window.clearTimeout(failsafe)]
      if (fine) {
        cleanups.push(pointerFx({ root: scope.current, cursor: scope.current?.querySelector('.cursor') }))
      }
      document.fonts?.ready.then(() => ScrollTrigger.refresh())
      return () => cleanups.forEach((fn) => fn())
    })
  }, scope)

  return () => context.revert()
}
