// The Fermor app products that have no page yet. Each opens a "coming soon" dialog.

export const PRODUCTS = [
  {
    id: 'market',
    menuLabel: 'Market',
    name: 'Market',
    line: 'Follow stocks, mutual funds and ETFs, and invest from the app.',
    points: [
      'Track what’s moving and why it matters.',
      'Start a SIP from ₹500.',
    ],
  },
  {
    id: 'portfolio',
    menuLabel: 'Portfolio',
    name: 'Portfolio',
    line: 'Your investments, spending and savings in one view.',
    points: [
      'See your net worth and where your money goes.',
      'Set goals and see how your money could grow.',
    ],
  },
  {
    id: 'ask',
    menuLabel: 'Ask',
    name: 'Ask',
    line: 'Ask about your money and get answers based on your own numbers.',
    points: ['Ask “Where is my money going?”', 'Ask “How can I save more?”'],
  },
  {
    id: 'act',
    menuLabel: 'ACT',
    name: 'ACT',
    line: 'We’ll share details closer to launch.',
    points: [],
  },
  {
    id: 'kids',
    menuLabel: 'For Kids',
    name: 'Fermor for Kids',
    // Our interpretation: fermor.in names this product but does not describe it. The README says so.
    line: 'Money basics for children.',
    points: [],
  },
]

export const getProduct = (productId) => {
  const product = PRODUCTS.find((item) => item.id === productId)
  if (!product) throw new Error(`Unknown product id: ${productId}`)
  return product
}

/** Features shown on the phone in the app section. Forecasting is a feature, not a product. */
export const APP_FEATURES = [
  {
    id: 'ask',
    name: 'Ask',
    line: 'Ask about your money and get answers based on your own numbers.',
    example: 'Where did my money go this month?',
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    line: 'Your investments, spending and savings in one view.',
    example: 'See your net worth and what changed this month.',
  },
  {
    id: 'market',
    name: 'Market',
    line: 'Follow stocks, mutual funds and ETFs, and invest from the app.',
    example: 'Start a SIP from ₹500.',
  },
  {
    id: 'forecasting',
    name: 'Forecasting',
    line: 'Model market shifts and life goals to see where your money could be in 10 years.',
    example: 'See how a monthly SIP changes where you end up.',
  },
]
