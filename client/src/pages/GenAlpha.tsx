import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { Post } from "@shared/schema";

export default function GenAlpha() {
  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  const genAlphaPosts = posts?.filter((post) => post.category === "Gen_Alpha");

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-semibold tracking-tight mb-4" data-testid="text-gen-alpha-title">
            Gen Alpha
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto" data-testid="text-gen-alpha-subtitle">
            Fresh perspectives, trending topics, and content crafted for the next generation.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 rounded-lg" />
            ))}
          </div>
        ) : genAlphaPosts && genAlphaPosts.length > 0 ? (
          <div className="space-y-6">
            {genAlphaPosts.map((post) => (
              <Link key={post.id} href={`/gen-alpha/${post.slug}`}>
                <Card className="overflow-hidden hover-elevate cursor-pointer mb-6" data-testid={`card-gen-alpha-${post.id}`}>
                  <div className="md:flex">
                    {post.imageUrl && (
                      <div className="md:w-1/3 flex-shrink-0">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-48 md:h-full object-cover"
                          data-testid={`img-gen-alpha-${post.id}`}
                        />
                      </div>
                    )}
                    <CardContent className="p-6 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <Badge variant="outline">Gen Alpha</Badge>
                        <span className="text-sm text-muted-foreground">
                          {post.createdAt && format(new Date(post.createdAt), "MMMM d, yyyy")}
                        </span>
                      </div>
                      <h2 className="font-serif text-xl md:text-2xl font-medium mb-3" data-testid={`text-gen-alpha-title-${post.id}`}>
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground line-clamp-2" data-testid={`text-gen-alpha-summary-${post.id}`}>
                        {post.summary}
                      </p>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground" data-testid="text-no-gen-alpha">
              No Gen Alpha posts yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
