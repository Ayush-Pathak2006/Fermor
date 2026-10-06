// The mutual fund explorer tile: what it does, and the quick categories it offers.
import { LINKS } from '../../../data/links.js'
import { FUND_CATEGORIES } from '../../../data/tools.js'
import Badge from '../../ui/Badge.jsx'
import Button from '../../ui/Button.jsx'
import ToolTile from './ToolTile.jsx'

export default function FundsTile({ className }) {
  return (
    <ToolTile
      className={className}
      title="Mutual fund explorer"
      description="Filter 2,400+ funds by category, risk and 1, 3 or 5-year returns. Compare up to four side by side. NAVs update daily from AMFI."
      action={<Button href={LINKS.mutualFunds}>Explore mutual funds</Button>}
    >
      <ul className="flex flex-wrap gap-2">
        {FUND_CATEGORIES.map((category) => (
          <li key={category}>
            <Badge className="px-3 py-1.5">{category}</Badge>
          </li>
        ))}
      </ul>
    </ToolTile>
  )
}
