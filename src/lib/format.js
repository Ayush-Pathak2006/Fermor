// Number and date formatting for the page: Indian digit grouping, lakh and crore, fixed month names.

const LAKH = 100_000
const CRORE = 10_000_000
const MINUS_SIGN = '−'
const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const rupeeFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

/** Whole rupees with Indian grouping: 5600897 becomes "₹56,00,897". */
export function formatINR(value) {
  return rupeeFormatter.format(Math.round(value))
}

/** Compact rupees: "₹56.0 L" for lakh, "₹1.65 Cr" for crore. Below one lakh it shows whole rupees. */
export function formatINRCompact(value) {
  const absolute = Math.abs(value)
  const sign = value < 0 ? MINUS_SIGN : ''

  // Round first, so 99,99,999 reads "₹1.00 Cr" instead of "₹100.0 L".
  const lakhs = Number((absolute / LAKH).toFixed(1))
  if (absolute >= CRORE || lakhs >= 100)
    return `${sign}₹${(absolute / CRORE).toFixed(2)} Cr`
  if (absolute >= LAKH) return `${sign}₹${lakhs.toFixed(1)} L`
  return `${sign}${formatINR(absolute)}`
}

/** Rupees in words for sentences: "₹50 lakh", "₹1.5 lakh", "₹25,000". */
export function formatINRWords(value) {
  const trimmed = (amount) => String(Number(amount.toFixed(2)))
  if (value >= CRORE) return `₹${trimmed(value / CRORE)} crore`
  if (value >= LAKH) return `₹${trimmed(value / LAKH)} lakh`
  return formatINR(value)
}

/** 1 becomes "1st", 5 becomes "5th", 22 becomes "22nd", and 11, 12 and 13 stay "th". */
export function formatOrdinal(number) {
  const lastTwoDigits = number % 100
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return `${number}th`
  const suffix = { 1: 'st', 2: 'nd', 3: 'rd' }[number % 10] ?? 'th'
  return `${number}${suffix}`
}

/** A plain percentage: formatPercent(0.9489, 3) is "0.949%". */
export function formatPercent(value, fractionDigits = 1) {
  return `${value.toFixed(fractionDigits)}%`
}

/** A change with its sign, so it never depends on color alone: "+2.3%" or "−0.3%". */
export function formatSignedPercent(value, fractionDigits = 1) {
  const text = formatPercent(Math.abs(value), fractionDigits)
  if (value > 0) return `+${text}`
  if (value < 0) return `${MINUS_SIGN}${text}`
  return text
}

/** A rupee change with its sign: "+₹28,400". */
export function formatSignedINR(value) {
  if (value > 0) return `+${formatINR(value)}`
  if (value < 0) return `${MINUS_SIGN}${formatINR(Math.abs(value))}`
  return formatINR(value)
}

/**
 * "2026-09-29" becomes "29 Sep 2026". The date is parsed by hand and the month names are fixed:
 * Intl may print "Sept", and new Date("YYYY-MM-DD") shifts the day across time zones.
 */
export function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return `${day} ${MONTH_NAMES[month - 1]} ${year}`
}
