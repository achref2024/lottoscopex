// Original, custom-drawn emblems for each lottery — not the operators' trademarks.
// Each one is a simple motif tied to the lottery's theme/country so every card,
// dropdown entry, and detail page has a distinctive mark instead of plain letters.

const ICONS: Record<string, React.ReactNode> = {
  // EuroMillions — faceted gem, for "Europe's biggest jackpot"
  euromillions: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M6 9L12 3L18 9L12 21L6 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6 9H18M9.5 9L12 3L14.5 9M9.5 9L12 21M14.5 9L12 21" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  ),
  // EuroJackpot — rocket, for the jackpot climbing draw after draw
  eurojackpot: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2c2.5 2 4 5.5 4 9 0 2-.5 3.8-1.3 5.3L12 19l-2.7-2.7C8.5 14.8 8 13 8 11c0-3.5 1.5-7 4-9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M8.5 15.5L6 18M15.5 15.5L18 18M10.3 19L12 22L13.7 19"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  // Lotto 6aus49 — six balls, one picked, for "choose 6 from 49"
  lotto6aus49: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7" cy="17" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="17" r="2" fill="currentColor" />
      <circle cx="17" cy="17" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  // Loto (France) — fleur-de-lis, a classic French heraldic emblem
  "loto-france": (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2c-1.2 1.6-1.8 3-1.8 4.4 0 1 .4 1.8 1 2.4-1.6-.2-3-1.2-3.6-2.8-.4 2.4.6 4.6 2.6 5.6-1 .2-2.2 0-3.2-.8.4 2 2.2 3.4 4.2 3.6L11 22h2l-.2-8.6c2-.2 3.8-1.6 4.2-3.6-1 .8-2.2 1-3.2.8 2-1 3-3.2 2.6-5.6-.6 1.6-2 2.6-3.6 2.8.6-.6 1-1.4 1-2.4C13.8 5 13.2 3.6 12 2Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  ),
  // Irish Lotto — shamrock, Ireland's classic emblem
  "irish-lotto": (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M12 12c0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4c1 0 1.9-.4 2.6-1M12 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4c-1 0-1.9-.4-2.6-1M12 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M12 15v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
};

export default function LotteryLogo({ id, size = 22 }: { id: string; size?: number }) {
  const icon = ICONS[id];
  if (!icon) return null;
  return (
    <span style={{ width: size, height: size, display: "inline-flex" }} aria-hidden="true">
      {icon}
    </span>
  );
}
