import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Mail, Phone } from "lucide-react";
import { format } from "date-fns";
import type { Subscriber } from "@shared/schema";

export default function Subscribers() {
  const { data: subscribers, isLoading } = useQuery<Subscriber[]>({
    queryKey: ["/api/subscribers"],
  });

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-semibold tracking-tight" data-testid="text-subscribers-title">
              Subscribers
            </h1>
            <p className="text-muted-foreground mt-1" data-testid="text-subscribers-count">
              {subscribers ? `${subscribers.length} subscriber${subscribers.length !== 1 ? "s" : ""}` : "Loading..."}
            </p>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 rounded-lg" />
            ))}
          </div>
        ) : subscribers && subscribers.length > 0 ? (
          <div className="space-y-3">
            {subscribers.map((subscriber) => (
              <Card key={subscriber.id} data-testid={`card-subscriber-${subscriber.id}`}>
                <CardContent className="py-4 px-6">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="space-y-1">
                      <p className="font-medium" data-testid={`text-subscriber-name-${subscriber.id}`}>
                        {subscriber.name}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1" data-testid={`text-subscriber-email-${subscriber.id}`}>
                          <Mail className="w-3.5 h-3.5" />
                          {subscriber.email}
                        </span>
                        {subscriber.phone && (
                          <span className="flex items-center gap-1" data-testid={`text-subscriber-phone-${subscriber.id}`}>
                            <Phone className="w-3.5 h-3.5" />
                            {subscriber.phone}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {subscriber.createdAt && format(new Date(subscriber.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground" data-testid="text-no-subscribers">
                No subscribers yet
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
