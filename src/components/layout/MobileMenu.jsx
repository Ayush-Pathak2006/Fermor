// The full-height menu sheet for screens below `lg`. Same groups as the desktop header.
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { X } from 'lucide-react'
import { useComingSoon } from '../../context/ComingSoonContext.jsx'
import {
  GUIDES_LINK,
  LOGIN_LINK,
  TOOLS_MENU,
  WAITLIST_LINK,
} from '../../data/navigation.js'
import { PRODUCTS } from '../../data/products.js'
import { useAfterClose } from '../../hooks/useAfterClose.js'
import { getSectionId } from '../../lib/links.js'
import { scrollToSection } from '../../lib/scroll.js'
import Button from '../ui/Button.jsx'
import Logo from '../ui/Logo.jsx'
import MenuLink from './MenuLink.jsx'

function MenuGroup({ id, label, children }) {
  return (
    <section aria-labelledby={id} className="mt-6 first:mt-0">
      <p id={id} className="px-3 pb-1 text-sm font-medium text-ink-500">
        {label}
      </p>
      <ul>{children}</ul>
    </section>
  )
}

/** Props: `isOpen`, `onClose`, and `returnFocusRef` (the menu button, where focus returns to). */
export default function MobileMenu({ isOpen, onClose, returnFocusRef }) {
  const { openProduct } = useComingSoon()
  const { scheduleAfterClose, runScheduledAction } = useAfterClose()

  // Closes the sheet first and runs `action` once it is gone. Scrolling or opening another
  // dialog while this one still holds the scroll lock would not work.
  const closeThen = (action) => (event) => {
    event.preventDefault()
    scheduleAfterClose(action)
    onClose()
  }

  const handleProductClick = (productId) => (event) => {
    event.preventDefault()
    scheduleAfterClose(() =>
      openProduct(productId, { returnFocusTo: returnFocusRef.current }),
    )
    onClose()
  }

  return (
    <Transition show={isOpen} afterLeave={runScheduledAction}>
      <Dialog onClose={onClose} className="relative z-50 lg:hidden">
        <TransitionChild
          enter="ease-out duration-200 motion-reduce:duration-0"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150 motion-reduce:duration-0"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-ink-900/50" aria-hidden="true" />
        </TransitionChild>

        <TransitionChild
          enter="transform transition ease-out duration-200 motion-reduce:duration-0"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in duration-150 motion-reduce:duration-0"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <DialogPanel className="fixed inset-y-0 right-0 flex w-full max-w-sm flex-col bg-surface shadow-float">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
              <DialogTitle className="sr-only">Menu</DialogTitle>
              <Logo />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex size-11 items-center justify-center rounded-xl text-ink-900 hover:bg-brand-50"
              >
                <X aria-hidden="true" className="size-6" />
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="flex-1 overflow-y-auto px-2 py-4"
            >
              <MenuGroup id="mobile-products" label="Products">
                {PRODUCTS.map((product) => (
                  <li key={product.id}>
                    <MenuLink
                      productId={product.id}
                      title={product.menuLabel}
                      description={product.line}
                      onClick={handleProductClick(product.id)}
                    />
                  </li>
                ))}
              </MenuGroup>

              <MenuGroup id="mobile-tools" label="Tools">
                {TOOLS_MENU.map((tool) => (
                  <li key={tool.id}>
                    <MenuLink
                      href={tool.href}
                      title={tool.label}
                      description={tool.description}
                      onClick={onClose}
                    />
                  </li>
                ))}
              </MenuGroup>

              <MenuGroup id="mobile-more" label="More">
                <li>
                  <MenuLink
                    href={GUIDES_LINK.href}
                    title={GUIDES_LINK.label}
                    onClick={onClose}
                  />
                </li>
                <li>
                  <MenuLink
                    href={LOGIN_LINK.href}
                    title={LOGIN_LINK.label}
                    onClick={onClose}
                  />
                </li>
              </MenuGroup>
            </nav>

            <div className="shrink-0 border-t border-line p-4">
              <Button
                href={WAITLIST_LINK.href}
                size="lg"
                className="w-full"
                onClick={closeThen(() =>
                  scrollToSection(getSectionId(WAITLIST_LINK.href)),
                )}
              >
                {WAITLIST_LINK.label}
              </Button>
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  )
}
