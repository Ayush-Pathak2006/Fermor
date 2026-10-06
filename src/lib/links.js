// Helpers that decide what kind of link something is. SmartLink and the link checker use them.

/** A link is "external" when it points at another site (https://...). */
export function isExternalLink(href) {
  return /^https?:\/\//i.test(href)
}

/** A link is a "section" link when it jumps to an id on this page, such as "#tools". */
export function isSectionLink(href) {
  return href.startsWith('#') && href.length > 1
}

/** "#tools" becomes "tools". */
export function getSectionId(href) {
  return href.slice(1)
}

/** The host to show people and screen readers: "fermor.in", "ca.fermor.in", "twitter.com". */
export function getHostname(href) {
  return new URL(href).hostname.replace(/^www\./, '')
}

/**
 * The three kinds of link on the page:
 * - "soon": a product with no page yet, which opens a dialog
 * - "internal": a jump to a section of this page
 * - "external": a live page on another site, which opens in a new tab
 */
export function getLinkKind({ href, productId }) {
  if (productId) return 'soon'
  if (href && isSectionLink(href)) return 'internal'
  if (href && isExternalLink(href)) return 'external'
  throw new Error(
    `Link needs a product id, a "#section" or an https URL. Got: ${href}`,
  )
}
