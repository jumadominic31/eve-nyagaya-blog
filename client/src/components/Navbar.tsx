import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Mic, Image, Settings } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Link href="/">
            <span className="font-serif text-2xl font-semibold tracking-tight cursor-pointer text-primary" data-testid="link-logo">
              The Blog
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <Link href="/podcast">
              <Button
                variant={location === "/podcast" ? "secondary" : "ghost"}
                size="sm"
                data-testid="link-podcast"
              >
                <Mic className="w-4 h-4 mr-2" />
                Podcast
              </Button>
            </Link>
            <Link href="/photos">
              <Button
                variant={location === "/photos" ? "secondary" : "ghost"}
                size="sm"
                data-testid="link-photos"
              >
                <Image className="w-4 h-4 mr-2" />
                Photos
              </Button>
            </Link>
            <Link href="/admin">
              <Button
                variant={location.startsWith("/admin") ? "secondary" : "ghost"}
                size="sm"
                data-testid="link-admin"
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
