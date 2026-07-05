// Glossy, 3D-looking lottery balls floating behind all page content — same
// glossy-sphere treatment as classic lottery sites (bright shine spot, deep
// shading, drop shadow), but recolored to the site's own green-and-white
// palette instead of a competitor's colors. Purely decorative, so it's
// aria-hidden and never intercepts clicks.
const BALLS: { top: string; left: string; size: number; number?: number; from: string; to: string }[] = [
  { top: "-6%", left: "4%", size: 260, number: 7, from: "#6EE7A8", to: "#0F7048" },
  { top: "6%", left: "78%", size: 320, number: 34, from: "#8FF0BC", to: "#0B5C3A" },
  { top: "38%", left: "-8%", size: 240, number: 23, from: "#5FD99B", to: "#157A4C" },
  { top: "58%", left: "86%", size: 300, number: 19, from: "#7CE8AE", to: "#0F7048" },
  { top: "80%", left: "8%", size: 230, number: 41, from: "#A8E0C4", to: "#1C8A5A" },
  { top: "22%", left: "45%", size: 190, from: "#6EE7A8", to: "#0B5C3A" },
  { top: "92%", left: "58%", size: 250, number: 16, from: "#8FF0BC", to: "#157A4C" },
];

export default function BackgroundBalls() {
  const balls = BALLS;

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
            opacity: 0.5,
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
