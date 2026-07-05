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
  jackpot: number;
}

export interface RangeBucket {
  key: string;
  label: string;
  min: number;
  max: number;
}
