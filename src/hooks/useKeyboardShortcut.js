// Runs a function when a keyboard shortcut is pressed anywhere on the page.
import { useEffect, useEffectEvent } from 'react'

/** True when the event came from somewhere people type, where "/" must stay a normal character. */
function isTypingTarget(element) {
  if (!element) return false
  return (
    element.isContentEditable ||
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName)
  )
}

function matchesShortcut(event, { key, withModifier }) {
  if (event.key.toLowerCase() !== key) return false
  const hasModifier = event.metaKey || event.ctrlKey
  if (withModifier) return hasModifier
  // A plain key press must not fire while a modifier is held, or when Alt is used for something else.
  return !hasModifier && !event.altKey
}

/**
 * Calls `handler` when the shortcut is pressed.
 * - `key`: the key, such as "/" or "k"
 * - `withModifier`: require Cmd (Mac) or Ctrl (Windows and Linux)
 * - `ignoreWhileTyping`: skip the shortcut inside inputs, so "/" can still be typed
 * Usage: useKeyboardShortcut({ key: 'k', withModifier: true }, openSearch)
 */
export function useKeyboardShortcut(
  { key, withModifier = false, ignoreWhileTyping = false },
  handler,
) {
  const handleShortcut = useEffectEvent(handler)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!matchesShortcut(event, { key, withModifier })) return
      if (ignoreWhileTyping && isTypingTarget(event.target)) return
      event.preventDefault()
      handleShortcut(event)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [key, withModifier, ignoreWhileTyping])
}
