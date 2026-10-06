// A small pill label. Pills are for badges and chips only; buttons and panels use smaller radii.
import clsx from 'clsx'

const VARIANTS = {
  brand: 'bg-brand-50 text-brand-800 ring-1 ring-inset ring-brand-600/30',
  neutral: 'bg-paper text-ink-700 ring-1 ring-inset ring-line-strong/40',
}

/** Usage: <Badge>Coming soon</Badge> */
export default function Badge({ variant = 'brand', className, children }) {
  return (
    <span
      className={clsx(
        'inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-sm font-medium whitespace-nowrap',
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
