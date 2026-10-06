// The last nudge, short and centered: the one place on the page where text is not left-aligned.
import { LINKS } from '../../data/links.js'
import { WAITLIST_LINK } from '../../data/navigation.js'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'

export default function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="border-t border-line bg-brand-50 py-16 md:py-24"
    >
      <Container className="text-center">
        <h2
          id="final-cta-heading"
          tabIndex={-1}
          className="mx-auto max-w-[20ch] text-h2 font-semibold text-ink-900"
        >
          Run the numbers before you decide.
        </h2>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            href={LINKS.calculators}
            className="w-full sm:w-auto"
          >
            Browse all calculators
          </Button>
          <Button
            size="lg"
            variant="secondary"
            href={WAITLIST_LINK.href}
            className="w-full sm:w-auto"
          >
            {WAITLIST_LINK.label}
          </Button>
        </div>
      </Container>
    </section>
  )
}
