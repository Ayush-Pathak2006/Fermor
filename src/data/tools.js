// The live fermor.in destinations: 38 calculators and the main site pages.
// Search, the popular chips and the decision index all read from here.
import { LINKS, fermorUrl } from './links.js'

const calculator = (id, name, slug, keywords) => ({
  id,
  name,
  href: fermorUrl(`/calculators/${slug}`),
  keywords,
})

export const CALCULATORS = [
  calculator('sip', 'SIP calculator', 'sip-calculator', [
    'sip',
    'mutual fund',
    'monthly investment',
  ]),
  calculator('lumpsum', 'Lumpsum calculator', 'lumpsum-calculator', [
    'one-time',
    'lump sum',
  ]),
  calculator('swp', 'SWP calculator', 'swp-calculator', [
    'withdrawal',
    'monthly income',
  ]),
  calculator('cagr', 'CAGR calculator', 'cagr-calculator', [
    'growth rate',
    'returns',
  ]),
  calculator(
    'compound-interest',
    'Compound interest calculator',
    'compound-interest-calculator',
    ['interest', 'compounding'],
  ),
  calculator(
    'investment-comparison',
    'Investment comparison',
    'investment-comparison-calculator',
    ['fd vs sip', 'ppf', 'nps', 'gold', 'real estate'],
  ),
  calculator(
    'wealth-growth',
    'Wealth growth calculator',
    'wealth-growth-calculator',
    ['corpus', 'net worth'],
  ),
  calculator(
    'goal-planning',
    'Goal planning calculator',
    'goal-planning-calculator',
    ['goal', 'target', 'sip needed'],
  ),
  calculator(
    'future-value',
    'Future value calculator',
    'future-value-calculator',
    ['future value', 'growth'],
  ),
  calculator(
    'present-value',
    'Present value calculator',
    'present-value-calculator',
    ['present value', 'discount'],
  ),
  calculator('elss', 'ELSS calculator', 'elss-calculator', [
    'tax saving',
    '80c',
  ]),
  calculator('apy', 'APY calculator', 'apy-calculator', [
    'annual yield',
    'apr',
    'savings rate',
  ]),
  calculator('income-tax', 'Income tax calculator', 'income-tax-calculator', [
    'tax',
    'itr',
    'slab',
    'fy 2026-27',
  ]),
  calculator(
    'old-vs-new-regime',
    'Old vs new tax regime',
    'old-vs-new-tax-regime-calculator',
    ['regime', 'deductions', 'compare'],
  ),
  calculator(
    'new-regime',
    'New tax regime calculator',
    'new-tax-regime-calculator',
    ['87a', 'rebate', 'slab'],
  ),
  calculator('hra', 'HRA calculator', 'hra-calculator', [
    'rent',
    'house rent allowance',
  ]),
  calculator('gst', 'GST calculator', 'gst-calculator', ['gst', 'invoice']),
  calculator(
    'capital-gains',
    'Capital gains calculator',
    'capital-gains-calculator',
    ['ltcg', 'stcg', 'shares', 'property'],
  ),
  calculator('emi', 'EMI calculator', 'emi-calculator', [
    'loan',
    'instalment',
    'repayment',
  ]),
  calculator('home-loan', 'Home loan calculator', 'home-loan-calculator', [
    'house',
    'property',
    'emi',
  ]),
  calculator(
    'sbi-home-loan',
    'SBI home loan calculator',
    'sbi-home-loan-calculator',
    ['sbi', 'eligibility', 'bank rates'],
  ),
  calculator('car-loan', 'Car loan calculator', 'car-loan-calculator', [
    'car',
    'vehicle',
    'emi',
  ]),
  calculator('loan', 'Loan calculator', 'loan-calculator', [
    'personal loan',
    'emi',
  ]),
  calculator('mortgage', 'Mortgage calculator', 'mortgage-calculator', [
    'mortgage',
    'home',
  ]),
  calculator('fd', 'FD calculator', 'fd-calculator', [
    'fixed deposit',
    'maturity',
  ]),
  calculator('ppf', 'PPF calculator', 'ppf-calculator', [
    'public provident fund',
    '80c',
  ]),
  calculator('nps', 'NPS calculator', 'nps-calculator', [
    'pension',
    'retirement',
  ]),
  calculator('epf', 'EPF calculator', 'epf-calculator', [
    'pf',
    'provident fund',
  ]),
  calculator('vpf', 'VPF calculator', 'vpf-calculator', ['voluntary pf']),
  calculator('fire', 'FIRE calculator', 'fire-calculator', [
    'early retirement',
    'fire number',
  ]),
  calculator('ssy', 'SSY calculator', 'ssy-calculator', [
    'sukanya samriddhi',
    'daughter',
  ]),
  calculator('gratuity', 'Gratuity calculator', 'gratuity-calculator', [
    'gratuity',
    'years of service',
  ]),
  calculator(
    'bank-rates',
    'Bank interest rate comparison',
    'bank-interest-comparison-calculator',
    ['fd rates', 'savings rates', 'loan rates'],
  ),
  calculator('ctc', 'CTC calculator', 'ctc-calculator', [
    'salary',
    'offer',
    'compare offers',
  ]),
  calculator(
    'in-hand',
    'In-hand salary calculator',
    'in-hand-salary-calculator',
    ['take-home', 'net salary'],
  ),
  calculator(
    'salary-hike',
    'Salary hike calculator',
    'salary-hike-calculator',
    ['raise', 'appraisal', 'increment'],
  ),
  calculator('percentage', 'Percentage calculator', 'percentage-calculator', [
    'percent',
    'change',
  ]),
  calculator('inflation', 'Inflation calculator', 'inflation-calculator', [
    'purchasing power',
    'prices',
  ]),
]

/** Other live destinations: the explorers, guides, company pages and the CA Portal. */
export const SITE_PAGES = [
  {
    id: 'calculators',
    name: 'All calculators',
    href: LINKS.calculators,
    keywords: ['calculators', 'tools'],
  },
  {
    id: 'mutual-funds',
    name: 'Mutual fund explorer',
    href: LINKS.mutualFunds,
    keywords: ['funds', 'nav', 'amfi', 'compare funds', 'mutual funds'],
  },
  {
    id: 'mutual-funds-by-fund-house',
    name: 'Mutual funds by fund house',
    href: LINKS.mutualFundsByFundHouse,
    keywords: ['amc', 'fund house'],
  },
  {
    id: 'credit-cards',
    name: 'Credit card comparison',
    href: LINKS.creditCards,
    keywords: ['credit card', 'cards', 'cashback', 'rewards'],
  },
  {
    id: 'guides',
    name: 'All guides',
    href: LINKS.guides,
    keywords: ['blog', 'articles', 'tax guides', 'news'],
  },
  {
    id: 'about',
    name: 'About Fermor',
    href: LINKS.about,
    keywords: ['company', 'team'],
  },
  {
    id: 'contact',
    name: 'Contact',
    href: LINKS.contact,
    keywords: ['email', 'support'],
  },
  {
    id: 'privacy',
    name: 'Privacy policy',
    href: LINKS.privacy,
    keywords: ['data'],
  },
  { id: 'terms', name: 'Terms of use', href: LINKS.terms, keywords: ['legal'] },
  {
    id: 'login',
    name: 'Log in',
    href: LINKS.login,
    keywords: ['sign in', 'account'],
  },
  {
    id: 'ca-portal',
    name: 'CA Portal',
    href: LINKS.caPortal,
    keywords: ['chartered accountant', 'ca', 'clients', 'reminders'],
  },
]

const TOOLS_BY_ID = new Map(
  [...CALCULATORS, ...SITE_PAGES].map((tool) => [tool.id, tool]),
)

/** Looks up a calculator or site page by id. Throws on a typo so a bad id is caught early. */
export const getTool = (toolId) => {
  const tool = TOOLS_BY_ID.get(toolId)
  if (!tool) throw new Error(`Unknown tool id: ${toolId}`)
  return tool
}

/** The chips in the "Popular tools" strip. Each label points at a tool id. */
export const POPULAR_TOOLS = [
  { label: 'SIP', toolId: 'sip' },
  { label: 'EMI', toolId: 'emi' },
  { label: 'Income tax', toolId: 'income-tax' },
  { label: 'Old vs new regime', toolId: 'old-vs-new-regime' },
  { label: 'FD', toolId: 'fd' },
  { label: 'In-hand salary', toolId: 'in-hand' },
  { label: 'PPF', toolId: 'ppf' },
  { label: 'Mutual funds', toolId: 'mutual-funds' },
]

/** Calculator counts by category, as listed on fermor.in/calculators. */
export const CALCULATOR_CATEGORIES = [
  { id: 'loans', name: 'Loans and debt', count: 55 },
  { id: 'investing', name: 'Investing and wealth', count: 31 },
  { id: 'tax', name: 'Tax', count: 26 },
  { id: 'retirement', name: 'Retirement and fixed income', count: 19 },
  { id: 'math', name: 'Tools and math', count: 16 },
  // fermor.in calls this category "Others". It holds the salary tools.
  { id: 'salary', name: 'Salary and more', count: 11 },
]

export const CALCULATOR_TOTAL = CALCULATOR_CATEGORIES.reduce(
  (sum, item) => sum + item.count,
  0,
)

/** The quick categories on the mutual fund explorer. */
export const FUND_CATEGORIES = [
  'Equity',
  'Debt',
  'Hybrid',
  'Index funds',
  'ELSS tax saver',
  'International',
]
