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

// Per-lottery overrides for the main-number ball color, used when a
// lottery's own brand color should show through instead of the uniform
// white/cream. Text color is overridden alongside so it stays readable.
export const MAIN_BALL_OVERRIDES: Record<string, { from: string; to: string; ring: string; text: string }> = {
  lotto6aus49: { from: "#EF4444", to: "#B91C1C", ring: "#FCA5A5", text: "#FFFFFF" }, // German LOTTO red
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
