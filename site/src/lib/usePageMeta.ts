import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE = 'Mitchells Plain Entrepreneurs Hub'
/** Production address — used for the canonical URL. Change here if the domain changes. */
export const SITE_URL = 'https://mpeh.co.za'
const DEFAULT_DESCRIPTION =
  'Mitchells Plain Entrepreneurs Hub (MPEH) supports, connects and grows entrepreneurs across Mitchells Plain, the Cape Flats and greater Cape Town with events, business services, digital marketing, courses and community programmes.'

export function usePageMeta(title: string, description?: string) {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = title ? `${title} — ${SITE}` : `${SITE} — Business growth for the Cape Flats`
    // Reset to the default when a page has no description of its own, so one page's
    // description doesn't linger after navigating to another.
    document.querySelector('meta[name="description"]')?.setAttribute('content', description ?? DEFAULT_DESCRIPTION)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', SITE_URL + (pathname === '/' ? '/' : pathname))
  }, [title, description, pathname])
}
