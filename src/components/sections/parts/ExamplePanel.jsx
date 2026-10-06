// One worked example inside the hero card, assembled in order: the question and inputs, the result
// counting up, the split bar filling, then the formula and link.
import { getTool } from '../../../data/tools.js'
import { useCountUp } from '../../../hooks/useCountUp.js'
import Reveal from '../../ui/Reveal.jsx'
import SmartLink from '../../ui/SmartLink.jsx'
import SplitBar from './SplitBar.jsx'

// Seconds. "load" is the page-load sequence (about 1.5s in all). "switch" is the quick version
// that plays when a tab changes: a fade plus a re-count of about half a second.
const TIMING = {
  load: {
    intro: 0.3,
    count: 0.45,
    countDuration: 0.75,
    bar: 1.05,
    formula: 1.25,
  },
  switch: {
    intro: 0,
    count: 0.05,
    countDuration: 0.5,
    bar: 0.3,
    formula: 0.35,
  },
}

/** Props: `view` (from lib/examples.js buildExampleView) and `sequence` ("load" or "switch"). */
export default function ExamplePanel({ view, sequence }) {
  const timing = TIMING[sequence]
  const { ref: resultRef, initialText: resultStartText } = useCountUp(
    view.resultValue,
    {
      duration: timing.countDuration,
      delay: timing.count,
      format: view.formatResult,
    },
  )

  return (
    <div>
      <Reveal delay={timing.intro} duration={0.3}>
        <p className="text-h3 font-semibold text-ink-900">{view.question}</p>
        <p className="mt-2 text-ink-700">{view.inputsSentence}</p>
      </Reveal>

      <div className="mt-6 border-t border-line pt-6">
        {/* The animated number is hidden from screen readers, which get the final value instead. */}
        <Reveal delay={timing.count} duration={0.2}>
          <p
            aria-hidden="true"
            className="flex flex-wrap items-baseline gap-x-2 text-ink-900"
          >
            {view.resultPrefix && (
              <span className="text-body-lg font-medium text-ink-700">
                {view.resultPrefix}
              </span>
            )}
            <span
              ref={resultRef}
              className="text-5xl font-bold tracking-tight tabular-nums"
            >
              {resultStartText}
            </span>
            {view.resultSuffix && (
              <span className="text-body-lg font-medium text-ink-700">
                {view.resultSuffix}
              </span>
            )}
          </p>
        </Reveal>
        <p className="sr-only">{view.resultText}</p>
      </div>

      <SplitBar
        parts={view.parts}
        summary={view.splitSummary}
        delay={timing.bar}
      />

      <Reveal delay={timing.formula} duration={0.3}>
        <p className="mt-5 rounded-xl bg-paper px-4 py-3 text-sm text-ink-700">
          <span className="font-medium text-ink-900">
            How it’s worked out:{' '}
          </span>
          {view.formula}
        </p>
        <SmartLink
          href={getTool(view.toolId).href}
          className="mt-4 inline-flex min-h-11 items-center gap-1 font-medium text-brand-700 underline-offset-4 hover:underline"
        >
          {view.linkLabel}
        </SmartLink>
      </Reveal>
    </div>
  )
}
