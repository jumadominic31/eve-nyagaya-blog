import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2, Plus, FileText, Image, Upload } from "lucide-react";
import { useUpload } from "@/hooks/use-upload";
import type { Post, Photo } from "@shared/schema";

function PhotoUploadCard({ onPhotoAdded }: { onPhotoAdded: () => void }) {
  const { toast } = useToast();
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { uploadFile } = useUpload({
    onSuccess: async (response) => {
      const photoData = {
        url: response.objectPath,
        caption: caption || undefined,
      };
      await apiRequest("POST", "/api/photos", photoData);
      onPhotoAdded();
      setCaption("");
      setIsUploading(false);
      toast({ title: "Photo uploaded successfully" });
    },
    onError: (error) => {
      setIsUploading(false);
      toast({ title: "Failed to upload photo", variant: "destructive" });
    },
  });

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    await uploadFile(file);
    e.target.value = "";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upload Photo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Caption (optional)</label>
          <Input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Photo caption..."
            className="mt-1.5"
            data-testid="input-photo-caption"
          />
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="photo-upload"
            data-testid="input-photo-file"
          />
          <Button
            asChild
            disabled={isUploading}
            data-testid="button-upload-photo"
          >
            <label htmlFor="photo-upload" className="cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? "Uploading..." : "Choose Photo"}
            </label>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  summary: z.string().min(1, "Summary is required"),
  content: z.string().min(1, "Content is required"),
  imageUrl: z.string().optional(),
  category: z.string().optional(),
});

const photoSchema = z.object({
  url: z.string().url("Must be a valid URL"),
  caption: z.string().optional(),
});

type PostForm = z.infer<typeof postSchema>;
type PhotoForm = z.infer<typeof photoSchema>;

export default function Admin() {
  const { toast } = useToast();
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const { data: posts, isLoading: postsLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  const { data: photos, isLoading: photosLoading } = useQuery<Photo[]>({
    queryKey: ["/api/photos"],
  });

  const postForm = useForm<PostForm>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      slug: "",
      summary: "",
      content: "",
      imageUrl: "",
      category: "Blog",
    },
  });

  const photoForm = useForm<PhotoForm>({
    resolver: zodResolver(photoSchema),
    defaultValues: {
      url: "",
      caption: "",
    },
  });

  const createPost = useMutation({
    mutationFn: async (data: PostForm) => {
      const res = await apiRequest("POST", "/api/posts", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      postForm.reset();
      setEditingPost(null);
      toast({ title: "Post created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create post", variant: "destructive" });
    },
  });

  const updatePost = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<PostForm> }) => {
      const res = await apiRequest("PATCH", `/api/posts/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      postForm.reset();
      setEditingPost(null);
      toast({ title: "Post updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update post", variant: "destructive" });
    },
  });

  const deletePost = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({ title: "Post deleted" });
    },
    onError: () => {
      toast({ title: "Failed to delete post", variant: "destructive" });
    },
  });

  const createPhoto = useMutation({
    mutationFn: async (data: PhotoForm) => {
      const res = await apiRequest("POST", "/api/photos", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/photos"] });
      photoForm.reset();
      toast({ title: "Photo added successfully" });
    },
    onError: () => {
      toast({ title: "Failed to add photo", variant: "destructive" });
    },
  });

  const deletePhoto = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/photos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/photos"] });
      toast({ title: "Photo deleted" });
    },
    onError: () => {
      toast({ title: "Failed to delete photo", variant: "destructive" });
    },
  });

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    postForm.reset({
      title: post.title,
      slug: post.slug,
      summary: post.summary,
      content: post.content,
      imageUrl: post.imageUrl || "",
      category: post.category || "Blog",
    });
  };

  const handlePostSubmit = (data: PostForm) => {
    if (editingPost) {
      updatePost.mutate({ id: editingPost.id, data });
    } else {
      createPost.mutate(data);
    }
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    postForm.reset();
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="font-serif text-3xl font-semibold mb-8" data-testid="text-admin-title">
          Admin Dashboard
        </h1>

        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList>
            <TabsTrigger value="posts" data-testid="tab-posts">
              <FileText className="w-4 h-4 mr-2" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="photos" data-testid="tab-photos">
              <Image className="w-4 h-4 mr-2" />
              Photos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {editingPost ? "Edit Post" : "Create New Post"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...postForm}>
                  <form onSubmit={postForm.handleSubmit(handlePostSubmit)} className="space-y-4">
                    <FormField
                      control={postForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Post title" data-testid="input-post-title" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={postForm.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slug</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="post-url-slug" data-testid="input-post-slug" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={postForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value || "Blog"}>
                            <FormControl>
                              <SelectTrigger data-testid="input-post-category">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Devotional">Devotional</SelectItem>
                              <SelectItem value="Blog">Blog</SelectItem>
                              <SelectItem value="Business">Business</SelectItem>
                              <SelectItem value="Finance">Finance</SelectItem>
                              <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                              <SelectItem value="Faith">Faith</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={postForm.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL (optional)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://..." data-testid="input-post-image" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={postForm.control}
                      name="summary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Summary</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Brief summary..." rows={2} data-testid="input-post-summary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={postForm.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Full post content..." rows={8} data-testid="input-post-content" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-2 pt-2 flex-wrap">
                      <Button type="submit" disabled={createPost.isPending || updatePost.isPending} data-testid="button-submit-post">
                        {createPost.isPending || updatePost.isPending ? "Saving..." : editingPost ? "Update Post" : "Create Post"}
                      </Button>
                      {editingPost && (
                        <Button type="button" variant="outline" onClick={handleCancelEdit} data-testid="button-cancel-edit">
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">All Posts</CardTitle>
              </CardHeader>
              <CardContent>
                {postsLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : posts && posts.length > 0 ? (
                  <div className="divide-y">
                    {posts.map((post) => (
                      <div key={post.id} className="py-3 flex items-center justify-between gap-4 flex-wrap" data-testid={`row-post-${post.id}`}>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate" data-testid={`text-post-row-title-${post.id}`}>{post.title}</p>
                          <p className="text-sm text-muted-foreground truncate">{post.slug}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditPost(post)} data-testid={`button-edit-${post.id}`}>
                            Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="icon"
                            onClick={() => deletePost.mutate(post.id)}
                            disabled={deletePost.isPending}
                            data-testid={`button-delete-${post.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4" data-testid="text-no-posts-admin">
                    No posts yet
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="photos" className="space-y-6">
            <PhotoUploadCard
              onPhotoAdded={() => queryClient.invalidateQueries({ queryKey: ["/api/photos"] })}
            />

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">All Photos</CardTitle>
              </CardHeader>
              <CardContent>
                {photosLoading ? (
                  <div className="grid grid-cols-3 gap-4">
                    <Skeleton className="aspect-square" />
                    <Skeleton className="aspect-square" />
                    <Skeleton className="aspect-square" />
                  </div>
                ) : photos && photos.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {photos.map((photo) => (
                      <div key={photo.id} className="relative group" data-testid={`admin-photo-${photo.id}`}>
                        <img
                          src={photo.url}
                          alt={photo.caption || "Gallery photo"}
                          className="w-full aspect-square object-cover rounded-md"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => deletePhoto.mutate(photo.id)}
                          disabled={deletePhoto.isPending}
                          data-testid={`button-delete-photo-${photo.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        {photo.caption && (
                          <p className="text-xs text-muted-foreground mt-1 truncate">{photo.caption}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4" data-testid="text-no-photos-admin">
                    No photos yet
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
