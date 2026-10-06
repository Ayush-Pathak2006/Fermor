// Search for returning visitors: type a tool, a page or a section, press Enter, and go there.
// Opened from the header, with "/" or with Cmd/Ctrl+K.
import {
  Combobox,
  ComboboxInput,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { Search } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useComingSoon } from '../../context/ComingSoonContext.jsx'
import { POPULAR_SEARCH_IDS, SEARCH_ENTRIES } from '../../data/index.js'
import { useAfterClose } from '../../hooks/useAfterClose.js'
import { getSectionId, isSectionLink } from '../../lib/links.js'
import { groupSearchResults, searchEntries } from '../../lib/search.js'
import { scrollToSection } from '../../lib/scroll.js'
import Kbd from '../ui/Kbd.jsx'
import SearchResults from './SearchResults.jsx'

/**
 * Props: `isOpen`, `onClose`, and `returnFocusRef` (the control that opened the search, so a
 * coming-soon dialog opened from here can send focus back to it).
 */
export default function SearchDialog({ isOpen, onClose, returnFocusRef }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const { openProduct } = useComingSoon()
  const { scheduleAfterClose, runScheduledAction } = useAfterClose()

  // Headless UI skips initial focus on touch devices so the keyboard does not pop up uninvited.
  // For search that is the wrong default: opening it means "I want to type". Wait a frame so this
  // runs after the dialog's own focus handling.
  useEffect(() => {
    if (!isOpen) return undefined
    const frameId = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(frameId)
  }, [isOpen])

  const hasQuery = query.trim() !== ''
  const groups = useMemo(() => {
    const results = searchEntries(query, SEARCH_ENTRIES, {
      popularIds: POPULAR_SEARCH_IDS,
    })
    return groupSearchResults(results, { hasQuery })
  }, [query, hasQuery])

  const handleSelect = (entry) => {
    if (!entry) return

    if (entry.productId) {
      scheduleAfterClose(() =>
        openProduct(entry.productId, {
          returnFocusTo: returnFocusRef?.current,
        }),
      )
    } else if (isSectionLink(entry.href)) {
      scheduleAfterClose(() => scrollToSection(getSectionId(entry.href)))
    } else {
      // Opened right here, inside the key press, so the browser does not block it as a pop-up.
      window.open(entry.href, '_blank', 'noopener')
    }
    onClose()
  }

  const handleAfterLeave = () => {
    setQuery('')
    runScheduledAction()
  }

  // The combobox spends its first Escape on closing its own list, which is always on screen here.
  // Catching Escape first makes one press close the whole dialog.
  const handleEscape = (event) => {
    if (event.key !== 'Escape') return
    event.stopPropagation()
    onClose()
  }

  return (
    <Transition show={isOpen} afterLeave={handleAfterLeave}>
      <Dialog onClose={onClose} className="relative z-50">
        <TransitionChild
          enter="ease-out duration-150 motion-reduce:duration-0"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100 motion-reduce:duration-0"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-ink-900/50" aria-hidden="true" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto p-4 sm:p-6 md:pt-[12vh]">
          <TransitionChild
            enter="ease-out duration-150 motion-reduce:duration-0"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="ease-in duration-100 motion-reduce:duration-0"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <DialogPanel
              onKeyDownCapture={handleEscape}
              className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl bg-surface shadow-float"
            >
              <DialogTitle className="sr-only">Search Fermor</DialogTitle>
              <Combobox value={null} onChange={handleSelect}>
                {/* The focus ring goes on the whole row, inset, so it reads as one tidy field. */}
                <div className="flex items-center gap-3 border-b border-line px-4 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-brand-600">
                  <Search
                    aria-hidden="true"
                    className="size-5 shrink-0 text-ink-500"
                  />
                  <ComboboxInput
                    ref={inputRef}
                    aria-label="Search tools, guides and pages"
                    placeholder="Search tools, guides and pages"
                    autoComplete="off"
                    onChange={(event) => setQuery(event.target.value)}
                    className="h-14 w-full bg-transparent text-base text-ink-900 placeholder:text-ink-500 focus:outline-none"
                  />
                  <Kbd>Esc</Kbd>
                </div>

                <SearchResults groups={groups} query={query} />
              </Combobox>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}
