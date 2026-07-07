"use client";

import LotteryBall from "./LotteryBall";
import { Draw, LotteryConfig } from "@/lib/types";
import { formatDate, formatMoney } from "@/lib/format";
import { useLang } from "./LanguageProvider";

interface DrawCardProps {
  draw: Draw;
  config: LotteryConfig;
  highlight?: boolean;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

export default function DrawCard({
  draw,
  config,
  highlight = false,
  size = "md",
  animate = true,
}: DrawCardProps) {
  const { t, locale } = useLang();
  return (
    <div
      className={
        highlight
          ? "rounded-2xl border border-felt-800 bg-felt-900 p-6 sm:p-8"
          : "rounded-2xl border border-felt-800 bg-felt-900 p-4 sm:p-5"
      }
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-mist-500">
            {highlight ? t("drawCard.latestDraw") : t("drawCard.draw")}
          </p>
          <p className="text-lg font-semibold text-white">
            {formatDate(draw.date, locale)}
          </p>
        </div>
        {draw.jackpot ? (
          <div className="rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-semibold text-gold-light">
            {formatMoney(draw.jackpot, config.currency)} {t("drawCard.jackpotSuffix")}
          </div>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {draw.main.map((n, i) => (
          <LotteryBall
            key={`m-${n}`}
            number={n}
            variant="main"
            size={size}
            delay={animate ? i * 0.05 : 0}
            animate={animate}
            lotteryId={config.id}
          />
        ))}
        {draw.bonus.length > 0 && (
          <span className="mx-1 h-8 w-px bg-felt-700" aria-hidden />
        )}
        {draw.bonus.map((n, i) => (
          <LotteryBall
            key={`b-${n}`}
            number={n}
            variant="bonus"
            shape={config.bonus?.shape}
            size={size}
            delay={animate ? (draw.main.length + i) * 0.05 : 0}
            animate={animate}
          />
        ))}
      </div>
      {config.bonus && (
        <p className="mt-3 text-xs font-medium text-mist-500">
          {config.bonus.label}
        </p>
      )}
    </div>
  );
}
