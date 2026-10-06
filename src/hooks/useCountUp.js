// Animates a number from 0 up to a target. Used for the hero's result and nothing else.
import { useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

const easeOutCubic = (progress) => 1 - (1 - progress) ** 3

/**
 * Counts a number up inside one element. It returns a `ref` for that element and its first
 * `initialText`. Each frame is written straight into the element, so React does no work per frame:
 * re-rendering at 60fps would keep interrupting the page's other renders. Under reduced motion the
 * target shows straight away. `duration` and `delay` are in seconds.
 * Usage: const { ref, initialText } = useCountUp(5600897, { format: formatINR, delay: 0.4 })
 *        <span ref={ref}>{initialText}</span>
 */
export function useCountUp(
  target,
  { duration = 0.8, delay = 0, format = String } = {},
) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined
    if (shouldReduceMotion) {
      element.textContent = format(target)
      return undefined
    }

    let frameId
    let startTime
    const step = (now) => {
      startTime ??= now
      const progress = Math.min((now - startTime) / (duration * 1000), 1)
      element.textContent = format(target * easeOutCubic(progress))
      if (progress < 1) frameId = requestAnimationFrame(step)
    }

    element.textContent = format(0)
    const timeoutId = setTimeout(() => {
      frameId = requestAnimationFrame(step)
    }, delay * 1000)

    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(frameId)
    }
  }, [target, duration, delay, format, shouldReduceMotion])

  return { ref, initialText: format(shouldReduceMotion ? target : 0) }
}
