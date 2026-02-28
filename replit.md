# Blog & Podcast Website

## Overview

A clean, professional blog and podcast platform built with React, Express, and PostgreSQL. Features a content management system for blog posts and photo galleries with a warm, sophisticated design inspired by personal branding websites.

**Current State:** Fully functional with:
- Public pages: Home, Podcast (blog listing), Post detail, Photo gallery
- Admin dashboard for creating/editing/deleting posts and photos
- PostgreSQL database for persistent storage
- Responsive, clean design with light/dark mode support

## User Preferences

- Preferred communication style: Simple, everyday language
- Design style: Clean, feminine professional, typography-focused

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and caching
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with HMR support

**Pages:**
- `/` - Home page with hero section and featured posts
- `/blog` - Blog listing page (excludes Devotional and Gen_Alpha posts)
- `/blog/:slug` - Individual blog post detail page
- `/gen-alpha` - Gen Alpha listing page (Gen_Alpha category posts)
- `/gen-alpha/:slug` - Individual Gen Alpha post detail page
- `/photos` - Photo gallery page
- `/admin` - Admin dashboard (Posts and Photos management)

### Backend Architecture
- **Framework**: Express 5 on Node.js
- **Database ORM**: Drizzle ORM with PostgreSQL
- **API Design**: RESTful endpoints under `/api/` prefix
- **Schema Validation**: Zod with drizzle-zod for type-safe schemas

**API Endpoints:**
- `GET /api/posts` - List all posts
- `GET /api/posts/:slug` - Get single post by slug
- `POST /api/posts` - Create new post
- `PATCH /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `GET /api/photos` - List all photos
- `POST /api/photos` - Add new photo
- `DELETE /api/photos/:id` - Delete photo

### Data Layer
- **Database**: PostgreSQL with connection pooling via `pg`
- **Schema Location**: `shared/schema.ts` contains all table definitions

**Database Tables:**
- `posts`: Blog/podcast posts with title, slug, content, summary, imageUrl, category
- `photos`: Photo gallery items with url and caption

### Development vs Production
- **Development**: Vite dev server with HMR, served through Express middleware
- **Production**: Static files built to `dist/public`, server bundled with esbuild

## Key Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Controls development vs production behavior

## Export Instructions

To run this on your own server:

1. Install dependencies: `npm install`
2. Set `DATABASE_URL` environment variable to your PostgreSQL connection string
3. Push database schema: `npm run db:push`
4. Build for production: `npm run build`
5. Start server: `npm start`
