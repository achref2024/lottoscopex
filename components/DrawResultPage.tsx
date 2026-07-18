import Link from "next/link";
import { Draw, LotteryConfig } from "@/lib/types";
import { DrawInsights } from "@/lib/analytics";
import { formatDate } from "@/lib/format";
import DrawCard from "./DrawCard";

/**
 * A dedicated, English-only static page for a single historical draw —
 * e.g. /lottery/euromillions/results/2026-07-03. Exists to capture the
 * long-tail "[lottery] results [date]" searches that the site's evergreen
 * per-lottery pages can't, one real page per real draw already in our data.
 */
export default function DrawResultPage({
  config,
  draw,
  prevDraw,
  prevDrawHasPage = true,
  nextDraw,
  insights,
  drawNumber,
  totalDraws,
}: {
  config: LotteryConfig;
  draw: Draw;
  prevDraw: Draw | null;
  prevDrawHasPage?: boolean;
  nextDraw: Draw | null;
  insights: DrawInsights;
  drawNumber: number;
  totalDraws: number;
}) {
  const dateLabel = formatDate(draw.date);

  return (
    <div>
      <section className="border-b border-felt-800 bg-felt-950 px-5 pb-10 pt-10 sm:px-8 sm:pt-14">
        <div className="mx-auto max-w-4xl">
          <nav className="mb-3 flex flex-wrap items-center gap-1.5 text-xs font-medium text-mist-500">
            <Link href="/" className="hover:text-white">
              LottoScopeX
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={`/lottery/${config.id}`} className="hover:text-white">
              {config.name}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-mist-400">Results</span>
          </nav>
          <h1 className="font-fun text-2xl font-bold tracking-wide sm:text-3xl" style={{ color: config.accent }}>
            {config.name} results — {dateLabel}
          </h1>
          <p className="mt-2 text-sm text-mist-500">
            Draw {drawNumber} of {totalDraws} in our records for {config.name}.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
        <DrawCard draw={draw} config={config} highlight animate={false} />

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          {prevDraw && prevDrawHasPage ? (
            <Link
              href={`/lottery/${config.id}/results/${prevDraw.date}`}
              className="flex items-center gap-2 rounded-full border border-felt-800 bg-felt-900 px-4 py-2 text-sm font-semibold text-mist-300 transition-colors hover:border-gold/40 hover:text-white"
            >
              ← {formatDate(prevDraw.date)}
            </Link>
          ) : prevDraw ? (
            <Link
              href={`/lottery/${config.id}#history`}
              className="flex items-center gap-2 rounded-full border border-felt-800 bg-felt-900 px-4 py-2 text-sm font-semibold text-mist-300 transition-colors hover:border-gold/40 hover:text-white"
            >
              ← Browse older draws
            </Link>
          ) : (
            <span />
          )}
          {nextDraw ? (
            <Link
              href={`/lottery/${config.id}/results/${nextDraw.date}`}
              className="flex items-center gap-2 rounded-full border border-felt-800 bg-felt-900 px-4 py-2 text-sm font-semibold text-mist-300 transition-colors hover:border-gold/40 hover:text-white"
            >
              {formatDate(nextDraw.date)} →
            </Link>
          ) : (
            <span />
          )}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-felt-800 bg-felt-900 p-6">
            <h2 className="mb-4 font-display text-lg font-bold text-white">Number breakdown</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-felt-800 pb-3">
                <dt className="text-mist-500">Odd / even split</dt>
                <dd className="font-semibold text-white">
                  {insights.oddCount} odd, {insights.evenCount} even
                </dd>
              </div>
              <div className="flex justify-between border-b border-felt-800 pb-3">
                <dt className="text-mist-500">Sum of main numbers</dt>
                <dd className="font-semibold text-white">{insights.sum}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-mist-500">Lowest — highest</dt>
                <dd className="font-semibold text-white">
                  {insights.lowest} — {insights.highest}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-felt-800 bg-felt-900 p-6">
            <h2 className="mb-4 font-display text-lg font-bold text-white">Range spread</h2>
            <div className="space-y-2.5">
              {insights.rangeCounts.map(({ bucket, count }) => (
                <div key={bucket.key} className="flex items-center gap-3">
                  <span className="w-14 shrink-0 text-xs font-semibold text-mist-500">{bucket.label}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-felt-800">
                    <div
                      className="h-full rounded-full bg-gold"
                      style={{ width: `${(count / config.main.count) * 100}%` }}
                    />
                  </div>
                  <span className="w-4 shrink-0 text-right text-xs font-semibold text-white">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {(insights.consecutivePairs.length > 0 || prevDraw) && (
          <div className="mt-4 rounded-2xl border border-felt-800 bg-felt-900 p-6">
            <h2 className="mb-3 font-display text-lg font-bold text-white">Worth noting</h2>
            <ul className="space-y-2 text-sm text-mist-400">
              {insights.consecutivePairs.length > 0 && (
                <li>
                  This draw included {insights.consecutivePairs.length === 1 ? "a" : insights.consecutivePairs.length}{" "}
                  back-to-back {insights.consecutivePairs.length === 1 ? "pair" : "pairs"}:{" "}
                  {insights.consecutivePairs.map(([a, b]) => `${a} & ${b}`).join(", ")}.
                </li>
              )}
              {prevDraw &&
                (insights.repeatedFromPrevious.length > 0 ? (
                  <li>
                    {insights.repeatedFromPrevious.length} number
                    {insights.repeatedFromPrevious.length > 1 ? "s" : ""} ({insights.repeatedFromPrevious.join(", ")})
                    also appeared in the previous draw ({formatDate(prevDraw.date)}).
                  </li>
                ) : (
                  <li>None of this draw's numbers appeared in the previous draw ({formatDate(prevDraw.date)}).</li>
                ))}
            </ul>
          </div>
        )}

        <div className="mt-10 rounded-2xl border border-gold/30 bg-gold/10 p-6 text-center">
          <p className="text-sm text-mist-300">
            Want the bigger picture? See full frequency stats, hot &amp; cold numbers, and probability patterns for{" "}
            {config.name} on the main stats page.
          </p>
          <Link
            href={`/lottery/${config.id}`}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-black transition-transform hover:scale-105"
          >
            View {config.name} statistics →
          </Link>
        </div>

        <p className="mt-8 text-center text-xs text-mist-600">
          Lottery draws are random. This page reports what already happened — it does not predict future results.
        </p>
      </section>
    </div>
  );
}
