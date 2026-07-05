import type { MetadataRoute } from "next";
import { LOTTERIES } from "@/lib/lotteries";
import { LANGUAGES, localePath } from "@/lib/i18n";

const SITE_URL = "https://lottoscopex.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const homePages: MetadataRoute.Sitemap = LANGUAGES.map((l) => ({
    url: `${SITE_URL}${localePath(l.code, "/")}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 1,
  }));

  const lotteryPages: MetadataRoute.Sitemap = LOTTERIES.flatMap((lottery) =>
    LANGUAGES.map((l) => ({
      url: `${SITE_URL}${localePath(l.code, `/lottery/${lottery.id}`)}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.8,
    }))
  );

  return [...homePages, ...lotteryPages];
}
