import Link from "next/link";
import { site } from "@/lib/site";

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M13.5 21v-7h2.4l.4-2.9h-2.8V9.2c0-.85.24-1.43 1.46-1.43H16V5.2A19 19 0 0 0 13.9 5c-2.1 0-3.5 1.28-3.5 3.63V11H8v2.9h2.4V21h3.1Z" />
    </svg>
  );
}
function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M22 12s0-3.3-.42-4.88a2.55 2.55 0 0 0-1.8-1.8C18.2 4.9 12 4.9 12 4.9s-6.2 0-7.78.42a2.55 2.55 0 0 0-1.8 1.8C2 8.7 2 12 2 12s0 3.3.42 4.88a2.55 2.55 0 0 0 1.8 1.8C5.8 19.1 12 19.1 12 19.1s6.2 0 7.78-.42a2.55 2.55 0 0 0 1.8-1.8C22 15.3 22 12 22 12ZM10 15.1V8.9l5.2 3.1-5.2 3.1Z" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/shows"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-blue"
        >
          Shows
        </Link>

        <Link
          href="/"
          className="font-serif text-2xl font-semibold leading-none tracking-tight text-blue sm:text-[1.7rem]"
          style={{ fontVariationSettings: '"SOFT" 0, "WONK" 0' }}
        >
          Golden Flower
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-3 text-ink-soft sm:flex">
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-colors hover:text-blue"
            >
              <IconInstagram />
            </a>
            <a
              href={site.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition-colors hover:text-blue"
            >
              <IconFacebook />
            </a>
            <a
              href={site.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="transition-colors hover:text-blue"
            >
              <IconYouTube />
            </a>
          </div>
          <a
            href={site.bandcamp}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-blue px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-blue transition-colors hover:bg-blue hover:text-paper"
          >
            Listen
          </a>
        </div>
      </nav>
    </header>
  );
}
