// A thin strip of one-click chips for returning visitors who already know which tool they want.
// On phones it is one row that scrolls sideways, with a fade at the edge to show there is more.
import { POPULAR_TOOLS, getTool } from '../../data/tools.js'
import Container from '../ui/Container.jsx'
import SmartLink from '../ui/SmartLink.jsx'

export default function PopularTools() {
  return (
    <section
      aria-labelledby="popular-tools-heading"
      className="border-t border-line bg-surface"
    >
      <Container className="flex flex-col gap-3 py-5 md:flex-row md:items-center md:gap-6">
        <h2
          id="popular-tools-heading"
          className="shrink-0 text-sm font-semibold text-ink-900"
        >
          Popular tools
        </h2>
        {/* "relative" matters: the screen reader text in each chip is absolutely positioned, and a
            scroll container only clips it (instead of widening the page) when it is the containing block. */}
        <ul className="relative -mx-4 flex snap-x snap-mandatory scrollbar-none gap-2 overflow-x-auto mask-[linear-gradient(to_right,black_calc(100%-2.5rem),transparent)] px-4 after:block after:w-8 after:shrink-0 md:mx-0 md:flex-wrap md:overflow-visible md:mask-none md:px-0 md:after:hidden [&::-webkit-scrollbar]:hidden">
          {POPULAR_TOOLS.map(({ label, toolId }) => (
            <li key={toolId} className="shrink-0 snap-start">
              <SmartLink
                href={getTool(toolId).href}
                className="inline-flex min-h-11 items-center rounded-full border border-line-strong bg-surface px-4 text-sm font-medium text-ink-900 hover:border-ink-900"
              >
                {label}
              </SmartLink>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
