// The first tab stop on the page: lets keyboard users jump past the header to the content.

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-xl focus:border focus:border-line-strong focus:bg-surface focus:px-4 focus:py-3 focus:font-medium focus:text-ink-900 focus:shadow-float"
    >
      Skip to main content
    </a>
  )
}
