"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="mt-20 border-t border-felt-800 bg-felt-950 py-10">
      <div className="mx-auto max-w-7xl px-5 text-center text-sm text-mist-500 sm:px-8">
        <nav className="mb-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium uppercase tracking-wide text-mist-400">
          <Link href="/about" className="transition-colors hover:text-white">
            {t("footer.about")}
          </Link>
          <Link href="/methodology" className="transition-colors hover:text-white">
            {t("footer.methodology")}
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-white">
            {t("footer.privacy")}
          </Link>
          <Link href="/terms" className="transition-colors hover:text-white">
            {t("footer.terms")}
          </Link>
          <Link href="/contact" className="transition-colors hover:text-white">
            {t("footer.contact")}
          </Link>
        </nav>
        <p>{t("footer.disclaimer")}</p>
        <p className="mt-2">{t("footer.copyright", { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}
