/**
 * schema.org structured data.
 *
 * Emitted as JSON-LD so search engines and AI assistants can read the band as
 * an *entity* — who we are, what genre, where we're based, and which shows are
 * coming up — rather than inferring it from prose. This is what backs rich
 * results for concerts and what conversational search tends to quote.
 */
import { album, bandDescription, bandFacts, members, site, siteUrl } from "./site";
import { showDateTimeISO, venueName, type Show } from "./shows";

/** Stable @id for the band, so other nodes can reference it instead of
 *  repeating the whole object. */
export const BAND_ID = `${siteUrl}/#band`;

const ogImage = `${siteUrl}/og-band.jpg`;

const hometown = {
  "@type": "Place",
  name: `${bandFacts.hometown.city}, ${bandFacts.hometown.region}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: bandFacts.hometown.city,
    addressRegion: bandFacts.hometown.state,
    addressCountry: bandFacts.hometown.country,
  },
} as const;

export function musicGroupJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "@id": BAND_ID,
    name: site.name,
    url: `${siteUrl}/`,
    description: bandDescription,
    // Several genre strings: people ask for "prog jazz", "jazz fusion" and
    // "progressive jazz" interchangeably.
    genre: [bandFacts.genre, "Jazz fusion", "Progressive rock", "Jazz"],
    image: ogImage,
    logo: `${siteUrl}/logo.png`,
    foundingLocation: hometown,
    location: hometown,
    areaServed: hometown,
    sameAs: [
      site.bandcamp,
      site.appleMusic,
      site.socials.instagram,
      site.socials.facebook,
      site.socials.youtube,
    ],
    member: members.map((m) => ({
      "@type": "OrganizationRole",
      roleName: m.role,
      member: { "@type": "Person", name: m.name },
    })),
    album: {
      "@type": "MusicAlbum",
      name: album.title,
      datePublished: String(album.year),
      image: `${siteUrl}/album-cover.png`,
      byArtist: { "@id": BAND_ID },
      recordLabel: { "@type": "Organization", name: album.label },
      offers: {
        "@type": "Offer",
        url: album.buyUrl,
        availability: "https://schema.org/InStock",
      },
    },
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: `${site.name} — ${site.tagline}`,
    description: bandDescription,
    publisher: { "@id": BAND_ID },
    inLanguage: "en-US",
  };
}

/** One MusicEvent per upcoming show, wrapped in an @graph. */
export function musicEventsJsonLd(shows: Show[]) {
  const events = shows.map((show) => {
    const venue = venueName(show.title);
    return {
      "@type": "MusicEvent",
      name: `${site.name} at ${venue}`,
      startDate: showDateTimeISO(show.date, show.startTime),
      ...(show.endTime
        ? { endDate: showDateTimeISO(show.date, show.endTime) }
        : {}),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      url: `${siteUrl}/shows`,
      ...(show.description ? { description: show.description } : {}),
      ...(show.imageUrl ? { image: show.imageUrl } : {}),
      location: {
        "@type": "Place",
        name: venue,
        ...(show.address
          ? { address: { "@type": "PostalAddress", streetAddress: show.address } }
          : {}),
      },
      performer: { "@id": BAND_ID },
      ...(show.ticketLink
        ? {
            offers: {
              "@type": "Offer",
              url: show.ticketLink,
              availability: "https://schema.org/InStock",
            },
          }
        : {}),
    };
  });

  return { "@context": "https://schema.org", "@graph": events };
}
