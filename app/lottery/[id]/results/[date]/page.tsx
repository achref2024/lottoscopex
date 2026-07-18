import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LOTTERIES, getLottery } from "@/lib/lotteries";
import { getDraws, getDrawsWithResultPage, RESULT_PAGE_COUNT } from "@/lib/data";
import { getDrawInsights } from "@/lib/analytics";
import { formatDate } from "@/lib/format";
import { SITE_URL, buildResultsBreadcrumbJsonLd } from "@/lib/lotteryPage";
import PageShell from "@/components/PageShell";
import DrawResultPage from "@/components/DrawResultPage";

export function generateStaticParams() {
  return LOTTERIES.flatMap((lottery) => {
    const draws = getDrawsWithResultPage(lottery.id);
    return draws.map((draw) => ({ id: lottery.id, date: draw.date }));
  });
}

function loadDraw(id: string, date: string) {
  const config = getLottery(id);
  if (!config) return null;
  const draws = getDraws(id); // newest-first
  const index = draws.findIndex((d) => d.date === date);
  if (index === -1) return null;
  if (index >= RESULT_PAGE_COUNT) return null; // no dedicated page beyond the recent cutoff

  const draw = draws[index];
  const prevDraw = draws[index + 1] ?? null; // chronologically before, for insight comparisons
  const prevDrawHasPage = index + 1 < RESULT_PAGE_COUNT; // whether prevDraw also has its own page to link to
  const nextDraw = index > 0 ? draws[index - 1] : null; // chronologically after
  const insights = getDrawInsights(draw, prevDraw, config);
  // drawNumber counted oldest-first for a natural "draw N of total" reading
  const drawNumber = draws.length - index;

  return { config, draw, prevDraw, prevDrawHasPage, nextDraw, insights, drawNumber, totalDraws: draws.length };
}

export function generateMetadata({ params }: { params: { id: string; date: string } }): Metadata {
  const data = loadDraw(params.id, params.date);
  if (!data) return {};
  const { config, draw } = data;
  const dateLabel = formatDate(draw.date);
  const numbers = [...draw.main, ...draw.bonus].join(", ");

  const title = `${config.name} results — ${dateLabel}`;
  const description = `${config.name} winning numbers for ${dateLabel}: ${numbers}. See the full number breakdown, range spread, and how this draw compares to the previous one.`;
  const canonical = `${SITE_URL}/lottery/${config.id}/results/${draw.date}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
    twitter: { title, description },
  };
}

export default function Page({ params }: { params: { id: string; date: string } }) {
  const data = loadDraw(params.id, params.date);
  if (!data) notFound();

  const dateLabel = formatDate(data.draw.date);
  const breadcrumbJsonLd = buildResultsBreadcrumbJsonLd(
    data.config.id,
    data.config.name,
    dateLabel,
    data.draw.date
  );

  return (
    <PageShell lang="en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <DrawResultPage
        config={data.config}
        draw={data.draw}
        prevDraw={data.prevDraw}
        prevDrawHasPage={data.prevDrawHasPage}
        nextDraw={data.nextDraw}
        insights={data.insights}
        drawNumber={data.drawNumber}
        totalDraws={data.totalDraws}
      />
    </PageShell>
  );
}
