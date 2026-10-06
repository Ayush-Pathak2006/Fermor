// Lets a dialog do something only after it has fully closed and its scroll lock is gone.
import { useCallback, useRef } from 'react'

/**
 * Usage:
 *   const { scheduleAfterClose, runScheduledAction } = useAfterClose()
 *   <Transition afterLeave={runScheduledAction}> ... </Transition>
 *   // later, in a click handler: scheduleAfterClose(() => scrollToSection('waitlist')); close()
 * Why: scrolling while a dialog is still open is undone when it releases its scroll lock, and the
 * dialog gives focus back to the button that opened it, which would undo an action's own focus.
 * `runScheduledAction` returns true when it scheduled something, so callers can restore focus otherwise.
 */
export function useAfterClose() {
  const pendingActionRef = useRef(null)

  const scheduleAfterClose = useCallback((action) => {
    pendingActionRef.current = action
  }, [])

  const runScheduledAction = useCallback(() => {
    const action = pendingActionRef.current
    pendingActionRef.current = null
    if (!action) return false

    // Wait a frame so the dialog's own focus handling has finished before the action moves focus.
    requestAnimationFrame(action)
    return true
  }, [])

  return { scheduleAfterClose, runScheduledAction }
}
