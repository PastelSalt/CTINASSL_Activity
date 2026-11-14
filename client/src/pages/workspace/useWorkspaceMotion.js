import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Restrained motion for the workspace (PLAN-A-04 section 12): short entrances, a sliding view
 * indicator, count-up stats, and a spring-in detail panel. No smooth scrolling, no pinning, no
 * parallax: this is a working surface. Every effect is presentation only, cleans up its inline
 * styles, has a plain-timer failsafe, and is skipped under prefers-reduced-motion.
 */

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const HEADER_PARTS = '.ws-page-header, .ws-views, .ws-toolbar, .scope-bar, .project-header, .ws-demo + .form-banner'
const CONTENT_ITEMS = '.rows > li, .groups > *, .home-grid > *, .insight-grid > *, .checklist--steps > li, .inline-add, .card-grid > *, .tile-grid > *, .report-grid > *, .board__col, .ws-section, .table-wrap, .state, .feed__item, .phases__step, .settings-card, .reader__doc, .tl, .compare, .diff__pane, .schedule > section, .group, .tl-list > li'

/** Entrance for a freshly mounted page. Called from PageHeader, so the page's DOM already exists. */
export function usePageEntrance() {
  useLayoutEffect(() => {
    const root = document.querySelector('.ws-content')
    if (!root || reduced()) return undefined
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'transform,opacity' } })
      timeline
        .from(HEADER_PARTS, { y: 14, opacity: 0, duration: 0.45, stagger: 0.05 }, 0)
        .from('.stats li', { y: 16, opacity: 0, duration: 0.45, stagger: 0.05 }, 0.12)
        .from(gsap.utils.toArray(CONTENT_ITEMS).slice(0, 16), { y: 18, opacity: 0, duration: 0.5, stagger: 0.035 }, 0.2)
      const failsafe = window.setTimeout(() => timeline.progress(1), 2500)
      return () => window.clearTimeout(failsafe)
    }, root)
    return () => context.revert()
  }, [])
}

/** Re-animates the content area when the active view changes (not on first render). */
export function useViewChangeMotion(value) {
  const first = useRef(true)
  useLayoutEffect(() => {
    if (first.current) { first.current = false; return undefined }
    const root = document.querySelector('.ws-content')
    if (!root || reduced()) return undefined
    const context = gsap.context(() => {
      const items = gsap.utils.toArray(CONTENT_ITEMS).slice(0, 16)
      if (!items.length) return undefined
      const tween = gsap.from(items, { y: 14, opacity: 0, duration: 0.4, stagger: 0.03, ease: 'power3.out', clearProps: 'transform,opacity' })
      const failsafe = window.setTimeout(() => tween.progress(1), 1800)
      return () => window.clearTimeout(failsafe)
    }, root)
    return () => context.revert()
  }, [value])
}

/** Slides the underline to the active tab. Horizontal tab lists only. */
export function useInkSlide(listRef, inkRef, disabled) {
  const placed = useRef(false)
  useLayoutEffect(() => {
    if (disabled) return
    const list = listRef.current
    const ink = inkRef.current
    const active = list?.querySelector('button[aria-current="page"]')
    if (!active || !ink) return
    const target = { x: active.offsetLeft, width: active.offsetWidth }
    if (!placed.current || reduced()) gsap.set(ink, target)
    else gsap.to(ink, { ...target, duration: 0.35, ease: 'power3.out', overwrite: true })
    placed.current = true
  })
}

/** Counts whole-number stats up from zero once, when the strip first mounts. */
export function useCountUp(ref) {
  useLayoutEffect(() => {
    const strip = ref.current
    if (!strip || reduced()) return undefined
    const tweens = []
    const timers = []
    const restores = []
    strip.querySelectorAll('strong').forEach((element) => {
      const node = element.firstChild // update the text node itself so React keeps owning it
      const target = Number(element.textContent)
      if (!node || !Number.isInteger(target) || target < 2 || target > 999) return
      const state = { value: 0 }
      const original = node.nodeValue
      node.nodeValue = '0'
      restores.push(() => { node.nodeValue = original }) // also covers React StrictMode re-running this effect
      tweens.push(gsap.to(state, { value: target, duration: 0.9, delay: 0.2, ease: 'power2.out', onUpdate: () => { node.nodeValue = String(Math.round(state.value)) } }))
      timers.push(window.setTimeout(() => { node.nodeValue = String(target) }, 1500))
    })
    return () => { tweens.forEach((tween) => tween.kill()); timers.forEach((timer) => window.clearTimeout(timer)); restores.forEach((restore) => restore()) }
  }, [ref])
}

/** Spring-in for the detail panel: slides from the right when docked, up when it is a sheet. */
export function usePanelEntrance(ref) {
  useLayoutEffect(() => {
    const panel = ref.current
    if (!panel || reduced()) return undefined
    const docked = window.matchMedia('(min-width: 1280px)').matches
    const tween = gsap.fromTo(panel, docked ? { x: 36, opacity: 0 } : { y: 70, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.3)', clearProps: 'transform,opacity' })
    const failsafe = window.setTimeout(() => tween.progress(1), 1500)
    return () => { window.clearTimeout(failsafe); tween.kill() }
  }, [ref])
}
