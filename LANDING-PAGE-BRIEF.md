# PropAutopilot Landing Page — Full Specification v3

> **Last updated**: 2026-03-01
> **Launch date**: April 1st, 2026
> **Pre-launch email target**: 8,000–20,000 waitlist signups
> **Domain**: propautopilot.com (Vercel)
> **Status**: Site built and deployed at `propautopilot-project/landing-page/propautopilot-site/`

## Overview

Single-page marketing site with waitlist capture for PropAutopilot — an AI-powered platform that automates Australian investment property acquisition. Deployed on Vercel at **propautopilot.com**. Must look like it was built by a funded startup, not a weekend project.

This brief is the **single source of truth** for all landing page design, copy, and technical decisions. The site is already built — this document governs future changes and ensures consistency.

---

## Business Context

- **Launch**: April 1st, 2026
- **Goal**: Collect 8,000–20,000 waitlist emails before launch
- **Use case**: Pre-launch email capture, investor pitch mode, SEO foundation
- **Parallel activities**: Fundraising, data partnership negotiations (CoreLogic, REA), platform development
- **Waitlist as leverage**: Numbers demonstrate demand to investors and data partners

---

## Tech Stack

| Choice | Justification |
|--------|--------------|
| Next.js 15 (App Router) | SSR + API routes for waitlist, Vercel-native |
| TypeScript (strict) | Type safety |
| Tailwind CSS v4 | Rapid styling, dark mode via `class` strategy |
| Framer Motion | Scroll-triggered animations, section reveals |
| shadcn/ui | Buttons, cards, inputs, accordion, badge |
| `next/font` (Geist Sans + Geist Mono) | Vercel's font, no CLS |
| Lucide React | Icons |
| **Vercel KV** | Waitlist email storage (Redis-backed, serverless) |
| Vercel Analytics | Privacy-friendly traffic analytics |
| Vercel | Zero-config deploy, edge CDN, propautopilot.com |

### Why Not Static Export

The site uses API routes (`POST /api/waitlist`, `GET /api/waitlist`, `GET /api/waitlist/stats`) for email capture and analytics. This requires server-side rendering, not `output: 'export'`. Vercel handles this natively.

---

## Design System

### Brand Identity

PropAutopilot is a **financial technology product** — design must convey trust, intelligence, and professionalism. Think Linear, Vercel, or Stripe — not Dribbble showcase.

- **Tone**: Confident, data-driven, Australian
- **Aesthetic**: Dark-first, clean, spacious, modern
- **No stock photos** — gradient backgrounds, grid patterns, abstract UI elements only
- **No gimmicks** — subtle animations only, nothing that distracts from content

### Colour Palette (exact hex values)

#### Dark Mode (Default)
```css
--background:           #09090b   /* zinc-950 */
--foreground:           #fafafa   /* zinc-50 */
--card:                 #18181b   /* zinc-900 */
--card-foreground:      #fafafa   /* zinc-50 */
--primary:              #6366f1   /* indigo-500 */
--primary-foreground:   #ffffff   /* white */
--secondary:            #27272a   /* zinc-800 */
--secondary-foreground: #fafafa   /* zinc-50 */
--muted:                #27272a   /* zinc-800 */
--muted-foreground:     #a1a1aa   /* zinc-400 */
--accent:               #27272a   /* zinc-800 */
--accent-foreground:    #fafafa   /* zinc-50 */
--border:               #27272a   /* zinc-800 */
--ring:                 #6366f1   /* indigo-500 */
--success:              #22c55e   /* green-500 */
--destructive:          #ef4444   /* red-500 */
```

#### Light Mode Overrides
```css
--background:           #ffffff   /* white */
--foreground:           #09090b   /* zinc-950 */
--card:                 #f4f4f5   /* zinc-100 */
--card-foreground:      #09090b   /* zinc-950 */
--secondary:            #e4e4e7   /* zinc-200 */
--secondary-foreground: #09090b   /* zinc-950 */
--muted:                #f4f4f5   /* zinc-100 */
--muted-foreground:     #71717a   /* zinc-500 */
--accent:               #f4f4f5   /* zinc-100 */
--accent-foreground:    #09090b   /* zinc-950 */
--border:               #e4e4e7   /* zinc-200 */
```

#### Gradients
```css
--accent-gradient:          linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)
--highlight-card-border:    linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #06b6d4 100%)
--gradient-text:            linear-gradient(to right, #6366f1, #8b5cf6, #06b6d4)
--hero-glow:                radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)
--grid-dots:                radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px)
```

### Typography

| Element | Font | Weight | Size | Tracking | Additional |
|---------|------|--------|------|----------|------------|
| H1 (hero) | Geist Sans | 900 (black) | `text-4xl sm:text-5xl md:text-7xl` | `tracking-tight` | `leading-[1.1]` |
| H2 (sections) | Geist Sans | 700 (bold) | `text-3xl sm:text-4xl md:text-5xl` | `tracking-tight` | — |
| H3 (cards) | Geist Sans | 700 (bold) | `text-xl md:text-2xl` | — | — |
| Body | Geist Sans | 400 | `text-base md:text-lg` | — | — |
| Body secondary | Geist Sans | 400 | `text-base md:text-lg` | — | `text-muted-foreground` |
| Mono (stats) | Geist Mono | 700 | varies | — | `tabular-nums` |
| Section label | Geist Sans | 600 | `text-sm` | `tracking-wider uppercase` | `text-primary` |
| Badge/pill | Geist Sans | 500 | `text-sm` | — | — |
| Nav links | Geist Sans | 500 | `text-sm` | — | `text-muted-foreground` |
| CTA buttons | Geist Sans | 600 | `text-base` | — | — |

**Font loading**: Use `next/font/local` or `next/font/google` for both Geist Sans and Geist Mono. Set `display: 'swap'` to prevent CLS.

### Spacing & Layout

| Property | Value | Notes |
|----------|-------|-------|
| Max content width | `max-w-6xl` (1152px) | All section content |
| Container padding | `px-4 sm:px-6 lg:px-8` | Horizontal padding |
| Section vertical padding | `py-20 md:py-32` | Between sections |
| Card padding | `p-6 md:p-8` | Internal card padding |
| Card border radius | `rounded-2xl` | 16px |
| Button border radius | `rounded-xl` or `rounded-full` | CTA = full, cards = xl |
| Section gap | None | Sections use their own padding |
| Card gap in grids | `gap-6 md:gap-8` | Between cards |
| Container | `mx-auto` | Centered |

### Component Patterns

#### Cards
```
Base:       bg-card rounded-2xl border border-border p-6 md:p-8
Hover:      hover:border-primary/50 transition-colors duration-200
Featured:   border-2 border-primary/50 shadow-lg shadow-primary/10
            bg-gradient-to-b from-primary/5 to-transparent
```

#### Gradient Text
```
bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400
bg-clip-text text-transparent
```

#### CTA Buttons
```
Primary:    bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-3.5 font-semibold
            shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all
Secondary:  border border-border hover:bg-secondary rounded-full px-8 py-3.5 font-medium
            text-foreground transition-all
```

#### Badge / Pill
```
Default:    bg-primary/10 text-primary text-sm rounded-full px-3 py-1 font-medium
Success:    bg-success/10 text-success text-sm rounded-full px-3 py-1
```

#### Section Labels
```
text-primary font-semibold text-sm uppercase tracking-wider mb-3
```

#### Grid Dot Background (Hero)
```css
background-image: radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px);
background-size: 24px 24px;
```

### Animations (Framer Motion)

All animations must be **subtle**. This is a finance product, not a game.

| Animation | Config |
|-----------|--------|
| Section reveal | `initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, margin: "-100px" }}` |
| Stagger children | Parent: `staggerChildren: 0.1` |
| Hero elements | Fade up with 0.15s stagger delay, duration 0.5s |
| Card hover | `whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}` |
| Number counters | Animate from 0 to target value on scroll into view (for pitch mode stats) |
| Badge pulse | `animate-pulse` on the green dot in hero badge |
| Button hover | `hover:shadow-lg` + subtle translateY(-1px) |
| FAQ accordion | `height: 0 → auto` with `duration: 0.2` |

**Do not** animate background elements, floating particles, or anything that runs continuously. Static grid dots and gradient glows are fine.

### Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|-----------|-------|----------------|
| Mobile | < 640px | Single column, stacked nav (hamburger), full-width buttons |
| Tablet | 640–1024px | 2-column grids, side-by-side buttons |
| Desktop | > 1024px | 3-column feature grid, horizontal stepper, inline nav |

### Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 95+ |
| Lighthouse Accessibility | 95+ |
| Lighthouse SEO | 95+ |
| Lighthouse Best Practices | 95+ |
| LCP | < 2.5s |
| CLS | < 0.1 |
| FID | < 100ms |
| First Load JS | < 150kB |
| No CLS from fonts | Use `next/font` with `display: swap` |
| Images | `next/image` with lazy loading |

---

## Page Structure

### Navigation (sticky, blur backdrop)

```
[P icon] PropAutopilot     Features  Pricing  FAQ     [Join Waitlist →]  [🌙/☀️]
```

- `sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border`
- Logo: text "PropAutopilot" with a small gradient rounded-lg icon (indigo→purple "P") before it
- Nav links: `text-muted-foreground hover:text-foreground transition-colors` with smooth scroll to `#section-id`
- CTA: small primary rounded-xl button, scrolls to `#waitlist`
- Theme toggle: sun/moon icon button using `next-themes`
- Mobile: hamburger → `Sheet` component (shadcn) with all links + CTA
- Height: `h-16` (4rem)

---

### Section 1: Hero

**Layout**: Full viewport height (`min-h-[calc(100vh-4rem)]`), centered single column, flex items-center

**Badge above headline**:
```
🚀 Launching April 1st — Join the waitlist
```
- Style: `inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20`
- Green pulse dot: `w-2 h-2 rounded-full bg-success animate-pulse`

**Headline** (`text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.1]`):
```
Stop Paying Buyer's Agents $15,000.
Build Your Portfolio Smarter.
```
- "$15,000" uses gradient text
- Line break between sentences (`<br />` on md+, natural wrap on mobile)

**Subheadline** (`text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance`):
```
PropAutopilot replaces the spreadsheets, the 8-website suburb research grind,
and the $15K buyer's agent fees. One AI-powered platform — from strategy to settlement.
```

**Two CTA buttons side by side** (`flex flex-col sm:flex-row gap-4 items-center justify-center`):
- Primary: "Join the Waitlist →" (scrolls to `#waitlist`)
- Secondary/outline: "See How It Works ↓" (scrolls to `#how-it-works`)

**Social proof below CTAs** (`mt-10 text-sm text-muted-foreground`):
```
First 100 members get 50% off for 12 months — founding member pricing
```

**Hero visual**: Abstract dashboard mockup — grid of UI card placeholders (rounded-lg, gradient borders, skeleton content blocks) to suggest a sophisticated product without showing the real UI.

**Background**:
- Grid dot pattern (`background-size: 24px 24px`)
- Radial gradient glow from center (indigo, 10-15% opacity, 800px radius)
- Second subtle glow (accent/cyan, 5% opacity, offset right)

**Framer Motion**: Each element fades up (`y: 20 → 0, opacity: 0 → 1`) with 0.15s stagger.

---

### Section 2: Problem Statement

**Section ID**: `#problem`

**Label**: `THE PROBLEM`

**Heading**: `Property investing shouldn't require a PhD in spreadsheets`

**Layout**: 2×2 grid (`grid-cols-1 md:grid-cols-2 gap-6`), stacks single column on mobile

**4 pain point cards**:

Each card: Lucide icon (48px, `text-primary`), bold title, muted description, card styling with hover lift

| # | Icon | Title | Description |
|---|------|-------|-------------|
| 1 | `TableProperties` | **Spreadsheet Hell** | "4 Excel spreadsheets. 78+ input cells. You spend more time wrangling formulas than finding properties." |
| 2 | `Globe` | **8 Websites Per Suburb** | "SQM, DSR Data, ABS, Domain, council maps, flood maps... Evaluating 50 suburbs means 400+ browser tabs." |
| 3 | `PhoneOff` | **Negotiation Anxiety** | "Calling agents every Monday. Asking probing questions. Negotiating price drops. Most investors would rather not." |
| 4 | `DollarSign` | **$11,000 Buyer's Agent Fees** | "Or pay someone else to do it — and hope they pick the right suburb. Average BA fee: $11,000 per property." |

---

### Section 3: How It Works

**Section ID**: `#how-it-works`

**Label**: `HOW IT WORKS`

**Heading**: `Four steps to your next investment property`

**Layout**: Horizontal stepper on desktop (with connecting lines between numbered circles), vertical stack on mobile

**Steps**:

| # | Icon | Title | Description |
|---|------|-------|-------------|
| 1 | `Target` | **Set Your Strategy** | "Answer a few questions about your finances. We calculate borrowing power, model cashflow scenarios, and recommend your target price range." |
| 2 | `Map` | **Find Your Suburbs** | "We score 3,800+ Australian suburbs across 22 factors — vacancy, yield, growth signals, hazards. Ranked shortlist in minutes, not weeks." |
| 3 | `Home` | **Score Properties** | "New listings are auto-scored against your criteria. Flood zones flagged. Comparable sales pulled. Deal quality rated before you even look." |
| 4 | `Handshake` | **Negotiate & Buy** | "Track deals from enquiry to settlement. AI-assisted agent outreach. Manage offers, inspections, and your whole team in one pipeline." |

**Step number circle**: `w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold`

**Connecting line** (desktop): thin horizontal line `border-b border-border` or absolute positioned div between circles

---

### Section 4: Key Features

**Section ID**: `#features`

**Label**: `FEATURES`

**Heading**: `Everything you need. Nothing you don't.`

**Layout**: 3-column grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`), 8 cards

| # | Icon | Title | Description | Badge |
|---|------|-------|-------------|-------|
| 1 | `BarChart3` | **Suburb Scoring Engine** | "22 factors from vacancy to infrastructure — scored, ranked, and visualised. Stop guessing, start comparing." | — |
| 2 | `Calculator` | **Automated CMA** | "Comparable sales pulled automatically. Know what a property is worth before you offer." | — |
| 3 | `TrendingUp` | **Cashflow Modeller** | "Stress-test at +2% rates. Model IO→P&I reversion. See exactly what a deal costs you weekly." | — |
| 4 | `Wallet` | **Borrowing Power Calculator** | "Multi-lender, IO vs P&I, LMI calculations. Matches what your broker will tell you." | — |
| 5 | `Kanban` | **Deal Pipeline** | "Kanban board: lead → research → offer → contract → settlement. Never lose track of a deal." | — |
| 6 | `PieChart` | **Portfolio Dashboard** | "Total equity, yield, cashflow across all properties. Know when you're ready for the next one." | — |
| 7 | `Bot` | **AI Agent Outreach** | "AI calls agents on your behalf. Gathers intel, screens PMs, negotiates offers. You approve every decision." | `Coming Soon` |
| 8 | `Bell` | **Smart Property Alerts** | "New listings matching your criteria, scored and delivered instantly. Filter the noise." | — |

Each card: icon in `text-primary`, hover lifts `y: -4` via Framer Motion, gradient border on hover

---

### Section 5: Comparison Table

**Section ID**: `#comparison`

**Label**: `COMPARE`

**Heading**: `How PropAutopilot stacks up`

**Layout**: Card-based grid (NOT an HTML `<table>`) — 3 columns on desktop, horizontal scroll or stacked on mobile

| Row | DIY (Spreadsheets) | Buyer's Agent | PropAutopilot ✨ |
|-----|-------------------|---------------|-----------------|
| **Cost** | Free (your time) | $8,000–15,000/property | From $99/mo |
| **Suburb research** | 2–6 weeks manual | Done for you (opaque) | Minutes (transparent) |
| **Properties evaluated** | 5–10 (fatigue) | Unknown | Unlimited |
| **Data sources** | 8+ websites manual | Agent's network | All sources, one screen |
| **Negotiation** | You do it | Agent does it | AI-assisted + your control |
| **Portfolio tracking** | Another spreadsheet | Not included | Built-in dashboard |
| **Transparency** | Full (but overwhelming) | Low | Full (and organised) |

PropAutopilot column: highlighted with `border-2 border-primary/50`, primary background tint, "✨" or badge

**Callout box below**:
```
💡 The average buyer's agent fee in Australia is $11,000.
   PropAutopilot pays for itself on your first property.
```
Style: `bg-primary/5 border border-primary/20 rounded-xl p-6`

---

### Section 6: Pricing

**Section ID**: `#pricing`

**Label**: `PRICING`

**Heading**: `Launch pricing — early adopters lock in these rates`

**Early bird badge above cards**: `🚀 Early Bird — 33% off launch pricing`

**3 tier cards side by side** (`grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto`)

#### Scout — $99/mo
- **Badge**: none
- **Original price**: ~~$149~~ (crossed out)
- **Features**:
  - Strategy & financial tools
  - Suburb explorer (10 shortlisted)
  - Borrowing power calculator
  - Cashflow modeller
  - Property alerts (5 suburbs)
  - Deal pipeline (3 active)
  - Email support
- **Tagline**: *"Perfect for your first investment property"*
- **CTA**: "Join Waitlist" → scrolls to `#waitlist`

#### Acquire — $299/mo ← **HIGHLIGHTED**
- **Badge**: `Most Popular` (gradient pill, positioned above card with `absolute -top-3`)
- **Original price**: ~~$449~~ (crossed out)
- **Card styling**: larger, `border-2 border-primary/50`, `shadow-lg`, gradient top edge
- **Features**:
  - Everything in Scout
  - Unlimited suburb research
  - Automated CMA
  - Portfolio dashboard
  - Unlimited property alerts
  - Unlimited deal pipeline
  - Agent CRM + negotiation tools
  - Voice AI (20 calls/mo) *(when available)*
  - Priority support
- **Tagline**: *"For serious investors building a portfolio"*
- **CTA**: "Join Waitlist" → primary button style

#### Pro — $599/mo
- **Badge**: `For Professionals`
- **Original price**: ~~$899~~ (crossed out)
- **Features**:
  - Everything in Acquire
  - Multi-client management (3 seats)
  - Unlimited Voice AI calls
  - White-label reports
  - API access
  - Dedicated support
- **Tagline**: *"For buyer's agents and advisory firms"*
- **CTA**: "Join Waitlist" → scrolls to `#waitlist`

**Below all cards**:
- "All plans include a 14-day free trial. No credit card required."
- `🐦 First 100 waitlist members get 50% off for 12 months` (highlighted callout)

---

### Section 7: Social Proof / Testimonials

**Section ID**: `#testimonials`

**Label**: `WHAT INVESTORS SAY`

**Heading**: `Built for investors, by investors`

**3 testimonial cards** in a row (stack on mobile):

Each card: quote text (italic), avatar (gradient circle placeholder `w-12 h-12`), name (bold), location, context

1. *"I was spending 3 hours every Sunday researching suburbs in spreadsheets. PropAutopilot does it in 10 minutes."*
   — **Sarah M.** · Sydney · 2 investment properties

2. *"My buyer's agent charged $12K and picked a suburb I could have found myself. Never again."*
   — **James R.** · Melbourne · Scaling to 5 properties

3. *"The cashflow modeller alone is worth the subscription. I can stress-test any deal in seconds."*
   — **Priya K.** · Brisbane · First-time investor

**Code comment**: `{/* TODO: Replace placeholder testimonials with real ones before April 1 launch */}`

---

### Section 8: FAQ

**Section ID**: `#faq`

**Label**: `FAQ`

**Heading**: `Questions? Answers.`

**Component**: shadcn/ui `Accordion`, `max-w-3xl mx-auto`

| Question | Answer |
|----------|--------|
| "Do I need to have done a property investment course?" | No. PropAutopilot works for any Australian property investor. But if you've done a course, you'll recognise the methodology — we've digitised the workflow used by thousands of successful investors. |
| "What data sources do you use?" | We aggregate from CoreLogic, SQM Research, Domain, ABS Census, council planning portals, and state hazard maps. All the sources you'd check manually — in one view. |
| "Can PropAutopilot actually replace a buyer's agent?" | That's the goal. PropAutopilot gives you the same research, analysis, and deal management tools — at a fraction of the cost. You stay in control of every decision. |
| "How does the Voice AI work?" | Our AI agent calls real estate agents on your behalf to gather intelligence, ask probing questions, and negotiate. You approve every offer. It's like a tireless junior buyer's agent. *(Coming in a later release.)* |
| "Is my data secure?" | All data encrypted at rest and in transit. We never share your financial information. SOC 2 compliance on our roadmap. |
| "What if I'm investing interstate?" | PropAutopilot is built for remote investing. Research any suburb in Australia, compare across states, manage deals without visiting. |
| "Can I try it before paying?" | 14-day free trial, no credit card required. |
| "How is this different from SuburbFinder or InvestorKit?" | Those tools do suburb research only. PropAutopilot covers the entire workflow — strategy, borrowing power, suburb selection, property scoring, CMA, negotiation, settlement tracking, and portfolio management. One platform, not five subscriptions. |
| "When is PropAutopilot launching?" | April 1st, 2026. Join the waitlist now to get priority access on launch day and lock in founding member pricing — 50% off for 12 months. |

Track FAQ item opens: `analytics.trackEvent('faq_expand', { question: 'abbreviated question' })`

---

### Section 9: Waitlist CTA

**Section ID**: `#waitlist`

**Background**: Full-width, subtle gradient (`bg-gradient-to-b from-primary/5 via-primary/10 to-transparent`)

**Heading**: `Be first in line when we launch April 1st`

**Subheading**: `Join Australian investors getting early access and founding member pricing. First 100 members lock in 50% off for 12 months.`

**Form** (centered, `max-w-md mx-auto`):
- Email input: `h-12 rounded-xl`, placeholder "you@email.com"
- Submit button: "Join Waitlist →" primary, full width below input on mobile, inline on desktop
- Checkbox below: `☐ I'm a buyer's agent or property advisor`
- Loading state: spinner on button, disabled
- Success state: replace form with:
  ```
  ✅ You're on the list!
  You're #[position] on the waitlist
  We'll email you when early access opens on April 1st.
  ```
- Error state: inline red text below form
- Validation: email format check, show error inline

**Trust line below**: "No spam. Unsubscribe anytime. We respect your privacy."

---

### Section 10: Footer

**3 columns on desktop, stacked on mobile**:

Column 1:
- Logo (gradient icon + "PropAutopilot")
- "Your AI-powered property investment co-pilot"
- "Made in Australia 🇦🇺"

Column 2: **Product**
- Features | Pricing | FAQ | Blog *(coming soon)*

Column 3: **Company**
- About | Contact (hello@propautopilot.com) | Privacy Policy | Terms of Service

**Bottom row**: "© 2026 PropAutopilot Pty Ltd" + Twitter/X icon + LinkedIn icon

**Investor mode**: Small, muted text: `Investor? See our pitch →` — triggers pitch overlay or navigates to `/pitch`

---

## Investor Pitch Mode

**Trigger**: `?pitch=true` query param OR `/pitch` route OR footer link

**When active**:
- Show "Investor View" badge fixed in top-right (`fixed top-4 right-4 z-50`)
- After Features section, insert 4 additional sections with darker background (`bg-zinc-900/50`, `border-t border-primary/20`)

### Market Opportunity (pitch only)

KPI cards in a row (Geist Mono numbers, animate counting up on scroll):

| Stat | Label |
|------|-------|
| **$11.9T** | AU residential market value |
| **2.24M** | Property investors (ATO) |
| **57,624** | New investment loans, Q3 2025 (record) |
| **$47B** | Global proptech TAM |

Text: "PropAutopilot targets the $2.3B addressable market of AU property investor tooling and buyer's agent services. Year 3 target: $6.8M ARR."

### Unit Economics (pitch only)

| Metric | Value |
|--------|-------|
| Blended ARPU | ~$218/mo |
| CAC | ~$120 |
| LTV (24mo) | ~$5,232 |
| LTV:CAC | 44:1 |
| Gross Margin | 81.6% |
| Payback | <1 month |

### Why Now (pitch only)

4 cards:
1. AI maturity → voice negotiation now feasible
2. Property data APIs increasingly accessible
3. BA industry under scrutiny (conflicts, fees)
4. Record investment lending → more investors need tools

### Competitive Moat (pitch only)

1. Workflow completeness (strategy → settlement)
2. Voice AI negotiation (no competitor has this)
3. Course ecosystem distribution (15K+ alumni)
4. Data compounding effects

---

## SEO

### Meta Tags (layout.tsx)
```
title: "PropAutopilot — AI-Powered Property Investment Platform | Australia"
description: "Stop paying buyer's agents $15,000. PropAutopilot automates suburb research, property scoring, cashflow modelling, and deal management for Australian property investors. From $99/mo."
```

### Open Graph
```
og:title: "PropAutopilot — Build Your Property Portfolio Smarter"
og:description: "AI-powered property acquisition platform. 3,800+ suburbs scored. From $99/mo."
og:image: /og-image.png (1200×630, branded card)
og:type: website
og:url: https://propautopilot.com
```

### Schema.org (JSON-LD in layout)
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "PropAutopilot",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "description": "AI-powered property investment acquisition platform for Australian investors",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "99",
    "highPrice": "599",
    "priceCurrency": "AUD",
    "offerCount": "3"
  }
}
```

### Target Keywords
- property investment platform australia
- replace buyers agent
- suburb research tool
- property cashflow calculator
- investment property scoring
- DIY property investment
- buyer's agent alternative australia

---

## Analytics & Event Tracking

### Events
| Event | Trigger | Properties |
|-------|---------|------------|
| `page_view` | Page load | auto (Vercel Analytics) |
| `waitlist_submit` | Form submit attempt | `{ location: 'hero' \| 'cta_section' }` |
| `waitlist_success` | Successful signup | `{ position: number }` |
| `cta_click` | Any CTA button | `{ location, tier? }` |
| `pricing_view` | Pricing section enters viewport | — |
| `faq_expand` | FAQ item opened | `{ question }` |
| `pitch_mode` | Pitch mode activated | — |
| `scroll_depth` | 25/50/75/100% scroll | `{ depth }` |

### Implementation (`src/lib/analytics.ts`)
```typescript
export function trackEvent(name: string, properties?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && (window as any).va) {
    (window as any).va('event', { name, ...properties })
  }
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', name, properties)
  }
}
```

---

## Waitlist Backend

### Storage: Vercel KV (Redis)

**Decision**: Vercel KV is the waitlist backend. Not JSON file, not Supabase. Vercel KV provides serverless Redis with zero config when linked to a Vercel project.

**Package**: `@vercel/kv`

**Environment variables** (auto-set by Vercel when KV store is created):
```
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=
```

### API Routes

#### `POST /api/waitlist`
```typescript
interface WaitlistEntry {
  email: string           // normalised to lowercase
  isAdvisor: boolean      // "I'm a buyer's agent" checkbox
  source: string          // from ?ref= query param or 'direct'
  referrer: string        // document.referrer
  ip: string              // for rate limiting
  createdAt: string       // ISO timestamp
}
```

**KV data model**:
- `waitlist:emails` — Redis SET of all emails (dedup + count)
- `waitlist:entry:{email}` — Redis HASH with full entry data
- `waitlist:count` — Redis counter (redundant with SCARD but fast)
- `waitlist:daily:{YYYY-MM-DD}` — Redis counter per day
- `waitlist:advisors` — Redis SET of advisor emails
- `waitlist:rate:{ip}` — Redis counter with TTL for rate limiting

**Rate limiting**: 3 signups per IP per hour (`SET key value EX 3600`)

**Duplicate handling**: Check `SISMEMBER waitlist:emails`, return success either way (don't leak info about existing emails)

**Response**:
```json
{ "message": "You're on the list!", "position": 1234 }
```

#### `GET /api/waitlist`
Returns current count for live social proof:
```json
{ "count": 1234 }
```

#### `GET /api/waitlist/stats` (admin only)
Protected by `x-admin-secret` header matching `ADMIN_SECRET` env var.

Returns:
```json
{
  "total": 1234,
  "advisors": 89,
  "investors": 1145,
  "daily": { "2026-03-01": 45, "2026-02-28": 32, ... },
  "target": 10000,
  "daysUntilLaunch": 31
}
```

### UTM / Source Tracking

All marketing links should use `?ref=` parameter:
- `propautopilot.com?ref=reddit-ausfinance`
- `propautopilot.com?ref=twitter`
- `propautopilot.com?ref=linkedin`
- `propautopilot.com?ref=fb-ad`
- `propautopilot.com?ref=producthunt`
- `propautopilot.com?ref=podcast-propertycouch`

The frontend reads `?ref=` from URL and passes it in the POST body as `source`.

### Future: Confirmation Email (post-deploy)

Via Resend (`@resend/node`):
```
Subject: "You're on the PropAutopilot waitlist 🏠"
Body: "Thanks for joining! You're #[position] on the waitlist.
We'll notify you when early access opens on April 1st.
In the meantime, here's what PropAutopilot will do for you: [brief value prop]"
```

---

## File Structure

```
propautopilot-site/
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── public/
│   ├── favicon.ico
│   ├── og-image.png                     # 1200×630 branded card
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Fonts, metadata, JSON-LD, ThemeProvider, Analytics
│   │   ├── page.tsx                      # All sections composed here
│   │   ├── pitch/
│   │   │   └── page.tsx                  # Full pitch mode page (or handled via ?pitch=true)
│   │   ├── waitlist/
│   │   │   └── page.tsx                  # Standalone waitlist page (optional)
│   │   └── api/
│   │       └── waitlist/
│   │           ├── route.ts              # POST (signup) + GET (count)
│   │           └── stats/
│   │               └── route.ts          # GET (admin stats)
│   ├── components/
│   │   ├── ui/                           # shadcn components
│   │   ├── Analytics.tsx                 # Vercel Analytics wrapper
│   │   ├── ThemeProvider.tsx             # next-themes provider
│   │   ├── AnimateIn.tsx                 # Reusable Framer Motion scroll wrapper
│   │   ├── Navbar.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Problem.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Comparison.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── Waitlist.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── PitchDeck.tsx
│   │   └── ...
│   ├── lib/
│   │   ├── utils.ts                      # cn() helper
│   │   └── analytics.ts                  # trackEvent()
│   └── styles/
│       └── globals.css                   # Tailwind base + CSS custom properties
└── README.md
```

---

## Copy Tone

- **Confident but not arrogant** — we know this is better, but we're not mocking anyone
- **Specific** — "22 factors" not "comprehensive analysis", "$99/mo" not "affordable"
- **Australian** — "suburbs" not "neighborhoods", "conveyancer" not "lawyer", AUD pricing
- **Investor-speak** — yield, cashflow, LVR, CMA — our audience knows these terms
- **Short sentences** — scannable, punchy, clear
- **No filler** — every sentence earns its place

---

## Deployment

### Vercel Setup
1. Link project: `vercel link` (create new project under UpTrailAI org)
2. Create KV store: Vercel Dashboard → Project → Storage → Create → KV
3. Set env vars: `ADMIN_SECRET` (for stats endpoint)
4. Add domain: `propautopilot.com` → Vercel DNS or A record to `76.76.21.21`
5. Deploy: `vercel --prod`

### Environment Variables (Vercel)
```
# Auto-set by Vercel KV
KV_REST_API_URL=<auto>
KV_REST_API_TOKEN=<auto>
KV_REST_API_READ_ONLY_TOKEN=<auto>

# Manual
ADMIN_SECRET=<random-string>

# Optional (future)
RESEND_API_KEY=<when-ready>
NEXT_PUBLIC_SITE_URL=https://propautopilot.com
NEXT_PUBLIC_GA_ID=<if-using-GA4>
```

### Deployment Checklist
- [ ] `pnpm build` succeeds with zero errors
- [ ] All sections render on mobile (375px) and desktop (1440px)
- [ ] Dark mode and light mode both look correct
- [ ] Waitlist form: submit → loading → success with position number
- [ ] All smooth scroll links work
- [ ] Pitch mode works via `?pitch=true` and `/pitch`
- [ ] Lighthouse 95+ on all categories
- [ ] OG image renders correctly (check with opengraph.xyz)
- [ ] No console errors
- [ ] `vercel --prod` succeeds
- [ ] propautopilot.com resolves and serves the site
- [ ] Stats endpoint works: `curl -H "x-admin-secret: ..." https://propautopilot.com/api/waitlist/stats`
- [ ] All `?ref=` tracking params captured correctly
