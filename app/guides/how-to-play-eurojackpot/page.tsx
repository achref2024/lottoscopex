import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import LegalPage from "@/components/LegalPage";
import { SITE_URL } from "@/lib/lotteryPage";

const TITLE = "How to Play EuroJackpot: Rules, Countries & Draw Times";
const DESCRIPTION =
  "Which 19 countries can play EuroJackpot, how the numbers work, ticket prices, draw schedule, and the jackpot cap — a plain-language guide.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/guides/how-to-play-eurojackpot` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which countries can play EuroJackpot?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EuroJackpot is sold in 19 countries: Croatia, Czech Republic, Denmark, Estonia, Finland, Germany, Greece, Hungary, Iceland, Italy, Latvia, Lithuania, the Netherlands, Norway, Poland, Slovakia, Slovenia, Spain, and Sweden — giving it the widest geographic reach of any pan-European lottery.",
      },
    },
    {
      "@type": "Question",
      name: "How do you play EuroJackpot?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pick 5 main numbers from 1 to 50, plus 2 Euro Numbers from 1 to 12. Matching all 5 main numbers and both Euro Numbers wins the jackpot, which starts at a guaranteed €10 million.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a EuroJackpot ticket cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard line costs €2 in most participating countries, though a handful of countries charge slightly more — for example €2.50 in Greece and Slovenia — often because a local supplementary game is bundled in.",
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
          EuroJackpot is the widest-reaching pan-European lottery, sold across 19 countries from
          Iceland to Greece. Here's who can play, how the numbers work, and what to expect from a
          draw.
        </p>

        <h2 id="countries">Which countries can play</h2>
        <p>
          EuroJackpot is sold in <strong>19 countries</strong>: Croatia, Czech Republic, Denmark,
          Estonia, Finland, Germany, Greece, Hungary, Iceland, Italy, Latvia, Lithuania, the
          Netherlands, Norway, Poland, Slovakia, Slovenia, Spain, and Sweden. That footprint covers
          most of Central, Northern, and Eastern Europe, including several countries — like Germany,
          Poland, and the Nordic nations — that aren't part of EuroMillions.
        </p>

        <h2 id="how-to-play">How to play</h2>
        <p>
          Choose <strong>5 main numbers from 1 to 50</strong>, then <strong>2 Euro Numbers from 1 to
          12</strong>. Matching all 5 main numbers plus both Euro Numbers wins the jackpot. Twelve
          prize tiers in total mean even modest matches can win something, and the jackpot is
          guaranteed to start at a minimum of €10 million after any draw where it's won.
        </p>

        <h2 id="draw-schedule">Draw schedule and ticket price</h2>
        <p>
          Draws are held every <strong>Tuesday and Friday</strong>, drawn in Helsinki around 20:00
          Central European Time. A standard line costs €2 in most countries, with small variations
          in a few markets (for example €2.50 in Greece and Slovenia) where a local add-on game is
          bundled in.
        </p>

        <h2 id="jackpot">Jackpot size and odds</h2>
        <p>
          The jackpot starts at €10 million and can grow to a cap of <strong>€120 million</strong>{" "}
          before further rollovers move down into lower prize tiers. Because the number format is
          identical to EuroMillions, the jackpot odds are exactly the same: 1 in 139,838,160 — see
          our <Link href="/guides/how-lottery-odds-work">full odds guide</Link> and our{" "}
          <Link href="/guides/euromillions-vs-eurojackpot">EuroMillions vs EuroJackpot comparison</Link>{" "}
          for how the two games actually differ.
        </p>

        <h2 id="history">A brief history</h2>
        <p>
          EuroJackpot launched in March 2012 as an alternative pan-European lottery aimed at
          countries outside EuroMillions' original Western European footprint. It was designed from
          the start to include a broader set of European nations, and has since grown into the
          continent's most widely available cross-border lottery.
        </p>

        <h2 id="see-stats">See real EuroJackpot statistics</h2>
        <p>
          LottoScopeX tracks every EuroJackpot draw with colourful ball displays just like the latest
          result — browse{" "}
          <Link href="/lottery/eurojackpot">EuroJackpot results, number frequencies &amp; probability patterns</Link>.
        </p>
      </LegalPage>
    </PageShell>
  );
}
