"use client";

import Link from "next/link";
import { LotteryConfig, Draw } from "@/lib/types";
import { FrequencyEntry, RangeStat, RangeProbability, TrendEntry } from "@/lib/analytics";
import DrawCard from "@/components/DrawCard";
import FrequencyChart from "@/components/FrequencyChart";
import HotColdPanel from "@/components/HotColdPanel";
import RangeAnalysis from "@/components/RangeAnalysis";
import ProbabilityPanel from "@/components/ProbabilityPanel";
import HistoryTable from "@/components/HistoryTable";
import CompareView from "@/components/CompareView";
import Tabs, { TabSection } from "@/components/Tabs";
import AdSlot from "@/components/AdSlot";
import LotteryBadge from "@/components/LotteryBadge";
import NextDrawCountdown from "@/components/NextDrawCountdown";
import { useLang } from "@/components/LanguageProvider";
import { formatDate, formatMoney, getNextDrawISO, getNextDrawTargetMs } from "@/lib/format";
import { flagEmoji } from "@/lib/flags";
import { NEXT_JACKPOT_AS_OF } from "@/lib/lotteries";
import { hasResultPage } from "@/lib/data";

const HOW_TO_PLAY_SLUGS: Record<string, string> = {
  euromillions: "how-to-play-euromillions",
  eurojackpot: "how-to-play-eurojackpot",
  lotto6aus49: "how-to-play-lotto-6aus49",
  "loto-france": "how-to-play-french-loto",
  "irish-lotto": "how-to-play-irish-lotto",
  powerball: "how-to-play-powerball",
  megamillions: "how-to-play-mega-millions",
  superenalotto: "how-to-play-superenalotto",
  "uk-lotto": "how-to-play-uk-lotto",
};

const ICONS = {
  latest: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  history: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M4 5h16M4 12h16M4 19h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  frequency: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M5 19V10M12 19V5M19 19v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  hotcold: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M12 2c1 3-3 4-3 7.5a3 3 0 006 0c1.2 1 2 2.6 2 4.3A5.8 5.8 0 0112 19.6a5.8 5.8 0 01-5-8.9C8.2 8.4 10.5 6.6 12 2z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  ranges: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="10" width="4" height="10" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="10" y="6" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="17" y="3" width="4" height="17" rx="1" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  probability: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9-6.3 3.9 1.7-7L2 9.2l7.1-.6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
  compare: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M8 3v14M8 17l-4-4M8 17l4-4M16 21V7M16 7l-4 4M16 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function LotteryPageClient({
  config,
  draws,
  frequency,
  hot,
  cold,
  ranges,
  probability,
  trends,
  last100Length,
}: {
  config: LotteryConfig;
  draws: Draw[];
  frequency: FrequencyEntry[];
  hot: FrequencyEntry[];
  cold: FrequencyEntry[];
  ranges: RangeStat[];
  probability: RangeProbability[];
  trends: TrendEntry[];
  last100Length: number;
}) {
  const { t, locale, dict, lang } = useLang();
  const latest = draws[0];
  const recentDraws = draws.slice(1, 4);
  const info = dict.lotteries[config.id];
  const nextDraw = getNextDrawISO(config.drawDays, new Date(), latest.date);
  const nextDrawTargetMs = getNextDrawTargetMs(
    config.drawDays,
    config.drawTimes,
    config.drawTimeZone,
    latest.date
  );

  const sections: TabSection[] = [
    {
      id: "latest",
      label: t("tabs.latest"),
      icon: ICONS.latest,
      content: (
        <div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <DrawCard draw={latest} config={config} highlight />
              {lang === "en" && hasResultPage(config.id, latest.date) && (
                <Link
                  href={`/lottery/${config.id}/results/${latest.date}`}
                  className="mt-3 inline-block text-sm font-semibold text-gold hover:text-gold-light"
                >
                  View full result breakdown →
                </Link>
              )}
            </div>
          <div className="rounded-2xl border border-felt-800 bg-felt-900 p-6">
            <h2 className="mb-4 font-display text-lg font-bold text-white">
              {t("glance.heading")}
            </h2>

            <div className="mb-5 rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gold-light">
                {t("glance.typicalJackpot")}
              </p>
              <p className="mt-0.5 text-4xl font-extrabold tracking-tight text-gold">
                {formatMoney(config.nextJackpot, config.currency)}
              </p>
              <p className="mt-1 text-[11px] font-normal text-mist-500">
                {t("glance.jackpotAsOf", { date: formatDate(NEXT_JACKPOT_AS_OF, locale) })}
              </p>
            </div>

            <div className="mb-5 rounded-xl border border-felt-700 bg-felt-800/40 px-4 py-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-mist-500">
                  {t("glance.nextDraw")}
                </p>
                <p className="text-xs font-semibold text-gold">{formatDate(nextDraw, locale)}</p>
              </div>
              <NextDrawCountdown
                targetMs={nextDrawTargetMs}
                labels={{
                  days: t("glance.countdownDays"),
                  hours: t("glance.countdownHours"),
                  minutes: t("glance.countdownMinutes"),
                  seconds: t("glance.countdownSeconds"),
                }}
              />
            </div>

            <dl className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-felt-800 pb-3">
                <dt className="text-mist-500">{t("glance.numbersDrawn")}</dt>
                <dd className="font-semibold text-white">
                  {t("glance.numbersDrawnValue", {
                    count: config.main.count,
                    min: config.main.min,
                    max: config.main.max,
                  })}
                </dd>
              </div>
              {config.bonus && (
                <div className="flex justify-between border-b border-felt-800 pb-3">
                  <dt className="text-mist-500">{config.bonus.label}</dt>
                  <dd className="font-semibold text-white">
                    {t("glance.numbersDrawnValue", {
                      count: config.bonus.count,
                      min: config.bonus.min,
                      max: config.bonus.max,
                    })}
                  </dd>
                </div>
              )}
              <div className="flex justify-between border-b border-felt-800 pb-3">
                <dt className="text-mist-500">{t("glance.drawsTracked")}</dt>
                <dd className="font-semibold text-white">{draws.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-mist-500">{t("glance.oldestDraw")}</dt>
                <dd className="font-semibold text-white">
                  {draws[draws.length - 1] ? formatDate(draws[draws.length - 1].date, locale) : ""}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {recentDraws.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4 font-display text-lg font-bold text-white">
              {t("recentDraws.heading")}
            </h2>
            <div className="grid gap-4">
              {recentDraws.map((draw) =>
                lang === "en" && hasResultPage(config.id, draw.date) ? (
                  <Link
                    key={draw.id}
                    href={`/lottery/${config.id}/results/${draw.date}`}
                    className="block rounded-2xl transition-transform hover:scale-[1.02]"
                  >
                    <DrawCard draw={draw} config={config} size="sm" animate={false} />
                  </Link>
                ) : (
                  <DrawCard key={draw.id} draw={draw} config={config} size="sm" animate={false} />
                )
              )}
            </div>
          </div>
        )}
        </div>
      ),
    },
    {
      id: "history",
      label: t("tabs.history"),
      icon: ICONS.history,
      content: <HistoryTable draws={draws} config={config} />,
    },
    {
      id: "frequency",
      label: t("tabs.frequency"),
      icon: ICONS.frequency,
      content: (
        <div className="rounded-2xl border border-felt-800 bg-felt-900 p-6">
          <h2 className="mb-1 font-display text-lg font-bold text-white">
            {t("frequencyPanel.heading")}
          </h2>
          <p className="mb-6 text-sm text-mist-500">
            {t("frequencyPanel.subheading", { n: last100Length })}
          </p>
          <FrequencyChart data={frequency} />
        </div>
      ),
    },
    {
      id: "hotcold",
      label: t("tabs.hotCold"),
      icon: ICONS.hotcold,
      content: <HotColdPanel hot={hot} cold={cold} lotteryId={config.id} />,
    },
    {
      id: "ranges",
      label: t("tabs.ranges"),
      icon: ICONS.ranges,
      content: <RangeAnalysis stats={ranges} />,
    },
    {
      id: "probability",
      label: t("tabs.probability"),
      icon: ICONS.probability,
      content: <ProbabilityPanel data={probability} />,
    },
    {
      id: "compare",
      label: t("tabs.compare"),
      icon: ICONS.compare,
      content: <CompareView trends={trends} lotteryId={config.id} />,
    },
  ];

  return (
    <div>
      <section className="border-b border-felt-800 bg-felt-950 px-5 pb-10 pt-10 sm:px-8 sm:pt-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <LotteryBadge id={config.id} size={88} />
            <div>
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-mist-500">
                <span aria-hidden="true">{flagEmoji(config.flag)}</span>
                {info?.country ?? config.country}
              </p>
              <h1
                className="font-fun text-3xl font-bold tracking-wide sm:text-4xl"
                style={{ color: config.accent }}
              >
                {config.name}
              </h1>
              <p className="mt-3 max-w-2xl text-mist-500">{info?.tagline ?? config.tagline}</p>
              {lang === "en" && HOW_TO_PLAY_SLUGS[config.id] && (
                <Link
                  href={`/guides/${HOW_TO_PLAY_SLUGS[config.id]}`}
                  className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-gold hover:text-gold-light"
                >
                  How to play &amp; who can enter →
                </Link>
              )}
            </div>
          </div>
          <div className="w-full lg:w-[336px] lg:shrink-0">
            <AdSlot slot="0000000002" minHeight={90} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <Tabs sections={sections} />
      </section>
    </div>
  );
}
