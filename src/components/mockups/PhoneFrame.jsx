// A phone drawn in HTML and CSS. It is a picture: one label describes the current screen, and
// everything inside is hidden from screen readers.
import clsx from 'clsx'

/**
 * Props: `label` (what the screen shows, in words) and `children` (the screen).
 * Usage: <PhoneFrame label="Portfolio screen: ..."><PortfolioScreen /></PhoneFrame>
 */
export default function PhoneFrame({ label, className, children }) {
  return (
    <div
      // The phone is one picture made of divs, so it takes role="img" rather than an <img> tag.
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
      role="img"
      aria-label={label}
      className={clsx(
        'relative mx-auto aspect-9/18.5 w-70 rounded-[2.75rem] bg-ink-900 p-2.5 shadow-hero lg:w-76',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="relative h-full overflow-hidden rounded-[2.25rem] bg-surface"
      >
        <div className="absolute top-2.5 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-ink-900" />
        {children}
      </div>
    </div>
  )
}
