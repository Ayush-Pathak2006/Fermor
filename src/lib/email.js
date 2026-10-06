// A light email check for the demo waitlist: enough to catch a typo, not a full RFC parser.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** True for addresses shaped like name@example.com. Surrounding spaces are ignored. */
export function isValidEmail(value) {
  return EMAIL_PATTERN.test(value.trim())
}
