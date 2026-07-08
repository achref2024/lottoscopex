import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import LegalPage from "@/components/LegalPage";
import { SITE_URL } from "@/lib/lotteryPage";

const TITLE = "EuroMillions vs EuroJackpot: What's the Difference?";
const DESCRIPTION =
  "EuroMillions and EuroJackpot are Europe's two biggest pan-European lotteries. Here's exactly how they differ in odds, jackpot caps, and participating countries.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/guides/euromillions-vs-eurojackpot` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the main difference between EuroMillions and EuroJackpot?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both games share an identical format — 5 main numbers from a pool of 50, plus 2 bonus numbers from a pool of 12 — giving them exactly the same jackpot odds of 1 in 139,838,160. The real differences are the jackpot cap (EuroMillions can climb to €240 million, EuroJackpot caps at €120 million) and the list of participating countries.",
      },
    },
    {
      "@type": "Question",
      name: "Which draws more often, EuroMillions or EuroJackpot?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both lotteries hold draws twice a week, on Tuesdays and Fridays, so neither has more frequent draws than the other.",
      },
    },
    {
      "@type": "Question",
      name: "Do EuroMillions and EuroJackpot have the same odds?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Because both games use the same 5-from-50 plus 2-from-12 format, the combinatorics work out identically: 1 in 139,838,160 for the jackpot in both games.",
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
          EuroMillions and EuroJackpot are the two biggest pan-European lotteries, and people often
          assume they're the same game with two names. They're not — but they're also more alike
          than most players realize. Here's a real, fact-by-fact comparison.
        </p>

        <h2 id="format">Same format, same odds</h2>
        <p>
          Both games ask you to pick 5 main numbers from a pool of 50, plus 2 bonus numbers (Lucky
          Stars for EuroMillions, Euro Numbers for EuroJackpot) from a pool of 12. Because the format
          is identical, the math is too: both games have jackpot odds of exactly{" "}
          <strong>1 in 139,838,160</strong>. Neither game gives you better odds than the other — see
          our full <Link href="/guides/how-lottery-odds-work">lottery odds guide</Link> for how that
          number is calculated.
        </p>
        <p>
          Both also draw twice a week, on <strong>Tuesdays and Fridays</strong>, at the same
          frequency.
        </p>

        <h2 id="jackpot-cap">Where they differ: the jackpot cap</h2>
        <p>
          This is the biggest practical difference between the two games. EuroMillions has a
          jackpot cap of <strong>€240 million</strong>, while EuroJackpot caps at{" "}
          <strong>€120 million</strong> — half as much. Once either lottery's jackpot reaches its
          cap, any further rollovers get distributed to the next prize tier down instead of growing
          the top prize further, which is why EuroMillions has produced some of Europe's largest-ever
          lottery jackpots.
        </p>

        <h2 id="countries">Where they differ: participating countries</h2>
        <p>
          EuroMillions is sold in a smaller group of Western European countries, primarily the UK,
          France, Spain, Portugal, Ireland, Belgium, Luxembourg, Switzerland, and Austria.
          EuroJackpot has a much wider footprint across Europe, sold in 19 countries including
          Germany, Italy, Spain, the Netherlands, the Nordic countries (Denmark, Finland, Norway,
          Sweden), and much of Central and Eastern Europe (Poland, Czechia, Slovakia, Hungary,
          Croatia, Slovenia, Estonia, Latvia, Lithuania), plus Iceland and Greece.
        </p>
        <p>
          In practice, this means if you live in Germany, Poland, or one of the Nordic countries,
          EuroJackpot is usually the pan-European option available to you, while EuroMillions is
          more commonly sold in Western Europe.
        </p>

        <h2 id="which-to-play">So which one should you play?</h2>
        <p>
          Since the odds are identical, this comes down to personal preference rather than a
          mathematical edge: EuroMillions if you want exposure to potentially larger jackpots (up to
          €240M) and it's available where you are, or EuroJackpot if it's the pan-European option
          sold in your country, or if you simply prefer its numbers and draw presentation. Neither
          choice changes your odds of winning.
        </p>

        <h2>Explore both games' real history</h2>
        <ul>
          <li>
            <Link href="/lottery/euromillions">EuroMillions results, statistics &amp; jackpot history</Link>
          </li>
          <li>
            <Link href="/lottery/eurojackpot">EuroJackpot results, statistics &amp; jackpot history</Link>
          </li>
        </ul>
      </LegalPage>
    </PageShell>
  );
}
