import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import AnalyzerPage from "@/components/AnalyzerPage";
import { buildAnalyzerMetadata } from "@/lib/lotteryPage";

export const metadata: Metadata = buildAnalyzerMetadata("de");

export default function Page() {
  return (
    <PageShell lang="de">
      <AnalyzerPage />
    </PageShell>
  );
}
