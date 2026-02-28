# PropAutopilot Landing Page

Marketing site + waitlist capture for [PropAutopilot](https://propautopilot.com).

## Quick Start

```bash
pnpm install
pnpm dev        # → http://localhost:3000
pnpm build      # production build check
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Animations**: Framer Motion
- **Waitlist Storage**: Vercel KV (Redis)
- **Analytics**: Vercel Analytics
- **Hosting**: Vercel

---

## Deploy to Vercel

### 1. Connect the repo

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `UpTrailAI/propautopilot-landingpage`
3. Framework preset: **Next.js** (auto-detected)
4. Root directory: `.` (default)
5. Click **Deploy**

### 2. Add Vercel KV (waitlist storage)

The waitlist uses **Vercel KV** (managed Redis) to store signups. No external database needed.

1. In your Vercel project dashboard → **Storage** tab
2. Click **Create Database** → select **KV**
3. Name it `propautopilot-waitlist` (or anything)
4. Region: **Sydney (syd1)** for lowest latency
5. Click **Create**

Vercel automatically injects these env vars into your project:
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`
- `KV_URL`

**No manual env var setup needed for KV.** It just works after connecting.

### 3. Set environment variables

In Vercel dashboard → **Settings** → **Environment Variables**, add:

| Variable | Value | Required |
|---|---|---|
| `ADMIN_SECRET` | Any strong random string (e.g. `openssl rand -hex 32`) | Yes |
| `NEXT_PUBLIC_SITE_URL` | `https://propautopilot.com` (or your Vercel URL) | Yes |
| `RESEND_API_KEY` | Your Resend API key (for confirmation emails) | Optional (future) |

### 4. Custom domain (optional)

1. Vercel dashboard → **Settings** → **Domains**
2. Add `propautopilot.com` (or a subdomain like `www.propautopilot.com`)
3. Update DNS: add the CNAME/A records Vercel provides

---

## How the Waitlist Works

### Architecture

```
User submits email
    ↓
POST /api/waitlist
    ↓
├── Rate limit check (3 per IP per hour, via KV)
├── Duplicate check (KV set lookup)
├── Store email + metadata in KV
├── Increment counters (total + daily)
└── Return queue position
```

### Data stored in Vercel KV

| Key | Type | Description |
|---|---|---|
| `waitlist:emails` | Set | All unique emails (for dedup + count) |
| `waitlist:entry:{email}` | Hash | Full entry: email, isAdvisor, source, referrer, IP, timestamp |
| `waitlist:count` | Integer | Total signup count |
| `waitlist:daily:{YYYY-MM-DD}` | Integer | Signups per day |
| `waitlist:advisors` | Set | Emails that checked "I'm a buyer's agent" |
| `waitlist:rate:{ip}` | Integer | Rate limit counter (TTL: 1 hour) |

### API Endpoints

#### `POST /api/waitlist` — Public signup

```bash
curl -X POST https://propautopilot.com/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email": "investor@example.com", "isAdvisor": false, "source": "direct"}'
```

Response:
```json
{ "message": "You're on the list!", "position": 42 }
```

- Rate limited: 3 signups per IP per hour
- Duplicate emails silently succeed (no info leak)
- Tracks: email, advisor flag, UTM source, referrer, IP, timestamp

#### `GET /api/waitlist` — Public count (for social proof)

```bash
curl https://propautopilot.com/api/waitlist
```

Response:
```json
{ "count": 247 }
```

#### `GET /api/waitlist/stats` — Admin dashboard (protected)

```bash
curl https://propautopilot.com/api/waitlist/stats \
  -H "x-admin-secret: YOUR_ADMIN_SECRET"
```

Response:
```json
{
  "total": 247,
  "advisors": 18,
  "investors": 229,
  "daily": {
    "2026-03-01": 12,
    "2026-02-28": 34,
    "...": "..."
  },
  "target": 10000,
  "daysUntilLaunch": 31
}
```

### UTM Tracking

The waitlist form captures the `ref` query parameter automatically:

```
https://propautopilot.com?ref=linkedin    → source: "linkedin"
https://propautopilot.com?ref=twitter     → source: "twitter"
https://propautopilot.com                 → source: "direct"
```

Use these links in your marketing campaigns to track which channels drive signups.

### Exporting Waitlist Data

Connect to Vercel KV via the CLI or REST API to export:

```bash
# Install Vercel CLI
pnpm i -g vercel

# Pull all waitlist emails
vercel env pull .env.local
npx tsx scripts/export-waitlist.ts  # (create this script as needed)
```

Or use the Vercel KV browser in your dashboard → Storage → your KV store → Browse keys.

---

## Local Development

The waitlist API requires Vercel KV. For local dev:

**Option A: Use Vercel KV locally** (recommended)
```bash
vercel env pull .env.local   # pulls KV credentials from Vercel
pnpm dev
```

**Option B: No KV (graceful fallback)**
```bash
pnpm dev
# Waitlist form will show a network error — the GET endpoint returns { count: 0 }
```

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main landing page
│   ├── layout.tsx            # Root layout (fonts, metadata, JSON-LD)
│   ├── globals.css           # Theme tokens (light/dark)
│   ├── pitch/page.tsx        # Investor pitch view (?pitch=true)
│   ├── waitlist/page.tsx     # Standalone waitlist page
│   └── api/waitlist/         # Waitlist API routes
├── components/
│   ├── hero.tsx              # Hero with product preview
│   ├── problem.tsx           # Pain points section
│   ├── how-it-works.tsx      # 4-step flow
│   ├── features.tsx          # Feature grid
│   ├── comparison.tsx        # DIY vs BA vs PropAutopilot
│   ├── pricing.tsx           # Starter / Pro / Business
│   ├── testimonials.tsx      # Social proof
│   ├── faq.tsx               # Accordion FAQ
│   ├── waitlist-section.tsx  # CTA + waitlist form
│   ├── waitlist-form.tsx     # Email capture form
│   ├── nav.tsx               # Sticky navbar
│   └── footer.tsx            # Footer
└── lib/
    ├── analytics.ts          # Vercel Analytics helper
    └── utils.ts              # cn() utility
```

## Specs & Docs

- `LANDING-PAGE-BRIEF.md` — Full page spec (sections, copy, design, SEO)
- `CLAUDE.md` — Instructions for Claude Code
- `PROMPTS.md` — Prompt history for iterations
