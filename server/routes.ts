import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.posts.list.path, async (req, res) => {
    const posts = await storage.getPosts();
    res.json(posts);
  });

  app.get(api.posts.get.path, async (req, res) => {
    const post = await storage.getPost(req.params.slug);
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
      const id = parseInt(req.params.id);
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
    const id = parseInt(req.params.id);
    await storage.deletePost(id);
    res.status(204).send();
  });

  // Seed data
  const posts = await storage.getPosts();
  if (posts.length === 0) {
    await storage.createPost({
      title: "Hello World",
      slug: "hello-world",
      summary: "This is my first post",
      content: "Welcome to my blog! This is the first post.",
    });
    await storage.createPost({
      title: "Getting Started with React",
      slug: "getting-started-with-react",
      summary: "A quick guide to React",
      content: "React is a JavaScript library for building user interfaces...",
    });
  }

  return httpServer;
}
