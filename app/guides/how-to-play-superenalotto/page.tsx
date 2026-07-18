import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import LegalPage from "@/components/LegalPage";
import { SITE_URL } from "@/lib/lotteryPage";

const TITLE = "How to Play SuperEnalotto: Rules, Odds & Draw Times";
const DESCRIPTION =
  "How SuperEnalotto works, who can play, ticket prices, draw schedule, and why its jackpots grow larger than almost any other lottery in the world — a plain-language guide to Italy's national lottery.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/guides/how-to-play-superenalotto` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you play SuperEnalotto?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pick 6 numbers from 1 to 90. To win the jackpot you need to match all 6. A seventh number, the Jolly, is drawn from the remaining 84 numbers and boosts the prize for players who matched exactly 5 of the 6 main numbers, but it has no effect on the jackpot itself.",
      },
    },
    {
      "@type": "Question",
      name: "Why are SuperEnalotto jackpots so big?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SuperEnalotto has no cap on its jackpot and no forced rolldown into lower prize tiers, so the prize keeps growing every draw it goes unwon. Combined with odds of 1 in 622,614,630 — the longest of any lottery LottoScopeX tracks — jackpots can run for a year or more without a winner, which is how the game produced the largest lottery jackpot in Italian history: €371,133,424.51, split between 90 winning tickets on 16 February 2023.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a SuperEnalotto ticket cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard entry costs €1. Players can also add the SuperStar option for an extra €0.50, which draws a separate number from its own pool of 90 for a second set of prizes, including a fixed €2,000,000 payout for matching it alongside all 6 main numbers.",
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
          SuperEnalotto is Italy's national lottery and, thanks to some of the longest odds in the
          world, the source of some of the largest jackpots ever won anywhere. Here's exactly how it
          works and what makes it different from every other lottery on LottoScopeX.
        </p>

        <h2 id="countries">Where you can play</h2>
        <p>
          SuperEnalotto is sold exclusively in <strong>Italy</strong>, through Sisal-operated
          retailers, tobacconists, bars, and licensed online platforms. Unlike EuroMillions or
          EuroJackpot, it isn't a cross-border pooled lottery — it's Italy's own national game, and
          has been since it launched in December 1997.
        </p>

        <h2 id="how-to-play">How to play</h2>
        <p>
          Choose <strong>6 main numbers from 1 to 90</strong>. Matching all 6 wins the jackpot. After
          the 6 main numbers are drawn, a seventh number called the <strong>Jolly</strong> is drawn
          from the remaining 84 numbers — matching 5 main numbers plus the Jolly wins a large second
          prize, though it never affects the jackpot itself. There are six prize tiers in total, down
          to matching just 2 numbers.
        </p>

        <h2 id="draw-schedule">Draw schedule and ticket price</h2>
        <p>
          Draws take place four times a week — <strong>Tuesday, Thursday, Friday, and Saturday</strong>,
          at 20:00 Central European Time in Rome. A standard entry costs <strong>€1</strong>. Players
          can add the optional SuperStar number for an extra €0.50 per entry, drawn separately from
          its own pool of 90 numbers, which pays a fixed €2,000,000 for matching all 6 main numbers
          plus SuperStar, or smaller fixed and multiplied prizes further down the tiers.
        </p>

        <h2 id="jackpot">Jackpot size and odds</h2>
        <p>
          The jackpot has no fixed cap and no rolldown rule forcing it into lower tiers, so it simply
          keeps growing every time it goes unwon. The odds of matching all 6 numbers are{" "}
          <strong>1 in 622,614,630</strong> — by far the longest odds of any lottery LottoScopeX
          tracks, over twice as long as Powerball's. See our{" "}
          <Link href="/guides/how-lottery-odds-work">full odds comparison across all 9 lotteries</Link>{" "}
          for how that's calculated. Those long odds are exactly why SuperEnalotto has produced some
          of the largest lottery prizes ever recorded: the biggest, €371,133,424.51, was split between
          90 winning tickets on 16 February 2023, while the largest single-winner jackpot —
          €209,160,441.54 — was won on 13 August 2019 by a single ticket sold at a bar in Lodi.
        </p>

        <h2 id="history">A brief history</h2>
        <p>
          SuperEnalotto launched on 3 December 1997, an evolution of the older "Enalotto" game that
          had existed since the 1950s. Sisal, the operator, redesigned the format to draw numbers
          independently rather than pulling them from regional Lotto wheels, and introduced the
          SuperStar add-on in 2009. It remains Italy's biggest jackpot lottery today.
        </p>

        <h2 id="see-stats">See real SuperEnalotto statistics</h2>
        <p>
          LottoScopeX tracks every SuperEnalotto draw with colourful ball displays just like the
          latest result — browse{" "}
          <Link href="/lottery/superenalotto">SuperEnalotto results, number frequencies &amp; probability patterns</Link>.
        </p>
      </LegalPage>
    </PageShell>
  );
}
