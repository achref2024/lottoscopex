"use client";

import { useLang } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="mt-20 border-t border-felt-800 bg-felt-950 py-10">
      <div className="mx-auto max-w-7xl px-5 text-center text-sm text-mist-500 sm:px-8">
        <p>{t("footer.disclaimer")}</p>
        <p className="mt-2">{t("footer.copyright", { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}
