// Scrolling to a section and moving keyboard focus with it. The only lib file that touches the DOM,
// because a jump that does not move focus leaves keyboard and screen reader users behind.

/** True when the visitor has asked the system for less motion. */
export function prefersReducedMotion() {
  return (
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true
  )
}

// A section can mark its own focus target, such as the waitlist's email field.
const FOCUS_TARGET_SELECTOR = '[data-scroll-focus]'
const HEADING_SELECTOR = 'h1, h2, h3'

// Sections below the first screen mount a moment after the page loads. A jump asked for in that
// moment waits this long for its section instead of doing nothing.
const WAIT_FOR_SECTION_MS = 10000

function getFocusTarget(section) {
  return (
    section.querySelector(FOCUS_TARGET_SELECTOR) ??
    section.querySelector(HEADING_SELECTOR)
  )
}

function jumpTo(section, sectionId) {
  section.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  })

  const target = getFocusTarget(section)
  if (target) {
    // Headings are not focusable by default. -1 lets script focus them without adding a tab stop.
    if (!target.matches('input, button, a, textarea, select'))
      target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
  }

  // Keep the address bar in step, so the jump can be shared and the back button works.
  window.history.replaceState(null, '', `#${sectionId}`)
}

/** Calls `onFound` with the element as soon as it exists, giving up after `timeoutMs`. */
function whenElementExists(elementId, timeoutMs, onFound) {
  const deadline = performance.now() + timeoutMs
  const check = () => {
    const element = document.getElementById(elementId)
    if (element) onFound(element)
    else if (performance.now() < deadline) requestAnimationFrame(check)
  }
  requestAnimationFrame(check)
}

/**
 * Scrolls to the section with this id (instantly under reduced motion), then focuses its focus
 * target or its heading. Returns true when the section was there. If it is not on the page yet,
 * returns false and jumps as soon as it appears.
 */
export function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    jumpTo(section, sectionId)
    return true
  }

  whenElementExists(sectionId, WAIT_FOR_SECTION_MS, (found) =>
    jumpTo(found, sectionId),
  )
  return false
}
