// A two-part bar showing how a result splits, such as what you put in versus what it earned.
// The bar is a picture, so the text equivalent is read out as one phrase and the legend is hidden from screen readers.
// The bar grows from the left, then the legend fades in. Under reduced motion it simply appears.
import clsx from 'clsx'
import { m, useReducedMotion } from 'motion/react'

const TONES = {
  base: 'bg-ink-900',
  gain: 'bg-brand-400',
}

const FILL_DURATION_S = 0.35

/**
 * Props: `parts` ([{ id, label, value, text, tone }]), `summary` (the same split in words) and
 * `delay` (seconds before the bar starts to fill).
 * Usage: <SplitBar parts={view.parts} summary={view.splitSummary} delay={1} />
 */
export default function SplitBar({ parts, summary, delay = 0 }) {
  const shouldReduceMotion = useReducedMotion()
  const total = parts.reduce((sum, part) => sum + part.value, 0)

  return (
    // The bar and legend together are one picture. There is no <img> for markup built from divs.
    // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
    <div role="img" aria-label={summary} className="mt-6">
      <div className="h-3.5 overflow-hidden rounded-full bg-paper ring-1 ring-line-strong/50">
        {/* Both parts scale together from the left edge, so the split never changes while it grows. */}
        <m.div
          className="flex h-full origin-left"
          initial={shouldReduceMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: FILL_DURATION_S, delay, ease: 'easeOut' }}
        >
          {parts.map((part) => (
            <div
              key={part.id}
              className={TONES[part.tone]}
              style={{ width: `${(part.value / total) * 100}%` }}
            />
          ))}
        </m.div>
      </div>
      <m.ul
        aria-hidden="true"
        className="mt-3 grid grid-cols-2 gap-4"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, delay: delay + FILL_DURATION_S * 0.5 }}
      >
        {parts.map((part) => (
          <li key={part.id} className="flex items-start gap-2">
            <span
              className={clsx(
                'mt-1.5 size-2.5 shrink-0 rounded-full ring-1 ring-line-strong/50',
                TONES[part.tone],
              )}
            />
            <span className="text-sm text-ink-700">
              {part.label}
              <span className="block font-semibold text-ink-900 tabular-nums">
                {part.text}
              </span>
            </span>
          </li>
        ))}
      </m.ul>
    </div>
  )
}
