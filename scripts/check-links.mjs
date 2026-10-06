// Checks that every external URL the page links to still responds. Needs a network connection.
// Usage: npm run links
import { allExternalUrls } from '../src/data/index.js'

// Social sites block bots, so a failure there says nothing about the link.
const SOCIAL = /(^|\.)(twitter|x)\.com$/
const REQUEST_TIMEOUT_MS = 15000

const results = []
for (const url of allExternalUrls()) {
  if (SOCIAL.test(new URL(url).hostname)) continue
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: { 'user-agent': 'Mozilla/5.0 (link check)' },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })
    results.push({ url, status: response.status })
  } catch (error) {
    results.push({ url, status: `error: ${error.message}` })
  }
}

console.table(results)
const broken = results.filter(
  (result) => typeof result.status !== 'number' || result.status >= 400,
)
if (broken.length > 0) {
  console.error(`${broken.length} broken link(s)`)
  process.exit(1)
}
console.log(`All ${results.length} links respond.`)
