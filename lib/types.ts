export type BonusShape = "star" | "circle" | "diamond";

export interface LotteryConfig {
  id: string;
  name: string;
  shortName: string;
  country: string;
  flag: string;
  tagline: string;
  gradient: [string, string];
  accent: string;
  main: {
    count: number;
    min: number;
    max: number;
  };
  bonus: {
    label: string;
    count: number;
    min: number;
    max: number;
    shape: BonusShape;
  } | null;
  drawDays: number[]; // 0 = Sunday ... 6 = Saturday
  /** IANA timezone name the draw's official time is quoted in (e.g. "Europe/Paris"). */
  drawTimeZone: string;
  /** Local draw time ("HH:MM", 24h) for each day in drawDays — some lotteries (e.g. Lotto
   * 6aus49) draw at a different time on different days, so this is keyed by day-of-week. */
  drawTimes: Record<number, string>;
  currency: string;
  jackpotMin: number;
  jackpotMax: number;
  /** Real estimated jackpot (in millions, lottery's own currency) for the next upcoming draw. */
  nextJackpot: number;
}

export interface Draw {
  id: string;
  lotteryId: string;
  date: string; // ISO date
  main: number[];
  bonus: number[];
  jackpot: number; // amount (in millions) that was in play for this draw; 0/omitted = not recorded
  jackpotWon?: boolean; // whether the top prize was won in this draw, if known
  jackpotCountries?: string[]; // ISO country code(s) the winning jackpot ticket(s) were sold in, if known and jackpotWon is true
  rolloverCount?: number; // computed: how many consecutive draws (including this one) rolled over without
  // a jackpot winner, counting back from this draw. Derived at request time from jackpotWon history —
  // never stored in the raw data files.
}

export interface RangeBucket {
  key: string;
  label: string;
  min: number;
  max: number;
}
