import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import LegalPage from "@/components/LegalPage";
import { SITE_URL } from "@/lib/lotteryPage";

const TITLE = "How to Play EuroMillions: Rules, Countries & Draw Times";
const DESCRIPTION =
  "Which countries can play EuroMillions, how the numbers work, ticket prices, draw schedule, and the jackpot cap — a plain-language guide to Europe's biggest lottery.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/guides/how-to-play-euromillions` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which countries can play EuroMillions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EuroMillions tickets are officially sold in 9 countries: France, the United Kingdom, Spain, Portugal, Ireland, Belgium, Luxembourg, Switzerland, and Austria. Players in Andorra, Liechtenstein, Monaco, and the Isle of Man can also take part through retailers in those neighbouring countries. People outside these regions sometimes play through licensed third-party betting services, though that is a different arrangement from buying an official ticket directly.",
      },
    },
    {
      "@type": "Question",
      name: "How do you play EuroMillions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pick 5 main numbers from 1 to 50, plus 2 Lucky Star numbers from 1 to 12. To win the jackpot you need to match all 5 main numbers and both Lucky Stars. There are 13 prize tiers in total, so matching fewer numbers can still win a smaller prize.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a EuroMillions ticket cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard line costs €2.50 in most participating countries (£2.50 in the UK, CHF 3.50 in Switzerland). Some countries bundle in a local supplementary game at no extra cost, such as My Million in France or El Millón in Spain.",
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
          EuroMillions is Europe's biggest lottery by jackpot size, run jointly by lottery operators
          across nine countries. Here's exactly who can play, how the numbers work, and what to
          expect from a draw.
        </p>

        <h2 id="countries">Which countries can play</h2>
        <p>
          EuroMillions tickets are officially sold in <strong>9 countries</strong>: France, the
          United Kingdom, Spain, Portugal, Ireland, Belgium, Luxembourg, Switzerland, and Austria.
          Residents of a few smaller neighbouring territories — Andorra, Liechtenstein, Monaco, and
          the Isle of Man — can also buy in through retailers just across the border. Outside these
          regions, some players use licensed international betting services that let you wager on
          the outcome of the draw, which is a different legal arrangement from buying an official
          ticket in a participating country.
        </p>

        <h2 id="how-to-play">How to play</h2>
        <p>
          Choose <strong>5 main numbers from 1 to 50</strong>, then <strong>2 Lucky Star numbers
          from 1 to 12</strong>. Matching all 5 main numbers plus both Lucky Stars wins the jackpot.
          There are 13 prize tiers below that, so matching just 2 main numbers plus 1 Lucky Star
          already wins a small prize. Each country also adds its own supplementary game bundled into
          the ticket price — My Million in France, El Millón in Spain, M1lhão in Portugal, and the
          UK Millionaire Maker in Britain.
        </p>

        <h2 id="draw-schedule">Draw schedule and ticket price</h2>
        <p>
          Draws take place every <strong>Tuesday and Friday</strong>, at 20:45 Central European Time
          in Paris. A standard line costs €2.50 in most countries (£2.50 in the UK, CHF 3.50 in
          Switzerland). Tickets can usually be bought for a single draw or for up to eight
          consecutive draws at once.
        </p>

        <h2 id="jackpot">Jackpot size and odds</h2>
        <p>
          The jackpot starts at a minimum of €17 million and can climb as high as{" "}
          <strong>€240 million</strong> — the highest cap of any European lottery — before further
          rollovers spill down into lower prize tiers. The odds of matching all 5 numbers plus both
          Lucky Stars are 1 in 139,838,160; see our{" "}
          <Link href="/guides/how-lottery-odds-work">full odds guide</Link> for how that's
          calculated, and our{" "}
          <Link href="/guides/euromillions-vs-eurojackpot">EuroMillions vs EuroJackpot comparison</Link>{" "}
          if you're deciding between the two.
        </p>

        <h2 id="history">A brief history</h2>
        <p>
          EuroMillions launched in February 2004 as a joint venture between the French, Spanish, and
          UK national lotteries, designed to pool ticket sales across borders and produce bigger
          jackpots than any single country's lottery could offer alone. Austria, Belgium, Ireland,
          Luxembourg, Portugal, and Switzerland joined over the following years, building it into the
          pan-European draw it is today.
        </p>

        <h2 id="see-stats">See real EuroMillions statistics</h2>
        <p>
          LottoScopeX tracks every EuroMillions draw with colourful ball displays just like the
          latest result — browse{" "}
          <Link href="/lottery/euromillions">EuroMillions results, number frequencies &amp; probability patterns</Link>.
        </p>
      </LegalPage>
    </PageShell>
  );
}
