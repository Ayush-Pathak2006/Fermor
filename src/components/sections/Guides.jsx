// Fresh, useful reading: one featured guide and four more, with their type, date and read time.
// Every guide opens on fermor.in. There are no category pages, so the type links go to the blog index.
import { FEATURED_GUIDE, GUIDES, GUIDE_TYPES } from '../../data/guides.js'
import { LINKS, SECTION_IDS } from '../../data/links.js'
import { formatDate } from '../../lib/format.js'
import Button from '../ui/Button.jsx'
import Section from '../ui/Section.jsx'
import SmartLink from '../ui/SmartLink.jsx'

const TITLE_LINK_CLASSES = 'text-ink-900 underline-offset-4 hover:underline'

const meta = (guide) =>
  `${formatDate(guide.date)}, ${guide.readMinutes} min read`

function FeaturedGuide({ className }) {
  return (
    <article className={className}>
      <div className="flex h-full flex-col rounded-3xl border border-brand-600/30 bg-brand-50 p-6 md:p-8">
        <p className="text-sm font-medium text-brand-800">
          {FEATURED_GUIDE.type}
        </p>
        <h3 className="mt-4 text-h2 font-semibold">
          <SmartLink href={FEATURED_GUIDE.href} className={TITLE_LINK_CLASSES}>
            {FEATURED_GUIDE.title}
          </SmartLink>
        </h3>
        <p className="mt-4 max-w-[52ch] text-body-lg text-ink-700">
          {FEATURED_GUIDE.summary}
        </p>
        <p className="mt-auto pt-8 text-sm text-ink-700">
          {meta(FEATURED_GUIDE)}
        </p>
      </div>
    </article>
  )
}

function GuideList({ className }) {
  return (
    <ul className={className}>
      {GUIDES.map((guide) => (
        <li
          key={guide.href}
          className="border-t border-line py-5 first:border-t-0 first:pt-0"
        >
          <p className="text-sm text-ink-500">{guide.type}</p>
          <h3 className="mt-1 text-lg font-semibold">
            <SmartLink href={guide.href} className={TITLE_LINK_CLASSES}>
              {guide.title}
            </SmartLink>
          </h3>
          <p className="mt-1 text-sm text-ink-500">{meta(guide)}</p>
        </li>
      ))}
    </ul>
  )
}

export default function Guides() {
  return (
    <Section
      id={SECTION_IDS.guides}
      title="Guides that explain the rules"
      intro="Tax, schemes and market moves, in plain words."
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <FeaturedGuide className="lg:col-span-7" />
        <GuideList className="lg:col-span-5" />
      </div>

      <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Button href={LINKS.guides} variant="secondary" className="self-start">
          Read all guides
        </Button>
        <div>
          <p className="text-sm text-ink-500">Browse by type</p>
          <ul className="mt-1 flex flex-wrap gap-x-5">
            {Object.values(GUIDE_TYPES).map((type) => (
              <li key={type}>
                <SmartLink
                  href={LINKS.guides}
                  className="inline-block py-2 text-sm font-medium text-brand-700 underline-offset-4 hover:underline"
                >
                  {type}
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
