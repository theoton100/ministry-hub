import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { MINISTRY_NAME, LOGO_LIGHT } from "@/lib/constants";
import { useAuth } from "@/_core/hooks/useAuth";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/watch", label: "Watch" },
  { href: "/listen", label: "Podcast" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/newsletter", label: "Subscribe" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <nav className="container flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img src={LOGO_LIGHT} alt={MINISTRY_NAME} className="w-6 h-9 object-contain" />
          <span className="font-extrabold text-sm tracking-tight text-white uppercase">
            {MINISTRY_NAME}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 text-[13px] font-semibold transition-colors rounded-sm ${
                location === link.href
                  ? "text-white bg-white/10"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {isAuthenticated && user?.role === "admin" && (
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="text-[13px] text-white/70 hover:text-white hover:bg-white/10 h-8 px-3">
                Admin
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-white hover:bg-white/10">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-0 bg-black border-white/10">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col h-full">
              <div className="p-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <img src={LOGO_LIGHT} alt={MINISTRY_NAME} className="w-6 h-9 object-contain" />
                  <span className="font-extrabold text-sm text-white uppercase">{MINISTRY_NAME}</span>
                </div>
              </div>
              <div className="flex-1 py-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block px-5 py-3 text-sm font-semibold transition-colors ${
                      location === link.href
                        ? "text-white bg-white/5 border-l-2 border-brand"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {isAuthenticated && user?.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="block px-5 py-3 text-sm font-semibold text-white/60 hover:text-white hover:bg-white/5"
                  >
                    Admin
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
