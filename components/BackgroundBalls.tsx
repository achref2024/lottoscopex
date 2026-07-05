// Soft, blurred lottery-ball shapes floating behind all page content — a
// subtle decorative layer that keeps the site's signature green backdrop
// while adding some visual depth. Purely decorative, so it's aria-hidden
// and never intercepts clicks.
const BALLS: { color: string; top: string; left: string; size: number }[] = [
  { color: "#5B7FD6", top: "4%", left: "6%", size: 220 },
  { color: "#D4AF37", top: "10%", left: "82%", size: 260 },
  { color: "#D6488F", top: "42%", left: "-2%", size: 200 },
  { color: "#2FBF6E", top: "60%", left: "90%", size: 240 },
  { color: "#F2811D", top: "82%", left: "12%", size: 210 },
  { color: "#8B5CF6", top: "28%", left: "48%", size: 170 },
  { color: "#C1554B", top: "95%", left: "60%", size: 190 },
];

export default function BackgroundBalls() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {BALLS.map((ball, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            top: ball.top,
            left: ball.left,
            width: ball.size,
            height: ball.size,
            background: ball.color,
            opacity: 0.14,
          }}
        />
      ))}
    </div>
  );
}
