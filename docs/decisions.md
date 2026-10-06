# Decisions

One entry per decision, newest groups last. The README's decisions section is built from this file.

## 2026-10-06: Vite, React (JavaScript), Tailwind v4, Headless UI and Motion

- Context: The brief allows any stack. The page needs accessible menus, dialogs, tabs and search, and only a few animations.
- Decision: Vite with React in plain JavaScript, Tailwind CSS v4 configured in CSS, Headless UI for the accessible behavior, Motion for the hero and app animations.
- Why: Headless UI gives correct keyboard and screen reader behavior without a UI-kit look. Motion is only used where an animation earns its place, through `LazyMotion` to keep the bundle small.
- Alternatives considered: Next.js (not needed for one static page), MUI, Chakra or shadcn (would make the page look like every other dashboard).

## 2026-10-06: Today's tools first, the app second

- Context: The current homepage sells an app nobody can use yet, while the calculators, fund explorer and guides barely appear.
- Decision: The order is hero, popular tools, decision index, free tools, then the app, guides, how it works, CAs, FAQ.
- Why: A first-time visitor should get real value in the first scroll. The app still gets a large section, as the next step.
- Alternatives considered: App first, like fermor.in today.

## 2026-10-06: The hero shows a worked money decision

- Context: Fermor's own principle is "show the full math".
- Decision: The hero's right column is a card with three real calculations (SIP, home loan, PPF), computed by `src/lib/finance.js`, with the formula shown.
- Why: It is specific and verifiable, and it is the one memorable element.
- Alternatives considered: A stats strip, a phone video, an app phone (`?hero=app` is a candidate experiment).

## 2026-10-06: Unbuilt destinations are handled honestly

- Context: Market, Ask and For Kids return 404 on fermor.in, ACT is not described anywhere, and the app is not out.
- Decision: Live tools open on fermor.in in a new tab, marked with ↗. App products open a "coming soon" dialog. The waitlist is a front-end demo and says so. No App Store or Google Play badges.
- Why: No dead ends and no invented claims.
- Alternatives considered: Linking to fermor.in's signup page, which only saves calculator results.

## 2026-10-06: Calculators are linked, not rebuilt

- Decision: Everything calculator-shaped links to the live page. Only the hero's three examples are computed locally, to show the math.
- Why: Rebuilding 158 tools adds nothing to the assignment and would drift from the real ones.

## 2026-10-06: Calculators are organized by life decision

- Decision: First-time visitors get a decision index (six decisions, each with the question people ask). Returning visitors get search, popular chips and a Tools menu.
- Why: Most people arrive with a decision, not a calculator name.

## 2026-10-06: One typeface, tabular figures, Indian number formats

- Decision: Inter (variable, self-hosted). ₹ amounts use Indian grouping (₹56,00,897), compact forms use L and Cr, dates read 29 Sep 2026.
- Why: Inter is Fermor's main UI font and passes the ₹ and tabular-figure checks. Poppins, used for fermor.in headlines, has no tabular figures. See `docs/brand-audit.md`.

## 2026-10-06: "How Fermor works" is honest about ads and affiliates

- Decision: The page says Fermor is free because of labeled ads and partner links, and that it is education, not advice.
- Why: fermor.in mixes "no ads" and "no commission" claims with ad slots and an About page that says ads and affiliates fund the site.

## 2026-10-06: Sports and expired-event posts are left off the homepage

- Decision: No cricket, football or posts about dates that have passed (such as the 28 to 30 September bank strike).
- Why: They sit next to finance guides today and dilute them.

## 2026-10-06: No App Store or Google Play badges

- Decision: Plain text instead: "Coming to iPhone and Android."
- Why: The app is not out.

## 2026-10-06: ACT and For Kids

- Decision: ACT has no public details, so its dialog says details will come closer to launch. The For Kids description ("money basics for children") is our interpretation, and the README says so.
- Why: No invented facts.

## 2026-10-06: Product visuals are built in code

- Decision: The worked example, phone screens and tile visuals are HTML, CSS and SVG, driven by data.
- Why: Sharper, responsive, lighter than screenshots or video, and real text for screen readers.

## 2026-10-06: Light theme, even though fermor.in is dark-framed

- Context: The audit found a near-black page frame with light and dark panels. The plan says light theme only.
- Decision: One light theme. Fermor's near-black appears as ink and the phone bezels. Mint is a fill color and the brand-deep green carries text.
- Why: Polish one theme properly, and keep long-form content readable.
- Alternatives considered: A dark app section (candidate experiment for the iteration phase), a full dark page.

## 2026-10-06: oxlint instead of ESLint

- Context: The plan asks for ESLint plus `eslint-plugin-jsx-a11y`. The current Vite template (Vite 8) ships oxlint.
- Decision: Keep oxlint and enable its built-in `jsx-a11y` and `react` plugins.
- Why: Same accessibility lint goal with no ESLint packages. Fewer dependencies, faster runs.

## 2026-10-06: Minimal QA, no Playwright or axe in the project

- Context: Ayush asked not to over-complicate the assignment.
- Decision: Unit tests for `src/lib` (finance, format, search, links, scroll, contrast), plus lint and build via `npm run check`. No Playwright, axe, Testing Library or Lighthouse reports. Responsive, keyboard and console checks were done by hand with a throwaway script outside the repo.
- Why: Fewer dependencies and less setup. The pure logic is where a wrong number would hurt most.
- Alternatives considered: The lean and full test plans in plan.md section 11.

## 2026-10-06: Git is left alone

- Decision: No `git init`, no commits. `.gitignore` is written so it is ready when Ayush initializes the repo.
- Why: Ayush asked for it. Whether `plan.md` and `CLAUDE.md` are committed or git-ignored is still his call.

## 2026-10-06: Guides list updated from the live blog

- Context: Appendix C6 predates a newer guide, "Sukanya Samriddhi Yojana (SSY) 2026" (6 Oct 2026). The homepage carousel on fermor.in also shows read times that the plan left blank.
- Decision: Featured stays the UPI guide (the rule starts on 15 Oct 2026). The list of four is SSY, Sensex, PM-KISAN and Section 87A, so all three types appear. Read times are the ones fermor.in shows.
- Why: Freshest relevant guides, and "Tax and compliance" stays represented for returning visitors.
- Note: fermor.in tags the UPI post "Regulation". We keep the plan's grouping under "Markets and current affairs", one of the three types on the blog index.

## 2026-10-06: Render below-the-fold sections after the first screen

- Context: The first Lighthouse run on a throttled phone scored 47 for performance. One 1.7s block of work, rendering all twelve sections at once, delayed the headline (the largest paint) by about 4.5s.
- Decision: The header, hero and popular tools render first. The other sections follow one per frame, each inside `startTransition`, so React works in small slices. An empty block holds the place of the ones still to come, `/#hash` links are followed once all are in, and `scrollToSection` waits up to 10s for a section that is not there yet.
- Why: Mobile performance went from 47 to between 70 and 88, depending on how busy the machine running Lighthouse was (blocking time from 1.5s to between 0.1s and 0.5s), with layout shift at 0.006 to 0.011. Mounting all sections in one go scored 88 on a calm machine and 67 to 70 on a busy one, so one at a time is the more robust choice.
- Alternatives considered: Server or build-time rendering of the first screen (the better fix, but a bigger change for this task), splitting each section into its own lazy chunk (pop-in and broken anchors).

## 2026-10-06: The hero count-up does not re-render React

- Context: The first count-up set React state on every animation frame. Those urgent renders kept interrupting the deferred sections' render, which React then restarts. At 4x CPU throttling the sections arrived about 2s late. At 6x to 8x the page stalled for over a minute and the tab crashed.
- Decision: `useCountUp` writes each frame straight into its element with `requestAnimationFrame`. Under reduced motion it shows the final value at once.
- Why: Same animation, no per-frame React work. At 6x the whole page now mounts in about 12s instead of 33s.
- Alternatives considered: A Motion value (works, but pulled in more of Motion and put the entry chunk over 150 KB).

## 2026-10-06: Motion is loaded with `domMin`, and dialogs are separate chunks

- Context: The entry JavaScript was 167 KB gzipped against a 150 KB budget.
- Decision: Dialogs (search, mobile menu, coming soon) load on demand. Motion uses `domMin`, which has no exit animations, so the phone screen fades in instead of crossfading. A tab switch fades in and re-counts.
- Why: The entry chunk is 146.9 KB gzipped. Loading Motion's engine asynchronously saved more, but left the hero text invisible until it arrived.
- Alternatives considered: `domAnimation` with a true crossfade (149.98 KB, no headroom).

## 2026-10-06: Search focuses its own input and closes on one Escape

- Context: Headless UI skips initial focus on touch devices, and the combobox spends its first Escape on closing its own list, which is always on screen here.
- Decision: The search dialog focuses its input when it opens, and catches Escape first so one press closes it.
- Why: "Press `/`, type `emi`, press Enter" has to work on every device, and one Escape should close a dialog.

## 2026-10-06: A link with no destination throws

- Decision: `getLinkKind` throws for anything that is not a `#section`, an https URL or a product id. `data/tools.js` throws on an unknown tool id.
- Why: A typo fails loudly while developing instead of shipping a dead link. `npm run links` and the data checks catch the rest.

## 2026-10-06: robots.txt allows everything

- Decision: `public/robots.txt` allows all crawlers. It was the only SEO deduction in Lighthouse.
- Why: It keeps the page indexable. Ayush may prefer `noindex` for a concept page, which would cost the SEO score.
