"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LOTTERIES } from "@/lib/lotteries";
import { localePath } from "@/lib/i18n";
import { useLang } from "./LanguageProvider";
import LotteryBadge from "./LotteryBadge";

/**
 * The desktop nav (Results dropdown + How it works) is hidden below the `sm`
 * breakpoint, which covers virtually all phones — so mobile visitors need
 * their own way to reach those links. This renders a hamburger button that
 * opens a full-width panel with the same destinations.
 */
export default function MobileMenu() {
  const { t, dict, lang } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, []);

  // Lock body scroll while the panel is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-mist-300 transition-colors hover:text-white"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-40 max-h-[80vh] overflow-y-auto border-b border-felt-800 bg-felt-950 px-5 pb-8 pt-4 shadow-glow">
          <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-mist-600">
            {t("nav.lotteries")}
          </p>
          <div className="overflow-hidden rounded-2xl border border-felt-800 bg-felt-900">
            {LOTTERIES.map((config) => {
              const info = dict.lotteries[config.id];
              return (
                <Link
                  key={config.id}
                  href={localePath(lang, `/lottery/${config.id}`)}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 border-b border-felt-800 px-4 py-3.5 transition-colors last:border-b-0 hover:bg-felt-800"
                >
                  <LotteryBadge id={config.id} size={40} />
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

          <Link
            href={localePath(lang, "/#how-it-works")}
            onClick={() => setOpen(false)}
            className="mt-6 block rounded-2xl border border-felt-800 bg-felt-900 px-4 py-3.5 text-sm font-bold text-mist-300 transition-colors hover:bg-felt-800 hover:text-white"
          >
            {t("nav.howItWorks")}
          </Link>
        </div>
      )}
    </div>
  );
}
