import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Play, Headphones, BookOpen, Mail, User, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { MINISTRY_NAME } from "@/lib/constants";
import { useAuth } from "@/_core/hooks/useAuth";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/watch", label: "Watch", icon: Play },
  { href: "/listen", label: "Listen", icon: Headphones },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/about", label: "About", icon: User },
  { href: "/newsletter", label: "Newsletter", icon: Mail },
];

export default function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border/50 shadow-sm">
      <nav className="container flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-serif font-bold text-lg shadow-md group-hover:shadow-lg transition-shadow">
            T
          </div>
          <span className="font-serif font-semibold text-lg tracking-tight text-foreground hidden sm:block">
            {MINISTRY_NAME}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA + Admin */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated && user?.role === "admin" && (
            <Link href="/admin">
              <Button variant="outline" size="sm" className="text-xs">
                Admin
              </Button>
            </Link>
          )}
          <Link href="/newsletter">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
              Subscribe
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col h-full">
              <div className="p-6 border-b">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-serif font-bold text-lg">
                    T
                  </div>
                  <span className="font-serif font-semibold text-lg">{MINISTRY_NAME}</span>
                </div>
              </div>
              <div className="flex-1 py-4">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-6 py-3.5 text-base font-medium transition-colors ${
                        location === link.href
                          ? "bg-primary/10 text-primary border-r-2 border-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      {Icon && <Icon className="h-5 w-5" />}
                      <span className="flex-1">{link.label}</span>
                      <ChevronRight className="h-4 w-4 opacity-40" />
                    </Link>
                  );
                })}
                {isAuthenticated && user?.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-6 py-3.5 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                  >
                    <User className="h-5 w-5" />
                    <span className="flex-1">Admin Dashboard</span>
                    <ChevronRight className="h-4 w-4 opacity-40" />
                  </Link>
                )}
              </div>
              <div className="p-6 border-t">
                <Link href="/newsletter" onClick={() => setOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Subscribe to Newsletter
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
