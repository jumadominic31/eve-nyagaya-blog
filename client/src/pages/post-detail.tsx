import { usePost } from "@/hooks/use-posts";
import { useRoute } from "wouter";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";

export default function PostDetail() {
  const [match, params] = useRoute("/post/:slug");
  const slug = params?.slug || "";
  const { data: post, isLoading, error } = usePost(slug);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-8">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-12 w-3/4" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-2xl font-serif font-bold mb-4">Post not found</h2>
        <Link href="/">
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto animate-in fade-in duration-500 slide-in-from-bottom-4">
      <Link href="/">
        <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Articles
        </Button>
      </Link>

      <header className="mb-12 space-y-6">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <time dateTime={post.createdAt?.toString()}>
            {post.createdAt && format(new Date(post.createdAt), 'MMMM d, yyyy')}
          </time>
          <span>•</span>
          <span>Article</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-foreground leading-tight">
          {post.title}
        </h1>
        <p className="text-xl text-muted-foreground font-light leading-relaxed border-l-2 border-primary/20 pl-6 italic">
          {post.summary}
        </p>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      
      <div className="mt-16 pt-8 border-t border-border/40">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Thanks for reading.</p>
          <div className="flex gap-2">
            {/* Social share placeholders could go here */}
          </div>
        </div>
      </div>
    </article>
  );
}
