import type { MetadataRoute } from "next";
import { getShows } from "@/lib/shows";
import { siteUrl } from "@/lib/site";

// Matches the shows revalidate window, so /shows' date follows Airtable.
export const revalidate = 300;

/**
 * lastModified is only given where we know a real date. Google ignores
 * lastmod on sites where it changes on every build, so a made-up date is worse
 * than none.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const shows = await getShows();

  // The newest upcoming show is the last time /shows gained a listing. (Edits
  // to an existing show aren't visible here; that would need a "Last
  // Modified" field in Airtable.)
  const newestShow = shows
    .map((s) => s.createdTime)
    .filter((t): t is string => Boolean(t))
    .sort()
    .at(-1);

  return [
    {
      // Hand-edited content with no reliable change date, so none is given.
      url: `${siteUrl}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/shows`,
      ...(newestShow ? { lastModified: newestShow } : {}),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
