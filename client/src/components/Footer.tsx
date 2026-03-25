import { Link } from "wouter";
import { MINISTRY_NAME, LOGO_LIGHT, SPOTIFY_SHOW_ID } from "@/lib/constants";

type FooterLink = { href: string; label: string; external?: boolean };

function FooterLink({ link }: { link: FooterLink }) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-black/40 text-xs hover:text-black transition-colors w-fit">
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className="text-black/40 text-xs hover:text-black transition-colors w-fit">
      {link.label}
    </Link>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-black/10">
      <div className="container py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/admin" className="flex items-center gap-2 w-fit">
              <img src={LOGO_LIGHT} alt={MINISTRY_NAME} className="w-5 h-8 object-contain" />
              <span className="font-extrabold text-sm text-black uppercase">{MINISTRY_NAME}</span>
            </Link>
            <p className="text-black/40 text-xs leading-relaxed max-w-xs">
              Bringing the Word of God to every heart through preaching, teaching, and community.
            </p>
          </div>

          {/* Watch */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs tracking-wider uppercase text-black/60">Watch</h4>
            <div className="flex flex-col gap-2">
              {([
                { href: "/watch", label: "Latest Sermons" },
                { href: "/watch", label: "Sermon Archive" },
              ] as FooterLink[]).map((link) => (
                <FooterLink key={link.label} link={link} />
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs tracking-wider uppercase text-black/60">Connect</h4>
            <div className="flex flex-col gap-2">
              {([
                { href: "/listen", label: "Podcast" },
                { href: `https://open.spotify.com/show/${SPOTIFY_SHOW_ID}`, label: "Spotify", external: true },
                { href: "/blog", label: "Blog" },
                { href: "/store", label: "Books" },
                { href: "/give", label: "Give" },
                { href: "/newsletter", label: "Newsletter" },
                { href: "/about", label: "About" },
              ] as FooterLink[]).map((link) => (
                <FooterLink key={link.label} link={link} />
              ))}
            </div>
          </div>

          {/* Subscribe */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs tracking-wider uppercase text-black/60">Stay Updated</h4>
            <p className="text-black/40 text-xs">
              Weekly inspiration and devotionals.
            </p>
            <Link href="/newsletter" className="inline-block text-brand text-xs font-bold hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-black/5">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-black/25 text-[11px]">
            &copy; {currentYear} {MINISTRY_NAME} Ministries. All rights reserved.
          </p>
          <p className="text-black/25 text-[11px]">
            Built with faith for the Kingdom of God
          </p>
        </div>
      </div>
    </footer>
  );
}
