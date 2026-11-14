import { useEffect } from 'react'
import { consumeNavigationFocus } from '../app/router'

const DEFAULT_DESCRIPTION = 'Tsumugi helps creative and technical teams weave ideas into finished work.'

function setMeta(name, content) {
  let tag = document.head.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

/**
 * Sets the document title, description, and robots directive for the current route,
 * and moves focus to the page heading after an in-app navigation.
 */
export function usePageMeta({ title, description = DEFAULT_DESCRIPTION, robots = 'noindex, nofollow' }) {
  useEffect(() => {
    document.title = title
    setMeta('description', description)
    setMeta('robots', robots)

    if (consumeNavigationFocus()) {
      const heading = document.querySelector('main h1')
      if (heading) {
        heading.setAttribute('tabindex', '-1')
        heading.focus({ preventScroll: true })
      }
    }
  }, [title, description, robots])
}
