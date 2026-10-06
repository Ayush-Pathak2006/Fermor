// Turns an example's inputs (src/data/examples.js) into everything the hero card shows.
// Every number is computed here with lib/finance.js, never typed in by hand.
import { emi, loanTotalInterest, ppfMaturity, sipMaturity } from './finance.js'
import { formatINR, formatINRCompact, formatINRWords } from './format.js'

const MONTHS_PER_YEAR = 12

/** One piece of the split bar: how much of the result it is, and how to say it. */
function makePart(id, label, value, tone) {
  return { id, label, value, tone, text: formatINRCompact(value) }
}

function buildSip({ monthlyAmount, annualRatePct, years }) {
  const result = sipMaturity(monthlyAmount, annualRatePct, years)
  const invested = monthlyAmount * years * MONTHS_PER_YEAR
  return {
    question: `What could ${formatINRWords(monthlyAmount)} a month become?`,
    inputsSentence: `${formatINR(monthlyAmount)} every month for ${years} years, at ${annualRatePct}% a year`,
    resultValue: result,
    formatResult: formatINR,
    parts: [
      makePart('invested', 'Invested', invested, 'base'),
      makePart('gains', 'Estimated gains', result - invested, 'gain'),
    ],
  }
}

function buildLoan({ principal, annualRatePct, years }) {
  const monthlyInstalment = emi(principal, annualRatePct, years)
  return {
    question: `What will a ${formatINRWords(principal)} home loan cost each month?`,
    inputsSentence: `${formatINR(principal)} over ${years} years at ${annualRatePct}% a year`,
    resultValue: monthlyInstalment,
    formatResult: formatINR,
    resultSuffix: 'a month',
    parts: [
      makePart('principal', 'Principal', principal, 'base'),
      makePart(
        'interest',
        'Interest',
        loanTotalInterest(principal, annualRatePct, years),
        'gain',
      ),
    ],
  }
}

function buildPpf({ yearlyDeposit, annualRatePct, years }) {
  const result = ppfMaturity(yearlyDeposit, annualRatePct, years)
  const deposited = yearlyDeposit * years
  return {
    question: `What will ${formatINRWords(yearlyDeposit)} a year in PPF grow to?`,
    inputsSentence: `${formatINR(yearlyDeposit)} every year for ${years} years at ${annualRatePct}% a year`,
    resultValue: result,
    formatResult: formatINRCompact,
    resultPrefix: 'about',
    parts: [
      makePart('deposited', 'Deposited', deposited, 'base'),
      makePart('interest', 'Interest', result - deposited, 'gain'),
    ],
  }
}

const BUILDERS = { sip: buildSip, loan: buildLoan, ppf: buildPpf }

/**
 * The full view of one example: question, inputs, the result (with an optional small prefix or suffix
 * such as "about" or "a month"), the split, and the plain text for screen readers.
 */
export function buildExampleView(example) {
  const view = BUILDERS[example.kind](example.inputs)
  const [base, gain] = view.parts
  return {
    id: example.id,
    tabLabel: example.tabLabel,
    toolId: example.toolId,
    linkLabel: example.linkLabel,
    formula: example.formula,
    resultPrefix: '',
    resultSuffix: '',
    ...view,
    resultText: [
      view.resultPrefix,
      view.formatResult(view.resultValue),
      view.resultSuffix,
    ]
      .filter(Boolean)
      .join(' '),
    // What the split bar shows, in words: "Invested ₹30.0 L, estimated gains ₹26.0 L".
    splitSummary: `${base.label} ${base.text}, ${gain.label.toLowerCase()} ${gain.text}`,
  }
}
