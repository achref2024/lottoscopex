"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLang } from "./LanguageProvider";
import { getDraws } from "@/lib/data";
import { computeFrequency, computeRangeProbabilities, RangeProbability } from "@/lib/analytics";
import { LOTTERIES, getLottery } from "@/lib/lotteries";
import { localePath } from "@/lib/i18n";
import LotteryBadge from "./LotteryBadge";

const HOT_COLOR = "#D4AF37"; // gold — matches the Hot & Cold tab's hot icon
const COLD_COLOR = "#A8E0C4"; // mist green — matches the Hot & Cold tab's cold icon
const CONTAINER_HEIGHT = 200; // px

interface Bar {
  number: number;
  heightPx: number;
}

/** Real hot/cold numbers from the last 100 draws (top 10 hottest, bottom 10 coldest). */
function useHotColdBars(lotteryId: string) {
  return useMemo(() => {
    const config = getLottery(lotteryId);
    if (!config) return { hot: [] as Bar[], cold: [] as Bar[] };

    const draws = getDraws(config.id).slice(0, 100);
    const freq = computeFrequency(draws, config.main.min, config.main.max);
    const sorted = [...freq].sort((a, b) => b.count - a.count);

    const hotEntries = sorted.slice(0, 10);
    const coldEntries = [...sorted].reverse().slice(0, 10);
    const max = Math.max(...sorted.map((f) => f.percent), 1);

    const toBar = (f: (typeof sorted)[number]): Bar => ({
      number: f.number,
      heightPx: Math.round(24 + (f.percent / max) * (CONTAINER_HEIGHT - 24)),
    });

    return { hot: hotEntries.map(toBar), cold: coldEntries.map(toBar) };
  }, [lotteryId]);
}

/** Which of a range's stats corresponds to its own dominant tendency — used to
 * find the single most striking pattern to feature. */
function headlinePercent(row: RangeProbability): number {
  switch (row.dominant) {
    case "increase":
      return row.pctMore;
    case "decrease":
      return row.pctFewer;
    case "comeback":
      return row.comebackRate;
    default:
      return row.pctSame;
  }
}

function BarRow({ bars, color }: { bars: Bar[]; color: string }) {
  return (
    <div
      className="flex flex-wrap items-end justify-center gap-3 sm:gap-4"
      style={{ minHeight: CONTAINER_HEIGHT }}
    >
      {bars.map((bar) => (
        <div key={bar.number} className="flex flex-col items-center gap-2">
          <div
            className="w-6 rounded-t-lg sm:w-8"
            style={{ height: bar.heightPx, background: color, boxShadow: `0 4px 14px -4px ${color}99` }}
          />
          <span className="text-sm font-bold text-white sm:text-base">{bar.number}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * A static hero visual: features a different real lottery on each page load
 * (picked once, after hydration, so nothing moves once shown) — its hottest
 * and coldest numbers from the last 100 draws, plus the single strongest
 * probability pattern for that lottery. Every number and percentage here is
 * computed from real historical data, same as the lottery's own stats page.
 */
export default function HeroBallsAnimation() {
  const { t, lang } = useLang();
  const [lotteryId, setLotteryId] = useState(LOTTERIES[0].id);

  useEffect(() => {
    const pick = LOTTERIES[Math.floor(Math.random() * LOTTERIES.length)];
    setLotteryId(pick.id);
  }, []);

  const config = getLottery(lotteryId) ?? LOTTERIES[0];
  const { hot, cold } = useHotColdBars(config.id);

  const strongest = useMemo(() => {
    const draws = getDraws(config.id);
    const probability = computeRangeProbabilities(draws, config);
    return [...probability].sort((a, b) => headlinePercent(b) - headlinePercent(a))[0];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.id]);

  function headlineText(row: RangeProbability): string {
    const label = row.bucket.label;
    switch (row.dominant) {
      case "increase":
        return t("probability.headlineIncrease", { label, pct: Math.round(row.pctMore) });
      case "decrease":
        return t("probability.headlineDecrease", { label, pct: Math.round(row.pctFewer) });
      case "comeback":
        return t("probability.headlineComeback", { label, pct: Math.round(row.comebackRate) });
      default:
        return t("probability.headlineStable", { label, pct: Math.round(row.pctSame) });
    }
  }

  return (
    <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-10 sm:mt-16">
      <div className="flex items-center gap-3 rounded-full border border-felt-800 bg-felt-900 px-4 py-2">
        <LotteryBadge id={config.id} size={32} />
        <span className="text-sm font-bold text-white">{config.name}</span>
      </div>

      <div className="w-full">
        <p
          className="mb-5 text-center text-lg font-bold uppercase tracking-wide sm:text-xl"
          style={{ color: HOT_COLOR }}
        >
          {t("hotCold.hotTitle")}
        </p>
        <BarRow bars={hot} color={HOT_COLOR} />
      </div>

      <div className="w-full">
        <p
          className="mb-5 text-center text-lg font-bold uppercase tracking-wide sm:text-xl"
          style={{ color: COLD_COLOR }}
        >
          {t("hotCold.coldTitle")}
        </p>
        <BarRow bars={cold} color={COLD_COLOR} />
      </div>

      {strongest && (
        <div className="w-full rounded-2xl border border-gold/30 bg-gold/10 px-6 py-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-light">{t("tabs.probability")}</p>
          <p className="mt-2 text-[15px] leading-relaxed text-mist-200">{headlineText(strongest)}</p>
          <Link
            href={localePath(lang, `/lottery/${config.id}#probability`)}
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gold hover:text-gold-light"
          >
            {t("features.viewStats")} →
          </Link>
        </div>
      )}

      <div className="flex items-center gap-3 rounded-full border border-felt-800 bg-felt-900 px-5 py-2.5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-gold/60 text-base font-bold text-gold">
          100
        </div>
        <div className="text-left text-xs text-mist-500">{t("hero.drawsAnalyzed")}</div>
      </div>
    </div>
  );
}
