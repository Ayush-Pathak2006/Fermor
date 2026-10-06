// Routes people by what they are deciding, not by what the tool is called.
// Six decisions in two columns, separated by thin lines rather than cards.
import { DECISIONS } from '../../data/decisions.js'
import { LINKS, SECTION_IDS } from '../../data/links.js'
import { getTool } from '../../data/tools.js'
import Button from '../ui/Button.jsx'
import Section from '../ui/Section.jsx'
import SmartLink from '../ui/SmartLink.jsx'

export default function DecisionIndex() {
  return (
    <Section
      id={SECTION_IDS.decisions}
      title="Start with the decision in front of you"
      intro="Pick what you’re working out and go straight to the right tools."
    >
      {/* Read down the left column, then the right. Each row keeps a thin line above it. */}
      <ul className="grid border-b border-line md:grid-flow-col md:grid-rows-3 md:gap-x-16">
        {DECISIONS.map((decision) => (
          <li key={decision.id} className="border-t border-line py-6">
            <h3 className="text-h3 font-semibold text-ink-900">
              {decision.title}
            </h3>
            <p className="mt-1 text-ink-700">{decision.question}</p>
            <ul className="mt-2 flex flex-wrap gap-x-5">
              {decision.toolIds.map((toolId) => {
                const tool = getTool(toolId)
                return (
                  <li key={toolId}>
                    <SmartLink
                      href={tool.href}
                      className="inline-block py-2.5 font-medium text-brand-700 underline-offset-4 hover:underline"
                    >
                      {tool.name}
                    </SmartLink>
                  </li>
                )
              })}
            </ul>
          </li>
        ))}
      </ul>

      <Button href={LINKS.calculators} variant="secondary" className="mt-8">
        Browse all calculators
      </Button>
    </Section>
  )
}
