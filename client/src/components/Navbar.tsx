import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { MINISTRY_NAME, LOGO_LIGHT } from "@/lib/constants";
import { useAuth } from "@/_core/hooks/useAuth";

const navLinks = [
  { href: "/watch", label: "WATCH" },
  { href: "/blog", label: "BLOG" },
  { href: "/listen", label: "PODCAST" },
  { href: "/about", label: "ABOUT" },
  { href: "/newsletter", label: "SUBSCRIBE" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-900 text-white shadow-lg">
      <nav className="container flex items-center justify-between h-14 md:h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <img src={LOGO_LIGHT} alt={MINISTRY_NAME} className="w-7 h-10 object-contain" />
          <span className="font-bold text-base md:text-lg tracking-wide text-white">
            {MINISTRY_NAME}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 text-xs font-semibold tracking-widest transition-colors ${
                location === link.href
                  ? "text-teal-400 border-b-2 border-teal-400"
                  : "text-white/80 hover:text-teal-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA + Admin */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {isAuthenticated && user?.role === "admin" && (
            <Link href="/admin">
              <Button variant="outline" size="sm" className="text-xs border-white/30 text-white hover:bg-white/10 hover:text-white">
                Admin
              </Button>
            </Link>
          )}
          <Link href="/newsletter">
            <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold tracking-wider px-5">
              DONATE
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-white hover:bg-white/10">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 p-0 bg-navy-900 border-navy-800">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-navy-800">
                <div className="flex items-center gap-2.5">
                  <img src={LOGO_LIGHT} alt={MINISTRY_NAME} className="w-7 h-10 object-contain" />
                  <span className="font-bold text-lg text-white">{MINISTRY_NAME}</span>
                </div>
              </div>
              <div className="flex-1 py-4">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-6 py-3.5 text-sm font-semibold tracking-wider transition-colors ${
                    location === "/"
                      ? "bg-teal-500/10 text-teal-400 border-r-2 border-teal-400"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="flex-1">HOME</span>
                  <ChevronRight className="h-4 w-4 opacity-40" />
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-6 py-3.5 text-sm font-semibold tracking-wider transition-colors ${
                      location === link.href
                        ? "bg-teal-500/10 text-teal-400 border-r-2 border-teal-400"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="flex-1">{link.label}</span>
                    <ChevronRight className="h-4 w-4 opacity-40" />
                  </Link>
                ))}
                {isAuthenticated && user?.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-6 py-3.5 text-sm font-semibold tracking-wider text-white/70 hover:text-white hover:bg-white/5"
                  >
                    <span className="flex-1">ADMIN</span>
                    <ChevronRight className="h-4 w-4 opacity-40" />
                  </Link>
                )}
              </div>
              <div className="p-6 border-t border-navy-800">
                <Link href="/newsletter" onClick={() => setOpen(false)}>
                  <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold tracking-wider">
                    SUBSCRIBE
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
