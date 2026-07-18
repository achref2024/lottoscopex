import { Draw } from "./types";
import euromillions from "@/data/euromillions.json";
import eurojackpot from "@/data/eurojackpot.json";
import lotto6aus49 from "@/data/lotto6aus49.json";
import lotoFrance from "@/data/loto-france.json";
import irishLotto from "@/data/irish-lotto.json";
import powerball from "@/data/powerball.json";
import megamillions from "@/data/megamillions.json";
import superenalotto from "@/data/superenalotto.json";
import ukLotto from "@/data/uk-lotto.json";

const DATASETS: Record<string, Draw[]> = {
  euromillions: euromillions as Draw[],
  eurojackpot: eurojackpot as Draw[],
  lotto6aus49: lotto6aus49 as Draw[],
  "loto-france": lotoFrance as Draw[],
  "irish-lotto": irishLotto as Draw[],
  powerball: powerball as Draw[],
  megamillions: megamillions as Draw[],
  superenalotto: superenalotto as Draw[],
  "uk-lotto": ukLotto as Draw[],
};

/** Returns draws newest-first */
export function getDraws(lotteryId: string): Draw[] {
  return DATASETS[lotteryId] ?? [];
}

/**
 * Only the most recent draws per lottery get a dedicated static
 * /lottery/[id]/results/[date] page. Older draws are still fully present in
 * the data (frequency/hot-cold/probability stats always use full history)
 * and browsable via the filterable History tab — they just don't each get
 * their own indexed URL, to keep the site's total page count small enough
 * for Google to crawl and trust quickly instead of drowning in thousands of
 * near-identical templated pages.
 */
export const RESULT_PAGE_COUNT = 4;

/** The subset of a lottery's draws (newest-first) that have their own page. */
export function getDrawsWithResultPage(lotteryId: string): Draw[] {
  return getDraws(lotteryId).slice(0, RESULT_PAGE_COUNT);
}

/** Whether a specific draw date has its own dedicated results page. */
export function hasResultPage(lotteryId: string, date: string): boolean {
  return getDrawsWithResultPage(lotteryId).some((d) => d.date === date);
}
