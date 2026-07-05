// Maps a lottery's `flag` code (ISO-ish country/region code from lib/lotteries.ts)
// to a flag emoji. "EU" isn't a real ISO country code but has a dedicated
// regional-indicator emoji, so it's special-cased.
const REGIONAL_INDICATOR_OFFSET = 127397; // 0x1F1E6 - 'A'.charCodeAt(0)

export function flagEmoji(code: string): string {
  if (code === "EU") return "🇪🇺";
  return code
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(char.charCodeAt(0) + REGIONAL_INDICATOR_OFFSET))
    .join("");
}
