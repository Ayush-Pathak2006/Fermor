import { describe, expect, it } from 'vitest'
import { POPULAR_SEARCH_IDS, SEARCH_ENTRIES } from '../data/index.js'
import {
  SEARCH_GROUPS,
  groupSearchResults,
  pickEntries,
  searchEntries,
} from './search.js'

const search = (query, options = {}) =>
  searchEntries(query, SEARCH_ENTRIES, {
    popularIds: POPULAR_SEARCH_IDS,
    ...options,
  })
const ids = (results) => results.map((entry) => entry.id)
const order = (label) =>
  SEARCH_GROUPS.findIndex((group) => group.label === label)

describe('searchEntries', () => {
  it('ranks the EMI calculator first for "emi"', () => {
    expect(search('emi')[0].id).toBe('emi')
  })

  it('finds the income tax tools for "tax"', () => {
    expect(ids(search('tax'))).toEqual(
      expect.arrayContaining(['income-tax', 'old-vs-new-regime', 'new-regime']),
    )
  })

  it('ignores case', () => {
    expect(search('SIP')[0].id).toBe('sip')
    expect(ids(search('sip'))).toEqual(ids(search('SiP')))
  })

  it('ranks name prefixes above keyword matches', () => {
    // "home" starts the name "Home loan calculator". Others only mention it in keywords.
    expect(search('home')[0].id).toBe('home-loan')
  })

  it('matches keywords as well as names', () => {
    expect(ids(search('fixed deposit'))).toContain('fd')
  })

  it('needs every word in the query to match', () => {
    expect(search('emi qwertyuiop')).toEqual([])
  })

  it('returns nothing when nothing matches', () => {
    expect(search('qwertyuiop')).toEqual([])
  })

  it('finds the coming-soon products', () => {
    const [first] = search('ask')
    expect(first.group).toBe('soon')
    expect(first.productId).toBe('ask')
  })

  it('returns the popular tools for an empty query, in order', () => {
    expect(ids(search(''))).toEqual(POPULAR_SEARCH_IDS)
    expect(ids(search('   '))).toEqual(POPULAR_SEARCH_IDS)
  })

  it('stops at the limit', () => {
    expect(search('calculator', { limit: 5 })).toHaveLength(5)
  })
})

describe('groupSearchResults', () => {
  it('shows the popular tools as one group before anyone types', () => {
    const groups = groupSearchResults(search(''), { hasQuery: false })
    expect(groups).toHaveLength(1)
    expect(groups[0].label).toBe('Popular tools')
    expect(ids(groups[0].entries)).toEqual(POPULAR_SEARCH_IDS)
  })

  it('groups matches under their labels, in a fixed order, and drops empty groups', () => {
    const groups = groupSearchResults(search('guides'), { hasQuery: true })
    const labels = groups.map((group) => group.label)
    expect(labels).toEqual([...labels].sort((a, b) => order(a) - order(b)))
    expect(groups.every((group) => group.entries.length > 0)).toBe(true)
  })

  it('keeps the best match first inside its group', () => {
    const [calculators] = groupSearchResults(search('emi'), { hasQuery: true })
    expect(calculators.id).toBe('calculators')
    expect(calculators.entries[0].id).toBe('emi')
  })
})

describe('pickEntries', () => {
  it('returns entries in the order of the ids and skips unknown ones', () => {
    expect(ids(pickEntries(['fd', 'nope', 'sip'], SEARCH_ENTRIES))).toEqual([
      'fd',
      'sip',
    ])
  })
})

describe('SEARCH_ENTRIES', () => {
  it('has unique ids, so every option has a stable key', () => {
    const all = SEARCH_ENTRIES.map((entry) => entry.id)
    expect(new Set(all).size).toBe(all.length)
  })

  it('gives every entry somewhere to go', () => {
    for (const entry of SEARCH_ENTRIES) {
      expect(Boolean(entry.href) !== Boolean(entry.productId)).toBe(true)
    }
  })
})
