import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md animate-in fade-in zoom-in duration-300">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-muted p-6">
            <AlertCircle className="h-12 w-12 text-muted-foreground opacity-50" />
          </div>
        </div>
        
        <h1 className="text-4xl font-serif font-bold tracking-tight text-foreground">
          404 Page Not Found
        </h1>
        
        <p className="text-muted-foreground text-lg leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="pt-6">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
