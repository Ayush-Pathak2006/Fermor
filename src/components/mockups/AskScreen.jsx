// The Ask screen: a question, a typing indicator that plays once, then the answer.
// The typing dots are the only looping animation on the page, and they stop under reduced motion.
import { useInView, useReducedMotion } from 'motion/react'
import { ArrowUp, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { ASK_DEMO } from '../../data/app-demo.js'
import { formatINR } from '../../lib/format.js'

const TYPING_DURATION_MS = 1400

function TypingDots() {
  return (
    <div className="flex gap-1 rounded-2xl rounded-bl-md bg-paper px-3 py-3">
      {[0, 1, 2].map((dot) => (
        <span
          key={dot}
          className="size-1.5 animate-typing-dot rounded-full bg-ink-500 motion-reduce:animate-none"
          style={{ animationDelay: `${dot * 0.15}s` }}
        />
      ))}
    </div>
  )
}

function Answer() {
  return (
    <div className="rounded-2xl rounded-bl-md bg-paper px-3 py-2.5 text-[0.8125rem] leading-snug text-ink-900">
      <p>{ASK_DEMO.answer}</p>
      <ul className="mt-3 space-y-2">
        {ASK_DEMO.topCategories.map((category) => (
          <li key={category.name}>
            <div className="flex justify-between text-[0.6875rem] text-ink-700">
              <span>{category.name}</span>
              <span className="tabular-nums">{formatINR(category.value)}</span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-line">
              <div
                className="h-full rounded-full bg-brand-600"
                style={{ width: `${(category.value / ASK_DEMO.spent) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function AskScreen() {
  const shouldReduceMotion = useReducedMotion()
  const screenRef = useRef(null)
  // The typing only starts once the screen is actually on screen, so it is never wasted off-screen.
  const isOnScreen = useInView(screenRef, { once: true, amount: 0.6 })
  const [isTyping, setIsTyping] = useState(!shouldReduceMotion)

  useEffect(() => {
    if (shouldReduceMotion || !isOnScreen) return undefined
    const timeoutId = setTimeout(() => setIsTyping(false), TYPING_DURATION_MS)
    return () => clearTimeout(timeoutId)
  }, [shouldReduceMotion, isOnScreen])

  return (
    <div ref={screenRef} className="flex h-full flex-col px-4 pt-12 pb-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-ink-900">
        <Sparkles className="size-4 text-brand-700" />
        Ask
      </div>

      <div className="mt-5 flex flex-1 flex-col gap-3">
        <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-ink-900 px-3 py-2 text-[0.8125rem] leading-snug text-surface">
          {ASK_DEMO.question}
        </p>
        <div className="max-w-[92%]">
          {isTyping ? <TypingDots /> : <Answer />}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap gap-1.5">
          {ASK_DEMO.followUps.map((followUp) => (
            <span
              key={followUp}
              className="rounded-full border border-line-strong/50 px-2.5 py-1 text-[0.6875rem] text-ink-700"
            >
              {followUp}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between rounded-full border border-line-strong/50 py-1.5 pr-1.5 pl-3.5 text-[0.75rem] text-ink-500">
          Ask about your money
          <span className="flex size-6 items-center justify-center rounded-full bg-brand-400 text-ink-900">
            <ArrowUp className="size-3.5" />
          </span>
        </div>
      </div>
    </div>
  )
}
