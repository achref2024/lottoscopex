import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import LegalPage from "@/components/LegalPage";
import { SITE_URL } from "@/lib/lotteryPage";

const TITLE = "What Are Hot and Cold Lottery Numbers?";
const DESCRIPTION =
  "A plain-language guide to what 'hot' and 'cold' lottery numbers actually mean, how they're calculated, and why they don't predict future draws.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/guides/hot-and-cold-numbers` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does it mean when a lottery number is 'hot'?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A hot number is simply one that has appeared more often than other numbers over a specific stretch of past draws, usually the last 100. It's a description of what already happened — nothing about a hot number makes it more likely to be drawn again.",
      },
    },
    {
      "@type": "Question",
      name: "What does it mean when a lottery number is 'cold'?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A cold number is one that has appeared less often than other numbers over the same period. Just like hot numbers, a cold number isn't 'due' to appear soon — each draw is an independent random event unaffected by past results.",
      },
    },
    {
      "@type": "Question",
      name: "Should I pick hot or cold numbers for my lottery ticket?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Neither choice changes your odds. Because lottery machines have no memory of past draws, every number has exactly the same probability of being drawn next regardless of how often it has appeared recently. Hot and cold numbers are worth exploring out of curiosity about a lottery's history, not as a strategy.",
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
          "Hot" and "cold" numbers are two of the most searched-for lottery terms, and also two of
          the most misunderstood. Here's exactly what they mean, how they're calculated, and — just
          as important — what they don't mean.
        </p>

        <h2 id="what-they-are">What hot and cold numbers actually are</h2>
        <p>
          Take any lottery's last 100 draws and count how many times each possible number came up.
          Some numbers will have appeared more often than others purely by chance — the same way
          flipping a coin 100 times won't land exactly 50 heads and 50 tails every time. The numbers
          at the top of that count are labeled "hot," and the numbers at the bottom are labeled
          "cold." That's the entire calculation: a frequency count, ranked.
        </p>

        <h2 id="why-they-vary">Why hot and cold numbers naturally shift over time</h2>
        <p>
          Because the list is based on a rolling window (the last 100 draws), it changes every time
          a new draw happens. A number that's been cold for months can suddenly become hot after a
          short run of good luck, and vice versa. This is completely normal statistical variation —
          it's what you'd expect from any genuinely random process, not a sign that something has
          "shifted" in the lottery itself.
        </p>

        <h2 id="does-it-predict">Does a number's history predict what comes next?</h2>
        <p>
          No — and this is the single most important thing to understand about hot and cold numbers.
          Lottery draws are independent events: the balls, machine, or random number generator used
          in each draw has no memory of previous draws. A number that has come up 20 times in the
          last 100 draws has exactly the same odds of being drawn next as a number that hasn't come
          up at all. This is sometimes called the "gambler's fallacy" — the mistaken belief that
          past results influence future independent events.
        </p>
        <p>
          So why look at hot and cold numbers at all? Because it's genuinely interesting history —
          the same way a sports fan enjoys stats about a team's past performance without believing
          those stats control the outcome of the next game. LottoScopeX shows this data for
          exploration, never as a prediction tool.
        </p>

        <h2 id="explore">Explore hot and cold numbers for real lotteries</h2>
        <p>
          Every lottery on LottoScopeX has a live hot &amp; cold panel, recalculated from the last
          100 actual draws:
        </p>
        <ul>
          <li>
            <Link href="/lottery/euromillions">EuroMillions hot &amp; cold numbers</Link>
          </li>
          <li>
            <Link href="/lottery/eurojackpot">EuroJackpot hot &amp; cold numbers</Link>
          </li>
          <li>
            <Link href="/lottery/lotto6aus49">Lotto 6aus49 hot &amp; cold numbers</Link>
          </li>
          <li>
            <Link href="/lottery/loto-france">French Loto hot &amp; cold numbers</Link>
          </li>
          <li>
            <Link href="/lottery/irish-lotto">Irish Lotto hot &amp; cold numbers</Link>
          </li>
          <li>
            <Link href="/lottery/powerball">Powerball hot &amp; cold numbers</Link>
          </li>
          <li>
            <Link href="/lottery/megamillions">Mega Millions hot &amp; cold numbers</Link>
          </li>
        </ul>
        <p>
          For the exact formula behind these rankings, see our{" "}
          <Link href="/methodology">methodology page</Link>.
        </p>
      </LegalPage>
    </PageShell>
  );
}
