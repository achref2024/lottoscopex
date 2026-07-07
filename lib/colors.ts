// Bright green & gold table palette: a lighter, more vivid take on a
// sportsbook-green backdrop, with gold as the single accent. All main
// numbers share one clean uniform color — the only ball that stands out
// is the bonus/"super" number, always gold.

export const MAIN_BALL = { from: "#FFFFFF", to: "#D9EDE2", ring: "#FFFFFF" }; // uniform white/cream
export const BONUS_BALL = { from: "#FDE68A", to: "#D4AF37", ring: "#FFF3C4" }; // gold — the super number
export const BALL_TEXT = "#0B5C3A"; // dark green text, readable on both ball colors

export const ACCENT = "#D4AF37";
export const ACCENT_DARK = "#B8941F";
export const ACCENT_LIGHT = "rgba(212, 175, 55, 0.14)";

// Per-lottery overrides for the main-number ball color, using each
// lottery's own real/known brand color instead of the uniform white/cream.
// Every entry is tuned to stay legible against the green felt background
// (bg-felt-900 #0F7048): saturated/bright enough for hue+lightness contrast,
// plus a solid white ring (applied in LotteryBall) to separate the edge from
// the felt. Irish Lotto is the special case — its brand color IS green, so
// instead of the muted shamrock green we use a brighter, more saturated
// emerald that reads clearly against the darker felt tone. Mega Millions
// uses its brand blue (not gold) for main balls, since gold is reserved
// site-wide for bonus/"special" numbers — using it for Mega Millions' main
// balls too would make its own Mega Ball indistinguishable.
export const MAIN_BALL_OVERRIDES: Record<string, { from: string; to: string; ring: string; text: string }> = {
  euromillions: { from: "#5B7FD6", to: "#1E3A8A", ring: "#FFFFFF", text: "#FFFFFF" }, // EuroMillions blue
  eurojackpot: { from: "#FB923C", to: "#C2410C", ring: "#FFFFFF", text: "#FFFFFF" }, // EuroJackpot orange
  lotto6aus49: { from: "#EF4444", to: "#B91C1C", ring: "#FFFFFF", text: "#FFFFFF" }, // German LOTTO red
  "loto-france": { from: "#EC4899", to: "#BE185D", ring: "#FFFFFF", text: "#FFFFFF" }, // Loto pink
  "irish-lotto": { from: "#34D399", to: "#047857", ring: "#FFFFFF", text: "#FFFFFF" }, // brightened shamrock green
  powerball: { from: "#F87171", to: "#DC2626", ring: "#FFFFFF", text: "#FFFFFF" }, // Powerball red
  megamillions: { from: "#4C6FFF", to: "#1B2A6B", ring: "#FFFFFF", text: "#FFFFFF" }, // Mega Millions blue
};

export function getBallGradient(
  _n: number,
  lotteryId?: string
): { from: string; to: string; ring: string } {
  if (lotteryId && MAIN_BALL_OVERRIDES[lotteryId]) return MAIN_BALL_OVERRIDES[lotteryId];
  return MAIN_BALL;
}

export function getBallTextColor(lotteryId?: string): string {
  if (lotteryId && MAIN_BALL_OVERRIDES[lotteryId]) return MAIN_BALL_OVERRIDES[lotteryId].text;
  return BALL_TEXT;
}

// Converts a "#RRGGBB" hex string to an "rgba(r, g, b, alpha)" string.
export function withAlpha(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
