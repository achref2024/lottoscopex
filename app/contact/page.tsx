import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import LegalPage from "@/components/LegalPage";
import { SITE_URL } from "@/lib/lotteryPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the LottoScopeX team — questions, data corrections, and feedback.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function Page() {
  return (
    <PageShell lang="en">
      <LegalPage title="Contact">
        <p>
          LottoScopeX is an independently run project. We don't have a public contact channel set
          up just yet, but we're working on it — check back soon.
        </p>
        <p>
          In the meantime, you can find out how your data is handled in our{" "}
          <a href="/privacy">Privacy Policy</a>.
        </p>
      </LegalPage>
    </PageShell>
  );
}
