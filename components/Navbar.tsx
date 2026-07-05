"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import LotteriesDropdown from "./LotteriesDropdown";
import { localePath } from "@/lib/i18n";

export default function Navbar() {
  const { t, lang } = useLang();

  return (
    <header className="sticky top-0 z-50 border-b border-felt-800 bg-felt-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8 sm:py-6">
        <Link href={localePath(lang, "/")} className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold shadow-glow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#0B5C3A" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="3" fill="#0B5C3A" />
              <path
                d="M12 3v3M12 18v3M3 12h3M18 12h3"
                stroke="#0B5C3A"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="text-xl font-bold tracking-tight text-white">
            LottoScope<span className="text-gold">X</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-[15px] font-bold text-mist-300 sm:flex">
          <LotteriesDropdown />
          <Link href={localePath(lang, "/#how-it-works")} className="transition-colors hover:text-white">
            {t("nav.howItWorks")}
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-3 sm:ml-0">
          <div className="hidden rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-semibold text-gold-light md:block">
            {t("nav.pill")}
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
