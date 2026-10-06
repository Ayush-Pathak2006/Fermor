// The footer: every group of links, the X link, the legal note and the concept note.
import { FOOTER_GROUPS, FOOTER_NOTES, X_LINK } from '../../data/navigation.js'
import Container from '../ui/Container.jsx'
import Logo from '../ui/Logo.jsx'
import SmartLink from '../ui/SmartLink.jsx'

// A block with vertical padding (24px line plus 20px) gives a 44px touch target and lets long labels wrap.
const CURRENT_YEAR = new Date().getFullYear()

const FOOTER_LINK_CLASSES =
  'block py-2.5 text-ink-700 underline-offset-4 hover:text-ink-900 hover:underline'

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-12 md:py-16">
        <h2 className="sr-only">More from Fermor</h2>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
          {FOOTER_GROUPS.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="text-sm font-semibold text-ink-900">
                {group.title}
              </h3>
              <ul className="mt-3">
                {group.links.map((link) => (
                  <li key={`${link.label}-${link.href}`}>
                    <SmartLink href={link.href} className={FOOTER_LINK_CLASSES}>
                      {link.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
              {group.note && (
                <p className="mt-2 text-sm text-ink-500">{group.note}</p>
              )}
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-176 space-y-3 text-sm text-ink-500">
            <Logo className="mb-4" />
            <p>{FOOTER_NOTES.legal}</p>
            <p>{FOOTER_NOTES.concept}</p>
            <p>&copy; {CURRENT_YEAR} Fermor.</p>
          </div>
          <SmartLink href={X_LINK.href} className={FOOTER_LINK_CLASSES}>
            {X_LINK.label}
          </SmartLink>
        </div>
      </Container>
    </footer>
  )
}
