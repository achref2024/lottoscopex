export type BadgePattern = "eu" | "stripes-h" | "stripes-v" | "us";

export interface BadgeSpec {
  pattern: BadgePattern;
  colors: [string, string, string]; // 3-tone flag palette
  accent: string; // used for the inner plate's second text line
  label: [string, string]; // two stacked lines of badge text
  icon?: "shamrock";
}

/**
 * Custom circular flag-crest badges — original artwork built from each
 * lottery's real national/EU colors, not a reproduction of any operator's
 * or third-party site's actual logo. One spec per lottery, used everywhere
 * a lottery's identity is shown (cards, headers, nav).
 */
export const BADGES: Record<string, BadgeSpec> = {
  euromillions: {
    pattern: "eu",
    colors: ["#1E3A8A", "#1E3A8A", "#1E3A8A"],
    accent: "#F5D576",
    label: ["EURO", "MILLIONS"],
  },
  eurojackpot: {
    pattern: "eu",
    colors: ["#1E3A8A", "#1E3A8A", "#1E3A8A"],
    accent: "#F2811D",
    label: ["EURO", "JACKPOT"],
  },
  lotto6aus49: {
    pattern: "stripes-h",
    colors: ["#1a1a1a", "#DD0000", "#FFCE00"],
    accent: "#FFCE00",
    label: ["LOTTO", "6AUS49"],
  },
  "loto-france": {
    pattern: "stripes-v",
    colors: ["#002395", "#ffffff", "#ED2939"],
    accent: "#D6488F",
    label: ["LOTO", "FRANCE"],
  },
  "irish-lotto": {
    pattern: "stripes-v",
    colors: ["#169B62", "#ffffff", "#FF883E"],
    accent: "#4ADE80",
    label: ["IRISH", "LOTTO"],
    icon: "shamrock",
  },
  powerball: {
    pattern: "us",
    colors: ["#B22234", "#ffffff", "#3C3B6E"],
    accent: "#F5D576",
    label: ["POWER", "BALL"],
  },
  megamillions: {
    pattern: "us",
    colors: ["#B22234", "#ffffff", "#3C3B6E"],
    accent: "#F2C230",
    label: ["MEGA", "MILLIONS"],
  },
};
