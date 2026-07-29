import Image from "next/image";
import Link from "next/link";
import AlbumArt3D from "@/components/AlbumArt3D";
import NewsletterForm from "@/components/NewsletterForm";
import { album, members, site } from "@/lib/site";
import { formatShowDate, formatShowTime, getShows } from "@/lib/shows";

export default async function Home() {
  const nextShow = (await getShows())[0];

  return (
    <>
      {/* Hero — tiled Golden Flower collage */}
      <section
        className="relative flex h-[72vh] max-h-[820px] min-h-[440px] w-full items-center justify-center bg-[#161310]"
        style={{
          backgroundImage: "url('/hero-collage.webp')",
          backgroundRepeat: "repeat",
          backgroundSize: "clamp(300px, 40vw, 560px) auto",
          backgroundPosition: "center",
        }}
      >
        {/* Scrim keeps the headings legible over the busy collage. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/40"
        />
        <div className="relative px-5 text-center sm:px-8">
          <h1 className="font-serif text-5xl font-semibold text-paper drop-shadow-lg sm:text-7xl lg:text-8xl">
            {site.name}
          </h1>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.3em] text-paper/85 drop-shadow sm:mt-6 sm:text-base sm:tracking-[0.4em]">
            {site.tagline}
          </p>
        </div>
      </section>

      {/* Album feature */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose">
              Debut Studio Album
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-blue sm:text-5xl">
              {album.title}
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
              Our first studio album is here. Order your physical or digital copy
              today.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={album.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-blue px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-paper transition-colors hover:bg-blue-deep"
              >
                Buy Now
              </a>
              <a
                href={site.bandcamp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-blue px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-blue transition-colors hover:bg-blue hover:text-paper"
              >
                Listen
              </a>
            </div>
          </div>
          <div className="order-1 flex justify-center md:order-2">
            <AlbumArt3D
              src="/album-cover.png"
              alt={`${album.title} album cover`}
              className="w-full max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Upcoming shows — highlight the next one, link to the full list */}
      {nextShow && (
        <section className="border-t border-line/70 bg-paper-alt">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-serif text-4xl font-semibold text-blue sm:text-5xl">
                Upcoming Shows
              </h2>
              <Link
                href="/shows"
                className="rounded-full border border-blue px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.15em] text-blue transition-colors hover:bg-blue hover:text-paper"
              >
                See All
              </Link>
            </div>

            <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-paper md:grid md:grid-cols-2">
              {/* Plain <img>: Airtable URLs are dynamic/expiring, so next/image optimization isn't a fit. */}
              {nextShow.imageUrl && (
                <img
                  src={nextShow.imageUrl}
                  alt=""
                  className="h-56 w-full object-cover md:h-full"
                />
              )}
              <div className="p-6 sm:p-8">
                <h3 className="font-serif text-2xl font-semibold text-blue sm:text-3xl">
                  {nextShow.title}
                </h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.15em] text-teal">
                  {formatShowDate(nextShow.date)}
                  {formatShowTime(nextShow.startTime) &&
                    ` · ${formatShowTime(nextShow.startTime)}`}
                  {formatShowTime(nextShow.endTime) &&
                    ` – ${formatShowTime(nextShow.endTime)}`}
                </p>
                {nextShow.address && (
                  <p className="mt-1 text-ink-soft">
                    {nextShow.mapUrl ? (
                      <a
                        href={nextShow.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue"
                      >
                        {nextShow.address}
                      </a>
                    ) : (
                      nextShow.address
                    )}
                  </p>
                )}
                {nextShow.description && (
                  <p className="mt-4 leading-relaxed text-ink-soft">
                    {nextShow.description}
                  </p>
                )}
                {nextShow.ticketLink && (
                  <a
                    href={nextShow.ticketLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block rounded-full bg-blue px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.15em] text-paper transition-colors hover:bg-blue-deep"
                  >
                    Tickets & Info
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Band photo */}
      <div className="relative aspect-[3/2] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
        <Image
          src="/band-photo.jpg"
          alt="Golden Flower band members"
          fill
          sizes="100vw"
          priority
          className="object-cover object-[center_30%]"
        />
      </div>

      {/* Bio */}
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="space-y-6 text-lg leading-relaxed text-ink-soft">
          <p>
            Forged in the heat of Florida comes one of the most exciting new
            voices in progressive jazz — Golden Flower is a progressive jazz band
            based in Orlando. The group focuses on the heartbeat of rhythm in
            each of their songs, intricately crafting compositions that explore
            international musical influences and are full of adventurous
            improvisation and deep emotional energy. Blending eclectic styles of
            progressive rock, jazz, funk, South American musics, South Asian
            musics, and electronic dance music, Golden Flower finds a sound and
            genre all of its own.
          </p>
          <p>
            Golden Flower has a residency at The Nook on Robinson in Orlando and
            has performed at the Dr. Phillips Center, City Arts for the In-Between
            Series, the Orlando Fringe Festival, and with Bobby Callender for the
            50th anniversary of The Way: First Book of Experiences at the Timucua
            Arts Foundation. Its members have also performed with other acclaimed
            acts on national and international tours.
          </p>
        </div>
        <Link
          href="/shows"
          className="mt-8 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-blue hover:text-blue-deep"
        >
          See upcoming shows →
        </Link>
      </section>

      {/* Video */}
      <section className="mx-auto max-w-4xl px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-black shadow-lg">
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube-nocookie.com/embed/5Ktoz_LW96s"
            title="Golden Flower — live performance"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </section>

      {/* Meet the band */}
      <section className="border-t border-line/70 bg-paper-alt">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="font-serif text-4xl font-semibold text-blue sm:text-5xl">
            Meet the Band
          </h2>
          <div className="mt-10 max-w-3xl border-t border-line">
            {members.map((m) => (
              <div key={m.name} className="border-b border-line py-5">
                <span className="text-lg font-semibold text-ink">
                  {m.name}
                </span>
                <span className="mt-1 block text-sm uppercase tracking-[0.15em] text-teal">
                  {m.role}
                </span>
              </div>
            ))}
            {/* Bio accordions hidden until real member bios are written.
                Restore the <details>/<summary> version (git history) to bring
                back the expandable "+" bios. */}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-line/70 bg-blue text-paper">
        <div className="mx-auto max-w-2xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
            Join our newsletter
          </h2>
          <p className="mx-auto mt-4 max-w-md text-paper/80">
            Sign up with your email address to receive news and updates, show and
            album release announcements, and more.
          </p>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
