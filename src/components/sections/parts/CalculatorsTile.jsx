// The largest tile: how many calculators there are, and how they split across six categories.
import { LINKS } from '../../../data/links.js'
import { CALCULATOR_CATEGORIES, CALCULATOR_TOTAL } from '../../../data/tools.js'
import Button from '../../ui/Button.jsx'
import ToolTile from './ToolTile.jsx'

const LARGEST_COUNT = Math.max(
  ...CALCULATOR_CATEGORIES.map((category) => category.count),
)

export default function CalculatorsTile({ className }) {
  return (
    <ToolTile
      className={className}
      title={`${CALCULATOR_TOTAL} calculators`}
      description="Loans, tax, investing, retirement, math and salary. Each one shows its formula."
      action={<Button href={LINKS.calculators}>Browse all calculators</Button>}
    >
      <ul className="space-y-4">
        {CALCULATOR_CATEGORIES.map((category) => (
          <li key={category.id}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-ink-900">{category.name}</span>
              <span className="font-semibold text-ink-900 tabular-nums">
                {category.count}
              </span>
            </div>
            {/* The count is already in text, so the bar is only a picture. */}
            <div
              aria-hidden="true"
              className="mt-1.5 h-2.5 rounded-full bg-paper ring-1 ring-line ring-inset"
            >
              <div
                className="h-full rounded-full bg-brand-400 ring-1 ring-brand-600/40 ring-inset"
                style={{ width: `${(category.count / LARGEST_COUNT) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </ToolTile>
  )
}
