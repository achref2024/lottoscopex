import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import LegalPage from "@/components/LegalPage";
import { SITE_URL } from "@/lib/lotteryPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that govern your use of lottoscopex.com.",
  alternates: { canonical: `${SITE_URL}/terms` },
};

export default function Page() {
  return (
    <PageShell lang="en">
      <LegalPage title="Terms of Use" updated="July 2026">
        <p>
          By using lottoscopex.com, you agree to these terms. If you don't agree with any part of
          them, please don't use the site.
        </p>

        <h2>What LottoScopeX is</h2>
        <p>
          LottoScopeX is a statistics and analytics website covering historical results for
          several major lotteries. We are not a lottery operator, we do not sell tickets, and we
          are not affiliated with any lottery organization.
        </p>

        <h2>No predictions, no guarantees</h2>
        <p>
          Lottery draws are random. Nothing on this site — including frequency charts, hot and
          cold numbers, range analysis, or probability patterns — predicts, influences, or
          guarantees any future draw outcome, and using this site does not improve anyone's odds
          of winning. All statistics describe what has already happened, not what will happen
          next.
        </p>

        <h2>Age</h2>
        <p>
          This site is intended for adults. Given its subject matter, it is not intended for use
          by anyone under 18, or under the legal gambling age in their jurisdiction, whichever is
          higher.
        </p>

        <h2>Accuracy of information</h2>
        <p>
          We take care to keep draw data and statistics accurate and up to date, sourced from
          official published results. However, we don't guarantee completeness or accuracy, and
          you should always verify official results directly with the relevant lottery operator
          before relying on them for any purpose.
        </p>

        <h2>Intellectual property</h2>
        <p>
          The design, code, and original written content of LottoScopeX belong to us. Lottery
          names and any related trademarks belong to their respective owners and are used here
          only to describe the games our statistics cover.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          LottoScopeX is provided "as is," without warranties of any kind. To the fullest extent
          permitted by law, we are not liable for any loss or damage arising from your use of, or
          reliance on, this site.
        </p>

        <h2>Advertising and third-party links</h2>
        <p>
          The site may display third-party advertising. We are not responsible for the content of
          advertisements or of any external site they link to.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the site after a change
          means you accept the updated terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms? Reach us via our <a href="/contact">Contact page</a>.
        </p>
      </LegalPage>
    </PageShell>
  );
}
