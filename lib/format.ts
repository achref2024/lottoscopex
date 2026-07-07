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
