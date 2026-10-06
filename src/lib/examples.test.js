import { describe, expect, it } from 'vitest'
import { EXAMPLES } from '../data/examples.js'
import { buildExampleView } from './examples.js'

const viewOf = (id) =>
  buildExampleView(EXAMPLES.find((example) => example.id === id))
const sumOfParts = (view) =>
  view.parts.reduce((total, part) => total + part.value, 0)

describe('buildExampleView: Monthly SIP', () => {
  const view = viewOf('sip')

  it('asks the question and states the inputs', () => {
    expect(view.question).toBe('What could ₹25,000 a month become?')
    expect(view.inputsSentence).toBe(
      '₹25,000 every month for 10 years, at 12% a year',
    )
  })

  it("computes fermor.in's published result", () => {
    expect(view.resultText).toBe('₹56,00,897')
  })

  it('splits the result into what you put in and what it earned', () => {
    expect(view.splitSummary).toBe('Invested ₹30.0 L, estimated gains ₹26.0 L')
    expect(sumOfParts(view)).toBeCloseTo(view.resultValue, 6)
  })
})

describe('buildExampleView: Home loan', () => {
  const view = viewOf('home-loan')

  it('asks the question and states the inputs', () => {
    expect(view.question).toBe(
      'What will a ₹50 lakh home loan cost each month?',
    )
    expect(view.inputsSentence).toBe('₹50,00,000 over 20 years at 8.5% a year')
  })

  it('shows the monthly instalment', () => {
    expect(view.resultText).toBe('₹43,391 a month')
  })

  it('splits everything paid back into principal and interest', () => {
    expect(view.splitSummary).toBe('Principal ₹50.0 L, interest ₹54.1 L')
    expect(sumOfParts(view)).toBeCloseTo(view.resultValue * 240, 4)
  })
})

describe('buildExampleView: PPF', () => {
  const view = viewOf('ppf')

  it('asks the question and states the inputs', () => {
    expect(view.question).toBe('What will ₹1.5 lakh a year in PPF grow to?')
    expect(view.inputsSentence).toBe(
      '₹1,50,000 every year for 15 years at 7.1% a year',
    )
  })

  it('shows the maturity value', () => {
    expect(view.resultText).toBe('about ₹40.7 L')
  })

  it('splits the result into deposits and interest', () => {
    expect(view.splitSummary).toBe('Deposited ₹22.5 L, interest ₹18.2 L')
    expect(sumOfParts(view)).toBeCloseTo(view.resultValue, 6)
  })
})

describe('buildExampleView: every example', () => {
  it.each(EXAMPLES)(
    '$tabLabel carries its formula and a link target',
    (example) => {
      const view = buildExampleView(example)
      expect(view.formula).toBeTruthy()
      expect(view.toolId).toBe(example.toolId)
    },
  )

  it.each(EXAMPLES)(
    '$tabLabel builds its text from the number plus any prefix or suffix',
    (example) => {
      const view = buildExampleView(example)
      const number = view.formatResult(view.resultValue)
      expect(view.resultText).toBe(
        [view.resultPrefix, number, view.resultSuffix]
          .filter(Boolean)
          .join(' '),
      )
    },
  )

  it('keeps "about" and "a month" out of the number so they can be styled smaller', () => {
    expect(viewOf('ppf').resultPrefix).toBe('about')
    expect(viewOf('home-loan').resultSuffix).toBe('a month')
    expect(viewOf('sip').resultPrefix).toBe('')
    expect(viewOf('sip').resultSuffix).toBe('')
  })
})
