// Illustrative data for the phone screens. These are examples, never live figures.
// Numbers are kept consistent across screens: the Portfolio net worth is the Forecasting start,
// and the Ask answer is written from the same figures it draws.
import { projectWealth } from '../lib/finance.js'
import { formatINR } from '../lib/format.js'

const ASK_SPENT = 41250
const ASK_TOP_CATEGORIES = [
  { name: 'Rent and bills', value: 18000 },
  { name: 'Food', value: 9600 },
]

export const ASK_DEMO = {
  question: 'Where did my money go this month?',
  spent: ASK_SPENT,
  topCategories: ASK_TOP_CATEGORIES,
  answer: `You spent ${formatINR(ASK_SPENT)} in September, 9% less than August. ${ASK_TOP_CATEGORIES[0].name} took the most at ${formatINR(ASK_TOP_CATEGORIES[0].value)}, then ${ASK_TOP_CATEGORIES[1].name.toLowerCase()} at ${formatINR(ASK_TOP_CATEGORIES[1].value)}.`,
  followUps: ['How can I save more?', 'Am I on track for my goals?'],
}

export const PORTFOLIO_DEMO = {
  netWorth: 1248500,
  monthChange: 28400,
  monthChangePct: 2.3,
  // These four add up to the net worth.
  holdings: [
    { name: 'Mutual funds', value: 574300 },
    { name: 'Stocks', value: 274700 },
    { name: 'Fixed deposits', value: 225000 },
    { name: 'Savings', value: 174500 },
  ],
}

export const MARKET_DEMO = {
  sip: { amount: 5000, dayOfMonth: 5 },
  // Categories, not real company names or index levels.
  watchlist: [
    { name: 'Nifty 50 index fund', changePct: 0.8 },
    { name: 'Flexi cap fund', changePct: 0.5 },
    { name: 'Gold ETF', changePct: -0.3 },
  ],
  ctaLabel: 'Start a SIP from ₹500',
}

const FORECAST_ASSUMPTIONS = {
  start: PORTFOLIO_DEMO.netWorth,
  monthly: 15000,
  annualRatePct: 10,
}
const FORECAST_HORIZON_YEARS = 10
const FORECAST_LABELLED_YEARS = [0, 2, 5, 10]

const valueAfter = (years) => projectWealth({ ...FORECAST_ASSUMPTIONS, years })

export const FORECAST_DEMO = {
  ...FORECAST_ASSUMPTIONS,
  horizonYears: FORECAST_HORIZON_YEARS,
  // One value per year, so the chart is a true compounding curve.
  series: Array.from({ length: FORECAST_HORIZON_YEARS + 1 }, (_, years) => ({
    x: years,
    y: valueAfter(years),
  })),
  // The points the chart labels: Now, 2Y, 5Y and 10Y.
  labelledPoints: FORECAST_LABELLED_YEARS.map((years) => ({
    years,
    label: years === 0 ? 'Now' : `${years}Y`,
    value: valueAfter(years),
  })),
}
