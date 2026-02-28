# Claude Code Prompts — PropAutopilot Landing Page

Copy these into Claude Code **one at a time, in order**. Wait for each to complete before starting the next.

---

## Prompt 1: Project Setup + Design Foundation
```
Read CLAUDE.md and LANDING-PAGE-BRIEF.md completely before doing anything.

Then set up the project:

1. Run: npx create-next-app@latest . --typescript --tailwind --app --src-dir --use-pnpm --no-eslint
   (If files exist, overwrite)

2. Install deps:
   pnpm add framer-motion lucide-react class-variance-authority clsx tailwind-merge

3. Set up shadcn:
   npx shadcn@latest init
   - Style: Default
   - Base color: Zinc
   - CSS variables: Yes

4. Add shadcn components:
   npx shadcn@latest add button card input accordion badge separator sheet

5. Set up next/font with Geist Sans and Geist Mono in layout.tsx

6. Configure globals.css with the exact dark mode colour palette from the brief:
   --background: #09090b, --foreground: #fafafa, --card: #18181b,
   --primary: #6366f1, --accent gradient, etc.
   Include light mode overrides.

7. Create the file structure from the brief (empty component files are fine).

8. Create .env.example with: KV_REST_API_URL, KV_REST_API_TOKEN, KV_REST_API_READ_ONLY_TOKEN, ADMIN_SECRET, RESEND_API_KEY, NEXT_PUBLIC_SITE_URL=https://propautopilot.com

9. Create .gitignore for Next.js

10. Set up src/lib/utils.ts with cn() helper
11. Set up src/lib/analytics.ts with trackEvent() as shown in the brief

12. Create src/components/section-wrapper.tsx — a reusable component that takes:
    - id (string)
    - label (string, shown as uppercase small text above heading)
    - heading (string)
    - children
    And renders a properly spaced section with py-20 md:py-32, max-w-6xl mx-auto

13. Create src/components/scroll-animation.tsx — a reusable Framer Motion wrapper
    that fades children in from below on scroll (initial y:30, opacity:0)

Make sure `pnpm dev` runs without errors.
```

## Prompt 2: Navigation + Footer
```
Read the Navigation and Footer sections from LANDING-PAGE-BRIEF.md.

Build:

1. src/components/nav.tsx:
   - Sticky nav with backdrop-blur-xl, bg-background/80, border-b
   - Logo text "PropAutopilot" with a small indigo dot before it
   - Desktop: Features | Pricing | FAQ links (smooth scroll to #ids)
   - "Join Waitlist" small primary rounded button (scrolls to #waitlist)
   - Theme toggle button (sun/moon icon)
   - Mobile: Sheet component (hamburger icon) with all links
   - All nav links use text-muted-foreground hover:text-foreground

2. src/components/theme-toggle.tsx:
   - Uses next-themes (install it: pnpm add next-themes)
   - Sun/Moon icon toggle
   - Add ThemeProvider to layout.tsx

3. src/components/footer.tsx:
   - 3 columns: Brand/tagline | Product links | Legal links
   - "Made in Australia 🇦🇺"
   - "© 2026 PropAutopilot Pty Ltd"
   - Subtle "Investor? See our pitch →" link pointing to /pitch
   - Twitter/X and LinkedIn icon placeholders

4. Wire nav and footer into layout.tsx or page.tsx

Make sure the nav is visible and sticky when scrolling.
```

## Prompt 3: Hero Section
```
Read Section 1 (Hero) from LANDING-PAGE-BRIEF.md carefully.

Build src/components/hero.tsx:

- Badge pill above headline: "🚀 Now accepting early access applications"
  (bg-primary/10 text-primary rounded-full px-3 py-1 text-sm)

- Headline in text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight:
  "Stop Paying Buyer's Agents $15,000."
  (second line) "Build Your Portfolio Smarter."
  "$15,000" uses gradient text (bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400)

- Subheadline in text-lg text-muted-foreground max-w-2xl mx-auto

- Two buttons side by side:
  Primary: "Join the Waitlist →" (rounded-full, scrolls to #waitlist)
  Secondary: "See How It Works ↓" (outline, rounded-full, scrolls to #how-it-works)

- Social proof: "Join 500+ Australian investors on the waitlist"
  with 4-5 overlapping gradient circles (fake avatars) in a flex row

- Background: CSS grid dot pattern using radial-gradient
  Plus a subtle radial glow (indigo, 10-15% opacity) centered behind the headline

- Framer Motion: stagger fade-up animation on all elements (0.15s delay each)

- Section takes full viewport height minus nav (min-h-[calc(100vh-4rem)])
- Content is flex centered vertically

Add to page.tsx. Test on both mobile and desktop.
```

## Prompt 4: Problem + How It Works
```
Read Sections 2 and 3 from LANDING-PAGE-BRIEF.md.

Build:

1. src/components/problem.tsx:
   - Use SectionWrapper with id="problem", label="THE PROBLEM"
   - Heading: "Property investing shouldn't require a PhD in spreadsheets"
   - 2x2 grid of cards (1 column on mobile)
   - Each card: Lucide icon (48px, text-primary), bold title, muted description
   - Cards: bg-card rounded-2xl border border-border p-6, hover:border-primary/50
   - Use ScrollAnimation wrapper for fade-in
   - 4 cards as specified in the brief (Spreadsheet Hell, 8 Websites, Negotiation Anxiety, BA Fees)

2. src/components/how-it-works.tsx:
   - Use SectionWrapper with id="how-it-works", label="HOW IT WORKS"
   - Heading: "Four steps to your next investment property"
   - Desktop: horizontal 4-step flow with numbered circles connected by lines
   - Mobile: vertical stack
   - Each step: numbered circle (1-4, bg-primary text-white rounded-full w-10 h-10),
     Lucide icon, title, description
   - Steps: Strategy → Suburbs → Properties → Negotiate & Buy
   - The connecting line: a thin border-b or absolute positioned line between circles

Add both to page.tsx in order. Scroll animations on both sections.
```

## Prompt 5: Features
```
Read Section 4 (Features) from LANDING-PAGE-BRIEF.md.

Build src/components/features.tsx:
- Use SectionWrapper with id="features", label="FEATURES"
- Heading: "Everything you need. Nothing you don't."
- 3-column grid on desktop (md:grid-cols-3), 1 column mobile
- 8 feature cards total
- Each card:
  - Lucide icon in text-primary (specify exact icons from brief)
  - Bold title
  - Muted 1-2 line description
  - bg-card rounded-2xl border border-border p-6
  - On hover: border becomes gradient (indigo→purple→cyan) — use a CSS trick
    or just hover:border-primary/50 for simplicity
  - Subtle whileHover={{ y: -4 }} with Framer Motion
- Card 7 (AI Agent Outreach) gets a "Coming Soon" badge (shadcn Badge variant)
- Stagger animation: cards fade in with 0.1s delay between each

Add to page.tsx after how-it-works.
```

## Prompt 6: Comparison Table
```
Read Section 5 (Comparison) from LANDING-PAGE-BRIEF.md.

Build src/components/comparison.tsx:
- Use SectionWrapper with id="comparison", label="COMPARE"
- Heading: "How PropAutopilot stacks up"
- DO NOT use an HTML <table>. Use a styled grid/card layout instead.
- 3 columns: "DIY", "Buyer's Agent", "PropAutopilot" (highlighted)
- PropAutopilot column: primary border, slightly elevated, "Recommended" badge
- 7 comparison rows as listed in the brief
- Each row shows the metric name on the left, then values across columns
- PropAutopilot values in text-foreground, others in text-muted-foreground
- Use checkmarks (✓) and crosses (✗) where appropriate
- Mobile: stack or horizontal scroll

- Below the comparison: callout card
  "💡 The average buyer's agent fee in Australia is $11,000. PropAutopilot pays for itself on your first property."
  Styled: bg-primary/5 border border-primary/20 rounded-xl p-6

Add to page.tsx.
```

## Prompt 7: Pricing
```
Read Section 6 (Pricing) from LANDING-PAGE-BRIEF.md.

Build src/components/pricing.tsx:
- Use SectionWrapper with id="pricing", label="PRICING"
- Heading: "Launch pricing — early adopters lock in these rates"
- 3 pricing cards side by side (stack on mobile)

IMPORTANT — use these exact tiers:

Scout — $99/mo
  Features: Strategy tools, Suburb explorer (10), Borrowing power calc, Cashflow modeller, Property alerts (5 suburbs), Deal pipeline (3 active), Email support
  Tagline: "Perfect for your first investment property"

Acquire — $299/mo (HIGHLIGHTED — Most Popular badge)
  Features: Everything in Scout PLUS unlimited suburbs, Automated CMA, Portfolio dashboard, Unlimited alerts, Unlimited pipeline, Agent CRM + negotiation, Voice AI 20 calls/mo (when available), Priority support
  Tagline: "For serious investors building a portfolio"
  This card: larger, primary border, shadow-lg, "Most Popular" badge

Pro — $599/mo
  Features: Everything in Acquire PLUS multi-client (3 seats), Unlimited Voice AI, White-label reports, API access, Dedicated support
  Tagline: "For buyer's agents and advisory firms"
  Badge: "For Professionals"

Each card has a "Join Waitlist" button that scrolls to #waitlist.
Below cards: "14-day free trial. No credit card required."
Early bird: "🐦 First 100 waitlist members get 50% off for 12 months" in a highlighted callout.

Add to page.tsx.
```

## Prompt 8: Testimonials + FAQ
```
Read Sections 7 and 8 from LANDING-PAGE-BRIEF.md.

Build:

1. src/components/testimonials.tsx:
   - Use SectionWrapper with label="WHAT INVESTORS SAY"
   - Heading: "Built for investors, by investors"
   - 3 testimonial cards in a row (stack on mobile)
   - Each: quote in italic, then name (bold), location, context
   - Avatar: gradient circle placeholder (w-12 h-12 rounded-full bg-gradient-to-r)
   - Add code comment: {/* TODO: Replace with real testimonials */}

2. src/components/faq.tsx:
   - Use SectionWrapper with id="faq", label="FAQ"
   - Heading: "Questions? Answers."
   - shadcn Accordion component, max-w-3xl mx-auto
   - All 8 Q&As from the brief (copy them exactly)
   - Track FAQ opens with analytics.trackEvent('faq_expand', { question })

Add both to page.tsx.
```

## Prompt 9: Waitlist Form + API
```
Read Section 9 (Waitlist) and the Waitlist Backend section from LANDING-PAGE-BRIEF.md.

Build:

1. src/components/waitlist-form.tsx:
   - Email input (h-12, rounded-lg)
   - Submit button: "Join Waitlist →" (primary, full width on mobile, inline on desktop)
   - Checkbox below: "I'm a buyer's agent or property advisor"
   - States: idle → loading (spinner) → success ("✅ You're in!") → error
   - Email validation (format check)
   - Track: analytics.trackEvent('waitlist_signup')
   - Use React useState for form state, no form library needed

2. src/components/waitlist-section.tsx:
   - Full section wrapper with id="waitlist"
   - Subtle gradient background (bg-gradient-to-b from-primary/5 to-transparent)
   - Heading: "Be first in line"
   - Subheading: "PropAutopilot launches April 1st, 2026..."
   - WaitlistForm component centered, max-w-md
   - Trust line: "No spam. Unsubscribe anytime."

3. src/app/api/waitlist/route.ts:
   - Install @vercel/kv: pnpm add @vercel/kv
   - POST handler using Vercel KV (import { kv } from '@vercel/kv')
   - Validate email format, normalise to lowercase
   - Store email in Redis SET 'waitlist:emails' (dedup via SISMEMBER)
   - Store full entry in HASH 'waitlist:entry:{email}'
   - Track daily signups: INCR 'waitlist:daily:{YYYY-MM-DD}'
   - Track advisors: SADD 'waitlist:advisors' if checkbox checked
   - Rate limiting: 3 per IP per hour using SET with EX 3600
   - Read ?ref= source param from request body
   - Return { message: "You're on the list!", position: <SCARD count> }
   - Handle duplicates gracefully (return success anyway — don't leak info)
   - GET handler: return { count: <SCARD 'waitlist:emails'> }

4. src/app/api/waitlist/stats/route.ts:
   - Admin-only endpoint (check x-admin-secret header against ADMIN_SECRET env var)
   - Return: total, advisors count, daily breakdown (last 7 days), target (10000), daysUntilLaunch

Add waitlist-section to page.tsx before footer.
```

## Prompt 10: SEO + Metadata + OG Image
```
Read the SEO section from LANDING-PAGE-BRIEF.md.

1. Update src/app/layout.tsx metadata:
   - title, description as specified
   - Open Graph: title, description, image, type, url
   - Twitter card: summary_large_image
   - Add Schema.org JSON-LD script (SoftwareApplication) as specified in brief

2. Create a simple OG image:
   - public/og-image.png — Create a 1200x630 image
   - Since we can't generate images, create an SVG-based approach:
     Create a simple React component that renders the OG card, or just use a
     placeholder gradient with "PropAutopilot" text
   - Alternative: create public/og-image.svg and reference it

3. Add robots.txt and sitemap support:
   - public/robots.txt (allow all, reference sitemap)
   - Add sitemap generation in next.config or a sitemap.ts route

4. Verify all sections have proper heading hierarchy (one H1, H2 per section)
5. Add alt text to any images
6. Add aria-labels to icon buttons (theme toggle, mobile menu)
```

## Prompt 11: Investor Pitch Mode
```
Read the Investor Pitch Mode section from LANDING-PAGE-BRIEF.md.

Build:

1. src/components/pitch-sections.tsx:
   - 4 investor-only sections: Market Opportunity, Unit Economics, Why Now, Competitive Moat
   - Each section has a slightly different background: bg-zinc-900/50 with border-t border-primary/20
   - Market Opportunity: 4 KPI cards in a row showing $11.9T, 2.24M, 57,624, $47B
     Use Geist Mono for the numbers, animate counting up on scroll
   - Unit Economics: simple table/grid with ARPU, CAC, LTV, LTV:CAC, Gross Margin, Payback
   - Why Now: 4 cards with reasons
   - Competitive Moat: numbered list with 4 moats

2. src/app/pitch/page.tsx:
   - Same as home page but includes pitch sections after Features
   - Show "Investor View" badge fixed in top-right (position: fixed, z-50)
   - Can also be triggered by ?pitch=true on the home page (check searchParams)

3. On home page (page.tsx): check for ?pitch=true searchParam and conditionally
   render pitch sections if present

Track: analytics.trackEvent('pitch_mode') when pitch sections are visible.
```

## Prompt 12: Final Polish + Build Check
```
Review the entire site and fix any issues:

1. Run `pnpm build` — fix ALL TypeScript errors and warnings
2. Test smooth scrolling for all nav links
3. Verify mobile responsiveness:
   - Check at 375px (iPhone SE)
   - Check at 768px (iPad)
   - Check at 1440px (desktop)
4. Verify dark mode looks correct on ALL sections
5. Verify light mode looks correct on ALL sections
6. Check all Framer Motion animations work (fade in on scroll)
7. Verify waitlist form: submit → loading → success states
8. Verify FAQ accordion opens/closes
9. Verify pitch mode works via /pitch and ?pitch=true
10. Check no console errors
11. Add any missing aria-labels for accessibility
12. Verify heading hierarchy (Lighthouse a11y check)
13. Run: pnpm build && pnpm start — verify production build works

Report what you fixed and the final state.
```

---

## Tips for Claude Code

- After each prompt, run `pnpm dev` and check the browser before moving on
- If something looks off, describe the issue and ask Claude Code to fix it
- The brief has exact colour values, spacing, and component specs — reference it
- Keep components small and focused (one per file)
- Use `cn()` for conditional Tailwind classes
