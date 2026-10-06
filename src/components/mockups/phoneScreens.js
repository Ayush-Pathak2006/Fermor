// Maps each app feature to the phone screen that shows it, plus the sentence that describes that
// screen for screen readers. The numbers in the sentences come from the same demo data as the screens.
import {
  ASK_DEMO,
  FORECAST_DEMO,
  MARKET_DEMO,
  PORTFOLIO_DEMO,
} from '../../data/app-demo.js'
import {
  formatINR,
  formatINRCompact,
  formatSignedINR,
} from '../../lib/format.js'
import AskScreen from './AskScreen.jsx'
import ForecastScreen from './ForecastScreen.jsx'
import MarketScreen from './MarketScreen.jsx'
import PortfolioScreen from './PortfolioScreen.jsx'

const finalForecastValue = FORECAST_DEMO.labelledPoints.at(-1).value

export const PHONE_SCREENS = {
  ask: {
    Screen: AskScreen,
    label: `Ask screen. The question "${ASK_DEMO.question}", answered with a summary of ${formatINR(ASK_DEMO.spent)} of spending. Example data.`,
  },
  portfolio: {
    Screen: PortfolioScreen,
    label: `Portfolio screen. Net worth ${formatINR(PORTFOLIO_DEMO.netWorth)}, up ${formatSignedINR(PORTFOLIO_DEMO.monthChange)} this month, split across mutual funds, stocks, fixed deposits and savings. Example data.`,
  },
  market: {
    Screen: MarketScreen,
    label: `Market screen. A ${formatINR(MARKET_DEMO.sip.amount)} monthly SIP and a watchlist of ${MARKET_DEMO.watchlist.length} fund types. Example data.`,
  },
  forecasting: {
    Screen: ForecastScreen,
    label: `Forecasting screen. ${formatINR(FORECAST_DEMO.start)} today could be about ${formatINRCompact(finalForecastValue)} in ${FORECAST_DEMO.horizonYears} years, at ${FORECAST_DEMO.annualRatePct}% a year with a ${formatINR(FORECAST_DEMO.monthly)} monthly SIP. Example data.`,
  },
}
