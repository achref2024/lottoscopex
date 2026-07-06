import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import LegalPage from "@/components/LegalPage";
import { SITE_URL } from "@/lib/lotteryPage";

const TITLE = "How We Calculate Our Statistics";
const DESCRIPTION =
  "A plain-language look at exactly how LottoScopeX calculates number frequency, hot & cold numbers, range analysis, and probability patterns from real historical lottery draws.";

export const metadata: Metadata = {
  title: "Methodology",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/methodology` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How are lottery statistics calculated on LottoScopeX?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every statistic on LottoScopeX — frequency counts, hot & cold numbers, range distribution, and probability patterns — is computed directly from real, published historical draw results. Nothing is simulated, estimated, or predicted. We simply count what has actually happened and present it visually.",
      },
    },
    {
      "@type": "Question",
      name: "What does 'hot' and 'cold' mean for lottery numbers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A hot number is one that has been drawn more often than others over the period being analyzed. A cold number has been drawn less often. This only describes the past — since every lottery draw is independent and random, a number's past frequency has no effect on its odds in the next draw.",
      },
    },
    {
      "@type": "Question",
      name: "How does the Probability Patterns feature work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For each number range (1-9, 10-19, 20-29, 30-39, and 40 and above), we look at every consecutive pair of draws within the last 100 draws and record what happened in the second draw of each pair compared to the first: did the count of numbers from that range go up, go down, stay the same, or — if it was absent — come back? We then show the most common outcome as a plain-language pattern and a percentage, purely as a historical observation.",
      },
    },
    {
      "@type": "Question",
      name: "Can LottoScopeX predict winning lottery numbers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Lottery draws are independent random events, and no historical pattern changes the odds of any future draw. LottoScopeX exists to make historical data easy to explore, not to forecast outcomes.",
      },
    },
  ],
};

export default function Page() {
  return (
    <PageShell lang="en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <LegalPage title={TITLE}>
        <p>
          LottoScopeX turns real historical lottery draws into simple, visual statistics. Every
          number and percentage you see is computed directly from published draw results — this
          page explains exactly how, in plain language, for each feature on the site.
        </p>

        <h2>Our data</h2>
        <p>
          Each lottery on LottoScopeX has its own dataset of past draw results — the winning main
          numbers, bonus numbers, and draw dates — sourced from official published results. We add
          new draws as they happen and never alter historical figures after the fact.
        </p>

        <h2 id="frequency-stats">Frequency stats</h2>
        <p>
          For a given set of draws, we count how many times each possible number appeared as a
          winning number, then express that count as a percentage of draws. A number that appeared
          in 20 of the last 100 draws has a frequency of 20%. That's the entire calculation —
          no weighting, no adjustment.
        </p>

        <h2 id="hot-cold-numbers">Hot &amp; cold numbers</h2>
        <p>
          Once we have frequency counts for the last 100 draws, hot numbers are simply the ones
          with the highest counts, and cold numbers are the ones with the lowest. It's a ranking
          of the same frequency data, nothing more — a hot number isn't "due" to keep appearing,
          and a cold number isn't "due" to appear soon. Each draw is independent.
        </p>

        <h2 id="range-analysis">Range analysis</h2>
        <p>
          We split each lottery's number range into five bands — 1–9, 10–19, 20–29, 30–39, and
          40 and above — and count how many winning numbers from the last 100 draws fall into each
          band. This shows whether numbers have historically clustered in certain bands, purely as
          a descriptive breakdown of what's already happened.
        </p>

        <h2 id="probability-patterns">Probability patterns (our signature feature)</h2>
        <p>
          This is the most detailed calculation on the site, so here it is step by step. For each
          of the five number ranges above:
        </p>
        <ul>
          <li>
            We take the last 100 draws for that lottery and line them up in chronological order.
          </li>
          <li>
            We look at every consecutive pair of draws — draw 1 → draw 2, draw 2 → draw 3, and so
            on — giving us up to 99 pairs.
          </li>
          <li>
            For each pair, we count how many numbers from the range appeared in the first draw,
            then compare that to how many appeared in the very next draw: more, fewer, or the same
            amount.
          </li>
          <li>
            We separately track what happens when a range is completely absent from a draw (zero
            numbers) — specifically, how often it "comes back" with at least one number in the
            very next draw.
          </li>
          <li>
            Whichever outcome happened most often across all 99 pairs becomes that range's
            headline pattern, shown as a single plain-language sentence with its real percentage —
            for example, "the 20–29 range tends to repeat the same amount 41% of the time."
          </li>
        </ul>
        <p>
          This is a historical tendency, not a forecast. Every draw is an independent random event,
          and a pattern holding 60% of the time over the last 100 draws does not mean it will hold
          in the next one. We show it because it's an interesting, honestly-computed way to look
          at the data — never as a way to predict results.
        </p>

        <h2>What we never do</h2>
        <p>
          We never fabricate, simulate, or estimate a number. We never weight our Number Generator
          by past frequency — it's a genuinely random pick, unconnected to any statistic on the
          site. And we never claim any of this improves anyone's odds of winning. Lottery draws
          are random; LottoScopeX just makes the history behind them easy to explore.
        </p>
      </LegalPage>
    </PageShell>
  );
}
