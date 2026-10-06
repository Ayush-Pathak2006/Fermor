// What the search dialog shows under its input: results in labeled groups, or a helpful empty state.
import { ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { ArrowUpRight } from 'lucide-react'
import { LINKS } from '../../data/links.js'
import { getHostname, isSectionLink } from '../../lib/links.js'
import Badge from '../ui/Badge.jsx'
import SmartLink from '../ui/SmartLink.jsx'

function ResultHint({ entry }) {
  if (entry.productId) return <Badge>Coming soon</Badge>
  if (isSectionLink(entry.href)) return null

  const host = getHostname(entry.href)
  return (
    <span className="flex shrink-0 items-center gap-1 text-sm text-ink-500">
      {host}
      <ArrowUpRight aria-hidden="true" className="size-4" />
      <span className="sr-only">(opens in a new tab)</span>
    </span>
  )
}

function EmptyState({ query }) {
  return (
    <div className="px-6 py-10 text-center">
      <p className="text-ink-900">
        No tools match &ldquo;{query.trim()}&rdquo;. Try SIP, EMI or tax.
      </p>
      <SmartLink
        href={LINKS.calculators}
        className="mt-4 inline-flex min-h-11 items-center gap-1 font-medium text-brand-700 underline-offset-4 hover:underline"
      >
        Browse all calculators
      </SmartLink>
    </div>
  )
}

/**
 * Props: `groups` (from lib/search.js groupSearchResults) and `query` (named in the empty state).
 * Render it inside a Headless UI <Combobox>, which owns the keyboard handling.
 */
export default function SearchResults({ groups, query }) {
  if (groups.length === 0) return <EmptyState query={query} />

  return (
    <ComboboxOptions
      static
      className="max-h-[min(26rem,60vh)] overflow-y-auto p-2"
    >
      {groups.map((group) => (
        <div
          key={group.id}
          // A listbox groups its options with role="group". There is no native element for it.
          // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
          role="group"
          aria-labelledby={`search-group-${group.id}`}
        >
          <p
            id={`search-group-${group.id}`}
            className="px-3 pt-3 pb-1 text-sm font-medium text-ink-500"
          >
            {group.label}
          </p>
          {group.entries.map((entry) => (
            <ComboboxOption
              key={entry.id}
              value={entry}
              className="flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-ink-900 data-focus:bg-brand-50"
            >
              <span className="font-medium">{entry.name}</span>
              <ResultHint entry={entry} />
            </ComboboxOption>
          ))}
        </div>
      ))}
    </ComboboxOptions>
  )
}
