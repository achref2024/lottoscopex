import { Draw } from "./types";
import euromillions from "@/data/euromillions.json";
import eurojackpot from "@/data/eurojackpot.json";
import lotto6aus49 from "@/data/lotto6aus49.json";
import lotoFrance from "@/data/loto-france.json";
import irishLotto from "@/data/irish-lotto.json";
import powerball from "@/data/powerball.json";
import megamillions from "@/data/megamillions.json";

const DATASETS: Record<string, Draw[]> = {
  euromillions: euromillions as Draw[],
  eurojackpot: eurojackpot as Draw[],
  lotto6aus49: lotto6aus49 as Draw[],
  "loto-france": lotoFrance as Draw[],
  "irish-lotto": irishLotto as Draw[],
  powerball: powerball as Draw[],
  megamillions: megamillions as Draw[],
};

/** Returns draws newest-first */
export function getDraws(lotteryId: string): Draw[] {
  return DATASETS[lotteryId] ?? [];
}
