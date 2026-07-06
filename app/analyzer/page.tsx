import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import AnalyzerPage from "@/components/AnalyzerPage";
import { buildAnalyzerMetadata } from "@/lib/lotteryPage";

export const metadata: Metadata = buildAnalyzerMetadata("en");

export default function Page() {
  return (
    <PageShell lang="en">
      <AnalyzerPage />
    </PageShell>
  );
}
