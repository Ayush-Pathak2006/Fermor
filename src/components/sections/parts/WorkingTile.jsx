// "We show our working": the one place the page explains how Fermor's SIP math differs, with the numbers.
import clsx from 'clsx'
import { LINKS } from '../../../data/links.js'
import { monthlyRateFromAnnual } from '../../../lib/finance.js'
import { formatPercent } from '../../../lib/format.js'
import Button from '../../ui/Button.jsx'
import ToolTile from './ToolTile.jsx'

const EXAMPLE_YEARLY_RATE_PCT = 12
const MONTHS_PER_YEAR = 12

// Both monthly rates come from the same yearly rate, so the difference is the method alone.
const RATE_ROWS = [
  {
    label: 'Yearly rate divided by 12',
    value: formatPercent(EXAMPLE_YEARLY_RATE_PCT / MONTHS_PER_YEAR, 3),
    isFermor: false,
  },
  {
    label: 'Fermor’s exact conversion',
    value: formatPercent(
      monthlyRateFromAnnual(EXAMPLE_YEARLY_RATE_PCT) * 100,
      3,
    ),
    isFermor: true,
  },
]

export default function WorkingTile({ className }) {
  return (
    <ToolTile
      className={className}
      title="We show our working"
      description="Most SIP calculators divide the yearly return by 12. Fermor converts it properly, so long-term projections match real statements."
      action={<Button href={LINKS.sipCalculator}>See the SIP method</Button>}
    >
      <p className="text-sm text-ink-500">
        Monthly rate at {EXAMPLE_YEARLY_RATE_PCT}% a year
      </p>
      <dl className="mt-2 space-y-2">
        {RATE_ROWS.map((row) => (
          <div
            key={row.label}
            className={clsx(
              'flex items-baseline justify-between gap-4 rounded-xl px-4 py-3',
              row.isFermor
                ? 'bg-brand-50 ring-1 ring-brand-600/30 ring-inset'
                : 'bg-paper',
            )}
          >
            <dt
              className={
                row.isFermor ? 'font-medium text-ink-900' : 'text-ink-700'
              }
            >
              {row.label}
            </dt>
            <dd className="text-xl font-semibold text-ink-900 tabular-nums">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-sm text-ink-700">i = (1 + r)^(1/12) − 1</p>
    </ToolTile>
  )
}
