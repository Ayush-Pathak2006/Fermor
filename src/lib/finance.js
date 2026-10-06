// Pure money math for the hero example and the app demo. No React, no DOM.
// The SIP method matches fermor.in's own SIP calculator.

const MONTHS_PER_YEAR = 12

/**
 * The monthly rate that compounds to the yearly rate: (1 + r)^(1/12) - 1.
 * Dividing the yearly rate by 12 overstates long-term growth: 12% a year is 0.949% a month, not 1%.
 */
export function monthlyRateFromAnnual(annualRatePct) {
  return (1 + annualRatePct / 100) ** (1 / MONTHS_PER_YEAR) - 1
}

/** Value after `years` of a SIP, with each instalment paid at the start of its month. */
export function sipMaturity(monthlyAmount, annualRatePct, years) {
  const months = years * MONTHS_PER_YEAR
  if (annualRatePct === 0) return monthlyAmount * months

  const monthlyRate = monthlyRateFromAnnual(annualRatePct)
  const annuityFactor = ((1 + monthlyRate) ** months - 1) / monthlyRate
  // Paying at the start of the month earns one extra month of growth on every instalment.
  return monthlyAmount * annuityFactor * (1 + monthlyRate)
}

/** Monthly instalment on a reducing-balance loan. Loans quote a nominal yearly rate, so r / 12. */
export function emi(principal, annualRatePct, years) {
  const months = years * MONTHS_PER_YEAR
  if (annualRatePct === 0) return principal / months

  const monthlyRate = annualRatePct / 100 / MONTHS_PER_YEAR
  const growth = (1 + monthlyRate) ** months
  return (principal * monthlyRate * growth) / (growth - 1)
}

/** Total interest over the life of a loan, using the unrounded EMI. */
export function loanTotalInterest(principal, annualRatePct, years) {
  return (
    emi(principal, annualRatePct, years) * years * MONTHS_PER_YEAR - principal
  )
}

/** PPF value after `years` of yearly deposits made at the start of each year, compounded yearly. */
export function ppfMaturity(yearlyDeposit, annualRatePct, years) {
  if (annualRatePct === 0) return yearlyDeposit * years

  const rate = annualRatePct / 100
  const annuityFactor = ((1 + rate) ** years - 1) / rate
  return yearlyDeposit * annuityFactor * (1 + rate)
}

/** Where a starting amount plus a monthly SIP could be after `years`, at one yearly rate. */
export function projectWealth({
  start = 0,
  monthly = 0,
  annualRatePct,
  years,
}) {
  const startingAmountGrown = start * (1 + annualRatePct / 100) ** years
  return startingAmountGrown + sipMaturity(monthly, annualRatePct, years)
}
