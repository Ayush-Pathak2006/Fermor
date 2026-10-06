// The credit card comparison tile. Applying always happens on the bank's own site.
import { LINKS } from '../../../data/links.js'
import Badge from '../../ui/Badge.jsx'
import Button from '../../ui/Button.jsx'
import ToolTile from './ToolTile.jsx'

const CARD_TYPES = ['Cashback', 'Travel', 'Lifetime free']

export default function CardsTile({ className }) {
  return (
    <ToolTile
      className={className}
      title="Credit cards"
      description="Compare cards by rewards, fees and the credit score you need, then apply on the bank’s own site."
      action={<Button href={LINKS.creditCards}>Compare credit cards</Button>}
    >
      <ul className="flex flex-wrap gap-2">
        {CARD_TYPES.map((type) => (
          <li key={type}>
            <Badge className="px-3 py-1.5">{type}</Badge>
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-[40ch] text-sm text-ink-500">
        Ads and partner links keep Fermor free. They’re always labeled.
      </p>
    </ToolTile>
  )
}
