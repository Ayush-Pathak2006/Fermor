// What works today: the calculators, the fund explorer, Fermor's SIP method and the card comparison.
// Each tile has its own visual, so they do not read as one repeated card.
import { SECTION_IDS } from '../../data/links.js'
import Section from '../ui/Section.jsx'
import CalculatorsTile from './parts/CalculatorsTile.jsx'
import CardsTile from './parts/CardsTile.jsx'
import FundsTile from './parts/FundsTile.jsx'
import WorkingTile from './parts/WorkingTile.jsx'

export default function FreeTools() {
  return (
    <Section
      id={SECTION_IDS.tools}
      title="Free tools you can use right now"
      intro="No sign-up, no paywall. Every calculator shows how it got its answer."
    >
      {/* Mobile: stacked. md: two columns. lg: six columns (calculators 4, funds 2, working 3, cards 3). */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-6">
        <CalculatorsTile className="md:col-span-2 lg:col-span-4" />
        <FundsTile className="lg:col-span-2" />
        <WorkingTile className="lg:col-span-3" />
        <CardsTile className="md:col-span-2 lg:col-span-3" />
      </div>
    </Section>
  )
}
