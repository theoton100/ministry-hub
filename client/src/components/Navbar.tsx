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
  { href: "/about", label: "About" },
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
        backgroundColor: scrolled ? 'rgba(10, 14, 39, 0.98)' : 'rgba(10, 14, 39, 0.90)',
        backdropFilter: 'blur(12px)',
        borderColor: scrolled ? 'rgba(255,140,66,0.2)' : 'rgba(255,255,255,0.08)',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <nav className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <img src={LOGO_LIGHT} alt={MINISTRY_NAME} className="h-10 object-contain group-hover:opacity-80 transition-opacity" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-sm ${
                  isActive
                    ? "text-[#ff8c42]"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#ff8c42] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Link href="/give">
            <Button className="bg-[#ff8c42] hover:bg-[#ff7a2a] text-[#0a0e27] font-bold text-sm h-10 px-6 rounded-sm">
              Give
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-white hover:bg-white/10 hover:text-[#ff8c42]"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-0 border-white/10" style={{ backgroundColor: '#0a0e27' }}>
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-white/10">
                <img src={LOGO_LIGHT} alt={MINISTRY_NAME} className="h-10 object-contain" />
              </div>
              <div className="flex-1 py-4 overflow-y-auto">
                {navLinks.map((link) => {
                  const isActive = location === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between px-6 py-4 text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? "text-[#ff8c42] bg-white/5 border-l-2 border-[#ff8c42]"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#ff8c42]" />
                      )}
                    </Link>
                  );
                })}
              </div>
              <div className="p-6 border-t border-white/10 space-y-3">
                <Link href="/give" onClick={() => setOpen(false)}>
                  <Button className="w-full bg-[#ff8c42] hover:bg-[#ff7a2a] text-[#0a0e27] font-bold text-sm h-11 rounded-sm">
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
