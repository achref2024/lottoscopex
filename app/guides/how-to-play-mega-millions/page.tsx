import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import LegalPage from "@/components/LegalPage";
import { SITE_URL } from "@/lib/lotteryPage";

const TITLE = "How to Play Mega Millions: Rules, Where It's Sold & Draw Times";
const DESCRIPTION =
  "Which US states sell Mega Millions, how the numbers work, ticket prices, draw schedule, and how big the jackpot can grow — a plain-language guide.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/guides/how-to-play-mega-millions` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which US states sell Mega Millions tickets?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mega Millions is sold in 45 US states, plus Washington DC and the US Virgin Islands. The 5 states without it are Alabama, Alaska, Hawaii, Nevada, and Utah — the same states that sit out Powerball, since none of them run a state lottery.",
      },
    },
    {
      "@type": "Question",
      name: "How do you play Mega Millions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pick 5 main numbers from 1 to 70, plus 1 Mega Ball number from 1 to 24. Matching all 5 main numbers and the Mega Ball wins the jackpot.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a Mega Millions ticket cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard play costs $5, following a price increase from $2 in April 2025. The higher price now includes a built-in multiplier on non-jackpot prizes and larger fixed prize amounts.",
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
          Mega Millions is America's other giant multi-state lottery, running alongside Powerball as
          one of the two biggest jackpot games in the US. Here's where it's sold, how the numbers
          work, and what to expect from a draw.
        </p>

        <h2 id="countries">Where it's sold</h2>
        <p>
          Mega Millions is sold in <strong>45 US states</strong>, plus Washington DC and the US
          Virgin Islands. The only 5 states without it are Alabama, Alaska, Hawaii, Nevada, and
          Utah — the same states that sit out Powerball, since none of them operate a state lottery
          at all. Players outside the US sometimes take part through licensed international betting
          services rather than buying an official ticket.
        </p>

        <h2 id="how-to-play">How to play</h2>
        <p>
          Choose <strong>5 main numbers from 1 to 70</strong>, then <strong>1 Mega Ball number from 1
          to 24</strong>, drawn from a separate pool. Matching all 5 main numbers plus the Mega Ball
          wins the jackpot; there are nine prize tiers in total, so smaller matches still pay out.
        </p>

        <h2 id="draw-schedule">Draw schedule and ticket price</h2>
        <p>
          Draws are held every <strong>Tuesday and Friday</strong> at 23:00 Eastern Time. A standard
          play costs $5, following an April 2025 price increase from the previous $2 — the higher
          price now bundles in an automatic multiplier on non-jackpot prizes and bigger fixed prize
          amounts at every tier.
        </p>

        <h2 id="jackpot">Jackpot size and odds</h2>
        <p>
          The jackpot starts at a minimum of around $50 million and has no fixed cap, regularly
          climbing past $500 million and occasionally over $1 billion. With a 5-from-70 plus
          1-from-24 format, the odds of matching every number are 1 in 290,472,336 — nearly
          identical to Powerball's odds. See our{" "}
          <Link href="/guides/how-lottery-odds-work">full odds comparison across all 8 lotteries</Link>{" "}
          for exactly how the two compare.
        </p>

        <h2 id="history">A brief history</h2>
        <p>
          Mega Millions launched in 1996 under the name "The Big Game" before adopting its current
          name in 2002. It has changed its number format and pricing several times since, most
          recently in April 2025 when the ticket price rose to $5 alongside larger guaranteed
          non-jackpot prizes.
        </p>

        <h2 id="see-stats">See real Mega Millions statistics</h2>
        <p>
          LottoScopeX tracks every Mega Millions draw with colourful ball displays just like the
          latest result — browse{" "}
          <Link href="/lottery/megamillions">Mega Millions results, number frequencies &amp; probability patterns</Link>.
        </p>
      </LegalPage>
    </PageShell>
  );
}
