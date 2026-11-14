import { useCallback } from 'react'
import { navigate, useLocation } from '../app/router'

/**
 * Reads and writes one URL query parameter without scrolling or moving focus.
 * Used for local UI state that should be shareable (active view, selected record).
 */
export function useQueryParam(key, fallback = null) {
  const { pathname, search } = useLocation()
  const value = new URLSearchParams(search).get(key) ?? fallback

  const set = useCallback((next) => {
    const params = new URLSearchParams(window.location.search)
    if (next === null || next === undefined || next === fallback) params.delete(key)
    else params.set(key, next)
    const query = params.toString()
    navigate(`${pathname}${query ? `?${query}` : ''}`, { replace: true, scroll: false, focus: false })
  }, [fallback, key, pathname])

  return [value, set]
}
