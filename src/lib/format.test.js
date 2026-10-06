import { describe, expect, it } from 'vitest'
import {
  formatDate,
  formatINR,
  formatINRCompact,
  formatINRWords,
  formatOrdinal,
  formatPercent,
  formatSignedINR,
  formatSignedPercent,
} from './format.js'

describe('formatINR', () => {
  it('uses Indian digit grouping', () => {
    expect(formatINR(5600897)).toBe('₹56,00,897')
    expect(formatINR(1248500)).toBe('₹12,48,500')
  })

  it('rounds to whole rupees', () => {
    expect(formatINR(43391.16)).toBe('₹43,391')
  })
})

describe('formatINRCompact', () => {
  it('uses L for lakh', () => {
    expect(formatINRCompact(5600897)).toBe('₹56.0 L')
  })

  it('uses Cr for crore', () => {
    expect(formatINRCompact(16460996)).toBe('₹1.65 Cr')
  })

  it('shows whole rupees below one lakh', () => {
    expect(formatINRCompact(43391)).toBe('₹43,391')
  })

  it('rolls 99,99,999 over to crore instead of printing 100.0 L', () => {
    expect(formatINRCompact(9999999)).toBe('₹1.00 Cr')
  })

  it('keeps the sign on negative values', () => {
    expect(formatINRCompact(-250000)).toBe('−₹2.5 L')
  })
})

describe('formatINRWords', () => {
  it('says lakh and crore in sentences', () => {
    expect(formatINRWords(5000000)).toBe('₹50 lakh')
    expect(formatINRWords(150000)).toBe('₹1.5 lakh')
    expect(formatINRWords(25000000)).toBe('₹2.5 crore')
  })

  it('keeps small amounts in full', () => {
    expect(formatINRWords(25000)).toBe('₹25,000')
  })
})

describe('formatOrdinal', () => {
  it('adds st, nd, rd and th', () => {
    expect(formatOrdinal(1)).toBe('1st')
    expect(formatOrdinal(2)).toBe('2nd')
    expect(formatOrdinal(3)).toBe('3rd')
    expect(formatOrdinal(5)).toBe('5th')
    expect(formatOrdinal(22)).toBe('22nd')
  })

  it('keeps 11, 12 and 13 as "th"', () => {
    expect(formatOrdinal(11)).toBe('11th')
    expect(formatOrdinal(12)).toBe('12th')
    expect(formatOrdinal(13)).toBe('13th')
    expect(formatOrdinal(111)).toBe('111th')
  })
})

describe('formatPercent', () => {
  it('rounds to the digits asked for', () => {
    expect(formatPercent(0.9489, 3)).toBe('0.949%')
    expect(formatPercent(12, 0)).toBe('12%')
    expect(formatPercent(2.34)).toBe('2.3%')
  })
})

describe('signed changes', () => {
  it('puts a plus or minus on percentages', () => {
    expect(formatSignedPercent(2.3)).toBe('+2.3%')
    expect(formatSignedPercent(-0.3)).toBe('−0.3%')
    expect(formatSignedPercent(0)).toBe('0.0%')
  })

  it('puts a plus or minus on rupee changes', () => {
    expect(formatSignedINR(28400)).toBe('+₹28,400')
    expect(formatSignedINR(-1500)).toBe('−₹1,500')
  })
})

describe('formatDate', () => {
  it('prints day, short month and year', () => {
    expect(formatDate('2026-09-29')).toBe('29 Sep 2026')
  })

  it('drops the leading zero on the day', () => {
    expect(formatDate('2026-10-06')).toBe('6 Oct 2026')
  })

  it('never says "Sept"', () => {
    expect(formatDate('2026-09-01')).not.toMatch(/Sept/)
  })
})
