"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "./LanguageProvider";
import { getDraws } from "@/lib/data";
import { computeFrequency } from "@/lib/analytics";
import { getLottery } from "@/lib/lotteries";

const BAR_COLORS = [
  "#3460F2", // blue
  "#D6488F", // pink
  "#F2811D", // orange
  "#2FBF6E", // green
  "#8B5CF6", // purple
  "#0EA5E9", // cyan
  "#D4AF37", // gold
  "#E2001A", // red
];

const CONTAINER_HEIGHT = 128; // px

/** Counts up from 0 to `target` once, starting after `startDelayMs`. */
function useCountUp(target: number, durationMs = 1200, startDelayMs = 500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf = 0;
    let start: number | null = null;

    const timer = setTimeout(() => {
      const step = (ts: number) => {
        if (start === null) start = ts;
        const progress = Math.min((ts - start) / durationMs, 1);
        setValue(Math.round(progress * target));
        if (progress < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, startDelayMs);

    return () => {
      clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, durationMs, startDelayMs]);

  return value;
}

/** Samples real EuroMillions frequency data (last 100 draws) into ~12 evenly spaced bars. */
function useFrequencyBars() {
  return useMemo(() => {
    const config = getLottery("euromillions");
    if (!config) return [];
    const draws = getDraws(config.id).slice(0, 100);
    const freq = computeFrequency(draws, config.main.min, config.main.max);

    const sampleCount = 12;
    const step = Math.max(1, Math.floor(freq.length / sampleCount));
    const sample = Array.from({ length: sampleCount }, (_, i) => freq[i * step] ?? freq[freq.length - 1]);
    const max = Math.max(...sample.map((f) => f.percent), 1);

    return sample.map((f, i) => ({
      number: f.number,
      heightPx: Math.round(18 + (f.percent / max) * (CONTAINER_HEIGHT - 18)),
      color: BAR_COLORS[i % BAR_COLORS.length],
    }));
  }, []);
}

/**
 * A small animated hero visual: real EuroMillions number-frequency data
 * (last 100 draws) rendered as a row of gently pulsing bars, plus a counter
 * beneath ticking up to 100 — the real number of recent draws the
 * Probability Patterns feature analyzes for every lottery. No fabricated
 * stats — bar heights come straight from computeFrequency().
 */
export default function HeroBallsAnimation() {
  const { t } = useLang();
  const count = useCountUp(100);
  const bars = useFrequencyBars();

  return (
    <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-6 sm:mt-14">
      <div
        className="flex w-full items-end justify-center gap-2 sm:gap-3"
        style={{ height: CONTAINER_HEIGHT }}
      >
        {bars.map((bar, i) => (
          <motion.div
            key={bar.number}
            className="flex flex-col items-center gap-1.5"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ delay: i * 0.05, type: "spring", stiffness: 200, damping: 18 }}
            style={{ transformOrigin: "bottom" }}
          >
            <motion.div
              className="w-4 rounded-t-md sm:w-5"
              style={{
                height: bar.heightPx,
                background: `linear-gradient(180deg, ${bar.color}, ${bar.color}CC)`,
                transformOrigin: "bottom",
              }}
              animate={{ scaleY: [0.88, 1.05, 0.88] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6 + i * 0.12,
              }}
            />
            <span className="text-[10px] font-medium text-mist-600">{bar.number}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex items-center gap-3 rounded-full border border-felt-800 bg-felt-900 px-5 py-2.5"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-gold/60 text-base font-bold text-gold">
          {count}
        </div>
        <div className="text-left text-xs text-mist-500">{t("hero.drawsAnalyzed")}</div>
      </motion.div>
    </div>
  );
}
