import { gsap } from 'gsap'
import { pointerFx } from '../../lib/pointerFx'

/**
 * Entrance and pointer motion for the authentication pages. Presentation only: it never touches
 * form values, focus, or validation. Everything is created in one gsap.context and reverted on
 * unmount; under prefers-reduced-motion nothing runs and the page is static.
 */
export function initAuthMotion({ scope }) {
  const context = gsap.context(() => {
    const media = gsap.matchMedia()

    media.add({ reduce: '(prefers-reduced-motion: reduce)', fine: '(hover: hover) and (pointer: fine)', wide: '(min-width: 900px)' }, ({ conditions }) => {
      const { reduce, fine, wide } = conditions
      if (reduce) return undefined

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro
        .from('.public-header', { y: -20, opacity: 0, duration: 0.6 }, 0)
        .from('.page-bg__orb', { scale: 0.5, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'back.out(1.4)' }, 0)
        .from('.auth-card', { y: 60, scale: 0.96, rotation: wide ? 1.5 : 0, opacity: 0, duration: 0.9, ease: 'back.out(1.2)' }, 0.1)
        .from('.auth-card h1 .w__in', { yPercent: 115, duration: 0.9, stagger: 0.07, ease: 'power4.out' }, 0.45)
        .from('.auth-intro, .auth-form-column .form-banner, .auth-form .field, .auth-form .auth-support-link, .auth-form .auth-actions, .auth-demo-link, .status-panel', { y: 22, opacity: 0, duration: 0.6, stagger: 0.07 }, 0.6)
        .from('.auth-art__window', { y: 50, rotation: -4, opacity: 0, duration: 0.9, ease: 'back.out(1.3)' }, 0.5)
        .fromTo('.auth-art__chip', { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.14, ease: 'back.out(2)' }, 0.95)
        .from('.auth-meta, .public-footer', { y: 12, opacity: 0, duration: 0.6 }, 1)
      // Failsafe on a plain timer (the animation ticker pauses in background tabs): never leave the form hidden.
      const failsafe = window.setTimeout(() => intro.progress(1), 4000)

      gsap.utils.toArray('.page-bg__thread path, .auth-art__thread path').forEach((path, index) => {
        const length = path.getTotalLength()
        gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 2, delay: 0.4 + index * 0.2, ease: 'power2.inOut' })
      })
      gsap.to('.auth-art__chip', { yPercent: 8, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: { each: 0.5, from: 'random' } })
      gsap.to('.page-bg__orb--a', { y: 18, duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      gsap.to('.page-bg__orb--b', { y: -22, duration: 5.5, ease: 'sine.inOut', yoyo: true, repeat: -1 })

      const cleanups = [() => window.clearTimeout(failsafe)]
      if (fine) {
        cleanups.push(pointerFx({
          root: scope.current,
          cursor: scope.current?.querySelector('.cursor'),
          magnetic: '.auth-actions .button, .status-panel .button, .preview-dialog .button',
        }))
      }
      return () => cleanups.forEach((fn) => fn())
    })
  }, scope)

  return () => context.revert()
}
