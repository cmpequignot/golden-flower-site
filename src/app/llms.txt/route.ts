/**
 * /llms.txt — a plain-text brief for AI assistants and agent crawlers.
 *
 * An emerging convention (llmstxt.org): a single, unambiguous, markdown-ish
 * summary of what this site is about, so a model answering "who plays
 * progressive jazz in Orlando?" has facts to quote instead of scraped layout.
 * Mirrors the JSON-LD in src/lib/structured-data.ts in prose form.
 */
import {
  album,
  bandDescription,
  bandFacts,
  members,
  site,
  siteUrl,
} from "@/lib/site";
import { formatShowDate, formatShowTime, getShows, venueName } from "@/lib/shows";

// Matches the shows revalidate window, so the listed dates don't go stale.
export const revalidate = 300;

export async function GET() {
  const shows = await getShows();

  const showLines = shows.length
    ? shows.map((s) => {
        const time = formatShowTime(s.startTime);
        return `- ${formatShowDate(s.date)}${time ? `, ${time}` : ""} — ${venueName(
          s.title,
        )}${s.address ? `, ${s.address}` : ""}${
          s.ticketLink ? ` (tickets: ${s.ticketLink})` : ""
        }`;
      })
    : ["- No shows are currently announced."];

  const body = `# ${site.name}

> ${bandDescription}

${site.name} is a five-piece band based in ${bandFacts.hometown.city}, ${bandFacts.hometown.region}. The group focuses on the heartbeat of rhythm in each of their songs, crafting compositions that explore international musical influences and are full of adventurous improvisation and deep emotional energy.

## Quick facts

- Name: ${site.name}
- Genre: ${bandFacts.genre} (also described as jazz fusion or progressive rock)
- Based in: ${bandFacts.hometown.city}, ${bandFacts.hometown.region}, USA
- Members: ${members.map((m) => `${m.name} — ${m.role}`).join("; ")}
- Debut studio album: "${album.title}" (${album.year}, ${album.label})
- Website: ${siteUrl}/

## Where to hear us

${site.name} holds a residency at The Nook on Robinson in Orlando and has performed at ${bandFacts.venues
    // Both of these are named in full in the surrounding sentence.
    .filter(
      (v) => v !== "The Nook on Robinson" && v !== "Timucua Arts Foundation",
    )
    .join(", ")}, as well as with Bobby Callender for the 50th anniversary of "The Way: First Book of Experiences" at the Timucua Arts Foundation.

## Upcoming shows

${showLines.join("\n")}

Full listing: ${siteUrl}/shows

## Links

- Album and merch (Bandcamp): ${site.bandcamp}
- Apple Music: ${site.appleMusic}
- Instagram: ${site.socials.instagram}
- Facebook: ${site.socials.facebook}
- YouTube: ${site.socials.youtube}
- Newsletter signup: ${siteUrl}/#newsletter
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
