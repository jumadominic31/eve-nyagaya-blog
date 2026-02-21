import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ArrowRight, PenLine, Heart, Sparkles } from "lucide-react";
import type { Post } from "@shared/schema";

export default function Home() {
  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  const featuredPost = posts?.[0];
  const recentPosts = posts?.slice(1, 4);

  return (
    <div className="min-h-screen">
      <section className="relative py-20 md:py-28 px-6 text-center bg-gradient-to-b from-primary/5 via-accent/10 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(13,135,152,0.08),transparent_50%)]" />
        <div className="container mx-auto max-w-3xl relative z-10">
          <p className="text-accent font-medium tracking-widest uppercase text-sm mb-4" data-testid="text-hero-tagline">
            Welcome
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 text-primary" data-testid="text-hero-title">
            Stories, Faith & Inspiration
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8" data-testid="text-hero-subtitle">
            Join me as I share insights on faith, family, personal growth, and living with intention. This is a space for honest conversations and encouragement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blog">
              <Button size="lg" data-testid="button-explore">
                <PenLine className="mr-2 w-4 h-4" />
                Read the Blog
              </Button>
            </Link>
            <Link href="/photos">
              <Button size="lg" variant="outline" data-testid="button-photos">
                View Gallery
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <p className="text-accent font-medium tracking-widest uppercase text-sm mb-3">About</p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6 text-primary" data-testid="text-about-heading">
                Hey there, I'm so glad you're here!
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Whether you're navigating the beautiful chaos of raising a family, seeking to deepen your faith, 
                or looking for practical wisdom on finances and personal growth—you've found your community.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Every week I share real talk, encouragement, and actionable insights to help you thrive 
                in every season of life. Let's walk this journey together.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-accent">
                  <Heart className="w-4 h-4" />
                  <span>Faith-Centered</span>
                </div>
                <div className="flex items-center gap-2 text-accent">
                  <Sparkles className="w-4 h-4" />
                  <span>Practical Wisdom</span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg blur-xl opacity-50" />
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600"
                  alt="About"
                  className="relative rounded-lg shadow-lg w-full object-cover aspect-[4/5]"
                  data-testid="img-about"
                />
              </div>
            </div>
          </div>
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
                  <div className="text-center mb-8">
                    <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">Latest Post</p>
                    <h2 className="font-serif text-3xl text-primary" data-testid="text-featured-heading">Featured</h2>
                  </div>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <Card className="overflow-hidden hover-elevate cursor-pointer border-0 shadow-lg" data-testid={`card-featured-${featuredPost.id}`}>
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
                        <CardContent className="p-8 md:w-1/2 flex flex-col justify-center bg-card">
                          <Badge className="w-fit mb-3 bg-accent text-accent-foreground">
                            {featuredPost.category}
                          </Badge>
                          <h3 className="font-serif text-2xl md:text-3xl font-medium mb-3 text-primary" data-testid={`text-title-${featuredPost.id}`}>
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
                  <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
                    <div>
                      <p className="text-accent font-medium tracking-widest uppercase text-sm mb-1">Browse</p>
                      <h2 className="font-serif text-2xl text-primary" data-testid="text-recent-heading">Recent Posts</h2>
                    </div>
                    <Link href="/blog">
                      <Button variant="outline" data-testid="button-view-all">
                        View All Posts
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {recentPosts.map((post) => (
                      <Link key={post.id} href={`/blog/${post.slug}`}>
                        <Card className="overflow-hidden h-full hover-elevate cursor-pointer group" data-testid={`card-post-${post.id}`}>
                          {post.imageUrl && (
                            <div className="overflow-hidden">
                              <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
                                data-testid={`img-post-${post.id}`}
                              />
                            </div>
                          )}
                          <CardContent className="p-5">
                            <Badge variant="outline" className="mb-2 text-xs border-accent/30 text-accent">
                              {post.category}
                            </Badge>
                            <h3 className="font-serif text-lg font-medium mb-2 line-clamp-2 text-primary" data-testid={`text-post-title-${post.id}`}>
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

      <section className="py-16 px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4" data-testid="text-cta-heading">
            Let's Stay Connected
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            New posts drop every week. Don't miss out on encouragement, practical tips, and real conversations that matter.
          </p>
          <Link href="/blog">
            <Button size="lg" variant="secondary" data-testid="button-subscribe">
              Browse All Posts
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
