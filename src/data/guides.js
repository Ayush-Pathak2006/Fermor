// Guides shown on the homepage. Titles, dates and read times are as published on fermor.in/blogs
// (snapshot 6 Oct 2026). The summaries are ours. Sports posts and posts about dates that have
// already passed are left out on purpose.
import { fermorUrl } from './links.js'

/** The three types on the fermor.in blog index. There are no category URLs, so all link to /blogs. */
export const GUIDE_TYPES = {
  tax: 'Tax and compliance',
  markets: 'Markets and current affairs',
  government: 'Government and utility services',
}

// The UPI guide leads because its rule starts on 15 Oct 2026 and touches almost everyone.
export const FEATURED_GUIDE = {
  title: 'UPI Charges Above Rs 2,000: New MDR Rule Explained',
  type: GUIDE_TYPES.markets,
  date: '2026-09-22',
  readMinutes: 13,
  href: fermorUrl('/blogs/upi-charges-above-2000'),
  summary:
    'From 15 October, merchants pay a fee on some UPI payments above ₹2,000. Person-to-person transfers stay free, and customers aren’t charged.',
}

export const GUIDES = [
  {
    title:
      'Sukanya Samriddhi Yojana (SSY) 2026: Interest Rate, Eligibility, Rules',
    type: GUIDE_TYPES.government,
    date: '2026-10-06',
    readMinutes: 13,
    href: fermorUrl('/blogs/sukanya-samriddhi-yojana-2026'),
  },
  {
    title:
      'Sensex Nifty Crash September 2026: 7 Straight Weekly Losses, Why Market Is Down',
    type: GUIDE_TYPES.markets,
    date: '2026-09-29',
    readMinutes: 13,
    href: fermorUrl('/blogs/sensex-nifty-crash-september-2026'),
  },
  {
    title:
      'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi): Eligibility, eKYC, Status',
    type: GUIDE_TYPES.government,
    date: '2026-09-28',
    readMinutes: 13,
    href: fermorUrl('/blogs/pm-kisan-samman-nidhi-scheme'),
  },
  {
    title: 'Income Tax Rebate Under Section 87A: Limits and Marginal Relief',
    type: GUIDE_TYPES.tax,
    date: '2026-07-30',
    readMinutes: 11,
    href: fermorUrl('/blogs/section-87a-rebate'),
  },
]
