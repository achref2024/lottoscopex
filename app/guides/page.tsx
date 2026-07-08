import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { SITE_URL } from "@/lib/lotteryPage";

const TITLE = "Lottery Guides";
const DESCRIPTION =
  "Plain-language guides to how lottery odds work, what hot and cold numbers mean, how jackpot rollovers work, and how Europe's biggest lotteries compare.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/guides` },
};

const GUIDES = [
  {
    href: "/guides/how-lottery-odds-work",
    title: "How Lottery Odds Actually Work",
    description:
      "The real math behind jackpot odds, with a computed comparison table across all 7 lotteries.",
  },
  {
    href: "/guides/hot-and-cold-numbers",
    title: "What Are Hot and Cold Lottery Numbers?",
    description:
      "What the terms mean, how they're calculated, and why they don't predict the next draw.",
  },
  {
    href: "/guides/what-is-a-lottery-rollover",
    title: "What Does 'Rollover' Mean in the Lottery?",
    description:
      "Why jackpots roll over, why a long streak isn't a sign a win is 'due', and where to see real rollover history.",
  },
  {
    href: "/guides/euromillions-vs-eurojackpot",
    title: "EuroMillions vs EuroJackpot: What's the Difference?",
    description:
      "Same odds, same draw days — here's what actually sets Europe's two biggest lotteries apart.",
  },
];

export default function Page() {
  return (
    <PageShell lang="en">
      <section className="border-b border-felt-800 bg-felt-950 px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">{TITLE}</h1>
          <p className="mt-3 text-sm text-mist-400 sm:text-base">{DESCRIPTION}</p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {GUIDES.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="group rounded-2xl border border-felt-800 bg-felt-900 p-6 transition-colors hover:border-gold/40"
            >
              <h2 className="font-display text-lg font-bold text-white group-hover:text-gold-light">
                {g.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-mist-400">{g.description}</p>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-sm text-mist-500">
          Looking for the exact formulas behind every statistic on the site? See our{" "}
          <Link href="/methodology" className="font-semibold text-gold underline underline-offset-2 hover:text-gold-light">
            methodology page
          </Link>
          .
        </p>
      </section>
    </PageShell>
  );
}
