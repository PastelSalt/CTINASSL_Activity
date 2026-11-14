import { useLocation } from '../app/router'

/**
 * Reads the demo-only `?preview=` query value and returns it when it is one of the allowed states.
 * Presentation states are never produced by real behavior in the static client.
 */
export function usePreviewState(allowed) {
  const { search } = useLocation()
  const value = new URLSearchParams(search).get('preview')
  return allowed.includes(value) ? value : 'default'
}
