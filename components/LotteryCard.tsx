"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LotteryConfig, Draw } from "@/lib/types";
import { formatDate, formatMoney, getNextDrawISO } from "@/lib/format";
import { flagEmoji } from "@/lib/flags";
import { localePath } from "@/lib/i18n";
import LotteryBall from "./LotteryBall";
import { useLang } from "./LanguageProvider";

interface LotteryCardProps {
  config: LotteryConfig;
  latest: Draw;
  index: number;
}

export default function LotteryCard({ config, latest, index }: LotteryCardProps) {
  const { t, locale, dict, lang } = useLang();
  const info = dict.lotteries[config.id];
  const nextDraw = getNextDrawISO(config.drawDays);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
    >
      <Link
        href={localePath(lang, `/lottery/${config.id}`)}
        className="group block rounded-2xl border border-felt-800 bg-felt-900 p-6 transition-all duration-200 hover:border-gold/40 hover:shadow-glow sm:p-7"
      >
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-felt-800 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-mist-400">
            <span aria-hidden="true">{flagEmoji(config.flag)}</span>
            {info?.country ?? config.country}
          </span>
          <h3 className="mt-3 text-2xl font-bold" style={{ color: config.accent }}>
            {config.name}
          </h3>
          <p className="mt-1 text-sm text-mist-500">{info?.tagline ?? config.tagline}</p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {latest.main.slice(0, 6).map((n) => (
            <LotteryBall key={n} number={n} size="sm" animate={false} />
          ))}
          {latest.bonus.slice(0, 2).map((n) => (
            <LotteryBall
              key={`b${n}`}
              number={n}
              variant="bonus"
              shape={config.bonus?.shape}
              size="sm"
              animate={false}
            />
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-felt-800 pt-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-mist-500">
              {t("card.lastDraw")}
            </p>
            <p className="text-sm font-semibold text-white">{formatDate(latest.date, locale)}</p>
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-mist-500">
              {t("card.nextDraw")}
            </p>
            <p className="text-sm font-semibold text-white">{formatDate(nextDraw, locale)}</p>
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-mist-500">
              {t("card.typicalJackpot")}
            </p>
            <p className="text-sm font-semibold text-gold">
              {formatMoney(config.nextJackpot, config.currency)}
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-felt-800 text-mist-300 transition-colors duration-200 group-hover:bg-gold group-hover:text-black">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
