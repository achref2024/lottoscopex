import { ReactNode } from "react";

/**
 * Shared layout for the site's static trust/legal pages (About, Privacy,
 * Terms, Contact). These are plain server-rendered prose pages — no
 * translations needed, since they only exist in English — styled to match
 * the rest of the dark-green LottoScopeX theme.
 */
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <section className="border-b border-felt-800 bg-felt-950 px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">{title}</h1>
          {updated && <p className="mt-3 text-sm text-mist-500">Last updated: {updated}</p>}
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <div
          className="space-y-4 text-sm leading-relaxed text-mist-400 sm:text-base
          [&_h2]:mb-2 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:first:mt-0
          [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5
          [&_a]:font-semibold [&_a]:text-gold [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-gold-light"
        >
          {children}
        </div>
      </section>
    </div>
  );
}
