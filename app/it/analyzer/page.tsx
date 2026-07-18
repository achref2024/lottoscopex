import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import AnalyzerPage from "@/components/AnalyzerPage";
import { buildAnalyzerMetadata } from "@/lib/lotteryPage";

export const metadata: Metadata = buildAnalyzerMetadata("it");

export default function Page() {
  return (
    <PageShell lang="it">
      <AnalyzerPage />
    </PageShell>
  );
}
