import { Lang } from "./i18n";
import { flagEmoji } from "./flags";

/**
 * Translated display names for countries that have produced a EuroJackpot or
 * EuroMillions jackpot winner. Deliberately uses plain nominative forms
 * ("France", "Frankreich") rather than prepositional ones ("in France", "en
 * France") so the surrounding sentence never has to deal with per-language
 * gender/article agreement — see drawCard.jackpotWonIn in lib/i18n.ts.
 */
export const COUNTRY_NAMES: Record<string, Record<Lang, string>> = {
  ES: { en: "Spain", fr: "Espagne", de: "Spanien", it: "Spagna" },
  DE: { en: "Germany", fr: "Allemagne", de: "Deutschland", it: "Germania" },
  CZ: { en: "Czech Republic", fr: "République tchèque", de: "Tschechien", it: "Repubblica Ceca" },
  SI: { en: "Slovenia", fr: "Slovénie", de: "Slowenien", it: "Slovenia" },
  FI: { en: "Finland", fr: "Finlande", de: "Finnland", it: "Finlandia" },
  DK: { en: "Denmark", fr: "Danemark", de: "Dänemark", it: "Danimarca" },
  BE: { en: "Belgium", fr: "Belgique", de: "Belgien", it: "Belgio" },
  FR: { en: "France", fr: "France", de: "Frankreich", it: "Francia" },
  GB: { en: "United Kingdom", fr: "Royaume-Uni", de: "Vereinigtes Königreich", it: "Regno Unito" },
};

const CONJUNCTION: Record<Lang, string> = {
  en: "and",
  fr: "et",
  de: "und",
  it: "e",
};

/** "Spain" -> "🇪🇸 Spain" (or just the code if we don't have a translated name for it). */
function countryLabel(code: string, lang: Lang): string {
  const name = COUNTRY_NAMES[code]?.[lang] ?? code;
  return `${flagEmoji(code)} ${name}`;
}

/**
 * Renders one or more ISO country codes as a human-readable, localized,
 * flag-prefixed list, e.g. ["GB", "FR"] -> "🇬🇧 United Kingdom & 🇫🇷 France".
 * Duplicate codes (e.g. two winning tickets in the same country) are
 * collapsed to one mention.
 */
export function formatJackpotCountries(codes: string[], lang: Lang): string {
  const unique = Array.from(new Set(codes));
  const labels = unique.map((code) => countryLabel(code, lang));
  if (labels.length <= 1) return labels[0] ?? "";
  if (labels.length === 2) return `${labels[0]} ${CONJUNCTION[lang]} ${labels[1]}`;
  return `${labels.slice(0, -1).join(", ")} ${CONJUNCTION[lang]} ${labels[labels.length - 1]}`;
}
