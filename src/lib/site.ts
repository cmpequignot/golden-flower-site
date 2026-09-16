/** Central site content / config. */

/**
 * Canonical origin, used for metadataBase, canonical links, the sitemap, and
 * structured data. Override per-environment with NEXT_PUBLIC_SITE_URL (e.g. a
 * Vercel preview URL); the trailing slash is stripped so callers can always
 * append a path.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.goldenflowermusic.com"
).replace(/\/+$/, "");

export const site = {
  name: "Golden Flower",
  tagline: "Orlando Progressive Jazz",
  bandcamp: "https://goldenflower.bandcamp.com/",
  appleMusic: "https://music.apple.com/us/artist/golden-flower/567630055",
  socials: {
    instagram: "http://instagram.com/goldenflowermusic",
    facebook: "https://www.facebook.com/goldenflowermusic",
    youtube: "https://www.youtube.com/@GoldenFlowerMusic22",
  },
} as const;

/**
 * Canonical prose about the band, shared by the meta description, the
 * MusicGroup structured data, and /llms.txt so every consumer — search engine,
 * social card, or AI crawler — gets the same answer.
 */
export const bandDescription =
  "Golden Flower is a progressive jazz band based in Orlando, Florida, blending progressive rock, jazz, funk, South American and South Asian music, and electronic dance music into a sound of its own.";

/** Facts used to build the MusicGroup structured data. */
export const bandFacts = {
  genre: "Progressive jazz",
  hometown: { city: "Orlando", state: "FL", region: "Florida", country: "US" },
  /** Venues and series the band is associated with — real-world anchors that
   *  help search engines and AI assistants place the band in a local scene. */
  venues: [
    "The Nook on Robinson",
    "Dr. Phillips Center for the Performing Arts",
    "City Arts Orlando",
    "Orlando Fringe Festival",
    "Timucua Arts Foundation",
  ],
} as const;

export const members = [
  { name: "Caitlin Pequignot", role: "Violin, Effects" },
  { name: "Shawn Villanueva", role: "Trumpet, Flugelhorn, Effects" },
  { name: "Patrick Moreno", role: "Rhodes, Piano, Effects" },
  { name: "Brandon Kyle Miller", role: "Upright Bass, Electric Bass, Effects" },
  { name: "Cameron Gholami", role: "Drums, Percussion" },
] as const;

export const album = {
  title: "Are You Even Awake?",
  year: 2025,
  label: "Romantic Poker Records",
  buyUrl: "https://goldenflower.bandcamp.com/",
} as const;
