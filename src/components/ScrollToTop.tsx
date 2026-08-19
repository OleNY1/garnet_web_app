import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Resets scroll position on navigation, except when linking to an in-page anchor. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}
