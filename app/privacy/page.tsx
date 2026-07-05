import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import LegalPage from "@/components/LegalPage";
import { SITE_URL } from "@/lib/lotteryPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How LottoScopeX collects, uses, and protects information when you visit lottoscopex.com.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function Page() {
  return (
    <PageShell lang="en">
      <LegalPage title="Privacy Policy" updated="July 2026">
        <p>
          This policy explains what information LottoScopeX ("we", "us") collects when you visit
          lottoscopex.com, and how it's used. We built this site to be as simple and
          privacy-respecting as possible: there are no accounts, no logins, and no personal
          information required to use any feature.
        </p>

        <h2>Information we collect</h2>
        <p>
          We do not ask you to create an account or submit personal information to browse the
          site or view any statistics. If you contact us directly by email, we'll have whatever
          information you choose to include in that message (such as your email address).
        </p>
        <p>
          Our hosting provider (Netlify) and, where enabled, advertising and analytics services
          may automatically collect standard technical information — such as IP address, browser
          type, device type, and pages visited — for security, performance, and analytics
          purposes.
        </p>

        <h2>Cookies and advertising</h2>
        <p>
          LottoScopeX may display advertising through Google AdSense. Google and its advertising
          partners may use cookies to serve ads based on your prior visits to this or other
          websites. You can learn more about how Google uses this data, and opt out of
          personalized advertising, at{" "}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
            Google's Partner Sites policy
          </a>{" "}
          and{" "}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>
          .
        </p>

        <h2>Third-party services</h2>
        <p>
          We rely on a small number of third-party services to run this site: Netlify for hosting
          and Google AdSense for advertising (when enabled). Each of these providers has its own
          privacy policy governing how it handles data.
        </p>

        <h2>Your rights</h2>
        <p>
          If you're located in the EU, EEA, or UK, you have the right to request access to,
          correction of, or deletion of any personal data you've provided to us (for example, via
          email), and the right to lodge a complaint with your local data protection authority.
        </p>

        <h2>Children's privacy</h2>
        <p>
          LottoScopeX is not directed at children, and we do not knowingly collect personal
          information from anyone under 16.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. The "last updated" date above reflects the
          most recent change.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy? Reach us via our <a href="/contact">Contact page</a>.
        </p>
      </LegalPage>
    </PageShell>
  );
}
