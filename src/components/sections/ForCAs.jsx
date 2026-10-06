// A thin band for the secondary audience: chartered accountants, who get their own free preview.
import { LINKS, SECTION_IDS } from '../../data/links.js'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'

export default function ForCAs() {
  return (
    <section
      id={SECTION_IDS.forCas}
      aria-labelledby="for-cas-heading"
      className="border-t border-line bg-brand-50"
    >
      <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between md:py-12">
        <div className="max-w-176">
          <h2
            id="for-cas-heading"
            tabIndex={-1}
            className="text-h3 font-semibold text-ink-900"
          >
            For chartered accountants
          </h2>
          <p className="mt-2 text-ink-700">
            Add clients and send them tax-deadline reminders from the CA Portal.
          </p>
        </div>
        <div className="flex flex-col md:items-end">
          <Button
            href={LINKS.caPortalTry}
            variant="secondary"
            className="w-full md:w-auto"
          >
            Try the CA Portal
          </Button>
        </div>
      </Container>
    </section>
  )
}
