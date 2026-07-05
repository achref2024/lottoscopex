"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "./LanguageProvider";
import { LANGUAGES, localePath, stripLocalePrefix } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { lang } = useLang();
  const pathname = usePathname() || "/";
  const basePath = stripLocalePrefix(pathname);

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-felt-800 bg-felt-900 p-0.5">
      {LANGUAGES.map((l) => (
        <Link
          key={l.code}
          href={localePath(l.code, basePath)}
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
