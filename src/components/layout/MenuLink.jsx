// One row in a menu: a title, a one-line description, and whatever the link kind adds
// (a ↗ for live pages, a "Coming soon" badge for unlaunched products).
import clsx from 'clsx'
import SmartLink from '../ui/SmartLink.jsx'

/** Takes the same link props as SmartLink (`href` or `productId`) plus a `title` and `description`. */
export default function MenuLink({
  title,
  description,
  className,
  ...linkProps
}) {
  return (
    <SmartLink
      {...linkProps}
      className={clsx(
        'flex min-h-11 w-full items-start justify-between gap-3 rounded-xl px-3 py-3 text-left hover:bg-brand-50 [&>svg]:mt-1',
        className,
      )}
    >
      <span className="min-w-0 flex-1">
        <span className="block font-medium text-ink-900">{title}</span>
        {description && (
          <span className="block text-sm text-ink-500">{description}</span>
        )}
      </span>
    </SmartLink>
  )
}
