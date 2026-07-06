import { BADGES } from "@/lib/badges";

/**
 * A glossy 3D-sphere flag-crest badge for a lottery — original artwork
 * combining that lottery's real national/EU flag colors with its name,
 * rendered as a premium glass/lacquer ball (highlight + rim shading), sized
 * to drop in wherever a lottery's identity is shown (cards, headers, nav).
 */
export default function LotteryBadge({ id, size = 64 }: { id: string; size?: number }) {
  const spec = BADGES[id];
  if (!spec) return null;

  const r = 68; // fixed internal geometry, scaled via the outer <svg> size
  const uid = `badge-${id}`;
  const [c1, c2, c3] = spec.colors;

  return (
    <svg
      width={size}
      height={size}
      viewBox="-70 -70 140 140"
      role="img"
      aria-label={`${spec.label.join(" ")} badge`}
      className="shrink-0 drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)]"
    >
      <defs>
        <clipPath id={uid}>
          <circle r={r} />
        </clipPath>
        <radialGradient id={`${uid}-rim`} cx="50%" cy="88%" r="65%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.55)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <radialGradient id={`${uid}-hl`} cx="32%" cy="24%" r="55%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0.22)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      <g clipPath={`url(#${uid})`}>
        {spec.pattern === "eu" && (
          <>
            <rect x={-r} y={-r} width={r * 2} height={r * 2} fill={c1} />
            <g fill={spec.accent}>
              {Array.from({ length: 10 }).map((_, i) => {
                const angle = (i / 10) * Math.PI * 2 - Math.PI / 2;
                const cx = Math.cos(angle) * 48;
                const cy = Math.sin(angle) * 48;
                return <circle key={i} cx={cx} cy={cy} r={3.4} />;
              })}
            </g>
          </>
        )}

        {spec.pattern === "stripes-h" && (
          <>
            <rect x={-r} y={-r} width={r * 2} height={(r * 2) / 3} fill={c1} />
            <rect x={-r} y={-r + (r * 2) / 3} width={r * 2} height={(r * 2) / 3} fill={c2} />
            <rect x={-r} y={-r + (2 * (r * 2)) / 3} width={r * 2} height={(r * 2) / 3} fill={c3} />
          </>
        )}

        {spec.pattern === "stripes-v" && (
          <>
            <rect x={-r} y={-r} width={(r * 2) / 3} height={r * 2} fill={c1} />
            <rect x={-r + (r * 2) / 3} y={-r} width={(r * 2) / 3} height={r * 2} fill={c2} />
            <rect x={-r + (2 * (r * 2)) / 3} y={-r} width={(r * 2) / 3} height={r * 2} fill={c3} />
          </>
        )}

        {spec.pattern === "us" && (
          <>
            {Array.from({ length: 7 }).map((_, i) => (
              <rect
                key={i}
                x={-r}
                y={-r + i * (r / 3.5)}
                width={r * 2}
                height={r / 3.5}
                fill={i % 2 === 0 ? c1 : c2}
              />
            ))}
            <rect x={-r} y={-r} width={r} height={r} fill={c3} />
          </>
        )}
      </g>

      <circle r={r} fill="none" stroke="#F4F1E8" strokeWidth={4} />

      <circle r={46} fill="#0B5C3A" opacity={0.9} />

      {spec.icon === "shamrock" && (
        <path
          d="M0 -35 c-9 -12 -28 -6 -22 8 c3 7 13 10 22 16 c9 -6 19 -9 22 -16 c6 -14 -13 -20 -22 -8z"
          fill="#4ADE80"
          transform="translate(0,3)"
        />
      )}

      <text
        y={spec.icon ? 18 : -2}
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight={800}
        fontSize={spec.label[0].length > 6 ? 12 : 15}
        fill="#fff"
      >
        {spec.label[0]}
      </text>
      <text
        y={spec.icon ? 32 : 17}
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight={800}
        fontSize={spec.label[1].length > 6 ? 11 : 13}
        fill={spec.accent}
      >
        {spec.label[1]}
      </text>

      {/* Glossy 3D sphere finish: bottom rim shading + upper-left specular highlight. */}
      <circle r={r} fill={`url(#${uid}-rim)`} pointerEvents="none" />
      <circle r={r} fill={`url(#${uid}-hl)`} pointerEvents="none" />
    </svg>
  );
}
