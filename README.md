# LottoScopeX

Modern analytics platform for exploring historical lottery data — EuroMillions, EuroJackpot, Lotto 6aus49 (Germany), Loto (France), Irish Lotto, Powerball (US), and Mega Millions (US). Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

This is an analytics tool, not a prediction tool. It does not forecast winning numbers — it helps you explore what has actually happened in past draws (frequencies, hot/cold numbers, range distribution, and plain-language probability patterns based on the last 100 draws).

## Design

Bright green & gold sportsbook theme: a vivid green background (`#0B5C3A`), gold (`#D4AF37`) as the single accent for buttons, active tabs, and highlights. All main lottery numbers share one uniform white/cream ball color — only the bonus/"super" number is gold, so it stands out at a glance. Every lottery shares the exact same interface. Large, easy-to-read lottery balls throughout; previous draws are always shown as balls, never plain numbers.

Each lottery's name is shown in a distinct identity color loosely tied to its real-world association — EuroMillions blue, EuroJackpot orange, Lotto 6aus49 red, Loto France pink, Irish Lotto green, Powerball crimson, Mega Millions gold — instead of an icon or logo. Defined per lottery as `accent` in `lib/lotteries.ts`. A country flag (EU/DE/FR/IE/US, via `flagEmoji()` in `lib/flags.ts`) sits next to the country name everywhere it appears — homepage cards, the lotteries dropdown, and each lottery's detail page.

## Next-draw jackpot

Every lottery card and detail page shows the real, current jackpot on offer for the *next* upcoming draw (not a historical range) — e.g. "€17M" for EuroMillions, "$576M" for Mega Millions — pulled from each operator's official site or ticket vendor as of **5 July 2026** (see `NEXT_JACKPOT_AS_OF` and the `nextJackpot` field per lottery in `lib/lotteries.ts`). The detail page shows an "as of" date under the figure so it's clear this is a snapshot, not a live feed. Because jackpots change after every draw, this needs to be refreshed by hand periodically (update `nextJackpot` and `NEXT_JACKPOT_AS_OF`) — there's no live API wired in, since the site is a static export with no server functions.

## Languages

The site is available in English (default, unprefixed: `/`, `/lottery/euromillions`), French (`/fr`, `/fr/lottery/euromillions`), and German (`/de`, `/de/lottery/euromillions`) — each a genuinely separate, fully server-rendered static page, not a client-side toggle. This matters for SEO: search engines can index the French and German content directly, and each page carries `hreflang` alternates pointing to the other two languages plus an `x-default` pointing at the English version.

How it's wired: `components/LanguageProvider.tsx` takes a fixed `lang` prop (no more `localStorage`/browser-detection — that used to mean crawlers only ever saw English regardless of the switcher). `components/PageShell.tsx` wraps a page's content with `LanguageProvider` + `Navbar` + `Footer` for a given language; `app/page.tsx`, `app/fr/page.tsx`, and `app/de/page.tsx` (and the equivalent `lottery/[id]/page.tsx` triplet) each render the same shared `HomePage`/`LotteryPageClient` components through `PageShell` with their own language. `components/LanguageSwitcher.tsx` is real navigation (`<Link>`) between these URLs, not a state flip. All UI strings live in `lib/i18n.ts` — add a new language by adding an entry to `DICTIONARIES`/`LANGUAGES` there, plus a new `app/<lang>/` folder mirroring the `fr`/`de` ones.

## Data

All draw data in `data/*.json` is real, sourced from public results (not generated or fabricated):

- **EuroMillions** — 157 draws, 2025-01-03 to 2026-07-03 (contiguous, twice-weekly), sourced from beatlottery.co.uk's draw history archive
- **EuroJackpot** — 156 draws, 2025-01-03 to 2026-07-03 (twice-weekly, one single-week gap), sourced from beatlottery.co.uk
- **Lotto 6aus49** (Germany) — 134 draws, 2025-03-26 to 2026-07-04 (contiguous, twice-weekly)
- **Loto** (France) — 237 draws, 2025-01-01 to 2026-07-04 (contiguous, near-daily), sourced from tirage-euromillions.net's yearly archives
- **Irish Lotto** — 158 draws, 2025-01-01 to 2026-07-04 (contiguous, twice-weekly), with real per-draw jackpot figures, sourced from beatlottery.co.uk
- **Powerball** (US) — 236 draws, 2025-01-01 to 2026-07-04 (contiguous, Mon/Wed/Sat), sourced from New York State's open lottery data
- **Mega Millions** (US) — 130 draws, 2025-04-08 to 2026-07-03 (contiguous, Tue/Fri), sourced from the same dataset and limited to draws under the current 1–70 / Mega Ball 1–24 matrix introduced April 2025

Every lottery now carries well over 100 real draws, so the signature "last 100 draws" probability feature is backed by a genuine full sample across the board (previously EuroMillions, EuroJackpot, Loto France, and Irish Lotto fell short of 100 and have since been backfilled from additional public archives). Rows with any parsing ambiguity were dropped rather than guessed. Powerball, Mega Millions, EuroMillions, EuroJackpot, and Loto France jackpot figures aren't tracked per-draw, so their jackpot field is `0` and the jackpot badge is hidden, same as Lotto 6aus49 — Irish Lotto is the exception, with real per-draw jackpot amounts. To refresh a lottery's data, replace its JSON file in `data/` (see `lib/types.ts` for the `Draw` shape: `{ id, lotteryId, date, main[], bonus[], jackpot }`; jackpot is in millions).

## SEO

- **Per-page metadata** — every lottery page gets a unique `<title>`/description via `generateMetadata` in `app/lottery/[id]/page.tsx`, mentioning the real draw count and country (not the generic site-wide copy). Canonical URLs are set with `metadataBase` in `app/layout.tsx`, currently `https://lottoscopex.com` (the `SITE_URL` constant is duplicated in `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, and `lib/lotteryPage.ts` — update all four if the domain ever changes again).
- **Open Graph / Twitter cards** — a generated social preview image (`app/opengraph-image.tsx`) and a favicon/apple-touch-icon (`app/icon.tsx`, `app/apple-icon.tsx`) are built with `next/og`'s `ImageResponse`, so no static image assets are needed; Next.js wires up the `<meta>`/`<link>` tags automatically.
- **`robots.txt` / `sitemap.xml`** — generated at build time from `app/robots.ts` and `app/sitemap.ts`, listing the homepage plus all 7 lottery pages.
- **Structured data (JSON-LD)** — `Organization`/`WebSite` schema site-wide (`app/layout.tsx`), plus `Dataset` and `FAQPage` schema per lottery page (`app/lottery/[id]/page.tsx`), grounded in the same real numbers shown on the page (draw count, date range, hot numbers, next-draw jackpot) — nothing fabricated for SEO purposes.
- **Heading hierarchy** — each lottery page has one `<h1>` (the lottery name), with every tab section now carrying its own `<h2>` (visually hidden via `sr-only` where a heading wasn't already part of the design, e.g. Hot & Cold, Ranges, Probability, Compare, History).
- **Known gap, deliberately out of scope for now**: French and German translations are client-side only (`localStorage`-based, see `components/LanguageProvider.tsx`), so search engines only ever index the English version — there's no `/fr/` or `/de/` URL structure for hreflang. Fixing this properly means real per-language routes, which is a bigger refactor than the rest of the SEO work above.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

- `lib/lotteries.ts` — config for every supported lottery (number ranges, bonus balls, draw days). Add a new lottery here plus a data file to extend the platform.
- `lib/analytics.ts` — frequency, hot/cold, range distribution, and the signature "Probability Patterns" engine (analyzes what happened in the next draw based on the previous draw's range distribution, over the last 100 draws).
- `lib/colors.ts` — the shared gold/jewel-tone design tokens used everywhere balls and accents are rendered.
- `data/*.json` — real historical draws per lottery, newest first.
- `components/` — shared UI (lottery balls, draw cards, charts, tabs) reused identically across every lottery page.
- `app/lottery/[id]/page.tsx` — the per-lottery analytics page (Latest, History, Frequency, Hot & Cold, Ranges, Probability, Compare).

## Production build

```bash
npm run build
npm start
```

