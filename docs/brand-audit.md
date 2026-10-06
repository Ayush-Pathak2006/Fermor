# Brand audit and design direction

Snapshot: 6 October 2026. Sources: fermor.in HTML and CSS (`/_next/static/css/b564b088eb6af905.css`), the logo SVG, and Chrome screenshots at 1440 and 390 wide, with computed styles read from the rendered page. Working files are in `.audit/` (git-ignored).

## 1. What fermor.in looks like today

- **Frame.** A near-black page (`#0D0F10`) holding large rounded panels (about 32px radius). Panels alternate: silver `#F2F3F4` with a dotted globe (hero), charcoal `#1A1C1E` ("Ask anything", news carousel, "Analyze / Plan / Invest"), an indigo-to-blue gradient with a phone-in-hand photo, cream and pearl gradients (health check, FAQ), and an indigo-violet footer with a giant white wordmark.
- **Mint is the signature.** `#75FB90` is the logo fill, the primary buttons ("Get Started", "Waiting list") and the one highlighted word in the headline. Violet and blue only appear inside gradients and the "Analyze / Plan / Invest" words.
- **Type.** Poppins 600/700 for display headlines, Inter 400 to 800 for UI and body, and an italic serif (Georgia in the computed styles) for some section titles. `DM Sans` is set on `<body>` but rarely used. Four families are defined in the CSS (Inter, Poppins, DM Sans, Space Grotesk).
- **Shape and depth.** Full-pill buttons, 16 to 32px panels, glass-like cards, soft shadows (`0 1px 4px`, `0 4px 20px`, `0 16px 48px` at 6 to 11% black), 3D phone renders and photography.
- **Motion.** Animated phone screens, a news carousel, long eased transitions (`.72s cubic-bezier(.4,.02,.2,1)`).
- **Tone.** Short and app-first: "Build your wealth with Fermor", "Ask anything", "Forecast your future".
- **Leftovers.** The CSS still carries variables from earlier designs: a teal family (`#0C6B62`, `#084F47`, `#E8F7F5`), lime (`#C8F135`, `#95CC42`), deep green `#1A3530`, a purple `--color-brand: #6C3AE8`, an orange `--color-accent: #E85A3A`, and Tailwind greens (`#16a34a`). The live site is not one palette. The constants that hold everywhere are mint `#75FB90`, near-black `#0D0F10` / `#16140F`, and silver `#F2F3F4`.

### Computed on-screen palette (homepage, 1440 wide)

| Where                  | Color                                                                                                                | Share or count                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| Background by area     | `#0D0F10` near-black frame                                                                                           | largest (about 41M px²)         |
|                        | `#1A1C1E` charcoal panels                                                                                            | about 10M px²                   |
|                        | `#F2F3F4` silver panels                                                                                              | about 8M px²                    |
|                        | `#75FB90` mint (buttons, logo, highlights)                                                                           | about 1.3M px²                  |
| Text                   | white (on dark), `#101214` ink, `#1A3530` deep green, `#E5E5E5`, `#8A8F86`, `#555555`                                | 62, 21, 20, 20, 20, 10 elements |
| Fonts by element count | Inter 400 (113), Inter 700 (56), Inter 600 (37), Poppins 600 (25), Inter 500 (23), Poppins 700 (12), Georgia 400 (5) |                                 |

## 2. Keep and change

| Keep (continuity)                | How                                                                                                 | Change (our take)                          | How                                                                                                                    |
| -------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| Logo and wordmark                | The two-stroke mint mark from `fermor-mark-2026.svg`, with a text wordmark                          | Section order and information architecture | Working tools first, then the app. A decision index, a "how it works" section and an FAQ that covers the whole product |
| Brand color family as the accent | Mint `#75FB90` as the fill for primary buttons and key highlights; deeper greens for links and text | Layouts, grid and rhythm                   | One 1200px grid and one left edge. Flat sections separated by lines instead of floating rounded panels                 |
| Overall lightness                | A light page, like the fermor.in hero. Fermor's near-black returns as ink text and the phone bezels | Type scale and weights                     | One family (Inter), a fluid scale, 600 for headings. No italic serif, no second display face                           |
| Rupee-first, number-led language | ₹ amounts, lakh and crore, tabular figures, a worked example in the hero                            | Components                                 | 12px controls (not pills), tiles that each have their own visual, disclosure menus                                     |
| Phone mockups for the app        | Built in HTML, CSS and SVG from data                                                                | Product visuals                            | No globe, gradients, 3D renders or hand-held photos                                                                    |
| Product names                    | Market, Portfolio, ACT, Ask, For Kids                                                               | All copy                                   | New headline, new section copy, proofread                                                                              |

## 3. Font decision

**Inter**, self-hosted as a variable font (`@fontsource-variable/inter`). It is Fermor's main UI and body font today, so it keeps continuity, and it passes the checks in plan section 6.3:

| Check                    | Inter (variable)                     | Poppins (headlines on fermor.in) |
| ------------------------ | ------------------------------------ | -------------------------------- |
| ₹ glyph (U+20B9)         | yes, in the `latin-ext` file         | yes                              |
| Tabular figures (`tnum`) | yes, in both `latin` and `latin-ext` | **no**                           |
| Weights 400 to 700       | variable, 100 to 900                 | fixed-weight files only          |

Poppins fails the tabular-figures check, so number-heavy UI (the worked example, the phone screens, the bars) would shift as values change. That is why the page uses one family instead of Poppins for headlines.

Run it again with `node scripts/check-font.mjs node_modules/@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2`.

## 4. Light or dark

`plan.md` says light theme only, and fermor.in is a near-black frame holding light and dark panels. I followed the plan: one polished light theme. The near-black shows up as ink, the phone bezels and the app mockups. A dark app section is a candidate experiment for the iteration phase (see `docs/decisions.md`).

## 5. Design direction

**Calm, precise, numbers-first.** The one memorable thing is the hero's worked example, the real math of a real money decision. Everything else stays quiet.

### Core colors

| Token                    | Hex       | Role                                                               | Contrast                          |
| ------------------------ | --------- | ------------------------------------------------------------------ | --------------------------------- |
| Ink (`ink-900`)          | `#0E1A15` | Text and headings. A near-black tinted toward green                | 16.8:1 on paper                   |
| Ink 700                  | `#2F3F38` | Secondary text                                                     | 10.5:1 on paper                   |
| Ink 500                  | `#52625A` | Meta and captions                                                  | 6.1:1 on paper                    |
| Paper                    | `#F5F9F6` | Page background                                                    | n/a                               |
| Surface                  | `#FFFFFF` | Cards and menus                                                    | n/a                               |
| Line                     | `#DCE4DF` | Dividers and card borders (decorative)                             | 1.2:1                             |
| Line strong              | `#7C8A83` | Input borders, which must show up                                  | 3.4:1 on paper                    |
| Brand (`brand-400`)      | `#75FB90` | Fill for primary buttons, bars and highlights. Never text on light | ink on it 13.6:1                  |
| Brand deep (`brand-700`) | `#157E3C` | Links, small brand text                                            | 4.8:1 on paper, 4.8:1 on brand-50 |
| Gain (`gain-600`)        | `#0A7E3A` | Gains, always with a sign and an arrow                             | 4.9:1 on paper                    |
| Loss (`loss-600`)        | `#B7191C` | Losses, always with a sign and an arrow                            | 6.2:1 on paper                    |

Mint on white is only 1.3:1, so it is only ever a fill behind dark text or a decorative bar. Text and links use `brand-700`.

### Brand scale

`50 #ECFCEE`, `100 #D5FADB`, `200 #B3FBC1`, `300 #88FCA4`, `400 #75FB90` (the signature), `500 #4FDE7A`, `600 #209E4E` (focus rings, 3.3:1 on paper), `700 #157E3C`, `800 #195C2E`, `900 #14391E`. Generated in OKLCH around mint's own hue (about 150°), each step checked for contrast.

### Type roles

Inter only. 400 body, 500 labels, nav and buttons, 600 headings, 700 for key numbers. Fluid display, h2 and h3 sizes from plan section 6.3, `tabular-nums` wherever numbers align or animate.

### Layout concept

The wireframes in plan section 4: a sticky header, a 7/5 hero with the worked example on the right, a thin popular-tools strip, then decision index, tools bento, the app with a sticky phone, guides, how it works, a CA band, FAQ, a short closing call to action and the footer. Left-aligned, 1200px container, flat sections divided by hairlines.

### Three principles for this page

1. **Show the math.** The worked example is the one loud thing. Everything else is quiet so it can be seen.
2. **Working tools first, the app second.** Anyone can get real value in the first scroll. The app is the confident next step, not the only story.
3. **Say where a link goes.** ↗ means a live page on fermor.in in a new tab. "Coming soon" means a dialog. Nothing is a dead link.

### Review against plan 6.8 and the brief

The first instinct for a Fermor homepage was the one the live site already has: dark, neon-green, gradients, a big stats strip and one word of the headline picked out in green. That reads like any fintech page and hits several of the patterns in 6.8. Changes:

- Light paper tinted toward green, with mint used as one fill color, not as a theme.
- The headline is a plain sentence, with no highlighted word.
- The hero shows a real computed calculation, not a stats strip or a phone video.
- Gradients and glass are gone. Depth comes from borders, with shadows only on floating layers.
- No all-caps labels above headings, no numbering on things that are not a sequence.
