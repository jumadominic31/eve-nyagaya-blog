import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { BookHeart, PenLine, Sparkles, Mail } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Link href="/">
            <span className="font-serif text-2xl font-semibold tracking-tight cursor-pointer text-primary" data-testid="link-logo">
              Eve Nyagaya
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <Link href="/devotionals">
              <Button
                variant={location.startsWith("/devotionals") ? "secondary" : "ghost"}
                size="sm"
                data-testid="link-devotionals"
              >
                <BookHeart className="w-4 h-4 mr-2" />
                Devotionals
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                variant={location.startsWith("/blog") ? "secondary" : "ghost"}
                size="sm"
                data-testid="link-blog"
              >
                <PenLine className="w-4 h-4 mr-2" />
                Blog
              </Button>
            </Link>
            <Link href="/gen-alpha">
              <Button
                variant={location.startsWith("/gen-alpha") ? "secondary" : "ghost"}
                size="sm"
                data-testid="link-gen-alpha"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Gen Alpha
              </Button>
            </Link>
            <Link href="/subscribe">
              <Button
                variant={location === "/subscribe" ? "secondary" : "ghost"}
                size="sm"
                data-testid="link-subscribe"
              >
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
