/**
 * Shows data. Reads from Airtable when configured, otherwise returns [].
 *
 * Expected Airtable "Shows" table fields:
 *   Title, Date (date), Start Time, End Time, Venue, Venue Link,
 *   Description, Ticket Link, Published (checkbox)
 *
 * Env vars:
 *   AIRTABLE_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_SHOWS_TABLE
 */
export type Show = {
  id: string;
  title: string;
  date: string;
  startTime?: string;
  endTime?: string;
  venue?: string;
  venueLink?: string;
  description?: string;
  ticketLink?: string;
};

type AirtableRecord = {
  id: string;
  fields: Record<string, string | boolean | undefined>;
};

export async function getShows(): Promise<Show[]> {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_SHOWS_TABLE;

  if (!token || !baseId || !table) return [];

  const url = new URL(
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
  );
  url.searchParams.set("filterByFormula", "{Published}");
  url.searchParams.set("sort[0][field]", "Date");
  url.searchParams.set("sort[0][direction]", "asc");

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    // revalidate hourly so new shows appear without a redeploy
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];

  const data = (await res.json()) as { records: AirtableRecord[] };
  return data.records.map((r) => ({
    id: r.id,
    title: String(r.fields.Title ?? "Untitled show"),
    date: String(r.fields.Date ?? ""),
    startTime: r.fields["Start Time"] as string | undefined,
    endTime: r.fields["End Time"] as string | undefined,
    venue: r.fields.Venue as string | undefined,
    venueLink: r.fields["Venue Link"] as string | undefined,
    description: r.fields.Description as string | undefined,
    ticketLink: r.fields["Ticket Link"] as string | undefined,
  }));
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
