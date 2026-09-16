import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * The wildcard rule below already allows every crawler. The AI and search
 * agents are then named explicitly as a deliberate opt-in: `Google-Extended`
 * in particular gates whether Google may ground AI Overviews and Gemini in
 * this site, and several operators check for their own token by name.
 *
 * Note this file has no say in the preview lockdown — while SITE_PASSWORD is
 * set, `src/proxy.ts` answers every request with a 401 and a noindex header,
 * so no crawler gets as far as robots.txt.
 */
const AI_AND_SEARCH_AGENTS = [
  "Googlebot",
  "Google-Extended",
  "Bingbot",
  "DuckDuckBot",
  "Applebot",
  "Applebot-Extended",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "meta-externalagent",
  "Amazonbot",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_AND_SEARCH_AGENTS, allow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
