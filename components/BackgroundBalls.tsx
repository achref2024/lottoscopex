import { LOTTERIES } from "@/lib/lotteries";

// Glossy, 3D-looking lottery balls floating behind all page content — the
// site's signature green backdrop stays exactly as it is, these just sit
// in front of it as decoration. Each ball borrows its color gradient from
// one of the 7 real lotteries on the site. Purely decorative, so it's
// aria-hidden and never intercepts clicks.
const POSITIONS: { top: string; left: string; size: number; number?: number }[] = [
  { top: "-6%", left: "4%", size: 260, number: 7 },
  { top: "6%", left: "78%", size: 320, number: 34 },
  { top: "38%", left: "-8%", size: 240, number: 23 },
  { top: "58%", left: "86%", size: 300, number: 19 },
  { top: "80%", left: "8%", size: 230, number: 41 },
  { top: "22%", left: "45%", size: 190 },
  { top: "92%", left: "58%", size: 250, number: 16 },
];

export default function BackgroundBalls() {
  const balls = LOTTERIES.map((lottery, i) => ({
    ...POSITIONS[i % POSITIONS.length],
    from: lottery.gradient[0],
    to: lottery.gradient[1],
  }));

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {balls.map((ball, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: ball.top,
            left: ball.left,
            width: ball.size,
            height: ball.size,
            opacity: 0.38,
            background: `radial-gradient(circle at 30% 24%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 28%), radial-gradient(circle at 35% 30%, ${ball.from} 0%, ${ball.to} 72%)`,
            boxShadow: `0 18px 36px -12px rgba(0,0,0,0.5), inset -16px -16px 32px rgba(0,0,0,0.4), inset 6px 6px 14px rgba(255,255,255,0.15)`,
          }}
        >
          {ball.number !== undefined && (
            <span
              className="font-fun absolute inset-0 flex items-center justify-center font-bold text-white"
              style={{ fontSize: ball.size * 0.32, opacity: 0.55 }}
            >
              {ball.number}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
