// A header dropdown: a button that opens a panel of links. It is a disclosure (Headless UI Popover),
// not an ARIA menu, so Tab moves through the links and Escape or an outside click closes it.
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import { useRef } from 'react'

/**
 * Props: `label` (the button text), `panelClassName` (width), and `children`, a function that gets
 * `{ close, buttonRef }`: call `close()` after a link is chosen, and pass `buttonRef` where focus
 * should return to.
 * Usage: <HeaderPopover label="Tools">{({ close }) => <MenuLink onClick={close} ... />}</HeaderPopover>
 */
export default function HeaderPopover({ label, panelClassName, children }) {
  const buttonRef = useRef(null)

  return (
    <Popover className="relative">
      <PopoverButton
        ref={buttonRef}
        className="group inline-flex min-h-11 items-center gap-1 rounded-xl px-3 text-sm font-medium text-ink-900 hover:bg-brand-50 data-open:bg-brand-50"
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          className="size-4 transition-transform duration-150 group-data-open:rotate-180 motion-reduce:transition-none"
        />
      </PopoverButton>
      <PopoverPanel
        transition
        className={clsx(
          'absolute top-full left-0 z-50 mt-2 origin-top-left rounded-2xl border border-line bg-surface p-2 shadow-float transition duration-150 ease-out data-closed:scale-95 data-closed:opacity-0 motion-reduce:transition-none',
          panelClassName,
        )}
      >
        {({ close }) => children({ close, buttonRef })}
      </PopoverPanel>
    </Popover>
  )
}
