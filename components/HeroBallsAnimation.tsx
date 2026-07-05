"use client";

import { useMemo } from "react";
import { useLang } from "./LanguageProvider";
import { getDraws } from "@/lib/data";
import { computeFrequency } from "@/lib/analytics";
import { getLottery } from "@/lib/lotteries";

const HOT_COLOR = "#D4AF37"; // gold — matches the Hot & Cold tab's hot icon
const COLD_COLOR = "#A8E0C4"; // mist green — matches the Hot & Cold tab's cold icon
const CONTAINER_HEIGHT = 200; // px

interface Bar {
  number: number;
  heightPx: number;
}

/** Real EuroMillions hot/cold numbers from the last 100 draws (top 10 hottest, bottom 10 coldest). */
function useHotColdBars() {
  return useMemo(() => {
    const config = getLottery("euromillions");
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
  }, []);
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
 * A static hero visual built from real EuroMillions data: the 10 hottest and
 * 10 coldest numbers from the last 100 draws, each rendered as a plain bar
 * (gold for hot, mist green for cold) sized to its real frequency — the
 * same numbers and colors used on the Hot & Cold tab elsewhere on the site.
 */
export default function HeroBallsAnimation() {
  const { t } = useLang();
  const { hot, cold } = useHotColdBars();

  return (
    <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-12 sm:mt-16">
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

      <div className="flex items-center gap-3 rounded-full border border-felt-800 bg-felt-900 px-5 py-2.5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-gold/60 text-base font-bold text-gold">
          100
        </div>
        <div className="text-left text-xs text-mist-500">{t("hero.drawsAnalyzed")}</div>
      </div>
    </div>
  );
}
