/**
 * EyeMark — the Golden Flower "eye" motif from the Are You Even Awake? cover:
 * concentric rounded-square line frames in brand blue, with a central
 * vesica/eye of teal and dusty-rose rings.
 */
export default function EyeMark({
  className,
  frames = true,
}: {
  className?: string;
  /** show the nested square frames around the eye */
  frames?: boolean;
}) {
  const rings = Array.from({ length: 8 }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Golden Flower eye emblem"
      fill="none"
    >
      <defs>
        {/* almond / vesica lens shape for the eye */}
        <clipPath id="eye-lens">
          <path d="M 40 100 Q 100 55 160 100 Q 100 145 40 100 Z" />
        </clipPath>
      </defs>

      {frames &&
        rings.map((i) => {
          const inset = 4 + i * 10;
          const size = 200 - inset * 2;
          return (
            <rect
              key={i}
              x={inset}
              y={inset}
              width={size}
              height={size}
              rx={20 - i * 1.5}
              stroke="var(--gf-blue)"
              strokeWidth={1.4}
              opacity={0.9}
            />
          );
        })}

      {/* the eye */}
      <g clipPath="url(#eye-lens)">
        <rect x="30" y="55" width="140" height="90" fill="var(--gf-teal)" />
        <circle cx="100" cy="100" r="34" fill="var(--gf-rose)" />
        <circle cx="100" cy="100" r="27" fill="var(--gf-teal)" />
        <circle cx="100" cy="100" r="18" fill="var(--gf-rose)" />
      </g>
      <path
        d="M 40 100 Q 100 55 160 100 Q 100 145 40 100 Z"
        stroke="var(--gf-blue)"
        strokeWidth={1.6}
      />
    </svg>
  );
}
