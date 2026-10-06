// Every URL on the page lives here. Other data files and components import from this file only.

export const FERMOR_ORIGIN = 'https://fermor.in'
export const CA_PORTAL_ORIGIN = 'https://ca.fermor.in'

/** Builds a full fermor.in URL from a path such as "/calculators". */
export const fermorUrl = (path = '') => `${FERMOR_ORIGIN}${path}`

/** Pages on fermor.in and its CA Portal. All of these open in a new tab. */
export const LINKS = {
  calculators: fermorUrl('/calculators'),
  sipCalculator: fermorUrl('/calculators/sip-calculator'),
  mutualFunds: fermorUrl('/mutual-funds'),
  mutualFundsByFundHouse: fermorUrl('/mutual-funds/amc'),
  creditCards: fermorUrl('/credit-cards'),
  guides: fermorUrl('/blogs'),
  about: fermorUrl('/about'),
  contact: fermorUrl('/contact'),
  privacy: fermorUrl('/privacy'),
  terms: fermorUrl('/terms'),
  login: fermorUrl('/sign-in'),
  caPortal: CA_PORTAL_ORIGIN,
  caPortalTry: `${CA_PORTAL_ORIGIN}/ca/try`,
  // fermor.in links to the same address. It is the only social link that works.
  x: 'https://twitter.com/fermor_in',
}

/** Ids of the sections on this page. Section components and in-page links share them. */
export const SECTION_IDS = {
  top: 'top',
  decisions: 'decisions',
  tools: 'tools',
  app: 'app',
  waitlist: 'waitlist',
  guides: 'guides',
  howItWorks: 'how-it-works',
  forCas: 'for-cas',
  faq: 'faq',
}

/** In-page link target for a section id, e.g. sectionHref('tools') is "#tools". */
export const sectionHref = (sectionId) => `#${sectionId}`
