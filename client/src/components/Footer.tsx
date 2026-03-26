import { Link } from "wouter";
import { MINISTRY_NAME, LOGO_LIGHT, SPOTIFY_SHOW_ID } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

type FooterLink = { href: string; label: string; external?: boolean };

function FooterLink({ link }: { link: FooterLink }) {
  const cls = "text-white/40 text-xs hover:text-white transition-colors w-fit flex items-center gap-1 group";
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {link.label}
        <ArrowRight className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>
    );
  }
  return (
    <Link href={link.href} className={cls}>
      {link.label}
      <ArrowRight className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10" style={{ backgroundColor: '#201c1d' }}>
      <div className="container py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 w-fit group">
              <img src={LOGO_LIGHT} alt={MINISTRY_NAME} className="w-5 h-8 object-contain group-hover:opacity-80 transition-opacity" />
              <span className="font-extrabold text-sm text-white uppercase group-hover:text-brand transition-colors">{MINISTRY_NAME}</span>
            </Link>
            <p className="text-white/40 text-xs leading-relaxed max-w-xs">
              Bringing the Word of God to every heart through preaching, teaching, and community.
            </p>
            <Link href="/give" className="inline-flex items-center gap-1.5 text-brand text-xs font-bold hover:underline group">
              Support the Ministry
              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Watch */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs tracking-wider uppercase text-white/60">Watch & Listen</h4>
            <div className="flex flex-col gap-2">
              {([
                { href: "/watch", label: "Latest Sermons" },
                { href: "/watch", label: "Sermon Archive" },
                { href: "/listen", label: "Podcast" },
                { href: `https://open.spotify.com/show/${SPOTIFY_SHOW_ID}`, label: "Spotify", external: true },
              ] as FooterLink[]).map((link) => (
                <FooterLink key={link.label} link={link} />
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs tracking-wider uppercase text-white/60">Connect</h4>
            <div className="flex flex-col gap-2">
              {([
                { href: "/blog", label: "Blog" },
                { href: "/store", label: "Books" },
                { href: "/newsletter", label: "Newsletter" },
                { href: "/about", label: "About" },
              ] as FooterLink[]).map((link) => (
                <FooterLink key={link.label} link={link} />
              ))}
            </div>
          </div>

          {/* Subscribe */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs tracking-wider uppercase text-white/60">Stay Updated</h4>
            <p className="text-white/40 text-xs leading-relaxed">
              Weekly inspiration, devotionals, and ministry updates delivered to your inbox.
            </p>
            <Link href="/newsletter" className="inline-flex items-center gap-1.5 text-brand text-xs font-bold hover:underline group">
              Subscribe Now
              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/25 text-[11px]">
            &copy; {currentYear} {MINISTRY_NAME} Ministries. All rights reserved.
          </p>
          <p className="text-white/25 text-[11px]">
            Built with faith for the Kingdom of God
          </p>
        </div>
      </div>
    </footer>
  );
}
