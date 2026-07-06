"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LOTTERIES } from "@/lib/lotteries";
import { localePath } from "@/lib/i18n";
import { useLang } from "./LanguageProvider";
import LotteryBadge from "./LotteryBadge";

export default function LotteriesDropdown() {
  const { t, dict, lang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1.5 transition-colors hover:text-white"
      >
        {t("nav.lotteries")}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          className={open ? "rotate-180 transition-transform" : "transition-transform"}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-felt-800 bg-felt-900 shadow-glow">
          {LOTTERIES.map((config) => {
            const info = dict.lotteries[config.id];
            return (
              <Link
                key={config.id}
                href={localePath(lang, `/lottery/${config.id}`)}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 border-b border-felt-800 px-4 py-3 transition-colors last:border-b-0 hover:bg-felt-800"
              >
                <LotteryBadge id={config.id} size={36} />
                <span>
                  <span className="block text-sm font-semibold" style={{ color: config.accent }}>
                    {config.name}
                  </span>
                  <span className="block text-xs text-mist-500">{info?.country ?? config.country}</span>
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
