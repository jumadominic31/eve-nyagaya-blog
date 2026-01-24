import { usePosts } from "@/hooks/use-posts";
import { Link } from "wouter";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) {
    return (
      <div className="space-y-12">
        <div className="space-y-4 text-center">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[300px] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-2xl font-serif font-bold text-destructive mb-2">Error Loading Posts</h2>
        <p className="text-muted-foreground">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <section className="text-center space-y-6 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-foreground">
          Thoughts & Ideas.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          A minimalist space for writing, thinking, and sharing ideas about design, technology, and life.
        </p>
      </section>

      {posts?.length === 0 ? (
        <div className="text-center py-24 border rounded-2xl border-dashed">
          <p className="text-muted-foreground">No posts found. Start writing in the admin panel.</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {posts?.map((post) => (
            <Link key={post.id} href={`/post/${post.slug}`} className="group block h-full">
              <Card className="h-full border-border/50 bg-card/50 transition-all duration-300 hover:bg-card hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                <CardHeader className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      {post.createdAt && format(new Date(post.createdAt), 'MMMM d, yyyy')}
                    </span>
                    <CardTitle className="font-serif text-2xl group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <CardDescription className="text-base line-clamp-3 leading-relaxed">
                    {post.summary}
                  </CardDescription>
                  <div className="flex items-center text-sm font-medium text-primary">
                    Read Article <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
