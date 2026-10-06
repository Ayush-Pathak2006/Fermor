// The top of the page: what Fermor is, one proof (the worked example) and the first step.
// On load the text fades in with a small rise, 60ms apart, while the example card assembles.
import { SECTION_IDS, sectionHref } from '../../data/links.js'
import { WAITLIST_LINK } from '../../data/navigation.js'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import DecisionPreview from './DecisionPreview.jsx'

// Seconds between one line appearing and the next.
const STAGGER = 0.06

export default function Hero() {
  return (
    <section
      id={SECTION_IDS.top}
      aria-labelledby="hero-heading"
      className="pt-6 pb-12 md:pt-12 md:pb-16 lg:flex lg:min-h-[calc(88vh-4rem)] lg:items-center lg:py-16"
    >
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <Reveal
            as="h1"
            id="hero-heading"
            tabIndex={-1}
            className="max-w-[16ch] text-display font-semibold text-ink-900"
          >
            Clear numbers for every money decision.
          </Reveal>
          <Reveal
            as="p"
            delay={STAGGER}
            className="mt-6 max-w-136 text-body-lg text-ink-700"
          >
            Free calculators, a mutual fund explorer and plain-language guides,
            built for India. Coming next: one app to invest, track and plan.
          </Reveal>
          <Reveal
            delay={STAGGER * 2}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button
              size="lg"
              href={sectionHref(SECTION_IDS.tools)}
              className="w-full sm:w-auto"
            >
              Explore free tools
            </Button>
            <Button
              size="lg"
              variant="secondary"
              href={WAITLIST_LINK.href}
              className="w-full sm:w-auto"
            >
              {WAITLIST_LINK.label}
            </Button>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <DecisionPreview />
        </div>
      </Container>
    </section>
  )
}
