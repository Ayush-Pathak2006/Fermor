// Seven answers that cover the whole product, not just the calculators. All closed until opened.
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { Minus, Plus } from 'lucide-react'
import { FAQ_ITEMS } from '../../data/faq.js'
import { SECTION_IDS } from '../../data/links.js'
import Section from '../ui/Section.jsx'

export default function Faq() {
  return (
    <Section id={SECTION_IDS.faq} title="Questions people ask">
      <div className="border-b border-line">
        {FAQ_ITEMS.map((item) => (
          <Disclosure key={item.id} as="div" className="border-t border-line">
            <DisclosureButton className="group flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-lg font-medium text-ink-900 hover:text-brand-800">
              {item.question}
              <Plus
                aria-hidden="true"
                className="size-5 shrink-0 text-ink-700 group-data-open:hidden"
              />
              <Minus
                aria-hidden="true"
                className="hidden size-5 shrink-0 text-ink-700 group-data-open:block"
              />
            </DisclosureButton>
            <DisclosurePanel
              transition
              className="origin-top pb-5 text-ink-700 transition duration-200 ease-out data-closed:-translate-y-1 data-closed:opacity-0 motion-reduce:transition-none"
            >
              <p className="max-w-[75ch]">{item.answer}</p>
            </DisclosurePanel>
          </Disclosure>
        ))}
      </div>
    </Section>
  )
}
