import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import LegalPage from "@/components/LegalPage";
import { SITE_URL } from "@/lib/lotteryPage";

const TITLE = "How to Play German Lotto 6aus49: Rules & Draw Times";
const DESCRIPTION =
  "How Germany's Lotto 6aus49 works, who can play, ticket prices, draw schedule, and the jackpot cap — a plain-language guide.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/guides/how-to-play-lotto-6aus49` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who can play German Lotto 6aus49?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lotto 6aus49 is Germany's national lottery, sold through the 16 state-run lottery companies that form the Deutscher Lotto- und Totoblock. Tickets are bought within Germany, though players elsewhere sometimes use licensed international betting services to take part.",
      },
    },
    {
      "@type": "Question",
      name: "How do you play Lotto 6aus49?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pick 6 main numbers from 1 to 49, plus a Superzahl from 0 to 9 that's drawn separately. Matching all 6 main numbers and the Superzahl wins the jackpot.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a Lotto 6aus49 ticket cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard line costs €1.20, making it one of the cheapest major European lotteries to play per line.",
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
          Lotto 6aus49 ("6 out of 49") is Germany's oldest and best-known national lottery, running
          continuously since the 1950s. Here's who can play, how the numbers work, and what to
          expect from a draw.
        </p>

        <h2 id="countries">Who can play</h2>
        <p>
          Lotto 6aus49 is <strong>Germany's national lottery</strong>, operated jointly by the 16
          state lottery companies (Deutscher Lotto- und Totoblock) that together cover the whole
          country. Tickets are sold through licensed retailers and official channels inside Germany.
          Players outside Germany sometimes take part through licensed international betting
          services, which is a different arrangement from buying an official German ticket directly.
        </p>

        <h2 id="how-to-play">How to play</h2>
        <p>
          Choose <strong>6 main numbers from 1 to 49</strong>. A separate <strong>Superzahl</strong>{" "}
          ("super number") from 0 to 9 is then drawn on top, working like a bonus ball. Matching all
          6 main numbers plus the Superzahl wins the jackpot; matching fewer numbers can still win one
          of the lower prize tiers.
        </p>

        <h2 id="draw-schedule">Draw schedule and ticket price</h2>
        <p>
          Draws are held every <strong>Wednesday and Saturday</strong> — Wednesday's draw starts at
          18:25 and Saturday's at 19:25, both German time. A standard line costs €1.20, one of the
          lowest entry prices among major European lotteries.
        </p>

        <h2 id="jackpot">Jackpot size and odds</h2>
        <p>
          The jackpot starts at a minimum of around €1 million and can climb to a cap of{" "}
          <strong>€50 million</strong> (raised from €45 million in November 2023) before further
          rollovers move down into lower prize tiers. Because the format is 6-from-49 plus a
          Superzahl, the jackpot odds work out to 1 in 139,838,160 — the same figure as EuroMillions
          and EuroJackpot's 5-from-50-plus-2-from-12 format. See our{" "}
          <Link href="/guides/how-lottery-odds-work">full odds guide</Link> for the maths behind
          that.
        </p>

        <h2 id="history">A brief history</h2>
        <p>
          The first Lotto 6aus49 draw took place in Hamburg on 9 October 1955, introduced in
          post-war Germany partly as a way to raise funds for social and cultural projects. It ran on
          a 7-from-38 format at first, switched to the current 6-from-49 matrix in June 1986, and
          added the Superzahl bonus number in May 2013.
        </p>

        <h2 id="see-stats">See real Lotto 6aus49 statistics</h2>
        <p>
          LottoScopeX tracks every Lotto 6aus49 draw with colourful ball displays just like the
          latest result — browse{" "}
          <Link href="/lottery/lotto6aus49">Lotto 6aus49 results, number frequencies &amp; probability patterns</Link>.
        </p>
      </LegalPage>
    </PageShell>
  );
}
