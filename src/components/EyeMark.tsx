/**
 * EyeMark — the Golden Flower eye emblem as clean line art.
 * Single-color (defaults to currentColor) so it can be tinted, e.g. the
 * copper/gold from the collage art, and stays legible at small sizes.
 */
export default function EyeMark({
  className,
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 56"
      className={className}
      fill="none"
      role="img"
      aria-hidden
    >
      {/* almond / vesica outline */}
      <path
        d="M3 28 Q50 3 97 28 Q50 53 3 28 Z"
        stroke={color}
        strokeWidth={3}
      />
      {/* iris ring */}
      <circle cx="50" cy="28" r="16" stroke={color} strokeWidth={3} />
      {/* pupil */}
      <circle cx="50" cy="28" r="7" fill={color} />
    </svg>
  );
}
