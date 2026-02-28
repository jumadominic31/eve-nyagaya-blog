import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { registerObjectStorageRoutes } from "./replit_integrations/object_storage";

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
    await storage.createPost({
      title: "Taking Control of Your Personal Finances",
      slug: "personal-finance-basics",
      content: "Financial freedom starts with understanding where your money goes and making intentional choices about how you spend, save, and invest. Whether you're just starting out or looking to level up your money game, these principles will serve you well.\n\nFirst, track everything. For one month, write down every single purchase. This awareness alone can be transformative. You'll quickly see patterns—maybe that daily coffee run or subscription you forgot about.\n\nNext, build your emergency fund. Aim for three to six months of expenses in a high-yield savings account. This cushion gives you peace of mind and prevents you from going into debt when life happens.\n\nThen, tackle any high-interest debt aggressively. Credit card balances are wealth killers. Pay more than the minimum and consider the avalanche method—targeting your highest interest rate first.\n\nFinally, start investing early. Even small amounts compound over time. Take advantage of employer 401(k) matches and consider index funds for a simple, diversified approach. Your future self will thank you.",
      summary: "Practical steps to take control of your money and build lasting financial freedom.",
      imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
      category: "Finance"
    });
    await storage.createPost({
      title: "Deepening Your Relationship with God",
      slug: "relationship-with-god",
      content: "In the busyness of life, it's easy to let our spiritual lives take a backseat. But nurturing your relationship with God is the foundation for everything else—your peace, your purpose, and your ability to pour into others.\n\nStart with showing up. Consistency matters more than perfection. Whether it's five minutes or an hour, carve out daily time to be still with God. Morning works best for many, before the demands of the day crowd in.\n\nRead Scripture with intention. Don't just check a box—ask God to speak to you through His Word. Journal what stands out and how it applies to your life right now.\n\nPrayer is a conversation, not a performance. Talk to God like you would a trusted friend. Share your worries, your gratitude, your questions. Then pause and listen. He speaks through stillness, through others, through circumstances.\n\nFind community. We weren't meant to walk this journey alone. A small group, a church family, or even one trusted friend who shares your faith can provide encouragement and accountability.\n\nRemember, God isn't looking for perfect—He's looking for present. Show up as you are, and watch how He transforms your heart.",
      summary: "Practical ways to grow closer to God and strengthen your faith journey.",
      imageUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800",
      category: "Faith"
    });
    await storage.createPost({
      title: "Making New Year Resolutions That Actually Stick",
      slug: "new-year-resolutions",
      content: "Every January, we're filled with hope and ambition. By February, most resolutions are forgotten. But it doesn't have to be that way. The secret isn't more willpower—it's a smarter approach.\n\nStart with your why. Don't just say 'I want to lose weight.' Ask yourself why. Maybe it's to have energy to play with your kids, or to feel confident in your own skin. That deeper motivation will carry you through the hard days.\n\nMake it specific and measurable. 'Get healthier' is vague. 'Walk 30 minutes every weekday' is clear. You know exactly what success looks like.\n\nStart ridiculously small. Want to read more? Commit to one page a day. Want to exercise? Start with five minutes. Small wins build momentum and prove to yourself that you can do this.\n\nBuild systems, not just goals. Instead of focusing only on the outcome, design your environment for success. Put your running shoes by the bed. Keep healthy snacks visible. Remove friction from the behaviors you want.\n\nTrack your progress and celebrate wins. A simple habit tracker can be incredibly motivating. And don't forget to acknowledge how far you've come—progress, not perfection, is the goal.\n\nFinally, plan for setbacks. You will have off days. That's human. The difference between those who succeed and those who don't is getting back up. One bad day doesn't erase your progress.",
      summary: "A fresh approach to setting goals that actually lead to lasting change.",
      imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800",
      category: "Personal Growth"
    });
    await storage.createPost({
      title: "Finding Your Fitness Rhythm",
      slug: "fitness-journey",
      content: "Fitness isn't about punishment or perfection—it's about honoring your body and building strength for the life you want to live. Whether you're starting from zero or getting back on track, here's how to make movement a sustainable part of your life.\n\nFind what you actually enjoy. If you hate running, don't run. Try dance, hiking, swimming, yoga, strength training, or group fitness classes. When exercise feels like play, you'll stick with it.\n\nSchedule it like an appointment. Look at your calendar and block time for movement. Treat it as non-negotiable as a doctor's appointment. Morning workouts work well for many because they're done before life gets in the way.\n\nStart where you are. You don't need to go from couch to marathon. Begin with what feels manageable—even 10 minutes counts. Gradually increase duration and intensity as you build the habit.\n\nMix it up. Your body adapts, and variety keeps things interesting. Alternate between cardio, strength, and flexibility work. This also prevents overuse injuries and keeps you engaged.\n\nFuel your body well. Exercise and nutrition go hand in hand. Focus on whole foods, adequate protein, and staying hydrated. Notice how what you eat affects how you feel and perform.\n\nRest is part of the plan. Your body gets stronger during recovery, not during the workout itself. Build in rest days and prioritize sleep. Pushing too hard leads to burnout and injury.",
      summary: "How to build a sustainable exercise routine that fits your life and brings you joy.",
      imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
      category: "Health"
    });
    await storage.createPost({
      title: "The Beautiful Chaos of Raising a Young Family",
      slug: "raising-young-family",
      content: "The days are long but the years are short—and when you're in the thick of raising little ones, both truths feel very real. Here's what I've learned about surviving and thriving during this demanding, beautiful season.\n\nLower your expectations, raise your grace. Your house will be messy. You will lose your patience. Some days, survival mode is the only mode. That's okay. You're doing harder work than you realize.\n\nPrioritize connection over perfection. Your kids don't need Pinterest-perfect birthday parties or organic everything. They need you—present, attentive, and engaged. Put down the phone and get on the floor.\n\nProtect your marriage. It's easy to become roommates who co-manage children. But your relationship is the foundation of your family. Regular date nights—even at-home ones—keep that connection strong.\n\nBuild a village. Parenting wasn't meant to be done in isolation. Lean on family, friends, neighbors, and community. Accept help when it's offered. Offer help when you can.\n\nEstablish rhythms, not rigid routines. Predictable patterns—meal times, bedtimes, weekly traditions—create security for kids. But hold them loosely. Flexibility is essential when life with little ones is inherently unpredictable.\n\nTake care of yourself. You can't pour from an empty cup. Guard small pockets of time for things that replenish you—a morning coffee in silence, exercise, time with friends.\n\nDocument the moments. Take photos, write notes, capture the little things. You think you'll remember, but the details fade. These recordings become treasures.\n\nThis season is temporary. When you're exhausted and touched out and wondering if you're doing enough, remember: these years will pass faster than you think. You're building something beautiful, one ordinary day at a time.",
      summary: "Encouragement and wisdom for parents navigating the rewarding challenges of young children.",
      imageUrl: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800",
      category: "Family"
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

  registerObjectStorageRoutes(app);

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

  app.post(api.subscribers.create.path, async (req, res) => {
    try {
      const input = api.subscribers.create.input.parse(req.body);
      const subscriber = await storage.createSubscriber(input);
      res.status(201).json(subscriber);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      if (err?.code === "23505") {
        return res.status(400).json({ message: "This email is already subscribed" });
      }
      throw err;
    }
  });

  return httpServer;
}
