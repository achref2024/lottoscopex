"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "./LanguageProvider";

type HeroItem =
  | { kind: "number"; value: number; from: string; to: string }
  | { kind: "currency"; symbol: string; from: string; to: string };

// A colorful mix just for this decorative hero row — the rest of the site
// intentionally keeps lottery balls a uniform white (see lib/colors.ts) so
// real draw data stays easy to scan. This is the one deliberate exception,
// purely for visual flair, plus a couple of currency symbols nodding to the
// real jackpots shown throughout the site.
const HERO_ITEMS: HeroItem[] = [
  { kind: "number", value: 7, from: "#7DA8FF", to: "#3460F2" }, // blue
  { kind: "currency", symbol: "€", from: "#FDE68A", to: "#D4AF37" }, // gold
  { kind: "number", value: 23, from: "#FF9ED2", to: "#D6488F" }, // pink
  { kind: "number", value: 41, from: "#FFC168", to: "#F2811D" }, // orange
  { kind: "currency", symbol: "$", from: "#7CF0B2", to: "#2FBF6E" }, // green
  { kind: "number", value: 16, from: "#C9A0FF", to: "#8B5CF6" }, // purple
  { kind: "number", value: 34, from: "#7FE7F2", to: "#0EA5E9" }, // cyan
];

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

function HeroBall({ item, large }: { item: HeroItem; large?: boolean }) {
  const size = large
    ? "h-16 w-16 text-xl sm:h-20 sm:w-20 sm:text-2xl"
    : "h-12 w-12 text-base sm:h-14 sm:w-14 sm:text-lg";
  const label = item.kind === "number" ? item.value : item.symbol;

  return (
    <div
      className={`flex items-center justify-center rounded-full font-display font-bold shadow-soft ring-2 ring-inset ring-black/10 ${size}`}
      style={{
        background: `linear-gradient(145deg, ${item.from}, ${item.to})`,
        boxShadow: `0 4px 12px -3px ${item.to}88`,
        color: "#0B2A1D",
      }}
    >
      {label}
    </div>
  );
}

/**
 * A small animated hero visual: a colorful row of lottery balls (plus a
 * couple of currency symbols for the real-jackpot angle) gently floating,
 * with a counter beneath ticking up to 100 — the real number of recent
 * draws the Probability Patterns feature analyzes for every lottery. No
 * fabricated stats, just a visual nod to the platform's actual methodology.
 */
export default function HeroBallsAnimation() {
  const { t } = useLang();
  const count = useCountUp(100);

  return (
    <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-6 sm:mt-14">
      <div className="flex flex-wrap items-end justify-center gap-3 sm:gap-4">
        {HERO_ITEMS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 260, damping: 16 }}
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.22,
              }}
            >
              <HeroBall item={item} large={i === 3} />
            </motion.div>
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
