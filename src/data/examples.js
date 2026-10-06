// Inputs and copy for the hero's worked example. The results are never stored here:
// lib/examples.js computes every number from these inputs with lib/finance.js.

export const EXAMPLES = [
  {
    id: 'sip',
    kind: 'sip',
    tabLabel: 'Monthly SIP',
    toolId: 'sip',
    linkLabel: 'Open the SIP calculator',
    inputs: { monthlyAmount: 25000, annualRatePct: 12, years: 10 },
    formula:
      'M = P × [((1 + i)ⁿ − 1) ÷ i] × (1 + i), where i = (1 + r)^(1/12) − 1',
  },
  {
    id: 'home-loan',
    kind: 'loan',
    tabLabel: 'Home loan',
    toolId: 'home-loan',
    linkLabel: 'Open the home loan calculator',
    inputs: { principal: 5000000, annualRatePct: 8.5, years: 20 },
    formula: 'EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)',
  },
  {
    id: 'ppf',
    kind: 'ppf',
    tabLabel: 'PPF',
    toolId: 'ppf',
    linkLabel: 'Open the PPF calculator',
    inputs: { yearlyDeposit: 150000, annualRatePct: 7.1, years: 15 },
    formula: 'F = P × [((1 + r)ⁿ − 1) ÷ r] × (1 + r)',
  },
]
