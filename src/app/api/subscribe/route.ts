import { NextResponse } from "next/server";

/**
 * Newsletter / interest signup.
 * Writes the email into an Airtable table once these env vars are set:
 *   AIRTABLE_TOKEN            personal access token (scope: data.records:write)
 *   AIRTABLE_BASE_ID          e.g. appXXXXXXXXXXXXXX
 *   AIRTABLE_SUBSCRIBERS_TABLE  table name/id, e.g. "Subscribers"
 * Until then it returns a clear "not configured yet" error.
 */
export async function POST(request: Request) {
  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_SUBSCRIBERS_TABLE;

  if (!token || !baseId || !table) {
    return NextResponse.json(
      { error: "Signups aren't connected yet — check back soon." },
      { status: 503 },
    );
  }

  const res = await fetch(
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              Email: email,
              "Signed Up": new Date().toISOString(),
            },
          },
        ],
      }),
    },
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Couldn't save your signup. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
