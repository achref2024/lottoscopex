import type { MetadataRoute } from "next";

const SITE_URL = "https://lottoscopex.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        // AdSense's own crawler: keep it off the thousands of templated
        // per-draw result pages so its site-quality review isn't dominated
        // by thin/templated content. These pages stay fully indexed for
        // regular search (Googlebot is unaffected by this rule).
        userAgent: "Mediapartners-Google",
        disallow: "/lottery/*/results/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
