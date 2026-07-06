import type { Metadata } from "next";
import { getLottery, NEXT_JACKPOT_AS_OF } from "@/lib/lotteries";
import { getDraws } from "@/lib/data";
import {
  computeFrequency,
  getHotCold,
  rangeDistribution,
  computeRangeProbabilities,
  compareRecentVsHistorical,
} from "@/lib/analytics";
import { Lang, DICTIONARIES, interpolate, localePath } from "@/lib/i18n";
import { formatMoney } from "@/lib/format";

export const SITE_URL = "https://lottoscopex.com";

const OG_LOCALE: Record<Lang, string> = { en: "en_GB", fr: "fr_FR", de: "de_DE" };

/** All computed data a lottery detail page needs, shared across every language variant. */
export function getLotteryPageData(id: string) {
  const config = getLottery(id);
  if (!config) return null;

  const draws = getDraws(config.id); // newest-first
  const last100 = draws.slice(0, 100);

  const frequency = computeFrequency(last100, config.main.min, config.main.max);
  const { hot, cold } = getHotCold(frequency);
  const ranges = rangeDistribution(last100, config);
  const probability = computeRangeProbabilities(draws, config);
  const trends = compareRecentVsHistorical(draws, config);

  return { config, draws, last100, frequency, hot, cold, ranges, probability, trends };
}

export function buildLotteryMetadata(lang: Lang, id: string): Metadata {
  const config = getLottery(id);
  if (!config) return {};
  const dict = DICTIONARIES[lang];
  const info = dict.lotteries[config.id];
  const draws = getDraws(config.id);

  const title = interpolate(dict.seo.lotteryTitle, { name: config.name });
  const description = interpolate(dict.seo.lotteryDescription, {
    name: config.name,
    count: draws.length,
    country: info?.country ?? config.country,
  });

  const path = `/lottery/${config.id}`;
  const canonical = `${SITE_URL}${localePath(lang, path)}`;
  const languages: Record<string, string> = {
    en: `${SITE_URL}${localePath("en", path)}`,
    fr: `${SITE_URL}${localePath("fr", path)}`,
    de: `${SITE_URL}${localePath("de", path)}`,
    "x-default": `${SITE_URL}${localePath("en", path)}`,
  };

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: OG_LOCALE[lang],
      alternateLocale: (["en", "fr", "de"] as Lang[]).filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
    },
    twitter: { title, description },
  };
}

export function buildHomeMetadata(lang: Lang): Metadata {
  const dict = DICTIONARIES[lang];
  const title = dict.seo.homeTitle;
  const description = dict.seo.homeDescription;

  const canonical = `${SITE_URL}${localePath(lang, "/")}`;
  const languages: Record<string, string> = {
    en: `${SITE_URL}${localePath("en", "/")}`,
    fr: `${SITE_URL}${localePath("fr", "/")}`,
    de: `${SITE_URL}${localePath("de", "/")}`,
    "x-default": `${SITE_URL}${localePath("en", "/")}`,
  };

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: OG_LOCALE[lang],
      alternateLocale: (["en", "fr", "de"] as Lang[]).filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
    },
    twitter: { title, description },
  };
}

export function buildGeneratorMetadata(lang: Lang): Metadata {
  const dict = DICTIONARIES[lang];
  const title = dict.generator.heading;
  const description = dict.generator.subheading;

  const canonical = `${SITE_URL}${localePath(lang, "/generator")}`;
  const languages: Record<string, string> = {
    en: `${SITE_URL}${localePath("en", "/generator")}`,
    fr: `${SITE_URL}${localePath("fr", "/generator")}`,
    de: `${SITE_URL}${localePath("de", "/generator")}`,
    "x-default": `${SITE_URL}${localePath("en", "/generator")}`,
  };

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: OG_LOCALE[lang],
      alternateLocale: (["en", "fr", "de"] as Lang[]).filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
    },
    twitter: { title, description },
  };
}

export function buildAnalyzerMetadata(lang: Lang): Metadata {
  const dict = DICTIONARIES[lang];
  const title = dict.analyzer.heading;
  const description = dict.analyzer.subheading;

  const canonical = `${SITE_URL}${localePath(lang, "/analyzer")}`;
  const languages: Record<string, string> = {
    en: `${SITE_URL}${localePath("en", "/analyzer")}`,
    fr: `${SITE_URL}${localePath("fr", "/analyzer")}`,
    de: `${SITE_URL}${localePath("de", "/analyzer")}`,
    "x-default": `${SITE_URL}${localePath("en", "/analyzer")}`,
  };

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: OG_LOCALE[lang],
      alternateLocale: (["en", "fr", "de"] as Lang[]).filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
    },
    twitter: { title, description },
  };
}

const BREADCRUMB_HOME_LABEL: Record<Lang, string> = {
  en: "Home",
  fr: "Accueil",
  de: "Startseite",
};

/** Generic schema.org BreadcrumbList builder — pass ordered {name, url} pairs. */
export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Breadcrumb for a lottery detail page: Home > {Lottery name}. */
export function buildLotteryBreadcrumbJsonLd(lang: Lang, id: string) {
  const config = getLottery(id);
  if (!config) return null;
  const homeUrl = `${SITE_URL}${localePath(lang, "/")}`;
  const lotteryUrl = `${SITE_URL}${localePath(lang, `/lottery/${id}`)}`;
  return buildBreadcrumbJsonLd([
    { name: BREADCRUMB_HOME_LABEL[lang], url: homeUrl },
    { name: config.name, url: lotteryUrl },
  ]);
}

/** Breadcrumb for a per-draw results page (English-only section): Home > Lottery > Date. */
export function buildResultsBreadcrumbJsonLd(id: string, lotteryName: string, dateLabel: string, date: string) {
  return buildBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: lotteryName, url: `${SITE_URL}/lottery/${id}` },
    { name: dateLabel, url: `${SITE_URL}/lottery/${id}/results/${date}` },
  ]);
}

/** Real, data-grounded Dataset + FAQPage JSON-LD for a lottery page, localized. */
export function buildLotteryJsonLd(
  lang: Lang,
  id: string,
  draws: ReturnType<typeof getDraws>,
  hot: { number: number; count: number; percent: number }[]
) {
  const config = getLottery(id);
  if (!config) return null;
  const dict = DICTIONARIES[lang];
  const info = dict.lotteries[config.id];

  const oldestDraw = draws[draws.length - 1]?.date ?? "";
  const latestDraw = draws[0]?.date ?? "";
  const topHot = hot.slice(0, 3).map((h) => h.number);
  const url = `${SITE_URL}${localePath(lang, `/lottery/${config.id}`)}`;

  const datasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${config.name} historical draw results`,
    description: interpolate(dict.seo.lotteryDescription, {
      name: config.name,
      count: draws.length,
      country: info?.country ?? config.country,
    }),
    url,
    temporalCoverage: oldestDraw && latestDraw ? `${oldestDraw}/${latestDraw}` : undefined,
    creator: { "@type": "Organization", name: "LottoScopeX", url: SITE_URL },
    variableMeasured: ["Winning numbers", "Draw date", "Number frequency", "Jackpot amount"],
    inLanguage: lang,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: interpolate(dict.faq.drawCountQuestion, { name: config.name }),
        acceptedAnswer: {
          "@type": "Answer",
          text: interpolate(dict.faq.drawCountAnswer, {
            name: config.name,
            count: draws.length,
            oldest: oldestDraw,
            latest: latestDraw,
          }),
        },
      },
      {
        "@type": "Question",
        name: interpolate(dict.faq.hotNumbersQuestion, { name: config.name }),
        acceptedAnswer: {
          "@type": "Answer",
          text:
            topHot.length > 0
              ? interpolate(dict.faq.hotNumbersAnswer, {
                  name: config.name,
                  n: Math.min(draws.length, 100),
                  numbers: topHot.join(", "),
                })
              : "",
        },
      },
      {
        "@type": "Question",
        name: interpolate(dict.faq.jackpotQuestion, { name: config.name }),
        acceptedAnswer: {
          "@type": "Answer",
          text: interpolate(dict.faq.jackpotAnswer, {
            name: config.name,
            amount: formatMoney(config.nextJackpot, config.currency),
            date: NEXT_JACKPOT_AS_OF,
          }),
        },
      },
    ],
  };

  return { datasetJsonLd, faqJsonLd };
}
