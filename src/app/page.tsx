import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import { album, members, site } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* Hero — tiled Golden Flower collage */}
      <section
        role="img"
        aria-label="Golden Flower"
        className="h-[72vh] max-h-[820px] min-h-[440px] w-full bg-[#161310]"
        style={{
          backgroundImage: "url('/hero-collage.webp')",
          backgroundRepeat: "repeat",
          backgroundSize: "clamp(300px, 40vw, 560px) auto",
          backgroundPosition: "center",
        }}
      />
      <h1 className="sr-only">Golden Flower — Orlando Progressive Jazz</h1>

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
            <Image
              src="/album-cover.png"
              alt={`${album.title} album cover`}
              width={1400}
              height={1400}
              sizes="(max-width: 768px) 90vw, 448px"
              className="w-full max-w-md rounded-2xl border border-line shadow-lg"
            />
          </div>
        </div>
      </section>

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
              <details key={m.name} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                  <span>
                    <span className="text-lg font-semibold text-ink">
                      {m.name}
                    </span>
                    <span className="mt-1 block text-sm uppercase tracking-[0.15em] text-teal">
                      {m.role}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="relative h-4 w-4 flex-none text-blue transition-transform duration-300 group-open:rotate-45"
                  >
                    <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-current" />
                  </span>
                </summary>
                <p className="max-w-prose pb-6 text-base leading-relaxed text-ink-soft">
                  {m.bio}
                </p>
              </details>
            ))}
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
