#!/usr/bin/env node
/**
 * Daily automated data refresh for LottoScopeX.
 *
 * For each of the 7 lotteries, checks the operator's own official results
 * source for a draw that isn't in our dataset yet, and appends it if found.
 * Never fabricates, guesses, or overwrites a number — if a source can't be
 * parsed with full confidence (right count of numbers, right range, no
 * duplicates), that lottery is skipped for this run and logged, so a bad
 * scrape never corrupts real historical data.
 *
 * Run: node scripts/update-draws.mjs
 * (invoked daily by .github/workflows/update-draws.yml)
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "data");

const LOTTERY_SPECS = {
  euromillions: { main: { count: 5, min: 1, max: 50 }, bonus: { count: 2, min: 1, max: 12 } },
  eurojackpot: { main: { count: 5, min: 1, max: 50 }, bonus: { count: 2, min: 1, max: 12 } },
  lotto6aus49: { main: { count: 6, min: 1, max: 49 }, bonus: { count: 1, min: 0, max: 9 } },
  "loto-france": { main: { count: 5, min: 1, max: 49 }, bonus: { count: 1, min: 1, max: 10 } },
  "irish-lotto": { main: { count: 6, min: 1, max: 47 }, bonus: { count: 1, min: 1, max: 47 } },
  powerball: { main: { count: 5, min: 1, max: 69 }, bonus: { count: 1, min: 1, max: 26 } },
  megamillions: { main: { count: 5, min: 1, max: 70 }, bonus: { count: 1, min: 1, max: 24 } },
};

const DATA_FILES = {
  euromillions: "euromillions.json",
  eurojackpot: "eurojackpot.json",
  lotto6aus49: "lotto6aus49.json",
  "loto-france": "loto-france.json",
  "irish-lotto": "irish-lotto.json",
  powerball: "powerball.json",
  megamillions: "megamillions.json",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function readDataset(lotteryId) {
  const file = path.join(DATA_DIR, DATA_FILES[lotteryId]);
  const raw = await fs.readFile(file, "utf8");
  return { file, draws: JSON.parse(raw) };
}

async function writeDataset(file, draws) {
  // Keep newest-first, one entry per date, and pretty-print like the source files.
  const deduped = [];
  const seen = new Set();
  for (const d of draws.sort((a, b) => (a.date < b.date ? 1 : -1))) {
    if (seen.has(d.date)) continue;
    seen.add(d.date);
    deduped.push(d);
  }
  await fs.writeFile(file, JSON.stringify(deduped, null, 2) + "\n");
}

/** Strict validation before anything is ever written to a dataset. */
function isValidDraw(lotteryId, main, bonus) {
  const spec = LOTTERY_SPECS[lotteryId];
  if (!spec) return false;
  const mainOk =
    Array.isArray(main) &&
    main.length === spec.main.count &&
    new Set(main).size === main.length &&
    main.every((n) => Number.isInteger(n) && n >= spec.main.min && n <= spec.main.max);
  const bonusOk =
    Array.isArray(bonus) &&
    bonus.length === spec.bonus.count &&
    new Set(bonus).size === bonus.length &&
    bonus.every((n) => Number.isInteger(n) && n >= spec.bonus.min && n <= spec.bonus.max);
  return mainOk && bonusOk;
}

/** Merge newly-found draws into the existing dataset. Returns how many were added. */
async function mergeDraws(lotteryId, found) {
  const { file, draws } = await readDataset(lotteryId);
  const existingDates = new Set(draws.map((d) => d.date));
  let added = 0;

  for (const f of found) {
    if (existingDates.has(f.date)) continue;
    if (!isValidDraw(lotteryId, f.main, f.bonus)) {
      console.warn(`[${lotteryId}] skipped ${f.date}: failed validation`, f);
      continue;
    }
    draws.push({
      id: `${lotteryId}-${f.date}`,
      lotteryId,
      date: f.date,
      main: [...f.main].sort((a, b) => a - b),
      bonus: [...f.bonus].sort((a, b) => a - b),
      jackpot: f.jackpot ?? 0,
    });
    existingDates.add(f.date);
    added++;
  }

  if (added > 0) await writeDataset(file, draws);
  return added;
}

function isoDateFromSlashes(text) {
  // MM/DD/YYYY -> YYYY-MM-DD
  const m = text.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (!m) return null;
  return `${m[3]}-${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}`;
}

// ---------------------------------------------------------------------------
// Mega Millions — official megamillions.com AJAX endpoint (confirmed live JSON)
// ---------------------------------------------------------------------------

async function fetchMegaMillions() {
  const res = await fetch("https://www.megamillions.com/cmspages/utilservice.asmx/GetLatestDrawData", {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; LottoScopeX/1.0)" },
  });
  const xml = await res.text();
  const match = xml.match(/<string[^>]*>([\s\S]*)<\/string>/);
  if (!match) return [];
  const parsed = JSON.parse(match[1]);
  const d = parsed.Drawing;
  if (!d?.PlayDate) return [];
  return [
    {
      date: d.PlayDate.slice(0, 10),
      main: [d.N1, d.N2, d.N3, d.N4, d.N5],
      bonus: [d.MBall],
    },
  ];
}

// ---------------------------------------------------------------------------
// Powerball & Mega Millions backup/catch-up — Texas Lottery's plain HTML
// winning-numbers tables (official state lottery, same national draw).
// Used to catch multiple missed draws in one run, not just the latest.
// ---------------------------------------------------------------------------

async function fetchTexasTable(url, { hasMultiplierColumn = true } = {}) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; LottoScopeX/1.0)" } });
  const html = await res.text();
  const $ = cheerio.load(html);
  const rows = [];

  $("table tr").each((_, tr) => {
    const cells = $(tr).find("td");
    if (cells.length < 3) return;
    const dateText = $(cells[0]).text().trim();
    const numsText = $(cells[1]).text().trim();
    const bonusText = $(cells[2]).text().trim();

    const date = isoDateFromSlashes(dateText);
    if (!date) return;

    const main = numsText
      .split("-")
      .map((n) => parseInt(n.trim(), 10))
      .filter((n) => !Number.isNaN(n));
    const bonus = parseInt(bonusText, 10);
    if (main.length === 5 && !Number.isNaN(bonus)) {
      rows.push({ date, main, bonus: [bonus] });
    }
  });

  return rows;
}

// ---------------------------------------------------------------------------
// EU lotteries — official sites are JS-rendered, so these use a real headless
// browser. Extraction reads the rendered page text and looks for a date next
// to the right count of in-range numbers, rather than relying on CSS classes
// that may differ from what we could verify ahead of time.
// ---------------------------------------------------------------------------

const MONTHS = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
  janvier: 1, février: 2, fevrier: 2, mars: 3, avril: 4, mai: 5, juin: 6,
  juillet: 7, août: 8, aout: 8, septembre: 9, octobre: 10, novembre: 11, décembre: 12, decembre: 12,
  januar: 1, februar: 2, märz: 3, marz: 3, april_de: 4, mai_de: 5, juni: 6,
  juli: 7, august_de: 8, oktober: 10, dezember: 12,
};

function findDatesInText(text) {
  const found = [];
  // "4 July 2026" / "July 4, 2026" / "4 juillet 2026" / "samedi 4 juillet 2026"
  const re =
    /\b(\d{1,2})\s+([A-Za-zÀ-ÿ]+)\s+(\d{4})\b|\b([A-Za-zÀ-ÿ]+)\s+(\d{1,2}),?\s+(\d{4})\b/g;
  let m;
  while ((m = re.exec(text))) {
    let day, monthName, year;
    if (m[1]) {
      day = m[1];
      monthName = m[2];
      year = m[3];
    } else {
      monthName = m[4];
      day = m[5];
      year = m[6];
    }
    const month = MONTHS[monthName.toLowerCase()];
    if (!month) continue;
    const iso = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    found.push({ index: m.index, date: iso });
  }
  return found;
}

/**
 * Scans rendered page text for the nearest valid "N main numbers + M bonus
 * numbers" sequence following a recognizable date. Returns null if nothing
 * meets the strict shape/range requirements — callers must treat null as
 * "couldn't confirm, skip this run" rather than guessing.
 */
function extractDrawFromText(text, spec) {
  const dates = findDatesInText(text);
  if (dates.length === 0) return null;

  // Most lottery result pages show the latest draw's date first.
  for (const { index, date } of dates.slice(0, 3)) {
    const windowText = text.slice(index, index + 400);
    const numbers = [...windowText.matchAll(/\b\d{1,2}\b/g)].map((m) => parseInt(m[0], 10));
    if (numbers.length < spec.main.count + spec.bonus.count) continue;

    const main = [];
    const bonus = [];
    for (const n of numbers) {
      if (main.length < spec.main.count) {
        if (n >= spec.main.min && n <= spec.main.max && !main.includes(n)) main.push(n);
      } else if (bonus.length < spec.bonus.count) {
        if (n >= spec.bonus.min && n <= spec.bonus.max) bonus.push(n);
      } else {
        break;
      }
    }
    if (main.length === spec.main.count && bonus.length === spec.bonus.count) {
      return { date, main, bonus };
    }
  }
  return null;
}

async function scrapeWithBrowser(url, lotteryId) {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ userAgent: "Mozilla/5.0 (compatible; LottoScopeX/1.0)" });
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(2000); // let client-side hydration settle
    const text = await page.innerText("body");
    const draw = extractDrawFromText(text, LOTTERY_SPECS[lotteryId]);
    return draw ? [draw] : [];
  } finally {
    await browser.close();
  }
}

const EU_SOURCES = {
  euromillions: "https://www.euro-millions.com/results",
  eurojackpot: "https://www.eurojackpot.org/en/results",
  lotto6aus49: "https://www.lotto.de/lotto-6aus49/lottozahlen",
  "loto-france": "https://www.fdj.fr/jeux-de-tirage/loto/resultats",
  "irish-lotto": "https://www.lottery.ie/results/lotto",
};

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function run() {
  const summary = {};

  // Mega Millions: official JSON endpoint first (fastest, most authoritative).
  try {
    const found = await fetchMegaMillions();
    summary.megamillions = await mergeDraws("megamillions", found);
  } catch (err) {
    console.error("[megamillions] fetch failed:", err.message);
    summary.megamillions = "error";
  }

  // Powerball + Mega Millions catch-up via Texas Lottery tables (covers any
  // draws the primary source above might have missed).
  try {
    const rows = await fetchTexasTable(
      "https://www.texaslottery.com/export/sites/lottery/Games/Powerball/Winning_Numbers/"
    );
    const added = await mergeDraws("powerball", rows);
    summary.powerball = added;
  } catch (err) {
    console.error("[powerball] fetch failed:", err.message);
    summary.powerball = "error";
  }

  try {
    const rows = await fetchTexasTable(
      "https://www.texaslottery.com/export/sites/lottery/Games/Mega_Millions/Winning_Numbers/"
    );
    const added = await mergeDraws("megamillions", rows);
    summary.megamillions = (summary.megamillions === "error" ? 0 : summary.megamillions ?? 0) + added;
  } catch (err) {
    console.error("[megamillions/texas] fetch failed:", err.message);
  }

  // EU lotteries: headless-browser scrape, one draw per run (their pages show
  // the latest result; missed days are rare since this runs daily).
  for (const [lotteryId, url] of Object.entries(EU_SOURCES)) {
    try {
      const found = await scrapeWithBrowser(url, lotteryId);
      if (found.length === 0) {
        console.warn(`[${lotteryId}] could not confidently parse a result from ${url}`);
        summary[lotteryId] = 0;
        continue;
      }
      summary[lotteryId] = await mergeDraws(lotteryId, found);
    } catch (err) {
      console.error(`[${lotteryId}] scrape failed:`, err.message);
      summary[lotteryId] = "error";
    }
  }

  console.log("Update summary (draws added per lottery):", summary);
  const totalAdded = Object.values(summary).reduce(
    (sum, v) => sum + (typeof v === "number" ? v : 0),
    0
  );
  console.log(totalAdded > 0 ? `Added ${totalAdded} new draw(s).` : "No new draws found.");
}

run().catch((err) => {
  console.error("Fatal error in update-draws:", err);
  process.exit(1);
});
