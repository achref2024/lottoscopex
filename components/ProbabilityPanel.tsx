"use client";

import { motion } from "framer-motion";
import { RangeProbability } from "@/lib/analytics";
import { useLang } from "./LanguageProvider";

const TREND_ICON = {
  increase: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M4 17L10 11L14 15L20 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 7h6v6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  decrease: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M4 7L10 13L14 9L20 17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 17h6v-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  stable: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M4 12h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  ),
  comeback: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M4 12a8 8 0 1 1 3 6.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M4 17v-4h4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function ProbabilityPanel({ data }: { data: RangeProbability[] }) {
  const { t } = useLang();
  const sampleSize = data[0] ? data[0].sampleSize + 1 : 0;

  const trendLabel = {
    increase: t("probability.trendUp"),
    decrease: t("probability.trendDown"),
    stable: t("probability.trendStable"),
    comeback: t("probability.trendComeback"),
  };

  function headlineFor(row: RangeProbability): string {
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
    <div>
      <h2 className="sr-only">{t("tabs.probability")}</h2>
      <div className="mb-6 rounded-2xl border border-felt-800 bg-felt-900/60 p-6">
        <p className="text-sm leading-relaxed text-mist-400">
          {t("probability.intro", { n: sampleSize })}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {data.map((row, i) => (
          <motion.div
            key={row.bucket.key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="rounded-2xl border border-felt-800 bg-felt-900 p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex items-center rounded-full bg-felt-950 px-3 py-1 text-xs font-bold text-gold border border-gold/30">
                {t("probability.rangeLabel")} {row.bucket.label}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold-light">
                {TREND_ICON[row.dominant]}
                {trendLabel[row.dominant]}
              </span>
            </div>

            <p className="mb-5 text-[15px] leading-relaxed text-mist-200">{headlineFor(row)}</p>

            <div className="space-y-2.5">
              <ProbBar label={t("probability.barMore")} value={row.pctMore} />
              <ProbBar label={t("probability.barSame")} value={row.pctSame} />
              <ProbBar label={t("probability.barFewer")} value={row.pctFewer} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProbBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-mist-500">{label}</span>
        <span className="font-semibold text-white">{Math.round(value)}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-felt-800">
        <motion.div
          className="h-full rounded-full bg-gold"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
