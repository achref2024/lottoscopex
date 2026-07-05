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
          Have a question, spotted an error in the data, or want to share feedback? We'd like to
          hear from you.
        </p>
        <p>
          Email us at <a href="mailto:achrefsliti07@gmail.com">achrefsliti07@gmail.com</a> and
          we'll get back to you as soon as we can.
        </p>
        <p>
          For questions about how your data is handled, see our{" "}
          <a href="/privacy">Privacy Policy</a>.
        </p>
      </LegalPage>
    </PageShell>
  );
}
