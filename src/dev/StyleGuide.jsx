// Development-only style guide, shown at /?styleguide. It is not part of the production build.
// It shows the tokens as they really are in the browser, with computed contrast ratios.
import { ComingSoonProvider } from '../context/ComingSoonContext.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import Kbd from '../components/ui/Kbd.jsx'
import SmartLink from '../components/ui/SmartLink.jsx'
import { LINKS } from '../data/links.js'
import { contrastRatio, describeContrast } from '../lib/contrast.js'
import {
  formatINR,
  formatINRCompact,
  formatINRWords,
  formatSignedPercent,
} from '../lib/format.js'

const COLOR_TOKENS = [
  'paper',
  'surface',
  'ink-900',
  'ink-700',
  'ink-500',
  'line',
  'line-strong',
  'brand-50',
  'brand-100',
  'brand-200',
  'brand-300',
  'brand-400',
  'brand-500',
  'brand-600',
  'brand-700',
  'brand-800',
  'brand-900',
  'gain-600',
  'loss-600',
]

const TYPE_SAMPLES = [
  [
    'text-display font-semibold',
    'text-display',
    'Clear numbers for every money decision.',
  ],
  [
    'text-h2 font-semibold',
    'text-h2',
    'Start with the decision in front of you',
  ],
  ['text-h3 font-semibold', 'text-h3', 'Mutual fund explorer'],
  [
    'text-body-lg',
    'text-body-lg',
    'Free calculators, a mutual fund explorer and plain-language guides.',
  ],
  ['text-base', 'text-base', 'Body text sits at 16px with a 1.6 line height.'],
  ['text-sm', 'text-sm', 'Captions and meta lines sit at 14px.'],
  ['text-xs', 'text-xs', 'Legal and fine print only.'],
]

const tokenValue = (name) =>
  getComputedStyle(document.documentElement)
    .getPropertyValue(`--color-${name}`)
    .trim()

function Group({ title, children }) {
  return (
    <section className="border-t border-line py-10">
      <h2 className="mb-6 text-h3 font-semibold">{title}</h2>
      {children}
    </section>
  )
}

function Swatch({ name }) {
  const hex = tokenValue(name)
  const onPaper = contrastRatio(hex, tokenValue('paper'))
  const onInk = contrastRatio(hex, tokenValue('ink-900'))
  return (
    <li className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3">
      <span
        className="size-12 shrink-0 rounded-lg border border-line-strong/40"
        style={{ background: hex }}
      />
      <span className="text-sm">
        <span className="block font-medium">
          {name} <span className="font-normal text-ink-500">{hex}</span>
        </span>
        <span className="block text-ink-700 tabular-nums">
          on paper {onPaper.toFixed(2)}:1 · on ink {onInk.toFixed(2)}:1
        </span>
        <span className="block text-ink-500">
          paper: {describeContrast(onPaper)}
        </span>
      </span>
    </li>
  )
}

export default function StyleGuide() {
  return (
    <ComingSoonProvider>
      <main className="mx-auto max-w-300 px-4 py-10 md:px-8">
        <h1 className="text-display font-semibold">Fermor style guide</h1>
        <p className="mt-3 text-ink-700">
          Development only. Tokens, type, controls and number formats.
        </p>

        <Group title="Colors">
          <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {COLOR_TOKENS.map((name) => (
              <Swatch key={name} name={name} />
            ))}
          </ul>
        </Group>

        <Group title="Type scale">
          <div className="space-y-5">
            {TYPE_SAMPLES.map(([classes, label, text]) => (
              <div key={label}>
                <p className="text-sm text-ink-500">{label}</p>
                <p className={classes}>{text}</p>
              </div>
            ))}
          </div>
        </Group>

        <Group title="Buttons and links">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button disabled>Disabled</Button>
            <Button size="lg">Large primary</Button>
          </div>
          <p className="mt-3 text-sm text-ink-500">
            Hover and press these, and Tab to see the focus ring.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <SmartLink
              href="#top"
              className="font-medium text-brand-700 hover:underline"
            >
              Internal link
            </SmartLink>
            <SmartLink
              href={LINKS.calculators}
              className="inline-flex items-center gap-1 font-medium text-brand-700 hover:underline"
            >
              External link
            </SmartLink>
            <SmartLink
              productId="ask"
              className="inline-flex items-center gap-2 font-medium text-brand-700 hover:underline"
            >
              Coming-soon link
            </SmartLink>
            <Badge>Coming soon</Badge>
            <Badge variant="neutral">Neutral</Badge>
            <span className="text-sm">
              Press <Kbd>/</Kbd> to search
            </span>
          </div>
        </Group>

        <Group title="Rupee and number formats">
          <div className="grid gap-8 md:grid-cols-2">
            <ul className="space-y-1">
              <li>{formatINR(5600897)} (full)</li>
              <li>
                {formatINRCompact(5600897)} and {formatINRCompact(16460996)}{' '}
                (compact)
              </li>
              <li>
                {formatINRWords(5000000)} and {formatINRWords(150000)} (in
                words)
              </li>
              <li>
                <span className="text-gain-600">
                  {formatSignedPercent(2.3)} ▲
                </span>{' '}
                and{' '}
                <span className="text-loss-600">
                  {formatSignedPercent(-0.4)} ▼
                </span>
              </li>
            </ul>
            <div className="w-56 text-right text-xl font-semibold tabular-nums">
              <p>{formatINR(1248500)}</p>
              <p>{formatINR(574300)}</p>
              <p>{formatINR(111111)}</p>
              <p className="text-sm font-normal text-ink-500">
                Tabular figures line up.
              </p>
            </div>
          </div>
        </Group>
      </main>
    </ComingSoonProvider>
  )
}
