import { LotteryConfig } from "./types";

// Real jackpot amounts for each lottery's next upcoming draw, checked against
// each operator's official site (or, where unavailable, the last officially
// published figure). These are a live-changing number on a static site, so
// they reflect the date below and should be refreshed periodically.
export const NEXT_JACKPOT_AS_OF = "2026-07-07";

export const LOTTERIES: LotteryConfig[] = [
  {
    id: "euromillions",
    name: "EuroMillions",
    shortName: "EuroMillions",
    country: "Pan-European",
    flag: "EU",
    tagline: "Europe's biggest jackpot lottery",
    gradient: ["#6366F1", "#EC4899"],
    accent: "#5B7FD6", // softer, less saturated blue — easier on the eyes than the deep royal blue
    main: { count: 5, min: 1, max: 50 },
    bonus: { label: "Lucky Stars", count: 2, min: 1, max: 12, shape: "star" },
    drawDays: [2, 5], // Tuesday, Friday
    currency: "EUR",
    jackpotMin: 17,
    jackpotMax: 240,
    nextJackpot: 17, // minimum jackpot — reset after a Belgian winner on 3 July 2026
  },
  {
    id: "eurojackpot",
    name: "EuroJackpot",
    shortName: "EuroJackpot",
    country: "Pan-European",
    flag: "EU",
    tagline: "Europe's favourite Friday & Tuesday draw",
    gradient: ["#0EA5E9", "#22D3EE"],
    accent: "#F2811D", // warm orange, distinct from EuroMillions' blue
    main: { count: 5, min: 1, max: 50 },
    bonus: { label: "Euro Numbers", count: 2, min: 1, max: 12, shape: "circle" },
    drawDays: [2, 5], // Tuesday, Friday
    currency: "EUR",
    jackpotMin: 10,
    jackpotMax: 120,
    nextJackpot: 23, // rolled over from the winner-less 3 Jul 2026 draw (€17.27M) to ~€23M for 7 Jul
  },
  {
    id: "lotto6aus49",
    name: "Lotto 6aus49",
    shortName: "6aus49",
    country: "Germany",
    flag: "DE",
    tagline: "Germany's classic Saturday lottery",
    gradient: ["#F59E0B", "#EF4444"],
    accent: "#E2001A", // the red of Germany's LOTTO brand
    main: { count: 6, min: 1, max: 49 },
    bonus: { label: "Superzahl", count: 1, min: 0, max: 9, shape: "circle" },
    drawDays: [3, 6], // Wednesday, Saturday
    currency: "EUR",
    jackpotMin: 1,
    jackpotMax: 50, // cap raised from €45M to €50M in Nov 2023
    nextJackpot: 50, // capped jackpot in play for the 4 Jul 2026 draw; next figure confirms Monday
  },
  {
    id: "loto-france",
    name: "Loto",
    shortName: "French Loto",
    country: "France",
    flag: "FR",
    tagline: "France's national lottery tradition",
    gradient: ["#3B82F6", "#8B5CF6"],
    accent: "#D6488F", // pink, echoing Loto's colourful modern ball mark
    main: { count: 5, min: 1, max: 49 },
    bonus: { label: "Numéro Chance", count: 1, min: 1, max: 10, shape: "circle" },
    drawDays: [1, 3, 6], // Monday, Wednesday, Saturday
    currency: "EUR",
    jackpotMin: 2,
    jackpotMax: 30,
    nextJackpot: 4, // rolled over from the winner-less 6 Jul 2026 draw to €4M for 8 Jul
  },
  {
    id: "irish-lotto",
    name: "Irish Lotto",
    shortName: "Irish Lotto",
    country: "Ireland",
    flag: "IE",
    tagline: "Ireland's home-grown favourite",
    gradient: ["#10B981", "#84CC16"],
    accent: "#2FBF6E", // shamrock green, Ireland's best-known colour
    main: { count: 6, min: 1, max: 47 },
    bonus: { label: "Bonus Ball", count: 1, min: 1, max: 47, shape: "circle" },
    drawDays: [3, 6], // Wednesday, Saturday
    currency: "EUR",
    jackpotMin: 2,
    jackpotMax: 19,
    nextJackpot: 6.2, // official current jackpot figure
  },
  {
    id: "powerball",
    name: "Powerball",
    shortName: "Powerball",
    country: "United States",
    flag: "US",
    tagline: "America's biggest jackpot lottery",
    gradient: ["#E31D1A", "#7A0F0D"],
    accent: "#C1554B", // warm, muted brick red — softer than the deep crimson, less eye strain against the green background
    main: { count: 5, min: 1, max: 69 },
    bonus: { label: "Powerball", count: 1, min: 1, max: 26, shape: "circle" },
    drawDays: [1, 3, 6], // Monday, Wednesday, Saturday
    currency: "USD",
    jackpotMin: 20,
    jackpotMax: 500,
    nextJackpot: 434, // rolled over from the winner-less 6 Jul 2026 draw to $434M for 8 Jul
  },
  {
    id: "megamillions",
    name: "Mega Millions",
    shortName: "Mega Millions",
    country: "United States",
    flag: "US",
    tagline: "America's other giant jackpot draw",
    gradient: ["#F2C230", "#1B2A6B"],
    accent: "#E8A317", // the gold of the Mega Ball
    main: { count: 5, min: 1, max: 70 },
    bonus: { label: "Mega Ball", count: 1, min: 1, max: 24, shape: "star" },
    drawDays: [2, 5], // Tuesday, Friday
    currency: "USD",
    jackpotMin: 50,
    jackpotMax: 500,
    nextJackpot: 576, // official "Next Estimated Jackpot" for the next draw
  },
];

export function getLottery(id: string): LotteryConfig | undefined {
  return LOTTERIES.find((l) => l.id === id);
}
