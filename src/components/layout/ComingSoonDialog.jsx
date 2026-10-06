// The dialog that opens for any app product with no page yet: what it is, and a way to join the waitlist.
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { useComingSoon } from '../../context/ComingSoonContext.jsx'
import { SECTION_IDS } from '../../data/links.js'
import { getProduct } from '../../data/products.js'
import { useAfterClose } from '../../hooks/useAfterClose.js'
import { scrollToSection } from '../../lib/scroll.js'
import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'

/** Render once, near the top of the page. It reads which product to show from ComingSoonContext. */
export default function ComingSoonDialog() {
  const { productId, isOpen, closeProduct, returnFocusRef } = useComingSoon()
  const { scheduleAfterClose, runScheduledAction } = useAfterClose()
  const product = productId ? getProduct(productId) : null

  const handleJoinWaitlist = () => {
    scheduleAfterClose(() => scrollToSection(SECTION_IDS.waitlist))
    closeProduct()
  }

  const handleAfterLeave = () => {
    if (runScheduledAction()) return
    // Wait a frame so this runs after the dialog's own focus handling.
    requestAnimationFrame(() => returnFocusRef.current?.focus())
  }

  return (
    <Transition show={isOpen} afterLeave={handleAfterLeave}>
      <Dialog onClose={closeProduct} className="relative z-50">
        <TransitionChild
          enter="ease-out duration-150 motion-reduce:duration-0"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150 motion-reduce:duration-0"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-ink-900/50" aria-hidden="true" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-end justify-center p-4 sm:items-center">
          <TransitionChild
            enter="ease-out duration-200 motion-reduce:duration-0"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="ease-in duration-150 motion-reduce:duration-0"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <DialogPanel className="w-full max-w-md rounded-3xl bg-surface p-6 shadow-float sm:p-8">
              <Badge>Coming soon</Badge>
              <DialogTitle
                as="h2"
                className="mt-4 text-h3 font-semibold text-ink-900"
              >
                {product?.name} is coming soon
              </DialogTitle>
              <p className="mt-2 text-ink-700">
                It&rsquo;s part of the Fermor app.
              </p>
              <p className="mt-4 text-ink-900">{product?.line}</p>

              {product?.points.length > 0 && (
                <>
                  <p className="mt-4 text-sm font-medium text-ink-500">
                    You&rsquo;ll be able to:
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-700 marker:text-brand-600">
                    {product.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button variant="secondary" onClick={closeProduct}>
                  Close
                </Button>
                <Button onClick={handleJoinWaitlist}>Join the waitlist</Button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}
