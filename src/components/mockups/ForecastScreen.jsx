// The Forecasting screen: today's money, where it could be in 10 years, a small chart and the assumption.
import { FORECAST_DEMO } from '../../data/app-demo.js'
import { buildLineChart } from '../../lib/chart.js'
import { formatINR, formatINRCompact } from '../../lib/format.js'

const CHART = {
  width: 248,
  height: 132,
  padding: { top: 14, right: 14, bottom: 8, left: 14 },
}

export default function ForecastScreen() {
  const {
    start,
    monthly,
    annualRatePct,
    horizonYears,
    series,
    labelledPoints,
  } = FORECAST_DEMO
  const { coordinates, linePath, areaPath } = buildLineChart({
    points: series,
    ...CHART,
  })
  const finalPoint = labelledPoints[labelledPoints.length - 1]

  return (
    <div className="flex h-full flex-col px-4 pt-12 pb-4">
      <p className="text-sm font-semibold text-ink-900">Forecasting</p>

      <div className="mt-5 flex items-end justify-between gap-2">
        <div>
          <p className="text-[0.6875rem] text-ink-700">Today</p>
          <p className="text-[0.9375rem] font-bold text-ink-900 tabular-nums">
            {formatINR(start)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[0.6875rem] text-ink-700">
            In {horizonYears} years, about
          </p>
          <p className="text-xl leading-none font-bold text-ink-900 tabular-nums">
            {formatINRCompact(finalPoint.value)}
          </p>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${CHART.width} ${CHART.height}`}
        className="mt-4 w-full"
        role="presentation"
      >
        <path d={areaPath} className="fill-brand-200/60" />
        <path
          d={linePath}
          className="fill-none stroke-brand-700"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {labelledPoints.map((point) => {
          const { x, y } = coordinates[point.years]
          return (
            <circle
              key={point.label}
              cx={x}
              cy={y}
              r="3.5"
              className="fill-surface stroke-brand-700"
              strokeWidth="2"
            />
          )
        })}
      </svg>
      <div className="relative mt-1 h-4 text-[0.6875rem] text-ink-700">
        {labelledPoints.map((point) => (
          <span
            key={point.label}
            className="absolute -translate-x-1/2 whitespace-nowrap tabular-nums"
            style={{
              left: `${(coordinates[point.years].x / CHART.width) * 100}%`,
            }}
          >
            {point.label}
          </span>
        ))}
      </div>

      <p className="mt-auto rounded-xl bg-paper px-3 py-2.5 text-[0.6875rem] leading-snug text-ink-700">
        Assumes {annualRatePct}% a year and a {formatINR(monthly)} monthly SIP.
        An example, not a promise.
      </p>
    </div>
  )
}
