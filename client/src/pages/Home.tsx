import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ArrowRight, Mic } from "lucide-react";
import type { Post } from "@shared/schema";

export default function Home() {
  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  const featuredPost = posts?.[0];
  const recentPosts = posts?.slice(1, 4);

  return (
    <div className="min-h-screen">
      <section className="relative py-24 px-6 text-center bg-gradient-to-b from-accent/30 to-background">
        <div className="container mx-auto max-w-3xl">
          <Badge variant="secondary" className="mb-4">
            <Mic className="w-3 h-3 mr-1" />
            Podcast & Blog
          </Badge>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6" data-testid="text-hero-title">
            Stories, Insights & Inspiration
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8" data-testid="text-hero-subtitle">
            Discover thought-provoking content on entrepreneurship, personal branding, and living your best life.
          </p>
          <Link href="/podcast">
            <Button size="lg" data-testid="button-explore">
              Explore Episodes
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          {isLoading ? (
            <div className="space-y-8">
              <Skeleton className="h-80 w-full rounded-lg" />
              <div className="grid md:grid-cols-3 gap-6">
                <Skeleton className="h-64 rounded-lg" />
                <Skeleton className="h-64 rounded-lg" />
                <Skeleton className="h-64 rounded-lg" />
              </div>
            </div>
          ) : (
            <>
              {featuredPost && (
                <div className="mb-12">
                  <h2 className="font-serif text-2xl mb-6" data-testid="text-featured-heading">Featured</h2>
                  <Link href={`/podcast/${featuredPost.slug}`}>
                    <Card className="overflow-hidden hover-elevate cursor-pointer" data-testid={`card-featured-${featuredPost.id}`}>
                      <div className="md:flex">
                        {featuredPost.imageUrl && (
                          <div className="md:w-1/2">
                            <img
                              src={featuredPost.imageUrl}
                              alt={featuredPost.title}
                              className="w-full h-64 md:h-full object-cover"
                              data-testid={`img-featured-${featuredPost.id}`}
                            />
                          </div>
                        )}
                        <CardContent className="p-8 md:w-1/2 flex flex-col justify-center">
                          <Badge variant="outline" className="w-fit mb-3">
                            {featuredPost.category}
                          </Badge>
                          <h3 className="font-serif text-2xl md:text-3xl font-medium mb-3" data-testid={`text-title-${featuredPost.id}`}>
                            {featuredPost.title}
                          </h3>
                          <p className="text-muted-foreground mb-4" data-testid={`text-summary-${featuredPost.id}`}>
                            {featuredPost.summary}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {featuredPost.createdAt && format(new Date(featuredPost.createdAt), "MMMM d, yyyy")}
                          </p>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                </div>
              )}

              {recentPosts && recentPosts.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                    <h2 className="font-serif text-2xl" data-testid="text-recent-heading">Recent Posts</h2>
                    <Link href="/podcast">
                      <Button variant="ghost" size="sm" data-testid="button-view-all">
                        View All
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {recentPosts.map((post) => (
                      <Link key={post.id} href={`/podcast/${post.slug}`}>
                        <Card className="overflow-hidden h-full hover-elevate cursor-pointer" data-testid={`card-post-${post.id}`}>
                          {post.imageUrl && (
                            <img
                              src={post.imageUrl}
                              alt={post.title}
                              className="w-full h-40 object-cover"
                              data-testid={`img-post-${post.id}`}
                            />
                          )}
                          <CardContent className="p-5">
                            <Badge variant="outline" className="mb-2 text-xs">
                              {post.category}
                            </Badge>
                            <h3 className="font-serif text-lg font-medium mb-2 line-clamp-2" data-testid={`text-post-title-${post.id}`}>
                              {post.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                              {post.summary}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {post.createdAt && format(new Date(post.createdAt), "MMM d, yyyy")}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
