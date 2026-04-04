import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { MINISTRY_NAME, LOGO_LIGHT } from "@/lib/constants";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/watch", label: "Watch" },
  { href: "/listen", label: "Podcast" },
  { href: "/blog", label: "Blog" },
  { href: "/store", label: "Books" },
  { href: "/give", label: "Give" },
  { href: "/about", label: "About" },
  { href: "/newsletter", label: "Subscribe" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(32, 28, 29, 0.98)' : 'rgba(32, 28, 29, 0.85)',
        backdropFilter: 'blur(12px)',
        borderColor: scrolled ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <nav className="container flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <img src={LOGO_LIGHT} alt={MINISTRY_NAME} className="h-12 object-contain group-hover:opacity-80 transition-opacity" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const isActive = location === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 text-[13px] font-semibold transition-colors rounded-sm ${
                  isActive
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Spacer */}
        <div className="hidden lg:block w-24 shrink-0" />

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-white hover:bg-white/10 hover:text-white"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-0 border-white/10" style={{ backgroundColor: '#201c1d' }}>
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col h-full">
              <div className="p-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <img src={LOGO_LIGHT} alt={MINISTRY_NAME} className="h-12 object-contain" />
                </div>
              </div>
              <div className="flex-1 py-2 overflow-y-auto">
                {navLinks.map((link) => {
                  const isActive = location === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between px-5 py-3.5 text-sm font-semibold transition-colors ${
                        isActive
                          ? "text-white bg-white/5 border-l-2 border-brand"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                      )}
                    </Link>
                  );
                })}
              </div>
              <div className="p-5 border-t border-white/10">
                <Link href="/give" onClick={() => setOpen(false)}>
                  <Button className="w-full bg-brand hover:bg-brand-hover text-[#231f20] font-bold text-sm h-10 rounded-sm">
                    Give Now
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
