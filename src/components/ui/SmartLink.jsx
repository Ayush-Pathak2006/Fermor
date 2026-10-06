// The one component every link goes through, so nothing on the page can be a dead end.
// It renders one of three kinds, decided by lib/links.js:
//   external  a live page on another site: new tab, a ↗ icon, and screen reader text with the real domain
//   internal  a jump to a section of this page: smooth scroll, then focus moves to that section
//   soon      an app product with no page yet: a button that opens the "coming soon" dialog
import { ArrowUpRight } from 'lucide-react'
import { useComingSoon } from '../../context/ComingSoonContext.jsx'
import { getHostname, getLinkKind, getSectionId } from '../../lib/links.js'
import { scrollToSection } from '../../lib/scroll.js'
import Badge from './Badge.jsx'

/**
 * The link text, with the ↗ icon attached to its last word so a wrapped label never strands the icon
 * on a line of its own. Labels that are not plain strings get the icon after them.
 */
function ExternalLabel({ children, showIcon }) {
  if (!showIcon) return children

  const icon = (
    <ArrowUpRight
      aria-hidden="true"
      className="ml-[0.2em] inline-block size-[1em] shrink-0 align-[-0.15em]"
    />
  )
  if (typeof children !== 'string') {
    return (
      <>
        {children}
        {icon}
      </>
    )
  }

  // One wrapping span keeps the label a single piece even when the link is a flex container, which
  // would otherwise drop the space between the two text runs.
  const lastSpace = children.lastIndexOf(' ')
  return (
    <span>
      {children.slice(0, lastSpace + 1)}
      <span className="whitespace-nowrap">
        {children.slice(lastSpace + 1)}
        {icon}
      </span>
    </span>
  )
}

/**
 * Props: `href` ("https://..." or "#section") or `productId` (an id from data/products.js),
 * `showBadge` (soon links: show "Coming soon", default true), `showExternalIcon` (default true),
 * `returnFocusRef` (soon links: the element to refocus when the dialog closes).
 * A caller's `onClick` can call event.preventDefault() to take over an internal or soon link.
 * Usage: <SmartLink href={LINKS.calculators}>Browse all calculators</SmartLink>
 */
export default function SmartLink({
  href,
  productId,
  showBadge = true,
  showExternalIcon = true,
  returnFocusRef,
  onClick,
  children,
  ...rest
}) {
  const { openProduct } = useComingSoon()
  const kind = getLinkKind({ href, productId })

  if (kind === 'soon') {
    const handleSoonClick = (event) => {
      onClick?.(event)
      if (event.defaultPrevented) return
      openProduct(productId, { returnFocusTo: returnFocusRef?.current })
    }
    return (
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={handleSoonClick}
        {...rest}
      >
        {children}
        {showBadge && <Badge>Coming soon</Badge>}
      </button>
    )
  }

  if (kind === 'internal') {
    const handleSectionClick = (event) => {
      onClick?.(event)
      // The caller may take over the jump (a dialog scrolls only after it has closed).
      if (event.defaultPrevented) return
      event.preventDefault()
      scrollToSection(getSectionId(href))
    }
    return (
      <a href={href} onClick={handleSectionClick} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      {...rest}
    >
      <ExternalLabel showIcon={showExternalIcon}>{children}</ExternalLabel>
      <span className="sr-only">
        {' '}
        (opens on {getHostname(href)} in a new tab)
      </span>
    </a>
  )
}
