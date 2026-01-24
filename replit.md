# replit.md

## Overview

This is a full-stack blog and podcast platform built with React, Express, and PostgreSQL. The application features a content management system for blog posts and photo galleries, with a clean, modern UI designed for content creators and personal branding.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and caching
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with HMR support

The frontend follows a pages-based architecture with reusable components. Pages are located in `client/src/pages/` and shared UI components in `client/src/components/ui/`. Custom hooks handle data fetching and business logic.

### Backend Architecture
- **Framework**: Express 5 on Node.js
- **Database ORM**: Drizzle ORM with PostgreSQL
- **API Design**: RESTful endpoints under `/api/` prefix
- **Schema Validation**: Zod with drizzle-zod for type-safe schemas

The server uses a storage abstraction pattern (`IStorage` interface in `server/storage.ts`) for database operations, making it easy to swap implementations. Routes are defined in `server/routes.ts` with corresponding type definitions in `shared/routes.ts`.

### Data Layer
- **Database**: PostgreSQL with connection pooling via `pg`
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Migrations**: Drizzle Kit manages schema migrations in `./migrations`

Current database entities:
- `posts`: Blog/podcast posts with title, slug, content, summary, image, and category
- `photos`: Photo gallery items with URL and caption

### Shared Code
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts`: Database table definitions and Zod insert schemas
- `routes.ts`: API route definitions with request/response types

### Development vs Production
- **Development**: Vite dev server with HMR, served through Express middleware
- **Production**: Static files built to `dist/public`, server bundled with esbuild

## External Dependencies

### Database
- PostgreSQL (required, connection via `DATABASE_URL` environment variable)
- Drizzle ORM for type-safe database queries
- `connect-pg-simple` for session storage capability

### UI Libraries
- shadcn/ui components built on Radix UI primitives
- Tailwind CSS for styling
- Lucide React for icons
- date-fns for date formatting

### Build & Development
- Vite for frontend bundling
- esbuild for server bundling
- TypeScript for type safety throughout

### Key Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Controls development vs production behavior