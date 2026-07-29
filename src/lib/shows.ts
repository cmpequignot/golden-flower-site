/**
 * Shows data. Reads from Airtable when configured, otherwise returns [].
 *
 * Reads the "Shows (for Claude)" table in the Golden Flower base. Fields used:
 *   ID (formula, e.g. "Golden Flower at The Nook | 2026-08-07"; used as title),
 *   Venue Name (lookup, title fallback), Show Date (date),
 *   Address (from Venue) (lookup), Start Time, End Time, Description,
 *   Ticket Link, Venue Image (from Venue) (attachment lookup)
 * Past shows (Show Date before today) are filtered out; results are sorted
 * soonest-first.
 *
 * Env vars:
 *   AIRTABLE_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_SHOWS_TABLE
 */
export type Show = {
  id: string;
  title: string; // venue name
  date: string;
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

/** Lookup fields come back as arrays; unwrap to the first string value. */
function firstString(value: unknown): string | undefined {
  if (Array.isArray(value)) value = value[0];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

type AirtableAttachment = {
  url?: string;
  thumbnails?: { large?: { url?: string } };
};

/** Attachment lookups come back as arrays; prefer the "large" thumbnail. */
function firstAttachmentUrl(value: unknown): string | undefined {
  const first = Array.isArray(value) ? value[0] : value;
  if (!first || typeof first !== "object") return undefined;
  const att = first as AirtableAttachment;
  return att.thumbnails?.large?.url ?? att.url;
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
    // revalidate hourly so new shows appear without a redeploy
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];

  const data = (await res.json()) as { records: AirtableRecord[] };
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)

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
        date: firstString(r.fields["Show Date"]) ?? "",
        startTime: firstString(r.fields["Start Time"]),
        endTime: firstString(r.fields["End Time"]),
        address,
        mapUrl: mapUrl(address),
        description: firstString(r.fields["Description"]),
        ticketLink: firstString(r.fields["Ticket Link"]),
        imageUrl: firstAttachmentUrl(r.fields["Venue Image (from Venue)"]),
      };
    })
    // hide past shows (ISO date strings compare correctly lexicographically)
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

// The band is Orlando-based; Airtable stores Start/End Time as UTC datetimes,
// so render them as clock times in Eastern rather than the raw ISO string.
const SHOW_TIME_ZONE = "America/New_York";

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
