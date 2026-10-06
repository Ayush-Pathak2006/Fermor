// A page section with its landmark, heading and intro, so every section is spaced and labeled the same way.
import clsx from 'clsx'
import Container from './Container.jsx'

const TONES = {
  plain: 'bg-paper',
  surface: 'bg-surface',
  tint: 'bg-brand-50',
}

/**
 * Props: `id` (the in-page link target), `title` (the one h2), `intro`, `eyebrow` (small node above the h2),
 * `tone` ("plain" | "surface" | "tint").
 * Usage: <Section id="tools" title="Free tools you can use right now" intro="...">...</Section>
 */
export default function Section({
  id,
  title,
  intro,
  eyebrow,
  tone = 'plain',
  className,
  children,
}) {
  const headingId = `${id}-heading`

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={clsx(
        'border-t border-line py-16 md:py-24 lg:py-28',
        TONES[tone],
        className,
      )}
    >
      <Container>
        <header className="max-w-176">
          {eyebrow}
          <h2
            id={headingId}
            tabIndex={-1}
            className={clsx(
              'text-h2 font-semibold text-ink-900',
              eyebrow && 'mt-4',
            )}
          >
            {title}
          </h2>
          {intro && (
            <p className="mt-4 max-w-[65ch] text-body-lg text-ink-700">
              {intro}
            </p>
          )}
        </header>
        <div className="mt-8 md:mt-12">{children}</div>
      </Container>
    </section>
  )
}
