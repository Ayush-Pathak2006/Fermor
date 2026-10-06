// The "Products" dropdown: the five app products, each opening its coming-soon dialog.
import { PRODUCTS } from '../../data/products.js'
import { WAITLIST_LINK } from '../../data/navigation.js'
import SmartLink from '../ui/SmartLink.jsx'
import HeaderPopover from './HeaderPopover.jsx'
import MenuLink from './MenuLink.jsx'

export default function ProductsMenu() {
  return (
    <HeaderPopover label="Products" panelClassName="w-104">
      {({ close, buttonRef }) => (
        <>
          <ul>
            {PRODUCTS.map((product) => (
              <li key={product.id}>
                <MenuLink
                  productId={product.id}
                  title={product.menuLabel}
                  description={product.line}
                  returnFocusRef={buttonRef}
                  onClick={close}
                />
              </li>
            ))}
          </ul>
          <div className="mt-1 flex items-center justify-between gap-4 border-t border-line px-3 pt-3 pb-1 text-sm text-ink-700">
            <p>All five are part of the Fermor app.</p>
            <SmartLink
              href={WAITLIST_LINK.href}
              onClick={close}
              className="inline-flex min-h-11 items-center font-medium text-brand-700 hover:underline"
            >
              {WAITLIST_LINK.label}
            </SmartLink>
          </div>
        </>
      )}
    </HeaderPopover>
  )
}
