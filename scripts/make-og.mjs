/**
 * Build the 1200x630 social share card at public/og-band.jpg.
 *
 * Usage: node scripts/make-og.mjs [source-image] [focus]
 *   source-image  defaults to public/band-photo.jpg
 *   focus         0 = crop from the top, 1 = from the bottom, 0.5 = centered.
 *                 Default 0.15 — most band photos put faces above center, and
 *                 a straight center crop cuts heads off.
 *
 * Re-run this after swapping in a new photo; 1200x630 is the size Open Graph,
 * X/Twitter, iMessage, Slack and Discord all render without re-cropping.
 */
// sharp ships with Next.js as an optional dependency, so it's normally already
// installed — but "optional" means it can legitimately be missing.
let sharp;
try {
  ({ default: sharp } = await import("sharp"));
} catch {
  console.error("This script needs sharp. Install it with: npm i -D sharp");
  process.exit(1);
}

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const source = process.argv[2] ?? "public/band-photo.jpg";
const focus = Number(process.argv[3] ?? 0.15);
const out = "public/og-band.jpg";

const image = sharp(source);
const { width, height } = await image.metadata();

// Largest rectangle of the OG aspect ratio that fits inside the source: take
// the full width when the source is taller than 1.9:1, the full height when
// it's wider. The crop is centered horizontally and slid to `focus` vertically.
const ratio = OG_WIDTH / OG_HEIGHT;
let cropWidth = width;
let cropHeight = Math.round(width / ratio);
if (cropHeight > height) {
  cropHeight = height;
  cropWidth = Math.round(height * ratio);
}
const top = Math.round((height - cropHeight) * focus);
const left = Math.round((width - cropWidth) / 2);

await image
  .extract({ left, top, width: cropWidth, height: cropHeight })
  .resize(OG_WIDTH, OG_HEIGHT)
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(out);

console.log(
  `${out}: ${OG_WIDTH}x${OG_HEIGHT} from ${source} ` +
    `(${cropWidth}x${cropHeight} at ${left},${top})`,
);
