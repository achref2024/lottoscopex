import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import LegalPage from "@/components/LegalPage";
import { SITE_URL } from "@/lib/lotteryPage";

const TITLE = "How to Play Irish Lotto: Rules & Draw Times";
const DESCRIPTION =
  "How Ireland's National Lottery Lotto works, who can play, ticket prices, draw schedule, and the jackpot cap — a plain-language guide.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/guides/how-to-play-irish-lotto` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who can play Irish Lotto?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Irish Lotto is run by the National Lottery in Ireland, with tickets sold through retailers and the official National Lottery platform inside Ireland. Players elsewhere sometimes take part through licensed international betting services rather than an official ticket.",
      },
    },
    {
      "@type": "Question",
      name: "How do you play Irish Lotto?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pick 6 main numbers from 1 to 47. Six numbers plus a Bonus Ball are drawn; matching all 6 main numbers wins the jackpot, while matching fewer numbers (plus the Bonus Ball in some tiers) wins smaller prizes.",
      },
    },
    {
      "@type": "Question",
      name: "How much does an Irish Lotto ticket cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each line costs €2, but a minimum of two lines must be purchased, making €4 the smallest possible entry.",
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
          Irish Lotto is Ireland's home-grown national lottery, run continuously since the late
          1980s. Here's who can play, how the numbers work, and what to expect from a draw.
        </p>

        <h2 id="countries">Who can play</h2>
        <p>
          Irish Lotto is operated by the <strong>National Lottery</strong> for players in Ireland,
          with tickets sold through retailers and the official National Lottery app and website
          inside the country. Players outside Ireland sometimes take part through licensed
          international betting services, which is a different arrangement from buying an official
          ticket directly.
        </p>

        <h2 id="how-to-play">How to play</h2>
        <p>
          Choose <strong>6 main numbers from 1 to 47</strong>. Six numbers plus one Bonus Ball are
          drawn; matching all 6 main numbers wins the jackpot outright — no bonus ball required.
          Several lower prize tiers reward matching fewer main numbers, with the Bonus Ball used as a
          tiebreaker at some levels.
        </p>

        <h2 id="draw-schedule">Draw schedule and ticket price</h2>
        <p>
          Draws are held every <strong>Wednesday and Saturday</strong> at around 20:00 Irish time.
          Each line costs €2, but tickets must be bought in a minimum of two lines, so €4 is the
          smallest possible entry.
        </p>

        <h2 id="jackpot">Jackpot size and odds</h2>
        <p>
          The jackpot starts at around €2 million and can grow to a cap of roughly{" "}
          <strong>€19 million</strong> before further rollovers move down into lower prize tiers.
          With a 6-from-47 format and no separate bonus pool required for the top prize, the jackpot
          odds are 1 in 10,737,573 — the best jackpot odds of any lottery LottoScopeX tracks. See our{" "}
          <Link href="/guides/how-lottery-odds-work">full odds comparison</Link> for how that
          compares to the other six.
        </p>

        <h2 id="history">A brief history</h2>
        <p>
          Ireland's National Lottery began operating in March 1987, and the Lotto game held its
          first draw on 16 April 1988. It's been through several format changes since, including
          adjustments to the number pool and ticket price, most recently moving to €2 per line with a
          two-line minimum in 2015.
        </p>

        <h2 id="see-stats">See real Irish Lotto statistics</h2>
        <p>
          LottoScopeX tracks every Irish Lotto draw with colourful ball displays just like the
          latest result — browse{" "}
          <Link href="/lottery/irish-lotto">Irish Lotto results, number frequencies &amp; probability patterns</Link>.
        </p>
      </LegalPage>
    </PageShell>
  );
}
