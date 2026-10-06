// The shell for one tile in the free-tools grid: a title, a sentence, a visual, and one button.
// Only the button inside is a link, so a tile never wraps links inside a link.
import clsx from 'clsx'

/**
 * Props: `title`, `description`, `action` (the button), `children` (the tile's own visual).
 * Usage: <ToolTile title="..." description="..." action={<Button .../>}>visual</ToolTile>
 */
export default function ToolTile({
  title,
  description,
  action,
  className,
  children,
}) {
  return (
    <article
      className={clsx(
        'flex flex-col rounded-3xl border border-line bg-surface p-6 md:p-8',
        className,
      )}
    >
      <h3 className="text-h3 font-semibold text-ink-900">{title}</h3>
      <p className="mt-2 max-w-[52ch] text-ink-700">{description}</p>
      <div className="mt-6 flex-1">{children}</div>
      <div className="mt-6">{action}</div>
    </article>
  )
}
