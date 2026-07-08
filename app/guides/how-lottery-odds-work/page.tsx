import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import LegalPage from "@/components/LegalPage";
import { SITE_URL } from "@/lib/lotteryPage";

const TITLE = "How Lottery Odds Actually Work (With Real Numbers)";
const DESCRIPTION =
  "A plain-language explanation of how lottery jackpot odds are calculated, with real, computed odds for EuroMillions, EuroJackpot, Lotto 6aus49, French Loto, Irish Lotto, Powerball, and Mega Millions.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/guides/how-lottery-odds-work` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How are lottery jackpot odds calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Jackpot odds come from counting every possible combination of numbers a draw machine could produce, using combinatorics (the mathematics of counting combinations). For a game where you pick 5 numbers from 50, there are exactly 2,118,760 possible 5-number combinations. Add a second draw for bonus numbers — like 2 Lucky Stars from 12 — and you multiply the two combination counts together to get the true jackpot odds.",
      },
    },
    {
      "@type": "Question",
      name: "Which lottery has the best jackpot odds?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Among the games LottoScopeX covers, Irish Lotto has the best jackpot odds at 1 in 10,737,573, followed by French Loto at 1 in 19,068,840. EuroMillions, EuroJackpot, and Lotto 6aus49 share odds of 1 in 139,838,160. Powerball and Mega Millions have the longest odds, both above 1 in 290 million, which is why their jackpots tend to grow the largest.",
      },
    },
    {
      "@type": "Question",
      name: "Do past results change future lottery odds?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Every lottery draw is an independent random event. The odds calculated here are fixed by the game's rules (how many numbers you pick, from how large a pool) and never change based on what's been drawn before, how long a jackpot has rolled over, or any other historical pattern.",
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
          Every lottery advertises a jackpot, but the odds of winning it vary enormously from game
          to game — often by a factor of 20 or more. Here's exactly how those odds are worked out,
          and the real, calculated numbers for every lottery on LottoScopeX.
        </p>

        <h2 id="the-math">The math in plain language</h2>
        <p>
          Lottery odds come from combinatorics — counting how many different ways you can choose a
          set of numbers from a larger pool, where the order you pick them doesn't matter. If a
          game asks you to pick 5 numbers from 50, there are exactly 2,118,760 different 5-number
          combinations possible. Only one of them will be drawn, so your odds of matching all 5 with
          a single ticket are 1 in 2,118,760 — before even considering any bonus numbers.
        </p>
        <p>
          Most big lotteries add a second, independent draw for one or more bonus numbers (Lucky
          Stars, a Powerball, a Superzahl, and so on). Because that draw is separate from the main
          numbers, you multiply the two combination counts together to get the true jackpot odds.
          That's why adding just one more bonus number, or a slightly larger bonus pool, can change
          the odds by tens of millions.
        </p>

        <h2 id="odds-table">Real jackpot odds, lottery by lottery</h2>
        <p>
          These are computed directly from each game's actual rules (numbers picked, pool size, and
          bonus draw) — not estimates or rounded marketing figures.
        </p>
        <table className="w-full border-collapse text-left text-sm sm:text-base">
          <thead>
            <tr className="border-b border-felt-700">
              <th className="py-2 pr-4 font-display text-white">Lottery</th>
              <th className="py-2 pr-4 font-display text-white">How you win the jackpot</th>
              <th className="py-2 font-display text-white">Odds</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-felt-800">
              <td className="py-2 pr-4">Irish Lotto</td>
              <td className="py-2 pr-4">6 numbers from 47</td>
              <td className="py-2">1 in 10,737,573</td>
            </tr>
            <tr className="border-b border-felt-800">
              <td className="py-2 pr-4">French Loto</td>
              <td className="py-2 pr-4">5 numbers from 49 + 1 Numéro Chance from 10</td>
              <td className="py-2">1 in 19,068,840</td>
            </tr>
            <tr className="border-b border-felt-800">
              <td className="py-2 pr-4">EuroMillions</td>
              <td className="py-2 pr-4">5 numbers from 50 + 2 Lucky Stars from 12</td>
              <td className="py-2">1 in 139,838,160</td>
            </tr>
            <tr className="border-b border-felt-800">
              <td className="py-2 pr-4">EuroJackpot</td>
              <td className="py-2 pr-4">5 numbers from 50 + 2 Euro Numbers from 12</td>
              <td className="py-2">1 in 139,838,160</td>
            </tr>
            <tr className="border-b border-felt-800">
              <td className="py-2 pr-4">Lotto 6aus49</td>
              <td className="py-2 pr-4">6 numbers from 49 + 1 Superzahl from 10</td>
              <td className="py-2">1 in 139,838,160</td>
            </tr>
            <tr className="border-b border-felt-800">
              <td className="py-2 pr-4">Mega Millions</td>
              <td className="py-2 pr-4">5 numbers from 70 + 1 Mega Ball from 24</td>
              <td className="py-2">1 in 290,472,336</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">Powerball</td>
              <td className="py-2 pr-4">5 numbers from 69 + 1 Powerball from 26</td>
              <td className="py-2">1 in 292,201,338</td>
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-mist-500">
          Note: for Irish Lotto specifically, the Bonus Ball only affects a lower prize tier — the
          jackpot itself only requires matching the 6 main numbers, which is why its odds look more
          favorable than a simple 6-from-47 comparison to other games might suggest.
        </p>

        <h2 id="why-it-matters">Why the gap between games is so large</h2>
        <p>
          Notice that EuroMillions, EuroJackpot, and Lotto 6aus49 all land on exactly the same odds:
          1 in 139,838,160. That's not a coincidence — all three ask you to pick from a pool of
          roughly the same size for both the main numbers and the bonus draw, even though the games
          look different on the surface. Powerball and Mega Millions, by contrast, use larger main
          number pools (69 and 70 respectively), which is a large part of why their jackpots tend to
          climb the highest before someone wins.
        </p>

        <h2>What this doesn't mean</h2>
        <p>
          Longer odds don't make a game "better" or "worse" — they're simply the trade-off between
          how often a jackpot gets won and how large it grows in the meantime. And critically, none
          of these odds are affected by anything in a lottery's history: not a long rollover streak,
          not which numbers have been "hot" or "cold," and not how long it's been since a jackpot was
          won. Every draw starts from the same fixed odds shown above.
        </p>
        <p>
          To see how often each of these lotteries has actually rolled over recently, or which
          numbers have come up most in the last 100 draws, browse any lottery's page on LottoScopeX —
          every figure there is computed the same honest way as the odds on this page.
        </p>
      </LegalPage>
    </PageShell>
  );
}
