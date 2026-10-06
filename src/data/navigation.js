// Header menus and footer groups. Links use URLs from links.js and tool ids from tools.js.
import { LINKS, SECTION_IDS, sectionHref } from './links.js'
import { GUIDE_TYPES } from './guides.js'
import { CALCULATOR_TOTAL, getTool } from './tools.js'

export const WAITLIST_LINK = {
  label: 'Join the waitlist',
  href: sectionHref(SECTION_IDS.waitlist),
}

export const GUIDES_LINK = { label: 'Guides', href: LINKS.guides }

export const LOGIN_LINK = { label: 'Log in', href: LINKS.login }

/** The Tools menu. `id` also picks the icon in the component. */
export const TOOLS_MENU = [
  {
    id: 'calculators',
    label: 'Calculators',
    description: `${CALCULATOR_TOTAL} calculators for loans, tax, investing and retirement`,
    href: LINKS.calculators,
  },
  {
    id: 'mutual-funds',
    label: 'Mutual fund explorer',
    description: 'Filter and compare 2,400+ funds',
    href: LINKS.mutualFunds,
  },
  {
    id: 'credit-cards',
    label: 'Credit cards',
    description: 'Compare cards by rewards and fees',
    href: LINKS.creditCards,
  },
  {
    id: 'ca-portal',
    label: 'CA Portal',
    description: 'Client reminders for chartered accountants',
    href: LINKS.caPortal,
  },
]

const popularCalculator = (label, toolId) => ({
  label,
  href: getTool(toolId).href,
})

export const FOOTER_GROUPS = [
  {
    title: 'Tools',
    links: [
      { label: 'Calculators', href: LINKS.calculators },
      { label: 'Mutual fund explorer', href: LINKS.mutualFunds },
      { label: 'Credit cards', href: LINKS.creditCards },
      { label: 'CA Portal', href: LINKS.caPortal },
    ],
  },
  {
    title: 'Popular calculators',
    links: [
      popularCalculator('SIP', 'sip'),
      popularCalculator('EMI', 'emi'),
      popularCalculator('Income tax', 'income-tax'),
      popularCalculator('FD', 'fd'),
      popularCalculator('PPF', 'ppf'),
      popularCalculator('Home loan', 'home-loan'),
    ],
  },
  {
    title: 'Guides',
    links: [
      { label: 'All guides', href: LINKS.guides },
      { label: GUIDE_TYPES.tax, href: LINKS.guides },
      { label: GUIDE_TYPES.markets, href: LINKS.guides },
      { label: GUIDE_TYPES.government, href: LINKS.guides },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: LINKS.about },
      { label: 'Contact', href: LINKS.contact },
      { label: 'Privacy policy', href: LINKS.privacy },
      { label: 'Terms of use', href: LINKS.terms },
    ],
  },
  {
    title: 'App',
    links: [WAITLIST_LINK],
    note: 'Coming to iPhone and Android.',
  },
]

export const X_LINK = { label: '@fermor_in on X', href: LINKS.x }

export const FOOTER_NOTES = {
  legal:
    'Fermor Technologies Pvt. Ltd. operates fermor.in, a financial calculator and education platform for India. Fermor is not a SEBI-registered investment adviser and doesn’t give personal financial, investment or tax advice. Results are indicative.',
  concept:
    'Homepage concept by Ayush for Fermor’s frontend assignment. Tools and guides open on fermor.in.',
}
