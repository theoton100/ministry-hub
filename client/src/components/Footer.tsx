import { Link } from "wouter";
import { MINISTRY_NAME, LOGO } from "@/lib/constants";
import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background/80">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={LOGO} alt={MINISTRY_NAME} className="w-9 h-9 rounded-full object-cover" />
              <span className="font-serif font-semibold text-lg text-background">
                {MINISTRY_NAME}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-background/60 max-w-xs">
              Bringing the Word of God to every heart through preaching, teaching, and community. You are loved, you are valued, and God has a plan for your life.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-semibold text-background">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { href: "/watch", label: "Watch Sermons" },
                { href: "/listen", label: "Listen to Podcast" },
                { href: "/blog", label: "Read Blog" },
                { href: "/about", label: "About Pastor Theo" },
                { href: "/newsletter", label: "Newsletter" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-background/60 hover:text-primary transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-semibold text-background">Stay Connected</h4>
            <p className="text-sm text-background/60">
              Subscribe to our newsletter for weekly inspiration, devotionals, and ministry updates delivered to your inbox.
            </p>
            <Link
              href="/newsletter"
              className="inline-block px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Subscribe Now
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">
            &copy; {currentYear} {MINISTRY_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-background/40 flex items-center gap-1">
            Built with <Heart className="h-3 w-3 text-primary fill-primary" /> for the Kingdom
          </p>
        </div>
      </div>
    </footer>
  );
}
