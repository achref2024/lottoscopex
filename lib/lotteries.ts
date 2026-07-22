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
    drawTimeZone: "Europe/Paris",
    drawTimes: { 2: "20:45", 5: "20:45" }, // draw held 20:45-21:15 CET/CEST in Paris
    currency: "EUR",
    jackpotMin: 17,
    jackpotMax: 240,
    nextJackpot: 70, // rolled over from the winner-less 21 Jul 2026 draw (€59M) to €70M for the 24 Jul draw
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
    drawTimeZone: "Europe/Berlin",
    drawTimes: { 2: "20:00", 5: "20:00" }, // draw held 20:00 German time (drawn in Helsinki)
    currency: "EUR",
    jackpotMin: 10,
    jackpotMax: 120,
    nextJackpot: 68, // rolled over from the winner-less 21 Jul 2026 draw (€59.99M) to an estimated €68M for the 24 Jul draw
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
    drawTimeZone: "Europe/Berlin",
    drawTimes: { 3: "18:25", 6: "19:25" }, // Wednesday and Saturday draws start at different times
    currency: "EUR",
    jackpotMin: 1,
    jackpotMax: 50, // cap raised from €45M to €50M in Nov 2023
    nextJackpot: 50, // capped jackpot, unwon again on 22 Jul 2026 — stays at cap for the 25 Jul draw
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
    drawTimeZone: "Europe/Paris",
    drawTimes: { 1: "20:20", 3: "20:20", 6: "20:20" },
    currency: "EUR",
    jackpotMin: 2,
    jackpotMax: 30,
    nextJackpot: 15, // rolled over from the winner-less 20 Jul 2026 draw (€14M) to €15M for the 22 Jul draw
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
    drawTimeZone: "Europe/Dublin",
    drawTimes: { 3: "20:00", 6: "20:00" }, // approx. — sources vary between 19:55 and 20:00
    currency: "EUR",
    jackpotMin: 2,
    jackpotMax: 19,
    nextJackpot: 7.8, // rolled over from the winner-less 18 Jul 2026 draw (€7.43M) to €7.8M for the 22 Jul draw
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
    drawTimeZone: "America/New_York",
    drawTimes: { 1: "22:59", 3: "22:59", 6: "22:59" },
    currency: "USD",
    jackpotMin: 20,
    jackpotMax: 500,
    nextJackpot: 567, // rolled over from the winner-less 20 Jul 2026 draw ($544M) to $567M for the 22 Jul draw
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
    drawTimeZone: "America/New_York",
    drawTimes: { 2: "23:00", 5: "23:00" },
    currency: "USD",
    jackpotMin: 50,
    jackpotMax: 500,
    nextJackpot: 743, // rolled over from the winner-less 21 Jul 2026 draw ($707M) to $743M for the 24 Jul draw
  },
  {
    id: "superenalotto",
    name: "SuperEnalotto",
    shortName: "SuperEnalotto",
    country: "Italy",
    flag: "IT",
    tagline: "Italy's record-breaking jackpot lottery",
    gradient: ["#009246", "#CE2B37"], // the green and red of the Italian flag
    accent: "#CE2B37",
    main: { count: 6, min: 1, max: 90 },
    bonus: { label: "Jolly", count: 1, min: 1, max: 90, shape: "circle" },
    drawDays: [2, 4, 5, 6], // Tuesday, Thursday, Friday, Saturday
    drawTimeZone: "Europe/Rome",
    drawTimes: { 2: "20:00", 4: "20:00", 5: "20:00", 6: "20:00" },
    currency: "EUR",
    jackpotMin: 1.3,
    jackpotMax: 400, // no hard cap — the record jackpot (Feb 2023) was €371M
    nextJackpot: 197.9, // rolled over from the winner-less 21 Jul 2026 draw (€197M) to €197.9M for the 24 Jul draw
  },
  {
    id: "uk-lotto",
    name: "UK Lotto",
    shortName: "UK Lotto",
    country: "United Kingdom",
    flag: "GB",
    tagline: "Britain's original national lottery draw",
    gradient: ["#C8102E", "#012169"], // Union Jack red and navy blue
    accent: "#012169",
    main: { count: 6, min: 1, max: 59 },
    bonus: { label: "Bonus Ball", count: 1, min: 1, max: 59, shape: "circle" },
    drawDays: [3, 6], // Wednesday, Saturday
    drawTimeZone: "Europe/London",
    drawTimes: { 3: "20:00", 6: "20:00" },
    currency: "GBP",
    jackpotMin: 2,
    jackpotMax: 66, // record jackpot (9 Jan 2016) was £66.1M, split between two winners
    nextJackpot: 11.5, // rolled over from the winner-less 18 Jul 2026 draw (£9.56M) to an estimated £11.5M for the 22 Jul draw
  },
];

export function getLottery(id: string): LotteryConfig | undefined {
  return LOTTERIES.find((l) => l.id === id);
}
