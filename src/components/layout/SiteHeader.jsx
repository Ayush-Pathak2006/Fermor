// The sticky header: logo, product and tool menus, search, and the waitlist button.
// Below `lg` it collapses to the logo, a search button and a menu button.
import { PopoverGroup } from '@headlessui/react'
import clsx from 'clsx'
import { Menu, Search } from 'lucide-react'
import { Suspense, lazy, useRef, useState } from 'react'
import {
  GUIDES_LINK,
  LOGIN_LINK,
  WAITLIST_LINK,
} from '../../data/navigation.js'
import { SECTION_IDS, sectionHref } from '../../data/links.js'
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut.js'
import { useScrolled } from '../../hooks/useScrolled.js'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'
import Kbd from '../ui/Kbd.jsx'
import Logo from '../ui/Logo.jsx'
import SmartLink from '../ui/SmartLink.jsx'
import ProductsMenu from './ProductsMenu.jsx'
import ToolsMenu from './ToolsMenu.jsx'

// Both dialogs are only needed after a click, so they load as separate chunks and keep the
// first download small.
const SearchDialog = lazy(() => import('./SearchDialog.jsx'))
const MobileMenu = lazy(() => import('./MobileMenu.jsx'))

const NAV_LINK_CLASSES =
  'inline-flex min-h-11 items-center gap-1 rounded-xl px-3 text-sm font-medium text-ink-900 hover:bg-brand-50'

const ICON_BUTTON_CLASSES =
  'inline-flex size-11 items-center justify-center rounded-xl text-ink-900 hover:bg-brand-50'

export default function SiteHeader() {
  const isScrolled = useScrolled()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // Controls that opened a dialog, so focus can go back to them when it closes.
  const searchReturnFocusRef = useRef(null)
  const menuButtonRef = useRef(null)

  const openSearch = (trigger = document.activeElement) => {
    searchReturnFocusRef.current = trigger
    setIsSearchOpen(true)
  }

  useKeyboardShortcut({ key: '/', ignoreWhileTyping: true }, () => openSearch())
  useKeyboardShortcut({ key: 'k', withModifier: true }, () => openSearch())

  return (
    <>
      <header
        className={clsx(
          'sticky top-0 z-40 border-b transition-colors duration-150 motion-reduce:transition-none',
          isScrolled
            ? 'border-line bg-paper'
            : 'border-transparent bg-transparent',
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2 xl:gap-6">
            <SmartLink
              href={sectionHref(SECTION_IDS.top)}
              aria-label="Fermor home"
              className="inline-flex min-h-11 items-center rounded-xl pr-2"
            >
              <Logo />
            </SmartLink>

            <nav
              aria-label="Main"
              className="hidden items-center gap-1 lg:flex"
            >
              <PopoverGroup className="flex items-center gap-1">
                <ProductsMenu />
                <ToolsMenu />
              </PopoverGroup>
              <SmartLink href={GUIDES_LINK.href} className={NAV_LINK_CLASSES}>
                {GUIDES_LINK.label}
              </SmartLink>
            </nav>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={(event) => openSearch(event.currentTarget)}
              aria-keyshortcuts="/"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line-strong bg-surface pr-2 pl-3 text-sm text-ink-700 hover:border-ink-900"
            >
              <Search aria-hidden="true" className="size-5" />
              Search tools
              <Kbd>/</Kbd>
            </button>
            <SmartLink href={LOGIN_LINK.href} className={NAV_LINK_CLASSES}>
              {LOGIN_LINK.label}
            </SmartLink>
            <Button href={WAITLIST_LINK.href}>{WAITLIST_LINK.label}</Button>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <button
              type="button"
              onClick={(event) => openSearch(event.currentTarget)}
              aria-label="Search tools"
              className={ICON_BUTTON_CLASSES}
            >
              <Search aria-hidden="true" className="size-6" />
            </button>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              aria-haspopup="dialog"
              className={ICON_BUTTON_CLASSES}
            >
              <Menu aria-hidden="true" className="size-6" />
            </button>
          </div>
        </Container>
      </header>

      <Suspense fallback={null}>
        <SearchDialog
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          returnFocusRef={searchReturnFocusRef}
        />
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          returnFocusRef={menuButtonRef}
        />
      </Suspense>
    </>
  )
}
