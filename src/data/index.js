// Data assembled from the other files: the search index, and every external URL for the link checker.
import { isExternalLink } from '../lib/links.js'
import { DECISIONS } from './decisions.js'
import { EXAMPLES } from './examples.js'
import { FEATURED_GUIDE, GUIDES } from './guides.js'
import { LINKS, SECTION_IDS, sectionHref } from './links.js'
import { FOOTER_GROUPS, TOOLS_MENU } from './navigation.js'
import { PRODUCTS } from './products.js'
import { CALCULATORS, POPULAR_TOOLS, SITE_PAGES, getTool } from './tools.js'

const toEntry = (group) => (tool) => ({ ...tool, group })

const SECTION_ENTRIES = [
  {
    id: 'section-tools',
    name: 'Free tools',
    href: sectionHref(SECTION_IDS.tools),
    keywords: ['calculators', 'explorer'],
  },
  {
    id: 'section-app',
    name: 'The app',
    href: sectionHref(SECTION_IDS.app),
    keywords: ['ask', 'portfolio', 'market'],
  },
  {
    id: 'section-waitlist',
    name: 'Join the waitlist',
    href: sectionHref(SECTION_IDS.waitlist),
    keywords: ['early access', 'email'],
  },
  {
    id: 'section-guides',
    name: 'Guides',
    href: sectionHref(SECTION_IDS.guides),
    keywords: ['blog', 'articles'],
  },
  {
    id: 'section-faq',
    name: 'FAQ',
    href: sectionHref(SECTION_IDS.faq),
    keywords: ['questions', 'help'],
  },
].map(toEntry('page'))

const PRODUCT_ENTRIES = PRODUCTS.map((product) => ({
  id: `product-${product.id}`,
  name: product.name,
  productId: product.id,
  keywords: [product.menuLabel],
  group: 'soon',
}))

/** Everything the search dialog can find. Entries have an `href` (a link) or a `productId`. */
export const SEARCH_ENTRIES = [
  ...CALCULATORS.map(toEntry('calculators')),
  ...SITE_PAGES.map(toEntry('site')),
  ...SECTION_ENTRIES,
  ...PRODUCT_ENTRIES,
]

/** Entry ids shown before anyone types. */
export const POPULAR_SEARCH_IDS = POPULAR_TOOLS.map((item) => item.toolId)

/** Every external URL the page links to, for scripts/check-links.mjs. Unknown tool ids throw. */
export function allExternalUrls() {
  const urls = [
    ...Object.values(LINKS),
    ...CALCULATORS.map((tool) => tool.href),
    ...SITE_PAGES.map((page) => page.href),
    ...POPULAR_TOOLS.map((item) => getTool(item.toolId).href),
    ...DECISIONS.flatMap((decision) =>
      decision.toolIds.map((toolId) => getTool(toolId).href),
    ),
    ...EXAMPLES.map((example) => getTool(example.toolId).href),
    ...TOOLS_MENU.map((item) => item.href),
    ...FOOTER_GROUPS.flatMap((group) => group.links.map((link) => link.href)),
    FEATURED_GUIDE.href,
    ...GUIDES.map((guide) => guide.href),
  ]
  return [...new Set(urls.filter(isExternalLink))]
}
