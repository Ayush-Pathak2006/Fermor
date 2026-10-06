// The Fermor mark with the wordmark. The mark is fermor.in's own logo file.
import clsx from 'clsx'

/** Usage: <Logo />. Put it inside a link that carries the accessible name. */
export default function Logo({ className }) {
  return (
    <span className={clsx('inline-flex items-center gap-2', className)}>
      <img
        src="/fermor-mark.svg"
        alt=""
        width="30"
        height="23"
        className="h-5.75 w-7.5"
      />
      <span className="text-xl font-bold tracking-tight text-ink-900">
        Fermor
      </span>
    </span>
  )
}
