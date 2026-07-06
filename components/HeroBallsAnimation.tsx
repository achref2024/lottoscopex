"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLang } from "./LanguageProvider";
import { getDraws } from "@/lib/data";
import { computeRangeProbabilities, RangeProbability } from "@/lib/analytics";
import { LOTTERIES, getLottery } from "@/lib/lotteries";
import { localePath } from "@/lib/i18n";
import LotteryBadge from "./LotteryBadge";

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

/**
 * A static hero "screen": features a different real lottery from our full
 * lineup on each page load (picked once, after hydration, so nothing moves
 * once shown) — its logo, name, and the single strongest probability pattern
 * from its last 100 draws. Every percentage here is computed from real
 * historical data, same as that lottery's own stats page.
 */
export default function HeroBallsAnimation() {
  const { t, lang } = useLang();
  const [lotteryId, setLotteryId] = useState(LOTTERIES[0].id);

  useEffect(() => {
    const pick = LOTTERIES[Math.floor(Math.random() * LOTTERIES.length)];
    setLotteryId(pick.id);
  }, []);

  const config = getLottery(lotteryId) ?? LOTTERIES[0];

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
    <div className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-7 sm:mt-16">
      <div
        className="relative flex h-64 w-64 items-center justify-center rounded-[2.5rem] border border-gold/30 bg-gradient-to-b from-felt-900 to-felt-950 sm:h-80 sm:w-80"
        style={{ boxShadow: "0 0 0 1px rgba(212,175,55,0.08), 0 30px 90px -25px rgba(212,175,55,0.45), inset 0 0 60px rgba(212,175,55,0.06)" }}
      >
        <div className="pointer-events-none absolute inset-6 rounded-[2rem] bg-gold/5 blur-2xl" aria-hidden="true" />
        <LotteryBadge id={config.id} size={188} />
      </div>

      <h2
        className="font-fun text-2xl font-bold tracking-wide sm:text-3xl"
        style={{ color: config.accent }}
      >
        {config.name}
      </h2>

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
