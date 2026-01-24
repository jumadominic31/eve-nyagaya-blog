import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, BookOpen } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/10">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-serif text-xl font-bold tracking-tight">
              Minimalist.
            </span>
          </Link>
          
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link 
              href="/" 
              className={cn(
                "transition-colors hover:text-foreground/80",
                location === "/" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Blog
            </Link>
            <Link 
              href="/admin" 
              className={cn(
                "transition-colors hover:text-foreground/80",
                location === "/admin" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Admin
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-4 py-12 md:py-24">
        {children}
      </main>

      <footer className="border-t border-border/40 py-6 md:px-8 md:py-0">
        <div className="container mx-auto flex h-14 max-w-5xl items-center justify-between px-4 text-sm text-muted-foreground">
          <p>© 2024 Minimalist Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
