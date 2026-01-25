import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Photo } from "@shared/schema";

export default function Photos() {
  const { data: photos, isLoading } = useQuery<Photo[]>({
    queryKey: ["/api/photos"],
  });

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-semibold tracking-tight mb-4" data-testid="text-photos-title">
            Photo Gallery
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto" data-testid="text-photos-subtitle">
            A glimpse into the moments, events, and behind-the-scenes of the journey.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        ) : photos && photos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <Card 
                key={photo.id} 
                className="overflow-hidden group hover-elevate"
                data-testid={`card-photo-${photo.id}`}
              >
                <div className="relative aspect-square">
                  <img
                    src={photo.url}
                    alt={photo.caption || "Gallery photo"}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    data-testid={`img-photo-${photo.id}`}
                  />
                  {photo.caption && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <p className="p-4 text-white text-sm" data-testid={`text-caption-${photo.id}`}>
                        {photo.caption}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground" data-testid="text-no-photos">
              No photos yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
