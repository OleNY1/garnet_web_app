import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Resets scroll position on navigation, except when linking to an in-page
 * anchor. When arriving from a search result, scrolls to the section that
 * matched instead (opening it first if it is a closed FAQ card).
 */
export function ScrollToTop() {
  const { pathname, hash, state, key } = useLocation()
  const searchHeading = (state as { searchHeading?: string } | null)?.searchHeading

  useEffect(() => {
    if (hash) {
      // Links like /how-to-get-tested#cost-insurance: scroll to that section once it has rendered.
      const frame = requestAnimationFrame(() => {
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ block: 'start' })
      })
      return () => cancelAnimationFrame(frame)
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    if (!searchHeading) return

    const frame = requestAnimationFrame(() => {
      const wanted = searchHeading.replace(/\s+/g, ' ').trim()
      const heading = [...document.querySelectorAll<HTMLElement>('main h2, main h3')].find(
        (el) => el.innerText.replace(/\s+/g, ' ').trim() === wanted,
      )
      if (!heading) return
      const toggle = heading.closest<HTMLButtonElement>('button[aria-expanded="false"]')
      toggle?.click()
      heading.scrollIntoView({ block: 'center', behavior: 'instant' as ScrollBehavior })
      heading.classList.add('search-target')
      window.setTimeout(() => heading.classList.remove('search-target'), 2400)
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key, searchHeading])

  return null
}
