import { db } from "./db";
import { posts, type Post, type InsertPost } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getPosts(): Promise<Post[]>;
  getPost(slug: string): Promise<Post | undefined>;
  getPostById(id: number): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, post: Partial<InsertPost>): Promise<Post | undefined>;
  deletePost(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getPosts(): Promise<Post[]> {
    return await db.select().from(posts).orderBy(desc(posts.createdAt));
  }

  async getPost(slug: string): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    return post;
  }

  async getPostById(id: number): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post;
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const [post] = await db.insert(posts).values(insertPost).returning();
    return post;
  }

  async updatePost(id: number, updatePost: Partial<InsertPost>): Promise<Post | undefined> {
    const [post] = await db.update(posts).set(updatePost).where(eq(posts.id, id)).returning();
    return post;
  }

  async deletePost(id: number): Promise<void> {
    await db.delete(posts).where(eq(posts.id, id));
  }
}

export const storage = new DatabaseStorage();
