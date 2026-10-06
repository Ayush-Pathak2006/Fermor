// Reports which element is crossing the middle of the screen. The app section uses it to
// switch the phone screen as each feature scrolls past.
import { useEffect, useEffectEvent } from 'react'

// A thin band across the middle of the viewport. An element is "active" while it overlaps it.
const MIDDLE_BAND_MARGIN = '-45% 0px -45% 0px'

/**
 * Calls `onChange(id)` when one of the elements with these ids reaches the middle of the screen.
 * Elements that are hidden by CSS never intersect, so this stays quiet on layouts that hide them.
 * Usage: useActiveSection(['feature-ask', 'feature-portfolio'], setActiveFeature)
 */
export function useActiveSection(elementIds, onChange) {
  const handleChange = useEffectEvent(onChange)
  const idsKey = elementIds.join(',')

  useEffect(() => {
    const elements = idsKey
      .split(',')
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) handleChange(entry.target.id)
        }
      },
      { rootMargin: MIDDLE_BAND_MARGIN },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [idsKey])
}
