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
