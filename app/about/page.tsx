import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import LegalPage from "@/components/LegalPage";
import { SITE_URL } from "@/lib/lotteryPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "LottoScopeX is an independent lottery statistics platform covering major European and US lotteries — built to help you explore real historical draw data, not predict winning numbers.",
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function Page() {
  return (
    <PageShell lang="en">
      <LegalPage title="About LottoScopeX">
        <p>
          LottoScopeX is an independent lottery statistics and analytics platform. We cover the
          biggest lotteries across Europe — EuroMillions, EuroJackpot, Lotto 6aus49, French Loto,
          and Irish Lotto — plus Powerball and Mega Millions in the United States, with more
          added over time.
        </p>

        <h2>What we do</h2>
        <p>
          Our goal is to help people explore historical lottery data through clear, visual
          statistics: number frequency, hot and cold numbers, range analysis, and plain-language
          probability patterns based on the last 100 draws. Every chart and figure on this site is
          computed directly from real, published draw results — nothing is fabricated or
          simulated.
        </p>

        <h2>What we don't do</h2>
        <p>
          LottoScopeX does not predict winning numbers, sell lottery tickets, or claim to improve
          anyone's odds of winning. Lottery draws are random, and no statistic — however
          interesting — changes that. The site exists purely for informational and entertainment
          purposes.
        </p>

        <h2>Independence</h2>
        <p>
          LottoScopeX is not affiliated with, endorsed by, or operated by EuroMillions,
          EuroJackpot, Deutsche Lotto- und Totoblock, Française des Jeux, the National Lottery
          (Ireland), the Multi-State Lottery Association, or any other lottery operator. All
          lottery names and trademarks belong to their respective owners and are used here only
          to describe the games our statistics cover.
        </p>

        <h2>Get in touch</h2>
        <p>
          Spotted an error in the data, or have a question or suggestion? Visit our{" "}
          <a href="/contact">Contact page</a>.
        </p>
      </LegalPage>
    </PageShell>
  );
}
