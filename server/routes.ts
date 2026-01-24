import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existingPosts = await storage.getPosts();
  if (existingPosts.length === 0) {
    await storage.createPost({
      title: "How to Launch Your Podcast in 2024",
      slug: "launch-podcast-2024",
      content: "Starting a podcast has never been easier. In this comprehensive guide, I'll walk you through everything from choosing your equipment to publishing your first episode. Whether you're looking to share your expertise, build your brand, or connect with a community, podcasting is one of the most powerful mediums available today.\n\nFirst, let's talk about your concept. What makes your show unique? Who is your ideal listener? These questions will guide every decision you make.\n\nNext, you'll need reliable equipment. A good USB microphone, headphones, and recording software are essential. Don't overcomplicate it—start simple and upgrade as you grow.\n\nFinally, consistency is key. Choose a schedule you can maintain and stick with it. Your audience will come to rely on your content.",
      summary: "A comprehensive guide to starting your podcast journey, from equipment to publishing.",
      imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800",
      category: "Podcast Tips"
    });
    await storage.createPost({
      title: "Building an Authentic Personal Brand",
      slug: "authentic-personal-brand",
      content: "Your personal brand is more than just a logo or a color palette—it's the feeling people get when they interact with you and your content. Building an authentic brand requires deep self-reflection and a commitment to showing up consistently as your true self.\n\nStart by identifying your core values. What do you stand for? What topics light you up? What transformation do you want to create for your audience?\n\nThen, think about your visual identity. Choose colors, fonts, and imagery that reflect your personality and resonate with your ideal audience. Consistency across all platforms builds recognition and trust.\n\nRemember, authenticity always wins. People can sense when you're being genuine, and that connection is what builds lasting relationships with your community.",
      summary: "Learn how to create a personal brand that truly reflects who you are and attracts your ideal audience.",
      imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
      category: "Branding"
    });
    await storage.createPost({
      title: "Monetizing Your Content the Right Way",
      slug: "monetizing-content",
      content: "There are countless ways to monetize your content, but not all of them will feel aligned with your brand and values. The key is to choose revenue streams that serve your audience while supporting your business goals.\n\nSponsored content and brand partnerships can be lucrative, but be selective. Only work with brands you genuinely believe in and that align with your audience's needs.\n\nDigital products like courses, templates, and ebooks allow you to scale your expertise. These assets can generate passive income while providing tremendous value to your community.\n\nMemberships and subscriptions create recurring revenue and deepen your connection with your most engaged followers. Consider what exclusive content or community access you could offer.",
      summary: "Explore ethical and effective ways to turn your passion into profit.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      category: "Business"
    });
  }

  const existingPhotos = await storage.getPhotos();
  if (existingPhotos.length === 0) {
    await storage.createPhoto({
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600",
      caption: "Behind the scenes at the studio"
    });
    await storage.createPhoto({
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
      caption: "Podcast recording session"
    });
    await storage.createPhoto({
      url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600",
      caption: "Speaking at the conference"
    });
    await storage.createPhoto({
      url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600",
      caption: "Team planning meeting"
    });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  await seedDatabase();

  app.get(api.posts.list.path, async (req, res) => {
    const posts = await storage.getPosts();
    res.json(posts);
  });

  app.get(api.posts.get.path, async (req, res) => {
    const slug = req.params.slug as string;
    const post = await storage.getPost(slug);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  });

  app.post(api.posts.create.path, async (req, res) => {
    try {
      const input = api.posts.create.input.parse(req.body);
      const post = await storage.createPost(input);
      res.status(201).json(post);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.patch(api.posts.update.path, async (req, res) => {
    try {
      const id = parseInt(req.params.id as string);
      const input = api.posts.update.input.parse(req.body);
      const post = await storage.updatePost(id, input);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.delete(api.posts.delete.path, async (req, res) => {
    const id = parseInt(req.params.id as string);
    await storage.deletePost(id);
    res.status(204).send();
  });

  app.get(api.photos.list.path, async (req, res) => {
    const photos = await storage.getPhotos();
    res.json(photos);
  });

  app.post(api.photos.create.path, async (req, res) => {
    try {
      const input = api.photos.create.input.parse(req.body);
      const photo = await storage.createPhoto(input);
      res.status(201).json(photo);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.delete(api.photos.delete.path, async (req, res) => {
    const id = parseInt(req.params.id as string);
    await storage.deletePhoto(id);
    res.status(204).send();
  });

  return httpServer;
}
