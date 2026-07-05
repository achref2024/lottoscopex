"use client";

import { motion } from "framer-motion";
import { RangeStat } from "@/lib/analytics";
import { useLang } from "./LanguageProvider";

export default function RangeAnalysis({ stats }: { stats: RangeStat[] }) {
  const { t } = useLang();
  const maxShare = Math.max(...stats.map((s) => s.shareOfNumbers), 1);
  const topIndex = stats.reduce(
    (best, s, i) => (s.shareOfNumbers > stats[best].shareOfNumbers ? i : best),
    0
  );

  return (
    <div>
      <h2 className="sr-only">{t("tabs.ranges")}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat, i) => {
        const isTop = i === topIndex;
        return (
          <div
            key={stat.bucket.key}
            className="rounded-2xl border border-felt-800 bg-felt-900 p-5"
          >
            <div
              className={
                isTop
                  ? "mb-3 inline-flex items-center rounded-full bg-gold px-3 py-1 text-xs font-bold text-black"
                  : "mb-3 inline-flex items-center rounded-full bg-felt-800 px-3 py-1 text-xs font-bold text-mist-300"
              }
            >
              {stat.bucket.label}
            </div>
            <p className="text-3xl font-semibold text-white">
              {stat.shareOfNumbers.toFixed(0)}%
            </p>
            <p className="mb-4 text-xs text-mist-500">{t("ranges.shareOf")}</p>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-felt-800">
              <motion.div
                className={isTop ? "h-full rounded-full bg-gold" : "h-full rounded-full bg-felt-600"}
                initial={{ width: 0 }}
                whileInView={{ width: `${(stat.shareOfNumbers / maxShare) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <p className="mt-3 text-xs font-medium text-mist-500">
              {t("ranges.perDraw", { n: stat.avgPerDraw.toFixed(1) })}
            </p>
          </div>
        );
      })}
      </div>
    </div>
  );
}
