# PropAutopilot Landing Page — Claude Code Instructions

## Read First
**Before doing anything, read `LANDING-PAGE-BRIEF.md` completely.** It contains the exact spec — colours, typography, spacing, copy, component behavior, everything. It is the single source of truth.

## Project
Single-page marketing + waitlist site for PropAutopilot — an AI-powered Australian investment property acquisition platform. This is a **standalone project**, not the main app.

- **Domain**: propautopilot.com
- **Launch**: April 1st, 2026
- **Goal**: 8,000–20,000 waitlist emails before launch

## Tech Stack
- Next.js 15 (App Router) — **NOT static export** (needs API routes)
- TypeScript (strict mode, no `any`)
- Tailwind CSS v4 (dark mode via `class` strategy)
- Framer Motion (scroll-triggered animations only, keep subtle)
- shadcn/ui (button, card, input, accordion, badge, separator, sheet)
- next/font (Geist Sans + Geist Mono)
- Lucide React (icons)
- next-themes (dark/light toggle)
- **@vercel/kv** (waitlist email storage — Vercel KV, Redis-backed)
- Deploy target: Vercel (propautopilot.com)

## Design Rules
- **Dark mode default**, light mode toggle
- Colour palette: zinc base + indigo-500 primary + indigo→purple→cyan gradient accent
- Exact hex values in LANDING-PAGE-BRIEF.md — use them
- Font: Geist Sans for text, Geist Mono for numbers/stats
- Max content width: `max-w-6xl` (1152px)
- Section spacing: `py-20 md:py-32`
- Cards: `bg-card rounded-2xl border border-border`
- CTA buttons: `rounded-full` (pill shape) or `rounded-xl`
- Animations: fade-in from below on scroll, subtle hover lifts, stagger children
- **No stock photos** — gradient backgrounds, grid patterns, abstract shapes only
- Target 95+ Lighthouse score

## Pricing Tiers (use these exact values)
- **Scout**: $99/mo (was $149)
- **Acquire**: $299/mo (was $449) — highlighted as "Most Popular"
- **Pro**: $599/mo (was $899)

## Waitlist Backend
- **Storage**: Vercel KV (`@vercel/kv`) — NOT JSON file, NOT Supabase
- `POST /api/waitlist` — email capture with rate limiting and dedup
- `GET /api/waitlist` — returns count for social proof
- `GET /api/waitlist/stats` — admin stats (protected by `x-admin-secret` header)
- Track source via `?ref=` query param
- Track advisor vs investor via checkbox

## Coding Standards
- One component per file in `src/components/`
- Use `cn()` from `src/lib/utils.ts` for conditional classes
- Semantic HTML (`section`, `nav`, `main`, `footer`)
- All interactive elements need `aria-label`
- All content from LANDING-PAGE-BRIEF.md — no lorem ipsum, no placeholder text
- Extract repeated copy into component-level constants
- Track user events with `src/lib/analytics.ts`

## What NOT to Do
- Don't use lorem ipsum anywhere — all copy is in the brief
- Don't use HTML `<table>` for the comparison section — use grid/cards
- Don't add a CMS or blog
- Don't use heavy animations that hurt performance
- Don't skip mobile responsiveness
- Don't use inline styles — Tailwind only
- Don't use `output: 'export'` in next.config — API routes need SSR
- Don't use `propautopilot.com.au` — domain is `propautopilot.com`
