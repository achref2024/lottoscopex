import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import LegalPage from "@/components/LegalPage";
import { SITE_URL } from "@/lib/lotteryPage";

const TITLE = "How to Play Powerball: Rules, Where It's Sold & Draw Times";
const DESCRIPTION =
  "Which US states sell Powerball, how the numbers work, ticket prices, draw schedule, and how big the jackpot can grow — a plain-language guide.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/guides/how-to-play-powerball` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which US states sell Powerball tickets?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Powerball is sold in 45 US states, plus Washington DC, Puerto Rico, and the US Virgin Islands — 48 jurisdictions in total. The 5 states without it are Alabama, Alaska, Hawaii, Nevada, and Utah, none of which run a state lottery.",
      },
    },
    {
      "@type": "Question",
      name: "How do you play Powerball?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pick 5 main numbers from 1 to 69, plus 1 Powerball number from 1 to 26. Matching all 5 main numbers and the Powerball wins the jackpot.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a Powerball ticket cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard play costs $2. Optional add-ons include Power Play for $1 more, which can multiply non-jackpot prizes, and Double Play in participating jurisdictions.",
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
          Powerball is one of America's two giant multi-state lotteries, known for producing some of
          the largest jackpots ever recorded. Here's where it's sold, how the numbers work, and what
          to expect from a draw.
        </p>

        <h2 id="countries">Where it's sold</h2>
        <p>
          Powerball is sold in <strong>45 US states</strong>, plus Washington DC, Puerto Rico, and
          the US Virgin Islands — 48 jurisdictions in total. The only 5 states without it are Alabama,
          Alaska, Hawaii, Nevada, and Utah, none of which operate a state lottery at all. Players
          outside the US sometimes take part through licensed international betting services rather
          than buying an official ticket.
        </p>

        <h2 id="how-to-play">How to play</h2>
        <p>
          Choose <strong>5 main numbers from 1 to 69</strong>, then <strong>1 Powerball number from 1
          to 26</strong>, drawn from a separate pool. Matching all 5 main numbers plus the Powerball
          wins the jackpot; matching just the Powerball alone still wins a small prize, and there are
          nine prize tiers in total.
        </p>

        <h2 id="draw-schedule">Draw schedule and ticket price</h2>
        <p>
          Draws are held every <strong>Monday, Wednesday, and Saturday</strong> at 22:59 Eastern
          Time. A standard play costs $2, with an optional Power Play add-on for $1 more that can
          multiply non-jackpot prizes, plus a Double Play add-on in participating jurisdictions.
        </p>

        <h2 id="jackpot">Jackpot size and odds</h2>
        <p>
          The jackpot starts at a minimum of around $20 million and has no fixed cap — it's climbed
          past $1 billion multiple times, with $500 million or more common territory once a jackpot
          has rolled over for a while. With a 5-from-69 plus 1-from-26 format, the odds of matching
          every number are 1 in 292,201,338, among the longest odds of any lottery LottoScopeX
          tracks — see our{" "}
          <Link href="/guides/how-lottery-odds-work">full odds comparison across all 9 lotteries</Link>.
        </p>

        <h2 id="history">A brief history</h2>
        <p>
          Powerball launched in April 1992, evolving from an earlier multi-state game called Lotto*America.
          It's been updated several times since — including changes to both number pools and the
          introduction of the Power Play multiplier — to build it into the record-breaking jackpot
          game it is today.
        </p>

        <h2 id="see-stats">See real Powerball statistics</h2>
        <p>
          LottoScopeX tracks every Powerball draw with colourful ball displays just like the latest
          result — browse{" "}
          <Link href="/lottery/powerball">Powerball results, number frequencies &amp; probability patterns</Link>.
        </p>
      </LegalPage>
    </PageShell>
  );
}
