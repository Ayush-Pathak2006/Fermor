// The demo waitlist form. It checks the address and says thanks, and nothing else: no request is
// sent and nothing is stored. The note under the form says so.
import { CircleAlert, CircleCheck } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { isValidEmail } from '../../lib/email.js'
import Button from '../ui/Button.jsx'

const EMAIL_ERROR = 'Enter an email address like name@example.com'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isJoined, setIsJoined] = useState(false)
  const statusRef = useRef(null)

  // The form is replaced by the confirmation, so move focus there instead of dropping it on the page.
  useEffect(() => {
    if (isJoined) statusRef.current?.focus()
  }, [isJoined])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!isValidEmail(email)) {
      setError(EMAIL_ERROR)
      return
    }
    setError('')
    setIsJoined(true)
  }

  if (isJoined) {
    // <output> is a live region (role "status") by default, so the message is announced politely.
    return (
      <output
        ref={statusRef}
        tabIndex={-1}
        className="mt-5 flex items-start gap-3 rounded-xl border border-brand-600/40 bg-brand-50 p-4 font-medium text-ink-900"
      >
        <CircleCheck
          aria-hidden="true"
          className="mt-0.5 size-5 shrink-0 text-brand-700"
        />
        You’re on the waitlist. We’ll email you when the app launches.
      </output>
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="mt-5">
      <label
        htmlFor="waitlist-email"
        className="block text-sm font-medium text-ink-900"
      >
        Email address
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id="waitlist-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          data-scroll-focus
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'waitlist-email-error' : undefined}
          placeholder="name@example.com"
          className="min-h-12 w-full rounded-xl border border-line-strong bg-surface px-4 text-base text-ink-900 placeholder:text-ink-500 aria-invalid:border-loss-600"
        />
        <Button type="submit" size="lg" className="sm:shrink-0">
          Join the waitlist
        </Button>
      </div>
      {error && (
        <p
          id="waitlist-email-error"
          className="mt-2 flex items-center gap-2 text-sm text-loss-600"
        >
          <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
          {error}
        </p>
      )}
    </form>
  )
}
