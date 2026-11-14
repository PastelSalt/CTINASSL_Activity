import { gsap } from 'gsap'

/**
 * Pointer-only effects shared by pages: a soft cursor ring, magnetic buttons, and a CSS-variable
 * pointer position (`--px`, `--py`, range -1..1) for parallax layers. Returns a cleanup function.
 * Call it only for fine pointers and when reduced motion is off.
 */
export function pointerFx({ root, cursor, magnetic = '' }) {
  const cleanups = []

  if (cursor) {
    gsap.set(cursor, { xPercent: -50, yPercent: -50 })
    const moveX = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' })
    const moveY = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' })
    const onMove = (event) => { moveX(event.clientX); moveY(event.clientY); cursor.classList.add('is-on') }
    const onOver = (event) => cursor.classList.toggle('is-active', Boolean(event.target instanceof Element && event.target.closest('a, button, input, select, summary, [role="tab"]')))
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

  if (root) {
    let frame = 0
    const onMove = (event) => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const box = root.getBoundingClientRect()
        root.style.setProperty('--px', ((event.clientX - box.left) / box.width - 0.5) * 2)
        root.style.setProperty('--py', ((event.clientY - box.top) / box.height - 0.5) * 2)
      })
    }
    const onLeave = () => { root.style.setProperty('--px', 0); root.style.setProperty('--py', 0) }
    root.addEventListener('pointermove', onMove)
    root.addEventListener('pointerleave', onLeave)
    cleanups.push(() => { window.cancelAnimationFrame(frame); root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave) })
  }

  if (magnetic) {
    gsap.utils.toArray(magnetic).forEach((button) => {
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
  }

  return () => cleanups.forEach((fn) => fn())
}
