/** Central site content / config. */

export const site = {
  name: "Golden Flower",
  tagline: "Orlando Progressive Jazz",
  bandcamp: "https://goldenflower.bandcamp.com/",
  socials: {
    instagram: "http://instagram.com/goldenflowermusic",
    facebook: "https://www.facebook.com/goldenflowermusic",
    youtube: "https://www.youtube.com/@GoldenFlowerMusic22",
  },
} as const;

// NOTE: `bio` values below are placeholder copy so the accordion has content to
// show. Replace each with the member's real bio.
export const members = [
  {
    name: "Caitlin Pequignot",
    role: "Violin, Effects",
    bio: "Placeholder bio — replace with Caitlin's real biography.",
  },
  {
    name: "Shawn Villanueva",
    role: "Trumpet, Flugelhorn, Effects",
    bio: "Placeholder bio — replace with Shawn's real biography.",
  },
  {
    name: "Patrick Moreno",
    role: "Rhodes, Piano, Effects",
    bio: "Placeholder bio — replace with Patrick's real biography.",
  },
  {
    name: "Brandon Kyle Miller",
    role: "Upright Bass, Electric Bass, Effects",
    bio: "Placeholder bio — replace with Brandon's real biography.",
  },
  {
    name: "Cameron Gholami",
    role: "Drums, Percussion",
    bio: "Placeholder bio — replace with Cameron's real biography.",
  },
] as const;

export const album = {
  title: "Are You Even Awake?",
  year: 2025,
  label: "Romantic Poker Records",
  buyUrl: "https://goldenflower.bandcamp.com/",
} as const;
