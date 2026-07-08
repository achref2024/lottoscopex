import { Draw, LotteryConfig, RangeBucket } from "./types";

/** Always returns exactly 5 buckets: 1-9, 10-19, 20-29, 30-39, 40-max */
export function getRangeBuckets(config: LotteryConfig): RangeBucket[] {
  const bucketCount = 5;
  const buckets: RangeBucket[] = [];
  for (let i = 0; i < bucketCount; i++) {
    const lo = i === 0 ? 1 : i * 10;
    const hi = i === bucketCount - 1 ? config.main.max : i * 10 + 9;
    buckets.push({ key: `${lo}-${hi}`, label: `${lo}–${hi}`, min: lo, max: hi });
  }
  return buckets;
}

export interface FrequencyEntry {
  number: number;
  count: number;
  percent: number;
}

export function computeFrequency(
  draws: Draw[],
  min: number,
  max: number,
  field: "main" | "bonus" = "main"
): FrequencyEntry[] {
  const counts = new Map<number, number>();
  for (let n = min; n <= max; n++) counts.set(n, 0);
  for (const draw of draws) {
    for (const n of draw[field]) {
      counts.set(n, (counts.get(n) ?? 0) + 1);
    }
  }
  const total = draws.length || 1;
  return Array.from(counts.entries())
    .map(([number, count]) => ({ number, count, percent: (count / total) * 100 }))
    .sort((a, b) => a.number - b.number);
}

export interface HotCold {
  hot: FrequencyEntry[];
  cold: FrequencyEntry[];
}

export function getHotCold(freq: FrequencyEntry[], take = 10): HotCold {
  const sorted = [...freq].sort((a, b) => b.count - a.count);
  return {
    hot: sorted.slice(0, take),
    cold: [...sorted].reverse().slice(0, take),
  };
}

export interface RangeStat {
  bucket: RangeBucket;
  totalHits: number;
  avgPerDraw: number;
  shareOfNumbers: number; // % of all drawn numbers that fall in this range
}

export function rangeDistribution(draws: Draw[], config: LotteryConfig): RangeStat[] {
  const buckets = getRangeBuckets(config);
  const totalNumbers = draws.length * config.main.count || 1;
  return buckets.map((bucket) => {
    let hits = 0;
    for (const draw of draws) {
      for (const n of draw.main) {
        if (n >= bucket.min && n <= bucket.max) hits++;
      }
    }
    return {
      bucket,
      totalHits: hits,
      avgPerDraw: draws.length ? hits / draws.length : 0,
      shareOfNumbers: (hits / totalNumbers) * 100,
    };
  });
}

function countInBucket(draw: Draw, bucket: RangeBucket): number {
  return draw.main.filter((n) => n >= bucket.min && n <= bucket.max).length;
}

export type Tendency = "increase" | "decrease" | "stable" | "comeback";

export interface RangeProbability {
  bucket: RangeBucket;
  sampleSize: number;
  pctMore: number; // next draw had MORE numbers from this range
  pctSame: number; // same amount
  pctFewer: number; // fewer
  comebackRate: number; // when a draw had ZERO from this range, % chance next draw had at least 1
  dominant: Tendency;
}

/**
 * Signature "Probability Patterns" engine.
 * For each range, looks at consecutive draw pairs within the last 100 draws
 * and summarizes what typically happens next, in plain language.
 */
export function computeRangeProbabilities(
  allDraws: Draw[],
  config: LotteryConfig
): RangeProbability[] {
  // allDraws is newest-first; take last 100 and put in chronological order
  const window = allDraws.slice(0, 100);
  const chronological = [...window].reverse(); // oldest -> newest
  const buckets = getRangeBuckets(config);

  return buckets.map((bucket) => {
    let more = 0;
    let same = 0;
    let fewer = 0;
    let zeroCases = 0;
    let zeroThenAppeared = 0;
    const pairs = Math.max(chronological.length - 1, 0);

    for (let i = 0; i < chronological.length - 1; i++) {
      const prevCount = countInBucket(chronological[i], bucket);
      const nextCount = countInBucket(chronological[i + 1], bucket);
      if (nextCount > prevCount) more++;
      else if (nextCount < prevCount) fewer++;
      else same++;

      if (prevCount === 0) {
        zeroCases++;
        if (nextCount > 0) zeroThenAppeared++;
      }
    }

    const pctMore = pairs ? (more / pairs) * 100 : 0;
    const pctSame = pairs ? (same / pairs) * 100 : 0;
    const pctFewer = pairs ? (fewer / pairs) * 100 : 0;
    const comebackRate = zeroCases ? (zeroThenAppeared / zeroCases) * 100 : 0;

    let dominant: Tendency = "stable";

    const top = Math.max(pctMore, pctSame, pctFewer);
    if (top === pctMore && pctMore > pctSame && pctMore > pctFewer) {
      dominant = "increase";
    } else if (top === pctFewer && pctFewer > pctSame) {
      dominant = "decrease";
    } else {
      dominant = "stable";
    }

    if (comebackRate >= 65) {
      dominant = "comeback";
    }

    return {
      bucket,
      sampleSize: pairs,
      pctMore,
      pctSame,
      pctFewer,
      comebackRate,
      dominant,
    };
  });
}

export interface TrendEntry extends FrequencyEntry {
  delta: number; // percentage point change vs historical baseline
  direction: "up" | "down" | "flat";
}

export function compareRecentVsHistorical(
  allDraws: Draw[],
  config: LotteryConfig,
  recentCount = 20,
  historicalCount = 100
): TrendEntry[] {
  const recent = allDraws.slice(0, recentCount);
  const historical = allDraws.slice(0, historicalCount);
  const recentFreq = computeFrequency(recent, config.main.min, config.main.max);
  const historicalFreq = computeFrequency(historical, config.main.min, config.main.max);
  const historicalMap = new Map(historicalFreq.map((f) => [f.number, f.percent]));

  return recentFreq
    .map((entry) => {
      const baseline = historicalMap.get(entry.number) ?? 0;
      const delta = entry.percent - baseline;
      return {
        ...entry,
        delta,
        direction: (delta > 3 ? "up" : delta < -3 ? "down" : "flat") as
          | "up"
          | "down"
          | "flat",
      };
    })
    .sort((a, b) => b.delta - a.delta);
}

/**
 * Attaches a computed `rolloverCount` to each draw: how many consecutive
 * draws (including this one), counting backwards, had no jackpot winner.
 * This is derived purely from each draw's own `jackpotWon` flag — never
 * fetched or guessed — so the streak only reflects draws where we actually
 * recorded a real won/not-won result. A draw with `jackpotWon` true or
 * undefined breaks the streak (resets to 0) since we can't vouch for what
 * came before it. Expects `draws` sorted newest-first.
 */
export function withRolloverCounts(draws: Draw[]): Draw[] {
  const result: Draw[] = new Array(draws.length);
  let running = 0;
  for (let i = draws.length - 1; i >= 0; i--) {
    const d = draws[i];
    if (d.jackpotWon === false) {
      running += 1;
      result[i] = { ...d, rolloverCount: running };
    } else {
      running = 0;
      result[i] = { ...d };
    }
  }
  return result;
}

export interface DrawInsights {
  oddCount: number;
  evenCount: number;
  sum: number;
  lowest: number;
  highest: number;
  rangeCounts: { bucket: RangeBucket; count: number }[];
  consecutivePairs: [number, number][];
  repeatedFromPrevious: number[];
}

/**
 * Real, purely computed facts about a single draw — no fabricated or
 * predictive content, just arithmetic on the numbers that were actually
 * drawn. Used on each draw's dedicated results page.
 */
export function getDrawInsights(draw: Draw, prevDraw: Draw | null, config: LotteryConfig): DrawInsights {
  const sorted = [...draw.main].sort((a, b) => a - b);
  const oddCount = draw.main.filter((n) => n % 2 !== 0).length;
  const evenCount = draw.main.length - oddCount;
  const sum = draw.main.reduce((a, b) => a + b, 0);

  const buckets = getRangeBuckets(config);
  const rangeCounts = buckets.map((bucket) => ({
    bucket,
    count: draw.main.filter((n) => n >= bucket.min && n <= bucket.max).length,
  }));

  const consecutivePairs: [number, number][] = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i + 1] - sorted[i] === 1) consecutivePairs.push([sorted[i], sorted[i + 1]]);
  }

  const repeatedFromPrevious = prevDraw ? draw.main.filter((n) => prevDraw.main.includes(n)) : [];

  return {
    oddCount,
    evenCount,
    sum,
    lowest: sorted[0],
    highest: sorted[sorted.length - 1],
    rangeCounts,
    consecutivePairs,
    repeatedFromPrevious,
  };
}

export interface NumberPickAnalysis {
  number: number;
  count: number;
  percent: number;
  rank: number; // 1 = most frequent number in the window
  status: "hot" | "cold" | "neutral";
  bucketLabel: string;
}

export interface PickAnalysisResult {
  perNumber: NumberPickAnalysis[];
  sum: number;
  oddCount: number;
  evenCount: number;
  hotCount: number;
  coldCount: number;
  neutralCount: number;
  sampleSize: number;
}

/**
 * Real, purely descriptive analysis of a user-chosen set of numbers against
 * the last 100 draws — how often each number actually appeared, whether it
 * ranks among the hottest or coldest numbers, and which range it falls in.
 * No weighting, no fabrication, and nothing here predicts future draws.
 *
 * Works for either a lottery's main numbers or its bonus numbers — pass the
 * matching min/max/field, and range-bucket labels only when they're
 * meaningful (skip them for small bonus-number pools like EuroMillions Stars).
 */
export function analyzeNumberPick(
  numbers: number[],
  allDraws: Draw[],
  options: { min: number; max: number; field?: "main" | "bonus"; buckets?: RangeBucket[] }
): PickAnalysisResult {
  const { min, max, field = "main", buckets = [] } = options;
  const window = allDraws.slice(0, 100);
  const freq = computeFrequency(window, min, max, field);
  const sorted = [...freq].sort((a, b) => b.count - a.count);
  const rankMap = new Map(sorted.map((f, i) => [f.number, i + 1]));
  const total = sorted.length || 1;
  const thirdCut = Math.max(1, Math.round(total / 3));

  const freqMap = new Map(freq.map((f) => [f.number, f]));

  const perNumber: NumberPickAnalysis[] = numbers.map((n) => {
    const entry = freqMap.get(n);
    const rank = rankMap.get(n) ?? total;
    const status: "hot" | "cold" | "neutral" =
      rank <= thirdCut ? "hot" : rank > total - thirdCut ? "cold" : "neutral";
    const bucket = buckets.find((b) => n >= b.min && n <= b.max);
    return {
      number: n,
      count: entry?.count ?? 0,
      percent: entry?.percent ?? 0,
      rank,
      status,
      bucketLabel: bucket?.label ?? "",
    };
  });

  const sum = numbers.reduce((a, b) => a + b, 0);
  const oddCount = numbers.filter((n) => n % 2 !== 0).length;

  return {
    perNumber,
    sum,
    oddCount,
    evenCount: numbers.length - oddCount,
    hotCount: perNumber.filter((p) => p.status === "hot").length,
    coldCount: perNumber.filter((p) => p.status === "cold").length,
    neutralCount: perNumber.filter((p) => p.status === "neutral").length,
    sampleSize: window.length,
  };
}

export function filterDrawsByDateRange(
  draws: Draw[],
  from?: string,
  to?: string
): Draw[] {
  return draws.filter((d) => {
    if (from && d.date < from) return false;
    if (to && d.date > to) return false;
    return true;
  });
}

export function filterDrawsByNumber(draws: Draw[], number?: number): Draw[] {
  if (number == null) return draws;
  return draws.filter((d) => d.main.includes(number) || d.bonus.includes(number));
}
