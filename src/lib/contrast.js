// WCAG contrast ratios. The dev-only style guide uses these to show that every color pair passes.

const AA_NORMAL_TEXT = 4.5
const AA_LARGE_TEXT_AND_UI = 3

function hexToChannels(hex) {
  const digits = hex.replace('#', '')
  const full =
    digits.length === 3
      ? [...digits].map((digit) => digit + digit).join('')
      : digits
  return [0, 2, 4].map(
    (start) => parseInt(full.slice(start, start + 2), 16) / 255,
  )
}

/** Relative luminance of a hex color, from 0 (black) to 1 (white). */
export function relativeLuminance(hex) {
  const [red, green, blue] = hexToChannels(hex).map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  )
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

/** Contrast ratio between two hex colors, from 1 to 21. Order does not matter. */
export function contrastRatio(firstHex, secondHex) {
  const [lighter, darker] = [
    relativeLuminance(firstHex),
    relativeLuminance(secondHex),
  ].sort((a, b) => b - a)
  return (lighter + 0.05) / (darker + 0.05)
}

/** The highest WCAG level a ratio reaches for normal text: "AAA", "AA", or "fails". */
export function describeContrast(ratio) {
  if (ratio >= 7) return 'AAA'
  if (ratio >= AA_NORMAL_TEXT) return 'AA'
  if (ratio >= AA_LARGE_TEXT_AND_UI) return 'AA large text and UI only'
  return 'fails'
}
