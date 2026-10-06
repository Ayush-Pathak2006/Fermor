// Checks that a font file has the rupee sign, tabular figures and a usable weight range.
// Usage: node scripts/check-font.mjs node_modules/@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2
import * as fontkit from 'fontkit'

const RUPEE_CODE_POINT = 0x20b9

const font = fontkit.openSync(process.argv[2])
const weightAxis = font.variationAxes?.wght

console.log('Family:', font.familyName)
console.log('Has ₹ (U+20B9):', font.hasGlyphForCodePoint(RUPEE_CODE_POINT))
console.log(
  'Has tabular figures (tnum):',
  font.availableFeatures.includes('tnum'),
)
console.log(
  'Weight range:',
  weightAxis ? `${weightAxis.min} to ${weightAxis.max}` : 'fixed weight',
)
