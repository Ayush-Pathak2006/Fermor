// Tells whether the page has scrolled past a small threshold. The header uses it to gain a border.
import { useEffect, useState } from 'react'

const HEADER_SCROLL_THRESHOLD = 8

/**
 * Returns true once the page is scrolled more than `threshold` pixels.
 * Usage: const isScrolled = useScrolled()
 */
export function useScrolled(threshold = HEADER_SCROLL_THRESHOLD) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > threshold)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [threshold])

  return isScrolled
}
