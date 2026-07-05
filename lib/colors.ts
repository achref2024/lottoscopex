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

export function getBallGradient(_n: number): { from: string; to: string; ring: string } {
  return MAIN_BALL;
}

// Converts a "#RRGGBB" hex string to an "rgba(r, g, b, alpha)" string.
export function withAlpha(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
