// Holds which "coming soon" product dialog is open, so the header, search and app section can all open it.
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'

const ComingSoonContext = createContext(null)

/** Wrap the page in this once. The dialog itself is rendered by ComingSoonDialog. */
export function ComingSoonProvider({ children }) {
  // The product stays set while the dialog animates closed, so its text does not vanish mid-fade.
  const [{ productId, isOpen }, setDialog] = useState({
    productId: null,
    isOpen: false,
  })
  // Where focus goes back to when the dialog closes: the control that opened it.
  const returnFocusRef = useRef(null)

  const openProduct = useCallback((nextProductId, { returnFocusTo } = {}) => {
    returnFocusRef.current = returnFocusTo ?? document.activeElement
    setDialog({ productId: nextProductId, isOpen: true })
  }, [])

  const closeProduct = useCallback(() => {
    setDialog((current) => ({ ...current, isOpen: false }))
  }, [])

  const value = useMemo(
    () => ({ productId, isOpen, openProduct, closeProduct, returnFocusRef }),
    [productId, isOpen, openProduct, closeProduct],
  )

  return <ComingSoonContext value={value}>{children}</ComingSoonContext>
}

/**
 * Returns { productId, isOpen, openProduct(productId, { returnFocusTo }), closeProduct, returnFocusRef }.
 * Usage: const { openProduct } = useComingSoon(); openProduct('ask')
 */
// The provider and its hook belong in one file, so this export is deliberate.
// oxlint-disable-next-line react/only-export-components
export function useComingSoon() {
  const context = useContext(ComingSoonContext)
  if (!context)
    throw new Error('useComingSoon must be used inside <ComingSoonProvider>')
  return context
}
