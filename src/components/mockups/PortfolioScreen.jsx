// The Portfolio screen: net worth, this month's change, and where the money sits.
import clsx from 'clsx'
import { PORTFOLIO_DEMO } from '../../data/app-demo.js'
import {
  formatINR,
  formatSignedINR,
  formatSignedPercent,
} from '../../lib/format.js'
import Change from '../ui/Change.jsx'

// A green ramp for the four holdings. The values are in text too, so color is only decoration here.
const HOLDING_COLORS = [
  'bg-brand-800',
  'bg-brand-600',
  'bg-brand-400',
  'bg-brand-200',
]

export default function PortfolioScreen() {
  const { netWorth, monthChange, monthChangePct, holdings } = PORTFOLIO_DEMO

  return (
    <div className="flex h-full flex-col px-4 pt-12 pb-4">
      <p className="text-sm font-semibold text-ink-900">Portfolio</p>

      <div className="mt-5">
        <p className="text-[0.75rem] text-ink-700">Net worth</p>
        <p className="mt-0.5 text-[1.75rem] leading-none font-bold tracking-tight text-ink-900 tabular-nums">
          {formatINR(netWorth)}
        </p>
        <p className="mt-2 text-[0.75rem] text-ink-700">
          This month{' '}
          <Change value={monthChangePct}>
            {formatSignedINR(monthChange)} (
            {formatSignedPercent(monthChangePct)})
          </Change>
        </p>
      </div>

      <div className="mt-8 flex h-3 overflow-hidden rounded-full">
        {holdings.map((holding, index) => (
          <div
            key={holding.name}
            className={HOLDING_COLORS[index]}
            style={{ width: `${(holding.value / netWorth) * 100}%` }}
          />
        ))}
      </div>

      <ul className="mt-6 space-y-5">
        {holdings.map((holding, index) => (
          <li
            key={holding.name}
            className="flex items-center justify-between text-[0.875rem]"
          >
            <span className="flex items-center gap-2 text-ink-700">
              <span
                className={clsx('size-2.5 rounded-full', HOLDING_COLORS[index])}
              />
              {holding.name}
            </span>
            <span className="font-semibold text-ink-900 tabular-nums">
              {formatINR(holding.value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
