// Fades its content in with a small rise. The hero uses it for its load sequence and the
// worked-example card uses it to assemble piece by piece. Under reduced motion nothing animates.
import { m, useReducedMotion } from 'motion/react'

const RISE_DISTANCE_PX = 12

/**
 * Props: `as` (the tag, "div" by default), `delay` and `duration` in seconds. Other props, such as
 * `id` and `className`, go to the element.
 * Usage: <Reveal as="p" delay={0.06}>Free calculators...</Reveal>
 */
export default function Reveal({
  as = 'div',
  delay = 0,
  duration = 0.4,
  children,
  ...rest
}) {
  const shouldReduceMotion = useReducedMotion()
  const MotionTag = m[as]

  return (
    <MotionTag
      // initial={false} skips the animation and renders the final state straight away.
      initial={shouldReduceMotion ? false : { opacity: 0, y: RISE_DISTANCE_PX }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
