// The phone for one app feature. The screen is chosen by feature id, and each new screen fades in (300ms).
import { m, useReducedMotion } from 'motion/react'
import { PHONE_SCREENS } from '../../mockups/phoneScreens.js'
import PhoneFrame from '../../mockups/PhoneFrame.jsx'

const FADE_DURATION_S = 0.3

/** Props: `featureId` ("ask", "portfolio", "market" or "forecasting"). */
export default function AppPhone({ featureId, className }) {
  const shouldReduceMotion = useReducedMotion()
  const { Screen, label } = PHONE_SCREENS[featureId]

  return (
    <div className={className}>
      <PhoneFrame label={label}>
        {/* A new key makes this a fresh element, so each screen fades in. Skipped under reduced motion. */}
        <m.div
          key={featureId}
          className="h-full"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: FADE_DURATION_S }}
        >
          <Screen />
        </m.div>
      </PhoneFrame>
      <p className="mt-4 text-center text-sm text-ink-500">
        Illustrative screens with example numbers.
      </p>
    </div>
  )
}
