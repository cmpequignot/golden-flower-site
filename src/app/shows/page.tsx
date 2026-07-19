import type { Metadata } from "next";
import { formatShowDate, getShows } from "@/lib/shows";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shows — Golden Flower",
  description: "Upcoming Golden Flower shows and events.",
};

export default async function ShowsPage() {
  const shows = await getShows();

  return (
    <>
      <section className="border-b border-line/70 bg-paper-alt">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <h1 className="font-serif text-5xl font-semibold text-blue sm:text-6xl">
            Upcoming Shows
            <span className="text-teal">.</span>
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        {shows.length === 0 ? (
          <div className="rounded-2xl border border-line bg-paper-alt p-10 text-center">
            <p className="text-lg text-ink-soft">
              No shows are posted right now. Follow us on{" "}
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue hover:text-blue-deep"
              >
                Instagram
              </a>{" "}
              for the latest announcements.
            </p>
          </div>
        ) : (
          <ul className="space-y-8">
            {shows.map((show) => (
              <li
                key={show.id}
                className="rounded-2xl border border-line bg-paper p-6 sm:p-8"
              >
                <h2 className="font-serif text-2xl font-semibold text-blue sm:text-3xl">
                  {show.title}
                </h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.15em] text-teal">
                  {formatShowDate(show.date)}
                  {show.startTime && ` · ${show.startTime}`}
                  {show.endTime && ` – ${show.endTime}`}
                </p>
                {show.venue && (
                  <p className="mt-1 text-ink-soft">
                    {show.venueLink ? (
                      <a
                        href={show.venueLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue"
                      >
                        {show.venue}
                      </a>
                    ) : (
                      show.venue
                    )}
                  </p>
                )}
                {show.description && (
                  <p className="mt-4 leading-relaxed text-ink-soft">
                    {show.description}
                  </p>
                )}
                {show.ticketLink && (
                  <a
                    href={show.ticketLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block rounded-full bg-blue px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.15em] text-paper transition-colors hover:bg-blue-deep"
                  >
                    Tickets & Info
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
