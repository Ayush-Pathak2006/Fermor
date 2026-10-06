// The Market screen: a SIP schedule, a small watchlist of fund types, and a (non-interactive) call to action.
import { MARKET_DEMO } from '../../data/app-demo.js'
import {
  formatINR,
  formatOrdinal,
  formatSignedPercent,
} from '../../lib/format.js'
import Change from '../ui/Change.jsx'

export default function MarketScreen() {
  const { sip, watchlist, ctaLabel } = MARKET_DEMO

  return (
    <div className="flex h-full flex-col px-4 pt-12 pb-4">
      <p className="text-sm font-semibold text-ink-900">Market</p>

      <div className="mt-6 rounded-2xl bg-brand-50 p-4 ring-1 ring-brand-600/20 ring-inset">
        <p className="text-[0.75rem] text-ink-700">Your SIP</p>
        <p className="mt-1.5 text-[0.9375rem] leading-snug font-semibold text-ink-900">
          {formatINR(sip.amount)} on the {formatOrdinal(sip.dayOfMonth)} of
          every month
        </p>
      </div>

      <p className="mt-8 text-[0.8125rem] font-medium text-ink-700">
        Watchlist
      </p>
      <ul className="mt-2 divide-y divide-line">
        {watchlist.map((item) => (
          <li
            key={item.name}
            className="flex items-center justify-between py-4 text-[0.875rem]"
          >
            <span className="text-ink-900">{item.name}</span>
            <Change value={item.changePct}>
              {formatSignedPercent(item.changePct)}
            </Change>
          </li>
        ))}
      </ul>

      {/* A picture of a button: not focusable, and hidden from screen readers with the rest of the phone. */}
      <div className="mt-auto flex min-h-11 items-center justify-center rounded-xl border border-brand-600 bg-brand-400 text-[0.8125rem] font-medium text-ink-900">
        {ctaLabel}
      </div>
    </div>
  )
}
