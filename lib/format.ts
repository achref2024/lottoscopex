export function formatDate(iso: string, locale = "en-GB"): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString(locale, {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatShortDate(iso: string, locale = "en-GB"): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString(locale, {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  });
}

export function formatMoney(millions: number, currency = "EUR"): string {
  const symbol = currency === "EUR" ? "€" : currency === "USD" ? "$" : currency;
  return `${symbol}${millions.toFixed(1)}M`;
}

export function formatMoneyRange(min: number, max: number, currency = "EUR"): string {
  const symbol = currency === "EUR" ? "€" : currency === "USD" ? "$" : currency;
  return `${symbol}${min}M – ${symbol}${max}M`;
}

/** Returns the ISO date (YYYY-MM-DD) of the next upcoming draw, based on the
 * lottery's weekly draw days (0 = Sunday ... 6 = Saturday). Checks today
 * first: if today is a draw day and we don't already have a recorded result
 * for today (via latestDrawDate), today IS the next draw. Otherwise looks
 * forward to the next matching day. */
export function getNextDrawISO(
  drawDays: number[],
  from: Date = new Date(),
  latestDrawDate?: string
): string {
  for (let i = 0; i <= 7; i++) {
    const d = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate() + i));
    const iso = d.toISOString().slice(0, 10);
    if (drawDays.includes(d.getUTCDay()) && iso !== latestDrawDate) {
      return iso;
    }
  }
  return from.toISOString().slice(0, 10);
}

/**
 * Converts a local wall-clock time in a given IANA timezone to a UTC
 * timestamp (ms), correctly accounting for that zone's DST offset on the
 * specific date given — not just a fixed UTC offset, which would drift by an
 * hour for half the year in zones that observe daylight saving time.
 */
function zonedTimeToUtcMs(dateISO: string, time: string, timeZone: string): number {
  const [hh, mm] = time.split(":").map(Number);
  const [y, m, d] = dateISO.split("-").map(Number);
  // Treat the wall-clock time as if it were already UTC, then measure how far
  // off that same instant reads in the target timezone, and correct by that
  // difference — the standard dependency-free zoned-time conversion trick.
  const naiveUtcMs = Date.UTC(y, m - 1, d, hh, mm, 0);
  const naive = new Date(naiveUtcMs);
  const tzString = naive.toLocaleString("en-US", { timeZone });
  const utcString = naive.toLocaleString("en-US", { timeZone: "UTC" });
  const diff = new Date(utcString).getTime() - new Date(tzString).getTime();
  return naiveUtcMs + diff;
}

/**
 * Returns the exact UTC timestamp (ms) of the next upcoming draw, using each
 * lottery's real published draw time and timezone. Skips a day whose result
 * is already recorded (via latestDrawDate), and skips today's slot entirely
 * if today's draw time has already passed but the result isn't recorded yet
 * (avoids ever showing a negative countdown).
 */
export function getNextDrawTargetMs(
  drawDays: number[],
  drawTimes: Record<number, string>,
  timeZone: string,
  latestDrawDate?: string,
  from: Date = new Date()
): number {
  for (let i = 0; i <= 8; i++) {
    const d = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate() + i));
    const dow = d.getUTCDay();
    if (!drawDays.includes(dow)) continue;
    const iso = d.toISOString().slice(0, 10);
    if (iso === latestDrawDate) continue;
    const time = drawTimes[dow] ?? "20:00";
    const targetMs = zonedTimeToUtcMs(iso, time, timeZone);
    if (targetMs > from.getTime()) return targetMs;
  }
  return from.getTime();
}
