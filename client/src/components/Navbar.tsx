import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { BookHeart, PenLine, Sparkles, User, Mail } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();

  const navButtonClass =
    "text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/15";
  const navButtonActiveClass = "bg-white/20 text-primary-foreground";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-accent">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Link href="/">
            <div className="cursor-pointer" data-testid="link-logo">
              <span className="font-serif text-2xl font-semibold tracking-tight text-primary-foreground block leading-tight">
                Eve Nyagaya
              </span>
              <span className="text-2xl" style={{ fontFamily: "'Dancing Script', cursive", color: '#D4AF37' }}>
                This time with Jesus
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-1">
            <Link href="/devotionals">
              <Button
                variant="ghost"
                size="sm"
                className={
                  location.startsWith("/devotionals")
                    ? navButtonActiveClass
                    : navButtonClass
                }
                data-testid="link-devotionals"
              >
                <BookHeart className="w-4 h-4 mr-2" />
                Devotionals
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                variant="ghost"
                size="sm"
                className={
                  location.startsWith("/blog")
                    ? navButtonActiveClass
                    : navButtonClass
                }
                data-testid="link-blog"
              >
                <PenLine className="w-4 h-4 mr-2" />
                Blog
              </Button>
            </Link>
            <Link href="/gen-alpha">
              <Button
                variant="ghost"
                size="sm"
                className={
                  location.startsWith("/gen-alpha")
                    ? navButtonActiveClass
                    : navButtonClass
                }
                data-testid="link-gen-alpha"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Gen Alpha
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="ghost"
                size="sm"
                className={
                  location === "/about" ? navButtonActiveClass : navButtonClass
                }
                data-testid="link-about"
              >
                <User className="w-4 h-4 mr-2" />
                About
              </Button>
            </Link>
            <Link href="/subscribe">
              <Button
                variant="ghost"
                size="sm"
                className={
                  location === "/subscribe"
                    ? navButtonActiveClass
                    : navButtonClass
                }
                data-testid="link-subscribe"
              >
                <Mail className="w-4 h-4 mr-2" />
                Let's Connect
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
