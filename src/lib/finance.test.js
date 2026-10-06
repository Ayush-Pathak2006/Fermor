import { describe, expect, it } from 'vitest'
import {
  emi,
  loanTotalInterest,
  monthlyRateFromAnnual,
  ppfMaturity,
  projectWealth,
  sipMaturity,
} from './finance.js'

describe('monthlyRateFromAnnual', () => {
  it('turns 12% a year into about 0.949% a month, not 1%', () => {
    expect(monthlyRateFromAnnual(12) * 100).toBeCloseTo(0.9489, 3)
  })

  it('compounds back to the yearly rate', () => {
    expect((1 + monthlyRateFromAnnual(12)) ** 12).toBeCloseTo(1.12, 10)
  })
})

describe('sipMaturity', () => {
  it("matches fermor.in's published example: ₹25,000 a month at 12% for 10 years", () => {
    expect(Math.abs(sipMaturity(25000, 12, 10) - 5600897)).toBeLessThan(10)
  })

  it('is just the deposits when the rate is zero', () => {
    expect(sipMaturity(1000, 0, 2)).toBe(24000)
  })

  it('grows faster at a higher rate', () => {
    expect(sipMaturity(5000, 14, 10)).toBeGreaterThan(sipMaturity(5000, 10, 10))
  })
})

describe('emi', () => {
  it('is about ₹43,391 a month for ₹50 lakh at 8.5% over 20 years', () => {
    expect(Math.abs(emi(5000000, 8.5, 20) - 43391)).toBeLessThan(1)
  })

  it('splits a zero-rate loan evenly', () => {
    expect(emi(120000, 0, 1)).toBe(10000)
  })
})

describe('loanTotalInterest', () => {
  it('is everything paid back minus the principal', () => {
    const principal = 5000000
    const expected = emi(principal, 8.5, 20) * 240 - principal
    expect(loanTotalInterest(principal, 8.5, 20)).toBeCloseTo(expected, 6)
    expect(loanTotalInterest(principal, 8.5, 20)).toBeGreaterThan(5_400_000)
  })
})

describe('ppfMaturity', () => {
  it('is about ₹40.68 lakh for ₹1.5 lakh a year at 7.1% over 15 years', () => {
    expect(Math.abs(ppfMaturity(150000, 7.1, 15) - 4068209)).toBeLessThan(100)
  })

  it('is just the deposits when the rate is zero', () => {
    expect(ppfMaturity(150000, 0, 15)).toBe(2250000)
  })
})

describe('projectWealth', () => {
  it('equals a plain SIP when there is no starting amount', () => {
    const plain = sipMaturity(25000, 12, 10)
    expect(
      projectWealth({ monthly: 25000, annualRatePct: 12, years: 10 }),
    ).toBeCloseTo(plain, 6)
  })

  it('grows a starting amount at the yearly rate when there is no SIP', () => {
    const grown = projectWealth({ start: 100000, annualRatePct: 10, years: 2 })
    expect(grown).toBeCloseTo(121000, 6)
  })

  it('adds the starting amount and the SIP together', () => {
    const both = projectWealth({
      start: 100000,
      monthly: 5000,
      annualRatePct: 10,
      years: 5,
    })
    const startOnly = projectWealth({
      start: 100000,
      annualRatePct: 10,
      years: 5,
    })
    const sipOnly = sipMaturity(5000, 10, 5)
    expect(both).toBeCloseTo(startOnly + sipOnly, 6)
  })

  it('gives about ₹62.6 lakh for the app demo: ₹12,48,500 plus ₹15,000 a month at 10% for 10 years', () => {
    const value = projectWealth({
      start: 1248500,
      monthly: 15000,
      annualRatePct: 10,
      years: 10,
    })
    expect(Math.round(value / 10_000)).toBe(626)
  })

  it('returns the starting amount when no time passes', () => {
    expect(
      projectWealth({
        start: 500000,
        monthly: 15000,
        annualRatePct: 10,
        years: 0,
      }),
    ).toBe(500000)
  })
})
