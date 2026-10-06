import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import {
  contrastRatio,
  describeContrast,
  relativeLuminance,
} from './contrast.js'

describe('contrastRatio', () => {
  it('is 21 for black on white and 1 for a color on itself', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5)
    expect(contrastRatio('#75fb90', '#75fb90')).toBeCloseTo(1, 5)
  })

  it('does not depend on the order of the colors', () => {
    expect(contrastRatio('#0e1a15', '#ffffff')).toBeCloseTo(
      contrastRatio('#ffffff', '#0e1a15'),
      10,
    )
  })

  it('reads 3-digit hex', () => {
    expect(relativeLuminance('#fff')).toBeCloseTo(1, 5)
  })

  it("shows why Fermor's mint can never be text on white", () => {
    expect(contrastRatio('#75fb90', '#ffffff')).toBeLessThan(1.5)
  })
})

describe('describeContrast', () => {
  it('names the highest level reached', () => {
    expect(describeContrast(8)).toBe('AAA')
    expect(describeContrast(4.6)).toBe('AA')
    expect(describeContrast(3.2)).toBe('AA large text and UI only')
    expect(describeContrast(2)).toBe('fails')
  })
})

// The design tokens are the source of truth, so the color pairs we rely on are checked against
// the real values in src/index.css. A color change that breaks AA fails `npm run check`.
describe('design tokens in src/index.css', () => {
  const css = readFileSync(new URL('../index.css', import.meta.url), 'utf8')
  const color = (name) => {
    const match = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`))
    if (!match) throw new Error(`Token --color-${name} not found in index.css`)
    return match[1]
  }
  const ratio = (foreground, background) =>
    contrastRatio(color(foreground), color(background))

  const TEXT_PAIRS = [
    ['ink-900', 'paper'],
    ['ink-700', 'paper'],
    ['ink-500', 'paper'],
    ['ink-500', 'surface'],
    ['ink-900', 'brand-400'], // button text on the mint fill
    ['ink-900', 'brand-50'],
    ['brand-700', 'paper'], // links
    ['brand-700', 'surface'],
    ['brand-700', 'brand-50'], // brand text on its tint
    ['brand-800', 'brand-100'],
    ['gain-600', 'paper'],
    ['gain-600', 'surface'],
    ['loss-600', 'paper'],
    ['loss-600', 'surface'],
    ['surface', 'brand-700'], // white text on a deep green fill
  ]

  it.each(TEXT_PAIRS)(
    '%s on %s reaches 4.5:1 for text',
    (foreground, background) => {
      expect(ratio(foreground, background)).toBeGreaterThanOrEqual(4.5)
    },
  )

  const UI_PAIRS = [
    ['brand-600', 'paper'], // focus ring
    ['brand-600', 'surface'],
    ['line-strong', 'paper'], // input borders
    ['line-strong', 'surface'],
  ]

  it.each(UI_PAIRS)(
    '%s on %s reaches 3:1 for UI parts',
    (foreground, background) => {
      expect(ratio(foreground, background)).toBeGreaterThanOrEqual(3)
    },
  )
})
