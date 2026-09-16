import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      // Driven by Airtable, so it turns over far more often than the home page.
      url: `${siteUrl}/shows`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
