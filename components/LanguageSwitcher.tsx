"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "./LanguageProvider";
import { LANGUAGES, localePath, stripLocalePrefix, Lang } from "@/lib/i18n";

const EN_ONLY_EXACT = new Set(["/about", "/privacy", "/terms", "/contact", "/methodology"]);
const RESULTS_PAGE = /^\/lottery\/([a-z0-9-]+)\/results\/\d{4}-\d{2}-\d{2}$/;

/**
 * Some pages (legal pages, per-draw results pages) only exist in English.
 * Switching locale from one of these has to land somewhere real instead of
 * a 404 — the lottery hub page for results pages, the homepage for legal
 * pages — while pages that do have FR/DE versions switch normally.
 */
function targetPath(basePath: string, targetLang: Lang): string {
  if (targetLang === "en") return basePath;
  const resultsMatch = basePath.match(RESULTS_PAGE);
  if (resultsMatch) return `/lottery/${resultsMatch[1]}`;
  if (EN_ONLY_EXACT.has(basePath)) return "/";
  return basePath;
}

export default function LanguageSwitcher() {
  const { lang } = useLang();
  const pathname = usePathname() || "/";
  const basePath = stripLocalePrefix(pathname);

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-felt-800 bg-felt-900 p-0.5">
      {LANGUAGES.map((l) => (
        <Link
          key={l.code}
          href={localePath(l.code, targetPath(basePath, l.code))}
          aria-label={l.label}
          aria-current={lang === l.code ? "true" : undefined}
          className={
            lang === l.code
              ? "rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold text-black transition-colors"
              : "rounded-full px-2.5 py-1 text-[11px] font-semibold text-mist-400 transition-colors hover:text-white"
          }
        >
          {l.short}
        </Link>
      ))}
    </div>
  );
}
