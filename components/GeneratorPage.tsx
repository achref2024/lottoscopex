"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { LOTTERIES, getLottery } from "@/lib/lotteries";
import LotteryBall from "./LotteryBall";
import LotteryBadge from "./LotteryBadge";
import { useLang } from "./LanguageProvider";

/** Fisher–Yates shuffle, then take the first `count` — genuinely random, no weighting. */
function pickRandomUnique(count: number, min: number, max: number): number[] {
  const pool: number[] = [];
  for (let n = min; n <= max; n++) pool.push(n);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count).sort((a, b) => a - b);
}

export default function GeneratorPage() {
  const { t, dict } = useLang();
  const [lotteryId, setLotteryId] = useState(LOTTERIES[0].id);
  const [gen, setGen] = useState(0);
  const config = getLottery(lotteryId)!;

  const main = useMemo(
    () => pickRandomUnique(config.main.count, config.main.min, config.main.max),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lotteryId, gen]
  );
  const bonus = useMemo(
    () => (config.bonus ? pickRandomUnique(config.bonus.count, config.bonus.min, config.bonus.max) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lotteryId, gen]
  );

  return (
    <div>
      <section className="border-b border-felt-800 bg-felt-950 px-5 pb-10 pt-10 sm:px-8 sm:pt-14">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-fun text-3xl font-bold tracking-wide text-gold sm:text-4xl">
            {t("generator.heading")}
          </h1>
          <p className="mt-3 text-mist-500">{t("generator.subheading")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wide text-mist-500">
          {t("generator.selectLabel")}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {LOTTERIES.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                setLotteryId(l.id);
                setGen((g) => g + 1);
              }}
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

        <div className="mt-8 rounded-2xl border border-felt-800 bg-felt-900 p-8 text-center sm:p-12">
          <div key={gen} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {main.map((n) => (
              <LotteryBall key={`m-${n}`} number={n} variant="main" size="lg" animate />
            ))}
            {bonus.length > 0 && <span className="mx-1 h-12 w-px bg-felt-700" aria-hidden />}
            {bonus.map((n, i) => (
              <LotteryBall
                key={`b-${n}`}
                number={n}
                variant="bonus"
                shape={config.bonus?.shape}
                size="lg"
                delay={(main.length + i) * 0.05}
                animate
              />
            ))}
          </div>
          {config.bonus && <p className="mt-4 text-xs font-medium text-mist-500">{config.bonus.label}</p>}

          <button
            onClick={() => setGen((g) => g + 1)}
            className="mt-8 rounded-full bg-gold px-8 py-3 text-sm font-bold text-black transition-transform hover:scale-105"
          >
            {gen === 0 ? t("generator.generateButton") : t("generator.regenerateButton")}
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-felt-800 bg-felt-900/60 p-5 text-center">
          <p className="text-sm leading-relaxed text-mist-400">{t("generator.disclaimer")}</p>
        </div>

        <p className="mt-6 text-center text-sm text-mist-500">
          {dict.lotteries[config.id]?.tagline ?? config.tagline}
        </p>
      </section>
    </div>
  );
}
