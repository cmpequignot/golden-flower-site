/**
 * Shows data. Reads from Airtable when configured, otherwise returns [].
 *
 * Reads the "Shows (for Claude)" table in the Golden Flower base. Fields used:
 *   ID (formula, e.g. "Golden Flower at The Nook | 2026-08-07"; used as title),
 *   Venue Name (lookup, title fallback), Show Date (date),
 *   Address (from Venue) (lookup), Start Time, End Time, Description,
 *   Ticket Link, Venue Image (from Venue) (attachment lookup)
 * Past shows (Show Date before today in Eastern time) are filtered out;
 * results are sorted soonest-first.
 *
 * Env vars:
 *   AIRTABLE_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_SHOWS_TABLE
 */
export type Show = {
  id: string;
  title: string; // venue name
  date: string; // normalized YYYY-MM-DD
  startTime?: string;
  endTime?: string;
  address?: string;
  mapUrl?: string;
  description?: string;
  ticketLink?: string;
  imageUrl?: string; // venue photo (Airtable attachment URL; expires ~2h)
};

type AirtableRecord = {
  id: string;
  fields: Record<string, unknown>;
};

// The band is Orlando-based; "today" and clock times are Eastern, not UTC.
// Using UTC would drop a show from the site at 8pm ET on the night it happens,
// because UTC has already rolled over to the next day by then.
const SHOW_TIME_ZONE = "America/New_York";

/** YYYY-MM-DD for a moment, as seen in the band's timezone ("en-CA" = ISO). */
function isoDateInZone(d: Date): string {
  return d.toLocaleDateString("en-CA", { timeZone: SHOW_TIME_ZONE });
}

/** Lookup fields come back as arrays; unwrap to the first string value. */
function firstString(value: unknown): string | undefined {
  if (Array.isArray(value)) value = value[0];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

/**
 * Normalize an Airtable date to YYYY-MM-DD.
 *
 * Date fields return ISO already, but a *formula* field renders dates in US
 * style ("8/7/2026"). That matters: the past-show filter compares date strings,
 * and "8/7/2026" sorts after "2026-09-16" lexicographically, so an unnormalized
 * US-style date slips past the filter and every past show stays on the page.
 */
function toISODate(value: unknown): string | undefined {
  const raw = firstString(value);
  if (!raw) return undefined;

  // Already a plain ISO date — Airtable's format for date-only fields.
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;

  // US-style M/D/YYYY, as rendered by formula fields.
  const us = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(raw);
  if (us) {
    return `${us[3]}-${us[1].padStart(2, "0")}-${us[2].padStart(2, "0")}`;
  }

  // Anything else parseable (e.g. a full datetime) — resolve to its local day.
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? undefined : isoDateInZone(d);
}

type AirtableAttachment = {
  url?: string;
  thumbnails?: { large?: { url?: string } };
};

/**
 * Pull an image URL out of an attachment value, preferring the "large"
 * thumbnail. A lookup of an attachment field can arrive nested one level deep
 * ([[{...}]]) rather than flat ([{...}]), so flatten before reading — an
 * unflattened nested array reads as an object with no `url` and yields no image.
 */
function firstAttachmentUrl(value: unknown): string | undefined {
  const items = Array.isArray(value) ? value.flat(2) : [value];
  for (const item of items) {
    if (!item || typeof item !== "object") continue;
    const att = item as AirtableAttachment;
    const url = att.thumbnails?.large?.url ?? att.url;
    if (url) return url;
  }
  return undefined;
}

/** Column names the venue photo has plausibly been given in Airtable. */
const VENUE_IMAGE_FIELDS = [
  "Venue Image (from Venue)",
  "Venue Image",
  "Venue Photo (from Venue)",
  "Venue Photo",
  "Image (from Venue)",
  "Photo (from Venue)",
];

/**
 * Find the venue photo. Checks the known column names first, then falls back to
 * any image/photo-ish column holding an attachment, so renaming the column in
 * Airtable doesn't silently blank out every photo on the page.
 */
function venueImageUrl(fields: Record<string, unknown>): string | undefined {
  for (const name of VENUE_IMAGE_FIELDS) {
    const url = firstAttachmentUrl(fields[name]);
    if (url) return url;
  }
  for (const [name, value] of Object.entries(fields)) {
    if (!/image|photo|picture/i.test(name)) continue;
    const url = firstAttachmentUrl(value);
    if (url) return url;
  }
  return undefined;
}

function mapUrl(address?: string): string | undefined {
  if (!address) return undefined;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address,
  )}`;
}

export async function getShows(): Promise<Show[]> {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_SHOWS_TABLE;

  if (!token || !baseId || !table) return [];

  const url = new URL(
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
  );
  url.searchParams.set("sort[0][field]", "Show Date");
  url.searchParams.set("sort[0][direction]", "asc");

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    // Airtable attachment URLs expire about two hours after they're issued, and
    // "today" is evaluated whenever this page renders. Both go stale if the page
    // is cached for long, so refresh every 5 minutes: photos stay well inside
    // their validity window and past shows drop off promptly.
    next: { revalidate: 300 },
  });

  if (!res.ok) return [];

  const data = (await res.json()) as { records: AirtableRecord[] };
  const today = isoDateInZone(new Date());

  return data.records
    .map((r): Show => {
      const address = firstString(r.fields["Address (from Venue)"]);
      return {
        id: r.id,
        // The "ID" formula is "Golden Flower at <Venue> | <Date>"; drop the
        // trailing "| <Date>" since the date is shown on its own line.
        title:
          firstString(r.fields["ID"])?.split("|")[0].trim() ??
          firstString(r.fields["Venue Name"]) ??
          "Golden Flower show",
        date: toISODate(r.fields["Show Date"]) ?? "",
        startTime: firstString(r.fields["Start Time"]),
        endTime: firstString(r.fields["End Time"]),
        address,
        mapUrl: mapUrl(address),
        description: firstString(r.fields["Description"]),
        ticketLink: firstString(r.fields["Ticket Link"]),
        imageUrl: venueImageUrl(r.fields),
      };
    })
    // hide past shows (both sides are now YYYY-MM-DD, so string compare is safe)
    .filter((s) => s.date && s.date >= today);
}

export function formatShowDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + (iso.length === 10 ? "T00:00:00" : ""));
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatShowTime(value?: string): string | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value; // not a datetime — show as-is
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: SHOW_TIME_ZONE,
  });
}
