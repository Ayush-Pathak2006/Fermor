// A keyboard key hint, such as the "/" next to the search button.
import clsx from 'clsx'

/** Usage: <Kbd>/</Kbd> */
export default function Kbd({ className, children }) {
  return (
    <kbd
      className={clsx(
        'inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-line-strong/50 bg-surface px-1.5 text-sm font-medium text-ink-700',
        className,
      )}
    >
      {children}
    </kbd>
  )
}
