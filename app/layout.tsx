import type { Metadata } from "next";
import "./globals.css";
import { ADSENSE_CLIENT_ID } from "@/lib/ads";

const SITE_URL = "https://lottoscopex.com";
const SITE_TITLE = "LottoScopeX — Lottery Analytics";
const SITE_DESCRIPTION =
  "Explore historical lottery data from EuroMillions, EuroJackpot, Lotto 6aus49, French Loto, Irish Lotto, Powerball and Mega Millions through simple, interactive statistics.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | LottoScopeX",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "lottery statistics",
    "lottery analytics",
    "EuroMillions statistics",
    "EuroJackpot statistics",
    "Lotto 6aus49 statistics",
    "French Loto statistics",
    "Irish Lotto statistics",
    "Powerball statistics",
    "Mega Millions statistics",
    "lottery number frequency",
    "hot and cold numbers",
  ],
  authors: [{ name: "LottoScopeX" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "LottoScopeX",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: SITE_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LottoScopeX",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "LottoScopeX",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {ADSENSE_CLIENT_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="font-body text-ink">{children}</body>
    </html>
  );
}
