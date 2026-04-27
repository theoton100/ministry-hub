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
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* GRADIENT BANNER - Yellow to Orange (Rick Warren style) */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #FFD700 0%, #FF8C00 100%)" }} />
      
      <header className="fixed top-1 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <nav className="container flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <img src={LOGO_LIGHT} alt={MINISTRY_NAME} className="h-14 object-contain group-hover:opacity-80 transition-opacity" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-all duration-200 relative pb-1 ${
                    isActive
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link href="/give">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-sm h-10 px-6 rounded-sm">
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
                className="h-10 w-10 text-gray-900 hover:bg-gray-100"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0 border-gray-200 bg-white">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-gray-200">
                  <img src={LOGO_LIGHT} alt={MINISTRY_NAME} className="h-12 object-contain" />
                </div>
                <div className="flex-1 py-4 overflow-y-auto">
                  {navLinks.map((link) => {
                    const isActive = location === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center px-6 py-3 text-sm font-medium transition-all duration-200 border-l-2 ${
                          isActive
                            ? "text-gray-900 bg-gray-100 border-yellow-400"
                            : "text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
                <div className="p-6 border-t border-gray-200">
                  <Link href="/give" onClick={() => setOpen(false)}>
                    <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-sm h-11 rounded-sm">
                      Give Now
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </header>
    </>
  );
}
