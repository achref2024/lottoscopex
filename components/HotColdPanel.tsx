"use client";

import LotteryBall from "./LotteryBall";
import { FrequencyEntry } from "@/lib/analytics";
import { useLang } from "./LanguageProvider";

function FlameIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2c1 3-3 4-3 7.5a3 3 0 006 0c1.2 1 2 2.6 2 4.3A5.8 5.8 0 0112 19.6a5.8 5.8 0 01-5-8.9C8.2 8.4 10.5 6.6 12 2z"
        fill="#D4AF37"
      />
    </svg>
  );
}

function ColdIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <g stroke="#A8E0C4" strokeWidth="1.6" strokeLinecap="round">
        <path d="M12 2v20M4 7l16 10M20 7L4 17" />
      </g>
    </svg>
  );
}

function BallRow({ entries, lotteryId }: { entries: FrequencyEntry[]; lotteryId?: string }) {
  return (
    <div className="flex flex-wrap gap-3">
      {entries.map((e) => (
        <div key={e.number} className="flex flex-col items-center gap-1.5">
          <LotteryBall number={e.number} size="md" animate={false} lotteryId={lotteryId} />
          <span className="text-[11px] font-medium text-mist-500">
            {e.count}×
          </span>
        </div>
      ))}
    </div>
  );
}

export default function HotColdPanel({
  hot,
  cold,
  lotteryId,
}: {
  hot: FrequencyEntry[];
  cold: FrequencyEntry[];
  lotteryId?: string;
}) {
  const { t } = useLang();
  return (
    <div>
      <h2 className="sr-only">{t("tabs.hotCold")}</h2>
      <div className="grid gap-5 sm:grid-cols-2">
      <div className="rounded-2xl border border-felt-800 bg-felt-900 p-6">
        <div className="mb-4 flex items-center gap-2">
          <FlameIcon />
          <h3 className="text-lg font-bold text-white">{t("hotCold.hotTitle")}</h3>
        </div>
        <p className="mb-5 text-sm text-mist-500">
          {t("hotCold.hotDesc")}
        </p>
        <BallRow entries={hot} lotteryId={lotteryId} />
      </div>
      <div className="rounded-2xl border border-felt-800 bg-felt-900 p-6">
        <div className="mb-4 flex items-center gap-2">
          <ColdIcon />
          <h3 className="text-lg font-bold text-white">{t("hotCold.coldTitle")}</h3>
        </div>
        <p className="mb-5 text-sm text-mist-500">
          {t("hotCold.coldDesc")}
        </p>
        <BallRow entries={cold} lotteryId={lotteryId} />
      </div>
      </div>
    </div>
  );
}
