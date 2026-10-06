// A gain or a loss, shown three ways at once so it never depends on color alone: a sign, an arrow and a color.
import clsx from 'clsx'

const TONES = {
  up: 'text-gain-600',
  down: 'text-loss-600',
  flat: 'text-ink-700',
}

// Small triangles drawn as SVG paths, so they look the same in every font.
const ARROW_PATHS = {
  up: 'M4 1.2 L7.4 6.8 H0.6 Z',
  down: 'M4 6.8 L0.6 1.2 H7.4 Z',
}

function getDirection(value) {
  if (value > 0) return 'up'
  if (value < 0) return 'down'
  return 'flat'
}

/**
 * Props: `value` (the number that decides the direction) and `children` (the text, which already
 * carries the sign, such as "+2.3%" from formatSignedPercent).
 * Usage: <Change value={2.3}>{formatSignedPercent(2.3)}</Change>
 */
export default function Change({ value, className, children }) {
  const direction = getDirection(value)

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 font-medium tabular-nums',
        TONES[direction],
        className,
      )}
    >
      {children}
      {direction !== 'flat' && (
        <svg
          aria-hidden="true"
          viewBox="0 0 8 8"
          className="size-2 shrink-0 fill-current"
        >
          <path d={ARROW_PATHS[direction]} />
        </svg>
      )}
    </span>
  )
}
