"use client";

import { createContext, useContext, useMemo, ReactNode } from "react";
import { Lang, DICTIONARIES, LOCALE_MAP, Dictionary, interpolate } from "@/lib/i18n";

interface LanguageContextValue {
  lang: Lang;
  locale: string;
  dict: Dictionary;
  t: (path: string, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

/**
 * Provides the active language for its subtree. Unlike the old client-side
 * (localStorage/navigator-detected) version, `lang` is now a required prop
 * fixed by the route (e.g. "/fr/..." pages pass lang="fr"). This makes the
 * provider fully deterministic: the static HTML generated at build time
 * already contains the correct language for crawlers, with no post-hydration
 * language swap.
 */
export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const value = useMemo<LanguageContextValue>(() => {
    const dict = DICTIONARIES[lang];
    return {
      lang,
      locale: LOCALE_MAP[lang],
      dict,
      t: (path: string, vars?: Record<string, string | number>) => {
        const result = getPath(dict, path);
        const template = typeof result === "string" ? result : path;
        return vars ? interpolate(template, vars) : template;
      },
    };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within a LanguageProvider");
  return ctx;
}
