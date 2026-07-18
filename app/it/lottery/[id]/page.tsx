import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LOTTERIES } from "@/lib/lotteries";
import { getLotteryPageData, buildLotteryMetadata, buildLotteryJsonLd, buildLotteryBreadcrumbJsonLd } from "@/lib/lotteryPage";
import LotteryPageClient from "@/components/LotteryPageClient";
import PageShell from "@/components/PageShell";

export function generateStaticParams() {
  return LOTTERIES.map((l) => ({ id: l.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  return buildLotteryMetadata("it", params.id);
}

export default function LotteryPage({ params }: { params: { id: string } }) {
  const data = getLotteryPageData(params.id);
  if (!data) notFound();
  const { config, draws, last100, frequency, hot, cold, ranges, probability, trends } = data;

  const jsonLd = buildLotteryJsonLd("it", config.id, draws, hot);
  const breadcrumbJsonLd = buildLotteryBreadcrumbJsonLd("it", config.id);

  return (
    <PageShell lang="it">
      {jsonLd && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.datasetJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqJsonLd) }}
          />
        </>
      )}
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}
      <LotteryPageClient
        config={config}
        draws={draws}
        frequency={frequency}
        hot={hot}
        cold={cold}
        ranges={ranges}
        probability={probability}
        trends={trends}
        last100Length={last100.length}
      />
    </PageShell>
  );
}
