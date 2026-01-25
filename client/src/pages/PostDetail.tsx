import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import type { Post } from "@shared/schema";

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: post, isLoading, error } = useQuery<Post>({
    queryKey: ["/api/posts", slug],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-12 px-6">
        <div className="container mx-auto max-w-3xl">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-64 w-full mb-8 rounded-lg" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen py-12 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-3xl mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The post you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/podcast">
            <Button data-testid="button-back-to-podcast">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Podcast
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-3xl">
        <Link href="/podcast">
          <Button variant="ghost" size="sm" className="mb-8" data-testid="button-back">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Podcast
          </Button>
        </Link>

        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-64 md:h-80 object-cover rounded-lg mb-8"
            data-testid="img-post-detail"
          />
        )}

        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <Badge variant="outline">{post.category}</Badge>
          <span className="text-sm text-muted-foreground">
            {post.createdAt && format(new Date(post.createdAt), "MMMM d, yyyy")}
          </span>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight mb-4" data-testid="text-post-title">
          {post.title}
        </h1>

        <p className="text-lg text-muted-foreground mb-8" data-testid="text-post-summary">
          {post.summary}
        </p>

        <div className="prose prose-neutral dark:prose-invert max-w-none" data-testid="text-post-content">
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
