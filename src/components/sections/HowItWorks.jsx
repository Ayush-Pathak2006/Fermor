// Trust, in five points: the math is shown, the numbers stay local, nothing is walled off, the
// business model is stated plainly, and this is education rather than advice.
import { BookOpen, DoorOpen, Eye, Megaphone, ShieldCheck } from 'lucide-react'
import { LINKS, SECTION_IDS } from '../../data/links.js'
import { HOW_IT_WORKS_POINTS } from '../../data/how-it-works.js'
import Section from '../ui/Section.jsx'
import SmartLink from '../ui/SmartLink.jsx'

const ICONS = {
  'full-math': Eye,
  'on-your-device': ShieldCheck,
  'no-wall': DoorOpen,
  'labeled-ads': Megaphone,
  education: BookOpen,
}

export default function HowItWorks() {
  return (
    <Section
      id={SECTION_IDS.howItWorks}
      title="How Fermor stays clear and free"
    >
      <ul className="grid gap-x-16 gap-y-10 md:grid-cols-2">
        {HOW_IT_WORKS_POINTS.map((point) => {
          const Icon = ICONS[point.id]
          return (
            <li key={point.id} className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-600/25 ring-inset">
                <Icon aria-hidden="true" className="size-6" />
              </span>
              <div>
                <h3 className="text-h3 font-semibold text-ink-900">
                  {point.title}
                </h3>
                <p className="mt-1 max-w-[46ch] text-ink-700">{point.line}</p>
              </div>
            </li>
          )
        })}
      </ul>
      {/* Sits under the last point, lined up with its text. */}
      <SmartLink
        href={LINKS.about}
        className="mt-4 ml-15 inline-block py-2.5 font-medium text-brand-700 underline-offset-4 hover:underline"
      >
        Read more about Fermor
      </SmartLink>
    </Section>
  )
}
