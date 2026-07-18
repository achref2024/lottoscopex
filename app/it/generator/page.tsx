import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import GeneratorPage from "@/components/GeneratorPage";
import { buildGeneratorMetadata } from "@/lib/lotteryPage";

export const metadata: Metadata = buildGeneratorMetadata("it");

export default function Page() {
  return (
    <PageShell lang="it">
      <GeneratorPage />
    </PageShell>
  );
}
