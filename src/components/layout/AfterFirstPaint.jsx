// Renders its children a moment after the first screen is on the page, one at a time.
// The header and hero are all anyone sees at first, so rendering all twelve sections up front only
// delays them: on a mid-range phone it was one long block of work before anything appeared.
import { Children, startTransition, useEffect, useState } from 'react'
import { scrollToSection } from '../../lib/scroll.js'

// A rough height for each section still to come, so the footer stays out of view until they are in.
const PLACEHOLDER_HEIGHT_PER_SECTION_VH = 40

/**
 * Usage: <AfterFirstPaint><DecisionIndex /> ... </AfterFirstPaint>
 * Sections mount one per frame, each in a transition, so no single piece of work blocks the page for
 * long. An empty block holds the place of the ones still to come. A link such as /#faq is followed
 * once all of them are in.
 */
export default function AfterFirstPaint({ children }) {
  const sections = Children.toArray(children)
  const [mountedCount, setMountedCount] = useState(0)
  const remainingCount = sections.length - mountedCount

  useEffect(() => {
    if (remainingCount === 0) return undefined
    const frameId = requestAnimationFrame(() => {
      // A transition tells React this render can wait and be split up, so the page stays responsive.
      startTransition(() => setMountedCount((count) => count + 1))
    })
    return () => cancelAnimationFrame(frameId)
  }, [remainingCount])

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (remainingCount === 0 && hash) scrollToSection(hash)
  }, [remainingCount])

  return (
    <>
      {sections.slice(0, mountedCount)}
      {remainingCount > 0 && (
        <div
          aria-hidden="true"
          style={{
            minHeight: `${remainingCount * PLACEHOLDER_HEIGHT_PER_SECTION_VH}vh`,
          }}
        />
      )}
    </>
  )
}
