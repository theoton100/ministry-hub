import { Link } from "wouter";
import { MINISTRY_NAME, LOGO } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white/70">
      {/* Main Footer */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <img src={LOGO} alt={MINISTRY_NAME} className="w-8 h-8 rounded-full object-cover" />
              <span className="font-serif font-bold text-lg text-white">{MINISTRY_NAME}</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Bringing the Word of God to every heart through preaching, teaching, and community. You are loved, you are valued, and God has a plan for your life.
            </p>
          </div>

          {/* Watch */}
          <div className="space-y-4">
            <h4 className="font-semibold text-xs tracking-widest uppercase text-white">Watch</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { href: "/watch", label: "Latest Sermons" },
                { href: "/watch", label: "Sermon Archive" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm hover:text-teal-400 transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-semibold text-xs tracking-widest uppercase text-white">Connect</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { href: "/listen", label: "Podcast" },
                { href: "/blog", label: "Blog" },
                { href: "/newsletter", label: "Newsletter" },
                { href: "/about", label: "About Pastor Theo" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm hover:text-teal-400 transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Stay Updated */}
          <div className="space-y-4">
            <h4 className="font-semibold text-xs tracking-widest uppercase text-white">Stay Updated</h4>
            <p className="text-sm">
              Subscribe to our newsletter for weekly inspiration, devotionals, and ministry updates.
            </p>
            <Link
              href="/newsletter"
              className="inline-block px-5 py-2.5 bg-teal-500 text-white rounded-lg text-xs font-semibold tracking-wider uppercase hover:bg-teal-600 transition-colors"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            &copy; {currentYear} {MINISTRY_NAME} Ministries. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Built with faith for the Kingdom of God
          </p>
        </div>
      </div>
    </footer>
  );
}
