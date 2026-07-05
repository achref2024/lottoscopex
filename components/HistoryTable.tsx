"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Draw, LotteryConfig } from "@/lib/types";
import { filterDrawsByDateRange, filterDrawsByNumber } from "@/lib/analytics";
import DrawCard from "./DrawCard";
import { useLang } from "./LanguageProvider";

const PAGE_SIZE = 8;

export default function HistoryTable({
  draws,
  config,
}: {
  draws: Draw[];
  config: LotteryConfig;
}) {
  const { t, lang } = useLang();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [number, setNumber] = useState<string>("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    let result = filterDrawsByDateRange(draws, from || undefined, to || undefined);
    if (number) {
      const n = parseInt(number, 10);
      if (!Number.isNaN(n)) result = filterDrawsByNumber(result, n);
    }
    return result;
  }, [draws, from, to, number]);

  return (
    <div>
      <h2 className="sr-only">{t("tabs.history")}</h2>
      <div className="mb-6 flex flex-wrap items-end gap-4 rounded-2xl border border-felt-800 bg-felt-900 p-5">
        <div>
          <label className="mb-1 block text-xs font-semibold text-mist-500">{t("history.from")}</label>
          <input
            type="date"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              setVisible(PAGE_SIZE);
            }}
            className="rounded-lg border border-felt-700 bg-felt-950 px-3 py-2 text-sm text-white outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-mist-500">{t("history.to")}</label>
          <input
            type="date"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setVisible(PAGE_SIZE);
            }}
            className="rounded-lg border border-felt-700 bg-felt-950 px-3 py-2 text-sm text-white outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-mist-500">
            {t("history.containsNumber")}
          </label>
          <input
            type="number"
            min={config.main.min}
            max={Math.max(config.main.max, config.bonus?.max ?? 0)}
            value={number}
            placeholder={t("history.placeholder")}
            onChange={(e) => {
              setNumber(e.target.value);
              setVisible(PAGE_SIZE);
            }}
            className="w-28 rounded-lg border border-felt-700 bg-felt-950 px-3 py-2 text-sm text-white outline-none focus:border-gold"
          />
        </div>
        {(from || to || number) && (
          <button
            onClick={() => {
              setFrom("");
              setTo("");
              setNumber("");
              setVisible(PAGE_SIZE);
            }}
            className="rounded-lg bg-felt-800 px-4 py-2 text-sm font-semibold text-mist-300 transition-colors hover:bg-felt-700"
          >
            {t("history.clearFilters")}
          </button>
        )}
        <span className="ml-auto text-sm font-medium text-mist-500">
          {filtered.length} {filtered.length === 1 ? t("history.drawsFoundOne") : t("history.drawsFoundMany")}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-felt-800 py-16 text-center text-mist-500">
          {t("history.noMatch")}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.slice(0, visible).map((draw) =>
            lang === "en" ? (
              <Link
                key={draw.id}
                href={`/lottery/${config.id}/results/${draw.date}`}
                className="block rounded-2xl transition-transform hover:scale-[1.02]"
              >
                <DrawCard draw={draw} config={config} size="sm" animate={false} />
              </Link>
            ) : (
              <DrawCard key={draw.id} draw={draw} config={config} size="sm" animate={false} />
            )
          )}
        </div>
      )}

      {visible < filtered.length && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-full bg-felt-800 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gold hover:text-black"
          >
            {t("history.loadMore")}
          </button>
        </div>
      )}
    </div>
  );
}
