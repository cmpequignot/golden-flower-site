import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Preview lockdown (Next.js 16 "proxy", formerly middleware).
 *
 * While the SITE_PASSWORD env var is set, the whole site is gated behind HTTP
 * Basic Auth and marked `noindex` so it can be shared privately with the band
 * without showing up in search. To launch publicly, remove SITE_PASSWORD from
 * the environment — this file then becomes a no-op.
 *
 * Username defaults to "goldenflower"; override with SITE_USER.
 */
export function proxy(request: NextRequest) {
  const expectedPassword = process.env.SITE_PASSWORD;

  // No password configured → site is fully public (launch mode).
  if (!expectedPassword) return NextResponse.next();

  const expectedUser = process.env.SITE_USER || "goldenflower";
  const header = request.headers.get("authorization");

  if (header?.startsWith("Basic ")) {
    try {
      const [user, ...rest] = atob(header.slice(6)).split(":");
      const pass = rest.join(":");
      if (user === expectedUser && pass === expectedPassword) {
        const res = NextResponse.next();
        res.headers.set("X-Robots-Tag", "noindex, nofollow");
        return res;
      }
    } catch {
      // malformed header → fall through to the 401 challenge
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Golden Flower preview", charset="UTF-8"',
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

export const config = {
  // Run on every route except Next's static assets and the favicon.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
