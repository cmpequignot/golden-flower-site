import Link from "next/link";
import EyeMark from "@/components/EyeMark";
import NewsletterForm from "@/components/NewsletterForm";
import { album, members, site } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 md:grid-cols-[1.3fr_1fr]">
          <div>
            <h1 className="font-serif text-6xl font-semibold leading-[0.95] tracking-tight text-blue sm:text-7xl md:text-8xl">
              Golden
              <br />
              Flower
            </h1>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.35em] text-teal">
              {site.tagline}
            </p>
          </div>
          <div className="mx-auto w-full max-w-xs md:max-w-none">
            <EyeMark className="w-full" />
          </div>
        </div>
      </section>

      {/* Out now marquee */}
      <section className="border-y border-line/70 bg-teal text-paper">
        <div className="flex overflow-hidden whitespace-nowrap py-3">
          <div className="animate-[marquee_22s_linear_infinite] flex shrink-0">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="mx-6 text-sm font-semibold uppercase tracking-[0.3em]"
              >
                Out Now
              </span>
            ))}
          </div>
          <div
            aria-hidden
            className="animate-[marquee_22s_linear_infinite] flex shrink-0"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="mx-6 text-sm font-semibold uppercase tracking-[0.3em]"
              >
                Out Now
              </span>
            ))}
          </div>
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
            <div className="w-full max-w-sm rounded-2xl border border-line bg-paper-alt p-8">
              <EyeMark className="w-full" />
              <p className="mt-6 text-center font-serif text-xl text-blue">
                {album.title}
              </p>
              <p className="mt-1 text-center text-xs uppercase tracking-[0.2em] text-ink-soft">
                {album.year} · {album.label}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the band */}
      <section className="border-t border-line/70 bg-paper-alt">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="font-serif text-4xl font-semibold text-blue sm:text-5xl">
            Meet the Band
          </h2>
          <ul className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((m) => (
              <li key={m.name} className="border-t border-line pt-4">
                <p className="text-lg font-semibold text-ink">{m.name}</p>
                <p className="text-sm uppercase tracking-[0.15em] text-teal">
                  {m.role}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

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
