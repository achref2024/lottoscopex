"use client";

import Link from "next/link";
import { LOTTERIES } from "@/lib/lotteries";
import { getDraws } from "@/lib/data";
import LotteryCard from "@/components/LotteryCard";
import AdSlot from "@/components/AdSlot";
import HeroBallsAnimation from "@/components/HeroBallsAnimation";
import { useLang } from "@/components/LanguageProvider";

const ICON = {
  frequency: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M5 19V10M12 19V5M19 19v-7" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  hotcold: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2c1 3-3 4-3 7.5a3 3 0 006 0c1.2 1 2 2.6 2 4.3A5.8 5.8 0 0112 19.6a5.8 5.8 0 01-5-8.9C8.2 8.4 10.5 6.6 12 2z" stroke="#D4AF37" strokeWidth="1.6" />
    </svg>
  ),
  ranges: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="10" width="4" height="10" rx="1" stroke="#D4AF37" strokeWidth="1.6" />
      <rect x="10" y="6" width="4" height="14" rx="1" stroke="#D4AF37" strokeWidth="1.6" />
      <rect x="17" y="3" width="4" height="17" rx="1" stroke="#D4AF37" strokeWidth="1.6" />
    </svg>
  ),
  probability: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9-6.3 3.9 1.7-7L2 9.2l7.1-.6z" stroke="#D4AF37" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
};

export default function HomePage() {
  const { t } = useLang();
  const cards = LOTTERIES.map((config) => ({
    config,
    latest: getDraws(config.id)[0],
  }));

  const tags = [
    t("hero.tagFrequency"),
    t("hero.tagHotCold"),
    t("hero.tagRanges"),
    t("hero.tagProbability"),
  ];

  const features = [
    { title: t("features.frequencyTitle"), desc: t("features.frequencyDesc"), icon: ICON.frequency },
    { title: t("features.hotColdTitle"), desc: t("features.hotColdDesc"), icon: ICON.hotcold },
    { title: t("features.rangesTitle"), desc: t("features.rangesDesc"), icon: ICON.ranges },
    { title: t("features.probabilityTitle"), desc: t("features.probabilityDesc"), icon: ICON.probability },
  ];

  return (
    <div>
      <section className="px-5 pb-10 pt-16 sm:px-8 sm:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-felt-800 bg-felt-900 px-4 py-1.5 text-xs font-semibold text-mist-400">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {t("hero.badge")}
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
            {t("hero.titleLine1")}{" "}
            <span className="text-gold">{t("hero.titleLine2")}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-mist-400 sm:text-lg">
            {t("hero.subtitle")}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold-light"
              >
                {tag}
              </span>
            ))}
          </div>
          <HeroBallsAnimation />
        </div>
      </section>

      <section id="how-it-works" className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              {t("features.heading")}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-mist-500">
              {t("features.subheading")}
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <Link
                key={f.title}
                href="#choose-lottery"
                className="group block rounded-2xl border border-felt-800 bg-felt-900 p-6 transition-all duration-200 hover:border-gold/40 hover:shadow-glow"
              >
                <div className="mb-4">{f.icon}</div>
                <h3 className="mb-1.5 text-lg font-bold text-white">
                  {f.title}
                </h3>
                <p className="text-sm text-mist-500">{f.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gold opacity-0 transition-opacity group-hover:opacity-100">
                  {t("features.viewStats")} →
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/methodology"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light"
            >
              {t("features.methodologyLink")} →
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AdSlot slot="0000000000" label="Advertisement" minHeight={100} />
      </div>

      <section id="choose-lottery" className="mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  {t("chooseLottery.heading")}
                </h2>
                <p className="mt-1 text-mist-500">
                  {t("chooseLottery.subheading")}
                </p>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {cards.map(({ config, latest }, i) => (
                <LotteryCard key={config.id} config={config} latest={latest} index={i} />
              ))}
            </div>
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <AdSlot slot="0000000001" label="Advertisement" minHeight={600} />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
