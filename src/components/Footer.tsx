import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line/70 bg-paper-alt">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-10 text-center sm:px-8">
        <p className="font-serif text-xl text-blue">Golden Flower</p>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs uppercase tracking-[0.15em] text-ink-soft">
          <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-blue">
            Instagram
          </a>
          <a href={site.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-blue">
            Facebook
          </a>
          <a href={site.socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-blue">
            YouTube
          </a>
          <a href={site.bandcamp} target="_blank" rel="noopener noreferrer" className="hover:text-blue">
            Bandcamp
          </a>
        </div>
        <p className="text-xs text-ink-soft/80">
          © {new Date().getFullYear()} Golden Flower · {site.tagline}
        </p>
      </div>
    </footer>
  );
}
