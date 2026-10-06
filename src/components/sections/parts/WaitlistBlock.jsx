// The "Get early access" block at the end of the app section. Every "Join the waitlist" button
// on the page scrolls here and puts the cursor in the email field.
import { SECTION_IDS } from '../../../data/links.js'
import WaitlistForm from '../WaitlistForm.jsx'

export default function WaitlistBlock() {
  return (
    <section
      id={SECTION_IDS.waitlist}
      aria-labelledby="waitlist-heading"
      className="mt-16 rounded-3xl border border-line bg-paper p-6 md:p-8"
    >
      <h3
        id="waitlist-heading"
        tabIndex={-1}
        className="text-h3 font-semibold text-ink-900"
      >
        Get early access
      </h3>
      <WaitlistForm />
      <p className="mt-4 text-sm text-ink-500">
        Demo: this concept isn’t connected to Fermor’s waitlist yet.
      </p>
      <p className="mt-1 text-sm text-ink-700">Coming to iPhone and Android.</p>
    </section>
  )
}
