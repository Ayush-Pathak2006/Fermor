// Ranks search entries for the search dialog. Pure: the entries are passed in.
// An entry looks like { id, name, group, keywords }.

/** The result groups, in the order the dialog shows them. */
export const SEARCH_GROUPS = [
  { id: 'calculators', label: 'Calculators' },
  { id: 'site', label: 'On fermor.in' },
  { id: 'page', label: 'On this page' },
  { id: 'soon', label: 'Coming soon' },
]

const MAX_RESULTS = 12

// Higher is better. A name beats a keyword, and a prefix beats a match in the middle.
const SCORE = {
  exactName: 100,
  namePrefix: 80,
  nameWordPrefix: 60,
  keywordExact: 55,
  keywordPrefix: 45,
  keywordWordPrefix: 40,
  nameContains: 30,
  keywordContains: 20,
}

const normalize = (text) => text.toLowerCase().trim().replace(/\s+/g, ' ')
const splitWords = (text) => text.split(/[\s\-/]+/).filter(Boolean)

function scoreText(term, text, scores) {
  if (text === term) return scores.exact
  if (text.startsWith(term)) return scores.prefix
  if (splitWords(text).some((word) => word.startsWith(term)))
    return scores.wordPrefix
  if (text.includes(term)) return scores.contains
  return 0
}

const NAME_SCORES = {
  exact: SCORE.exactName,
  prefix: SCORE.namePrefix,
  wordPrefix: SCORE.nameWordPrefix,
  contains: SCORE.nameContains,
}
const KEYWORD_SCORES = {
  exact: SCORE.keywordExact,
  prefix: SCORE.keywordPrefix,
  wordPrefix: SCORE.keywordWordPrefix,
  contains: SCORE.keywordContains,
}

/** The best score one search term earns against an entry's name and keywords. 0 means no match. */
function scoreTerm(term, entry) {
  const nameScore = scoreText(term, normalize(entry.name), NAME_SCORES)
  const keywordScores = entry.keywords.map((keyword) =>
    scoreText(term, normalize(keyword), KEYWORD_SCORES),
  )
  return Math.max(nameScore, ...keywordScores)
}

/** Picks entries by id, in the order given. Unknown ids are skipped. */
export function pickEntries(ids, entries) {
  return ids
    .map((id) => entries.find((entry) => entry.id === id))
    .filter(Boolean)
}

const groupRank = (entry) =>
  SEARCH_GROUPS.findIndex((group) => group.id === entry.group)

/**
 * Splits ranked results into the labeled groups the dialog shows, keeping their order. Before anyone
 * types, the results are just the popular tools, shown as one group.
 */
export function groupSearchResults(results, { hasQuery }) {
  if (!hasQuery)
    return [{ id: 'popular', label: 'Popular tools', entries: results }]

  return SEARCH_GROUPS.map((group) => ({
    ...group,
    entries: results.filter((entry) => entry.group === group.id),
  })).filter((group) => group.entries.length > 0)
}

/**
 * Returns matching entries, best first. Matching is case-insensitive on name and keywords, and
 * every word in the query must match. An empty query returns the popular entries instead.
 */
export function searchEntries(
  query,
  entries,
  { popularIds = [], limit = MAX_RESULTS } = {},
) {
  const terms = normalize(query).split(' ').filter(Boolean)
  if (terms.length === 0) return pickEntries(popularIds, entries)

  const matches = []
  entries.forEach((entry, index) => {
    const termScores = terms.map((term) => scoreTerm(term, entry))
    if (termScores.includes(0)) return
    matches.push({
      entry,
      index,
      score: termScores.reduce((total, score) => total + score, 0),
    })
  })

  matches.sort(
    (a, b) =>
      b.score - a.score ||
      groupRank(a.entry) - groupRank(b.entry) ||
      a.index - b.index,
  )
  return matches.slice(0, limit).map((match) => match.entry)
}
