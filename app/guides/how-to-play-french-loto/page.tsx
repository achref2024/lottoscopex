import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import LegalPage from "@/components/LegalPage";
import { SITE_URL } from "@/lib/lotteryPage";

const TITLE = "How to Play French Loto: Rules & Draw Times";
const DESCRIPTION =
  "How France's national Loto works, who can play, ticket prices, draw schedule, and the jackpot cap — a plain-language guide.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/guides/how-to-play-french-loto` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who can play French Loto?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "French Loto is run by Française des Jeux (FDJ) for players in mainland France and France's overseas territories. Players elsewhere sometimes take part through licensed international betting services, which purchase official tickets on the player's behalf.",
      },
    },
    {
      "@type": "Question",
      name: "How do you play French Loto?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pick 5 main numbers from 1 to 49, plus a Numéro Chance from 1 to 10. Matching all 5 main numbers and the Numéro Chance wins the jackpot.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a French Loto ticket cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard line costs €2.20, which includes entry into the Loto Raffle. Adding the optional 2nd Draw brings the total to €3.",
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
          Loto is France's flagship national lottery, run by Française des Jeux (FDJ) since the
          1970s. Here's who can play, how the numbers work, and what to expect from a draw.
        </p>

        <h2 id="countries">Who can play</h2>
        <p>
          French Loto is operated by <strong>Française des Jeux (FDJ)</strong> for players in
          mainland France and France's overseas départements and collectivities. Tickets are bought
          through FDJ retailers and the official FDJ platform inside French territory. Players
          outside France sometimes take part through licensed international betting services, which
          buy an official ticket on the player's behalf — a different arrangement from buying
          directly through FDJ.
        </p>

        <h2 id="how-to-play">How to play</h2>
        <p>
          Choose <strong>5 main numbers from 1 to 49</strong>, then a single{" "}
          <strong>Numéro Chance from 1 to 10</strong>. Matching all 5 main numbers plus the Numéro
          Chance wins the jackpot; several lower tiers pay out for smaller matches.
        </p>

        <h2 id="draw-schedule">Draw schedule and ticket price</h2>
        <p>
          Draws take place three times a week — <strong>Monday, Wednesday, and Saturday</strong> —
          at 20:20 Paris time. A standard line costs €2.20 and includes entry into the Loto Raffle, a
          supplementary game guaranteeing at least one raffle winner per draw. An optional 2nd Draw
          add-on is available for €0.80 more, bringing the total to €3 per ticket.
        </p>

        <h2 id="jackpot">Jackpot size and odds</h2>
        <p>
          The jackpot starts at around €2 million and can climb to a cap of roughly{" "}
          <strong>€30 million</strong> before further rollovers move down into lower prize tiers.
          With a 5-from-49 plus 1-from-10 format, the jackpot odds are 1 in 19,068,840 — noticeably
          more favourable than EuroMillions or EuroJackpot's odds, since both the main pool and the
          bonus pool are smaller. See our{" "}
          <Link href="/guides/how-lottery-odds-work">full odds comparison across all 7 lotteries</Link>{" "}
          for the exact numbers.
        </p>

        <h2 id="history">A brief history</h2>
        <p>
          Loto launched in France in 1976 as the country's first modern national lottery, building on
          a long French tradition of state-run lotteries dating back centuries. It has been refreshed
          several times since, including changes to the numbers matrix and the introduction of the
          Numéro Chance and the raffle game.
        </p>

        <h2 id="see-stats">See real French Loto statistics</h2>
        <p>
          LottoScopeX tracks every French Loto draw with colourful ball displays just like the
          latest result — browse{" "}
          <Link href="/lottery/loto-france">French Loto results, number frequencies &amp; probability patterns</Link>.
        </p>
      </LegalPage>
    </PageShell>
  );
}
