import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import LegalPage from "@/components/LegalPage";
import { SITE_URL } from "@/lib/lotteryPage";

const TITLE = "What Does 'Rollover' Mean in the Lottery?";
const DESCRIPTION =
  "A clear explanation of what a lottery jackpot rollover is, why it happens, and how to see the real rollover history for EuroMillions, EuroJackpot, Powerball, and more.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/guides/what-is-a-lottery-rollover` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a lottery rollover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A rollover happens when nobody matches all the numbers needed to win a lottery's jackpot in a given draw. Instead of the jackpot money being paid out, it rolls over — gets added to the jackpot for the next draw — which is why jackpots can grow from a minimum starting amount into hundreds of millions over consecutive draws.",
      },
    },
    {
      "@type": "Question",
      name: "Does a long rollover streak make a jackpot more likely to be won?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Each draw is an independent random event with the same fixed odds regardless of how many times the jackpot has rolled over before it. A jackpot isn't 'due' to be won after a long streak — it's simply grown larger because it hasn't been won yet, and more people tend to buy tickets as the advertised jackpot gets bigger, which is a separate effect from the odds themselves.",
      },
    },
    {
      "@type": "Question",
      name: "Why do some lotteries have jackpot caps?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Some lotteries, like EuroJackpot (€120 million) and EuroMillions (€240 million), cap how large the jackpot can grow. Once a jackpot reaches its cap, further rollovers get distributed to the next prize tier down instead of continuing to grow the top prize.",
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
          "Rollover" is one of the most common words in lottery news, but it's often used without
          explanation. Here's exactly what it means, why it happens, and how to see the real
          rollover history behind any lottery's current jackpot.
        </p>

        <h2 id="what-it-means">What "rollover" actually means</h2>
        <p>
          Every lottery draw allocates a certain amount of money to its jackpot prize tier — the
          prize for matching every required number. If nobody's ticket matches, that money doesn't
          disappear: it "rolls over" and gets added to the jackpot pool for the next draw. This
          repeats, draw after draw, until someone finally wins, which is why you'll sometimes see a
          jackpot climb from a minimum starting amount (often €2 million to €20 million depending on
          the game) to well over €100 million after enough consecutive rollovers.
        </p>

        <h2 id="why-it-happens">Why rollovers happen at all</h2>
        <p>
          Jackpot odds are genuinely long — anywhere from roughly 1 in 10 million to 1 in nearly 300
          million depending on the lottery (see our{" "}
          <Link href="/guides/how-lottery-odds-work">full odds breakdown</Link>). With odds that
          long, it's entirely normal — expected, even — for a jackpot to go unwon for several draws
          in a row before someone matches every number. A rollover isn't unusual; not rolling over
          for very long would be the surprising outcome.
        </p>

        <h2 id="myth">The myth worth clearing up</h2>
        <p>
          A long rollover streak does not mean a jackpot is "due" to be won soon. Each draw is a
          completely independent random event — the draw machine has no memory of how many times the
          jackpot has rolled over before it. The odds of winning the next draw are exactly the same
          whether it's the 1st draw of a new jackpot cycle or the 30th consecutive rollover. What
          does change is how many other people are playing: bigger advertised jackpots attract more
          ticket sales, which affects how a jackpot might eventually be split among multiple
          winners, but not the odds of winning it in the first place.
        </p>

        <h2 id="caps">When rollovers hit a ceiling</h2>
        <p>
          Some lotteries cap how high a jackpot can climb. EuroJackpot caps at €120 million and
          EuroMillions at €240 million; once a jackpot reaches that ceiling, further rollovers get
          redirected to the next prize tier down (often shared among many more winners) instead of
          growing the top prize further. Powerball and Mega Millions, by contrast, have no formal
          cap, which is part of why they've produced some of the largest jackpots in lottery
          history.
        </p>

        <h2 id="see-the-history">See real rollover history, not just the current streak</h2>
        <p>
          Most lottery sites only show you today's jackpot number. LottoScopeX goes further: every
          past draw shows whether the jackpot was actually won or rolled over that day, and — when a
          jackpot rolls over multiple times in a row — exactly how long that streak has run, right
          on the same colorful ball display as the latest draw. Browse any lottery's page and scroll
          through its history to see this in practice:
        </p>
        <ul>
          <li>
            <Link href="/lottery/euromillions">EuroMillions jackpot &amp; rollover history</Link>
          </li>
          <li>
            <Link href="/lottery/eurojackpot">EuroJackpot jackpot &amp; rollover history</Link>
          </li>
          <li>
            <Link href="/lottery/powerball">Powerball jackpot &amp; rollover history</Link>
          </li>
          <li>
            <Link href="/lottery/megamillions">Mega Millions jackpot &amp; rollover history</Link>
          </li>
        </ul>
      </LegalPage>
    </PageShell>
  );
}
