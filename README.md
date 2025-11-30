# Garbage Collector's Daughter Frontend

This is the frontend codebase for **Garbage Collector's Daughter**, a personal knowledge system built as a skinnable, interactive, multi-room digital house. The stack is modern, typed, intentionally boring under the hood, and opinionated where it counts.

The site architecture is built around four core modes: writing, learn, reference, and experiments. Content is sourced entirely from **Headless Wordpress** via **WPGraphQL**.

## Tech Stack

- Next.js (App Router)
- TypeScript
- TailwindCSS v4
- WPGraphQL as the backend query layer
- Wordpress + ACF for all structured content
- Zod for schema validation
- Vercel for hosting + deploy previews

The philosophy:

**typed boundaries, predicatable behavior, simple interfaces.**

## Project Structure

````
/
├─ app/                   # App Router pages, layouts, routing
│   ├─ (themes)/          # Theme-specific wrapper components
│   ├─ writing/           # Essay index + room pages
│   ├─ learn/             # Tutorials, guides, patterns
│   ├─ reference/         # Glossary, cheatsheets, taxonomies
│   ├─ experiments/       # Tools, visualizers, generators
│   ├─ collections/       # Series + curated reading paths
│   └─ about/             # About, Colophon
│
├─ components/            # UI primitives + themed components
│   ├─ layout/            # Headers, nav, footers
│   ├─ cards/             # Pixel cards, OS windows, ribbons
│   ├─ content/           # Rich text renderers
│   └─ widgets/           # Sidebars, metadata blocks
│
├─ lib/
│   ├─ graphql/           # Queries, fragments, WPGraphQL client
│   ├─ schemas/           # Zod schemas for WP data
│   ├─ rooms/             # Room definitions + metadata
│   └─ utils/             # Helpers, formatters, theming logic
│
├─ styles/                # Tailwind configs + CSS vars per theme
├─ public/                # Static assets, icons, sprites
├─ .env.example           # Required env vars
└─ README.md              # You're reading it


## Setup

First, install dependencies and then run the development server:

```bash
pnpm install
pnpm dev
````

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
