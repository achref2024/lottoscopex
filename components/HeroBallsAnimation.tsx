"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LotteryBall from "./LotteryBall";
import { useLang } from "./LanguageProvider";

const BALL_NUMBERS = [7, 23, 41, 16, 34];

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

/**
 * A small animated hero visual: a row of lottery balls gently floating, plus
 * a counter that ticks up to 100 — the real number of recent draws the
 * Probability Patterns feature analyzes for every lottery. No fabricated
 * stats, just a visual nod to the platform's actual methodology.
 */
export default function HeroBallsAnimation() {
  const { t } = useLang();
  const count = useCountUp(100);

  return (
    <div className="mx-auto mt-10 flex max-w-lg flex-col items-center gap-6 sm:mt-14">
      <div className="flex items-end gap-3 sm:gap-4">
        {BALL_NUMBERS.map((n, i) => (
          <motion.div
            key={n}
            animate={{ y: [0, -14, 0] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.22,
            }}
          >
            <LotteryBall number={n} size={i === 2 ? "lg" : "md"} delay={i * 0.08} />
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
