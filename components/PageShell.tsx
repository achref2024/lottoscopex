"use client";

import { ReactNode } from "react";
import { Lang } from "@/lib/i18n";
import { LanguageProvider } from "./LanguageProvider";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Wraps a page's content with the language context and shared chrome
 * (Navbar/Footer) for a fixed `lang`. Each localized route (/, /fr, /de)
 * renders its page content through this shell with its own `lang`, so the
 * navbar, footer, and all descendant components render fully in that
 * language in the static HTML — not just the main content.
 */
export default function PageShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <LanguageProvider lang={lang}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </LanguageProvider>
  );
}
