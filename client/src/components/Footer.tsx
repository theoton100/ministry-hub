import { Link } from "wouter";
import { MINISTRY_NAME, LOGO_LIGHT, SPOTIFY_SHOW_ID } from "@/lib/constants";
import { ArrowRight, Heart, Mail, MapPin } from "lucide-react";

type FooterLink = { href: string; label: string; external?: boolean };

function FooterLink({ link }: { link: FooterLink }) {
  const cls = "text-gray-600 text-sm hover:text-gray-900 transition-colors w-fit flex items-center gap-1 group";
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {link.label}
        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>
    );
  }
  return (
    <Link href={link.href} className={cls}>
      {link.label}
      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 w-fit group">
              <img src={LOGO_LIGHT} alt={MINISTRY_NAME} className="h-10 object-contain group-hover:opacity-80 transition-opacity" />
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Helping people move from confusion to clarity through deep intimacy with God.
            </p>
            <Link href="/give" className="inline-flex items-center gap-2 text-gray-700 text-sm font-bold hover:text-gray-900 transition-colors group">
              <Heart className="h-4 w-4 fill-gray-700" />
              Support the Ministry
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Watch & Listen */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm tracking-wider uppercase text-gray-900">Watch & Listen</h4>
            <div className="flex flex-col gap-3">
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

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm tracking-wider uppercase text-gray-900">Resources</h4>
            <div className="flex flex-col gap-3">
              {([
                { href: "/blog", label: "Blog" },
                { href: "/store", label: "Books & Store" },
                { href: "/newsletter", label: "Newsletter" },
                { href: "/about", label: "About Us" },
              ] as FooterLink[]).map((link) => (
                <FooterLink key={link.label} link={link} />
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm tracking-wider uppercase text-gray-900">Connect</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:theoton100@gmail.com" className="text-gray-600 text-sm hover:text-gray-900 transition-colors flex items-center gap-2 group">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 text-sm hover:text-gray-900 transition-colors flex items-center gap-2 group">
                <span>Instagram</span>
                <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 text-sm hover:text-gray-900 transition-colors flex items-center gap-2 group">
                <span>Facebook</span>
                <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm tracking-wider uppercase text-gray-900">Stay Updated</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Weekly inspiration, devotionals, and ministry updates delivered to your inbox.
            </p>
            <Link href="/newsletter" className="inline-flex items-center gap-2 text-gray-700 text-sm font-bold hover:text-gray-900 transition-colors group">
              Subscribe
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-xs">
              &copy; {currentYear} {MINISTRY_NAME} Ministries. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs">
              Built with faith for the Kingdom of God
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
