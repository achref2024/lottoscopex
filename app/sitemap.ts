import type { MetadataRoute } from "next";
import { LOTTERIES } from "@/lib/lotteries";
import { getDraws } from "@/lib/data";
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

  const generatorPages: MetadataRoute.Sitemap = LANGUAGES.map((l) => ({
    url: `${SITE_URL}${localePath(l.code, "/generator")}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const analyzerPages: MetadataRoute.Sitemap = LANGUAGES.map((l) => ({
    url: `${SITE_URL}${localePath(l.code, "/analyzer")}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const legalPages: MetadataRoute.Sitemap = ["/about", "/privacy", "/terms", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  const methodologyPage: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/methodology`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    },
  ];

  const guidePages: MetadataRoute.Sitemap = [
    "/guides",
    "/guides/how-lottery-odds-work",
    "/guides/hot-and-cold-numbers",
    "/guides/what-is-a-lottery-rollover",
    "/guides/euromillions-vs-eurojackpot",
    "/guides/how-to-play-euromillions",
    "/guides/how-to-play-eurojackpot",
    "/guides/how-to-play-lotto-6aus49",
    "/guides/how-to-play-french-loto",
    "/guides/how-to-play-irish-lotto",
    "/guides/how-to-play-powerball",
    "/guides/how-to-play-mega-millions",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const drawResultPages: MetadataRoute.Sitemap = LOTTERIES.flatMap((lottery) =>
    getDraws(lottery.id).map((draw) => ({
      url: `${SITE_URL}/lottery/${lottery.id}/results/${draw.date}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    }))
  );

  return [
    ...homePages,
    ...lotteryPages,
    ...generatorPages,
    ...analyzerPages,
    ...legalPages,
    ...methodologyPage,
    ...guidePages,
    ...drawResultPages,
  ];
}
