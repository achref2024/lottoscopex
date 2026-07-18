import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import LegalPage from "@/components/LegalPage";
import { SITE_URL } from "@/lib/lotteryPage";

const TITLE = "How to Play UK Lotto: Rules, Odds & Draw Times";
const DESCRIPTION =
  "How the UK National Lottery's Lotto game works, who can play, ticket prices, draw schedule, the Bonus Ball, and the odds behind its jackpot — a plain-language guide to Britain's original national lottery.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/guides/how-to-play-uk-lotto` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you play UK Lotto?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pick 6 numbers from 1 to 59. To win the jackpot you need to match all 6. A seventh number, the Bonus Ball, is drawn separately and only affects one prize tier — matching 5 main numbers plus the Bonus Ball — it has no effect on the jackpot itself.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if the UK Lotto jackpot isn't won?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The jackpot rolls over to the next draw and grows. It can roll over a maximum of 5 times — the sixth consecutive draw becomes a 'Must Be Won' draw, where the jackpot is guaranteed to be paid out, cascading down to the next winning tier if no one matches all 6.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a UK Lotto ticket cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard line costs £2, covering one set of 6 numbers for a single draw. Draws take place twice a week, on Wednesday and Saturday evenings.",
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
          UK Lotto is the National Lottery's original flagship game and the one most people mean when
          they say "the lottery" in Britain. Here's exactly how it works and how its odds compare to
          the other lotteries on LottoScopeX.
        </p>

        <h2 id="countries">Where you can play</h2>
        <p>
          UK Lotto is sold exclusively in the <strong>United Kingdom</strong>, operated by Allwyn (the
          National Lottery's current licence holder). Tickets are available at retailers across
          England, Scotland, Wales, and Northern Ireland, as well as through the National Lottery's
          official app and website. It has run continuously since the National Lottery launched in
          November 1994, making it one of the longest-running lotteries LottoScopeX tracks.
        </p>

        <h2 id="how-to-play">How to play</h2>
        <p>
          Choose <strong>6 main numbers from 1 to 59</strong>. Matching all 6 wins the jackpot. A
          seventh number, the <strong>Bonus Ball</strong>, is drawn separately after the main 6 —
          matching 5 main numbers plus the Bonus Ball wins a fixed £1 million prize, but it never
          affects the jackpot itself. There are prize tiers all the way down to matching just 2 main
          numbers, which wins a free Lucky Dip entry into the next draw.
        </p>

        <h2 id="draw-schedule">Draw schedule and ticket price</h2>
        <p>
          Draws take place twice a week — <strong>Wednesday and Saturday</strong> evenings, at 20:00
          UK time. A standard line costs <strong>£2</strong>. If the jackpot rolls over five times
          without a winner, the following draw becomes a "Must Be Won" draw: the jackpot is
          guaranteed to be paid out, cascading down to whichever tier does have winners if no one
          matches all 6.
        </p>

        <h2 id="jackpot">Jackpot size and odds</h2>
        <p>
          The minimum guaranteed jackpot resets to around <strong>£2 million</strong> after a win, and
          climbs from there with every rollover — there's no fixed cap on how high it can go. The odds
          of matching all 6 numbers are <strong>1 in 45,057,474</strong>. See our{" "}
          <Link href="/guides/how-lottery-odds-work">full odds comparison across all 9 lotteries</Link>{" "}
          for how that's calculated. The biggest UK Lotto jackpot on record is <strong>£66.1 million</strong>,
          won on 9 January 2016 and split between two ticket holders.
        </p>

        <h2 id="history">A brief history</h2>
        <p>
          The National Lottery launched its Lotto game on 19 November 1994, originally as a 6-from-49
          format. The matrix was widened to 6-from-59 in October 2015 to make the jackpot harder to
          win and grow larger, and the Bonus Ball was introduced early on as a way to reward players
          who narrowly missed the jackpot. It remains the National Lottery's best-known draw today.
        </p>

        <h2 id="see-stats">See real UK Lotto statistics</h2>
        <p>
          LottoScopeX tracks every UK Lotto draw with colourful ball displays just like the latest
          result — browse{" "}
          <Link href="/lottery/uk-lotto">UK Lotto results, number frequencies &amp; probability patterns</Link>.
        </p>
      </LegalPage>
    </PageShell>
  );
}
