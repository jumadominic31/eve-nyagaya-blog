import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { Post } from "@shared/schema";

export default function Devotionals() {
  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  const devotionals = posts?.filter((post) => post.category === "Devotional");

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-semibold tracking-tight mb-4" data-testid="text-devotionals-title">
            Devotionals
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto" data-testid="text-devotionals-subtitle">
            Faith-filled reflections, spiritual encouragement, and daily inspiration to strengthen your walk with God.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 rounded-lg" />
            ))}
          </div>
        ) : devotionals && devotionals.length > 0 ? (
          <div className="space-y-6">
            {devotionals.map((post) => (
              <Link key={post.id} href={`/devotionals/${post.slug}`}>
                <Card className="overflow-hidden hover-elevate cursor-pointer mb-6" data-testid={`card-devotional-${post.id}`}>
                  <div className="md:flex">
                    {post.imageUrl && (
                      <div className="md:w-1/3 flex-shrink-0">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-48 md:h-full object-cover"
                          data-testid={`img-devotional-${post.id}`}
                        />
                      </div>
                    )}
                    <CardContent className="p-6 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <Badge variant="outline">{post.category}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {post.createdAt && format(new Date(post.createdAt), "MMMM d, yyyy")}
                        </span>
                      </div>
                      <h2 className="font-serif text-xl md:text-2xl font-medium mb-3" data-testid={`text-devotional-title-${post.id}`}>
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground line-clamp-2" data-testid={`text-devotional-summary-${post.id}`}>
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
            <p className="text-muted-foreground" data-testid="text-no-devotionals">
              No devotionals yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
