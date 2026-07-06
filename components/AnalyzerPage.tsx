"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { LOTTERIES, getLottery } from "@/lib/lotteries";
import { getDraws } from "@/lib/data";
import { analyzeNumberPick, getRangeBuckets, NumberPickAnalysis } from "@/lib/analytics";
import { BonusShape } from "@/lib/types";
import LotteryBadge from "./LotteryBadge";
import { useLang } from "./LanguageProvider";

const STATUS_COLOR: Record<NumberPickAnalysis["status"], string> = {
  hot: "#D4AF37",
  cold: "#A8E0C4",
  neutral: "#8A94A6",
};

/** A small numbered pick button used in the number-picking grid. */
function PickButton({
  n,
  selected,
  disabled,
  shape,
  onClick,
}: {
  n: number;
  selected: boolean;
  disabled: boolean;
  shape?: BonusShape;
  onClick: () => void;
}) {
  const shapeClass = shape === "diamond" ? "rounded-lg rotate-45" : "rounded-full";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled && !selected}
      className={clsx(
        "flex h-11 w-11 items-center justify-center border-2 text-sm font-bold transition-all sm:h-12 sm:w-12",
        shapeClass,
        selected
          ? "border-gold bg-gold/15 text-gold-light"
          : disabled
          ? "cursor-not-allowed border-felt-800 text-felt-700"
          : "border-felt-700 text-mist-300 hover:border-gold/50 hover:text-white"
      )}
    >
      <span className={shape === "diamond" ? "-rotate-45" : ""}>{n}</span>
    </button>
  );
}

export default function AnalyzerPage() {
  const { t } = useLang();
  const [lotteryId, setLotteryId] = useState(LOTTERIES[0].id);
  const [mainPicks, setMainPicks] = useState<number[]>([]);
  const [bonusPicks, setBonusPicks] = useState<number[]>([]);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const config = getLottery(lotteryId)!;
  const mainNeeded = config.main.count;
  const bonusNeeded = config.bonus?.count ?? 0;
  const readyToAnalyze = mainPicks.length === mainNeeded && bonusPicks.length === bonusNeeded;

  function selectLottery(id: string) {
    setLotteryId(id);
    setMainPicks([]);
    setBonusPicks([]);
    setHasAnalyzed(false);
  }

  function toggleMain(n: number) {
    setHasAnalyzed(false);
    setMainPicks((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : prev.length < mainNeeded ? [...prev, n] : prev
    );
  }

  function toggleBonus(n: number) {
    setHasAnalyzed(false);
    setBonusPicks((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : prev.length < bonusNeeded ? [...prev, n] : prev
    );
  }

  function clearPicks() {
    setMainPicks([]);
    setBonusPicks([]);
    setHasAnalyzed(false);
  }

  const draws = useMemo(() => getDraws(config.id), [config.id]);

  const mainAnalysis = useMemo(() => {
    if (!hasAnalyzed || mainPicks.length !== mainNeeded) return null;
    return analyzeNumberPick(mainPicks, draws, {
      min: config.main.min,
      max: config.main.max,
      field: "main",
      buckets: getRangeBuckets(config),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnalyzed, mainPicks, draws, config]);

  const bonusAnalysis = useMemo(() => {
    if (!hasAnalyzed || !config.bonus || bonusPicks.length !== bonusNeeded) return null;
    return analyzeNumberPick(bonusPicks, draws, {
      min: config.bonus.min,
      max: config.bonus.max,
      field: "bonus",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnalyzed, bonusPicks, draws, config]);

  const statusLabel: Record<NumberPickAnalysis["status"], string> = {
    hot: t("analyzer.hotTag"),
    cold: t("analyzer.coldTag"),
    neutral: t("analyzer.neutralTag"),
  };

  return (
    <div>
      <section className="border-b border-felt-800 bg-felt-950 px-5 pb-10 pt-10 sm:px-8 sm:pt-14">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-fun text-3xl font-bold tracking-wide text-gold sm:text-4xl">
            {t("analyzer.heading")}
          </h1>
          <p className="mt-3 text-mist-500">{t("analyzer.subheading")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wide text-mist-500">
          {t("analyzer.selectLabel")}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {LOTTERIES.map((l) => (
            <button
              key={l.id}
              onClick={() => selectLottery(l.id)}
              className={clsx(
                "flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition-colors",
                lotteryId === l.id
                  ? "border-gold bg-gold/10 text-white"
                  : "border-felt-800 bg-felt-900 text-mist-400 hover:text-white"
              )}
            >
              <LotteryBadge id={l.id} size={28} />
              {l.shortName}
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-felt-800 bg-felt-900 p-6 sm:p-8">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-white">
              {t("analyzer.pickMainLabel", { count: mainNeeded })}
            </p>
            <span className="text-xs font-semibold text-mist-500">
              {mainPicks.length}/{mainNeeded}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: config.main.max - config.main.min + 1 }, (_, i) => i + config.main.min).map(
              (n) => (
                <PickButton
                  key={n}
                  n={n}
                  selected={mainPicks.includes(n)}
                  disabled={mainPicks.length >= mainNeeded}
                  onClick={() => toggleMain(n)}
                />
              )
            )}
          </div>

          {config.bonus && (
            <div className="mt-6 border-t border-felt-800 pt-6">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-white">
                  {t("analyzer.pickBonusLabel", { label: config.bonus.label })}
                </p>
                <span className="text-xs font-semibold text-mist-500">
                  {bonusPicks.length}/{bonusNeeded}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from(
                  { length: config.bonus.max - config.bonus.min + 1 },
                  (_, i) => i + config.bonus!.min
                ).map((n) => (
                  <PickButton
                    key={n}
                    n={n}
                    shape={config.bonus?.shape}
                    selected={bonusPicks.includes(n)}
                    disabled={bonusPicks.length >= bonusNeeded}
                    onClick={() => toggleBonus(n)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setHasAnalyzed(true)}
              disabled={!readyToAnalyze}
              className={clsx(
                "rounded-full px-8 py-3 text-sm font-bold transition-transform",
                readyToAnalyze
                  ? "bg-gold text-black hover:scale-105"
                  : "cursor-not-allowed bg-felt-800 text-mist-600"
              )}
            >
              {hasAnalyzed ? t("analyzer.reanalyzeButton") : t("analyzer.analyzeButton")}
            </button>
            {(mainPicks.length > 0 || bonusPicks.length > 0) && (
              <button
                onClick={clearPicks}
                className="text-sm font-semibold text-mist-500 underline underline-offset-2 hover:text-white"
              >
                {t("analyzer.resetLink")}
              </button>
            )}
          </div>
        </div>

        {mainAnalysis && (
          <div className="mt-8 rounded-2xl border border-felt-800 bg-felt-900 p-6 sm:p-8">
            <p className="mb-5 text-center text-xs font-semibold uppercase tracking-wide text-mist-500">
              {t("analyzer.sampleLabel", { n: mainAnalysis.sampleSize })}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {mainAnalysis.perNumber.map((p) => (
                <div key={p.number} className="flex flex-col items-center gap-1.5">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full border-2 text-lg font-bold text-white sm:h-16 sm:w-16"
                    style={{ borderColor: STATUS_COLOR[p.status] }}
                  >
                    {p.number}
                  </div>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                    style={{ color: STATUS_COLOR[p.status], background: `${STATUS_COLOR[p.status]}22` }}
                  >
                    {statusLabel[p.status]}
                  </span>
                  <span className="text-xs text-mist-500">
                    {t("analyzer.percentLabel", { pct: Math.round(p.percent) })}
                  </span>
                  {p.bucketLabel && <span className="text-[11px] text-mist-600">{p.bucketLabel}</span>}
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
              <StatChip label={t("analyzer.sumLabel")} value={String(mainAnalysis.sum)} />
              <StatChip
                label={t("analyzer.oddEvenLabel")}
                value={`${mainAnalysis.oddCount} / ${mainAnalysis.evenCount}`}
              />
              <StatChip label={t("analyzer.hotLabel")} value={String(mainAnalysis.hotCount)} color={STATUS_COLOR.hot} />
              <StatChip
                label={t("analyzer.coldLabel")}
                value={String(mainAnalysis.coldCount)}
                color={STATUS_COLOR.cold}
              />
              <StatChip
                label={t("analyzer.neutralLabel")}
                value={String(mainAnalysis.neutralCount)}
                color={STATUS_COLOR.neutral}
              />
            </div>

            {bonusAnalysis && config.bonus && (
              <div className="mt-8 border-t border-felt-800 pt-6">
                <p className="mb-4 text-center text-sm font-semibold text-white">{config.bonus.label}</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {bonusAnalysis.perNumber.map((p) => (
                    <div key={p.number} className="flex flex-col items-center gap-1.5">
                      <div
                        className={clsx(
                          "flex h-14 w-14 items-center justify-center border-2 text-lg font-bold text-white",
                          config.bonus?.shape === "diamond" ? "rounded-lg rotate-45" : "rounded-full"
                        )}
                        style={{ borderColor: STATUS_COLOR[p.status] }}
                      >
                        <span className={config.bonus?.shape === "diamond" ? "-rotate-45" : ""}>{p.number}</span>
                      </div>
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                        style={{ color: STATUS_COLOR[p.status], background: `${STATUS_COLOR[p.status]}22` }}
                      >
                        {statusLabel[p.status]}
                      </span>
                      <span className="text-xs text-mist-500">
                        {t("analyzer.percentLabel", { pct: Math.round(p.percent) })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 rounded-2xl border border-felt-800 bg-felt-900/60 p-5 text-center">
          <p className="text-sm leading-relaxed text-mist-400">{t("analyzer.disclaimer")}</p>
        </div>
      </section>
    </div>
  );
}

function StatChip({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="rounded-xl border border-felt-800 bg-felt-950 px-3 py-3 text-center">
      <p className="text-lg font-bold" style={{ color: color ?? "#fff" }}>
        {value}
      </p>
      <p className="mt-0.5 text-[11px] text-mist-500">{label}</p>
    </div>
  );
}
