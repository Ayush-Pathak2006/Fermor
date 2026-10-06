// The decision index: what people are trying to work out, and which tools help.
// Rows refer to tool ids from tools.js, never to URLs.

export const DECISIONS = [
  {
    id: 'investing',
    title: 'Starting to invest',
    question: 'How much could a monthly SIP grow to?',
    toolIds: ['sip', 'lumpsum', 'mutual-funds'],
  },
  {
    id: 'home',
    title: 'Buying a home',
    question: 'What will my EMI be, and how much interest will I pay?',
    toolIds: ['home-loan', 'emi', 'sbi-home-loan'],
  },
  {
    id: 'tax',
    title: 'Saving tax',
    question: 'Old or new regime: which one costs me less?',
    toolIds: ['income-tax', 'old-vs-new-regime', 'hra'],
  },
  {
    id: 'job',
    title: 'Weighing a job offer',
    question: 'What will I actually take home each month?',
    toolIds: ['ctc', 'in-hand', 'salary-hike'],
  },
  {
    id: 'retirement',
    title: 'Planning retirement',
    question: 'Am I saving enough to retire when I want?',
    toolIds: ['epf', 'nps', 'fire'],
  },
  {
    id: 'savings',
    title: 'Choosing where to keep savings',
    question: 'FD, PPF or a fund: which grows my money more?',
    toolIds: ['fd', 'ppf', 'investment-comparison'],
  },
]
