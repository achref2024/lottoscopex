"use client";

import { TrendEntry } from "@/lib/analytics";
import LotteryBall from "./LotteryBall";
import { useLang } from "./LanguageProvider";

function Arrow({ direction }: { direction: "up" | "down" | "flat" }) {
  if (direction === "flat") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M4 12h16" stroke="#A8E0C4" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  }
  const path = direction === "up" ? "M12 19V5M5 12l7-7 7 7" : "M12 5v14M5 12l7 7 7-7";
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d={path} stroke="#D4AF37" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrendList({
  title,
  description,
  entries,
  lotteryId,
}: {
  title: string;
  description: string;
  entries: TrendEntry[];
  lotteryId?: string;
}) {
  return (
    <div className="rounded-2xl border border-felt-800 bg-felt-900 p-6">
      <h3 className="mb-1 text-lg font-bold text-white">{title}</h3>
      <p className="mb-5 text-sm text-mist-500">{description}</p>
      <div className="space-y-3">
        {entries.map((e) => (
          <div key={e.number} className="flex items-center gap-3">
            <LotteryBall number={e.number} size="sm" animate={false} lotteryId={lotteryId} />
            <div className="flex-1">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-felt-800">
                <div
                  className="h-full rounded-full bg-gold"
                  style={{
                    width: `${Math.min(Math.abs(e.delta) * 6, 100)}%`,
                  }}
                />
              </div>
            </div>
            <div className="flex w-16 items-center justify-end gap-1 text-sm font-semibold text-white">
              <Arrow direction={e.direction} />
              {e.delta > 0 ? "+" : ""}
              {e.delta.toFixed(0)}pp
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CompareView({ trends, lotteryId }: { trends: TrendEntry[]; lotteryId?: string }) {
  const { t } = useLang();
  const risers = trends.filter((entry) => entry.direction === "up").slice(0, 6);
  const fallers = [...trends].reverse().filter((entry) => entry.direction === "down").slice(0, 6);
  const description = t("compare.description");

  return (
    <div>
      <h2 className="sr-only">{t("tabs.compare")}</h2>
      <div className="mb-6 rounded-2xl border border-felt-800 bg-felt-900/60 p-6">
        <p className="text-sm leading-relaxed text-mist-400">{t("compare.intro")}</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TrendList title={t("compare.heatingUp")} description={description} entries={risers} lotteryId={lotteryId} />
        <TrendList title={t("compare.coolingDown")} description={description} entries={fallers} lotteryId={lotteryId} />
      </div>
    </div>
  );
}
