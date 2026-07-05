import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import HomePage from "@/components/HomePage";
import { buildHomeMetadata } from "@/lib/lotteryPage";

export const metadata: Metadata = buildHomeMetadata("en");

export default function Page() {
  return (
    <PageShell lang="en">
      <HomePage />
    </PageShell>
  );
}
