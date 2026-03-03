import { WaitlistForm } from "@/components/waitlist-form"

const painPoints = [
  "Saturday lost to spreadsheet rabbit holes",
  "Conflicting suburb advice from 5 different sources",
  "Paying $15k+ for generic buyer-agent playbooks",
]

const principles = [
  {
    title: "Decision engine, not dashboard theatre",
    text: "Every score ties back to a reason you can challenge: cash flow, demand pressure, downside risk, and holding cost reality.",
  },
  {
    title: "Built for Australian investors first",
    text: "No recycled US templates. Suburb logic, terminology, and workflow match how deals are actually done here.",
  },
  {
    title: "From plan to action in one workspace",
    text: "Research, shortlist, deal tracking, and portfolio follow-through stay connected so momentum does not die in handoffs.",
  },
]

const featureRows = [
  {
    name: "Suburb Intelligence",
    detail: "Compare locations with transparent scoring across growth, yield, liquidity, and risk.",
  },
  {
    name: "Deal Pipeline",
    detail: "Move from first shortlist to offer-ready opportunities with clear status and next actions.",
  },
  {
    name: "Portfolio Command",
    detail: "Track performance and rebalance decisions without juggling disconnected tools.",
  },
  {
    name: "Guided Journey",
    detail: "Step-by-step investment journey so nothing mission-critical gets skipped under pressure.",
  },
]

const pricing = [
  {
    plan: "Starter",
    price: "$49",
    blurb: "For focused solo investors",
    bullets: ["5 tracked properties", "30 AI minutes / month", "Core suburb + deal tools"],
  },
  {
    plan: "Pro",
    price: "$99",
    blurb: "For active portfolio builders",
    bullets: ["25 tracked properties", "240 AI minutes / month", "Batch calling + multilingual support"],
  },
  {
    plan: "Business",
    price: "$249",
    blurb: "For power users and teams",
    bullets: ["Unlimited properties", "720 AI minutes / month", "Full feature access + priority support"],
  },
]

const faqs = [
  {
    q: "Is this another generic AI property tool?",
    a: "No. The product is opinionated around Australian investor workflows and practical decision points. We bias toward explainability over buzzwords.",
  },
  {
    q: "When does access open?",
    a: "Early access starts in April 2026. Waitlist members are onboarded in controlled waves.",
  },
  {
    q: "How is the founding offer handled?",
    a: "First 100 waitlist members get 30% off for life using FOUNDER30 when invited.",
  },
]

export function LandingV2() {
  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Launching April 2026 · Waitlist open
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Built for investors who want conviction,
              <span className="text-primary"> not content.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              PropAutopilot replaces generic advice loops with a clear decision system: what to buy,
              why it makes sense, and what to do next.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">What investors told us they hate</p>
            <ul className="mt-4 space-y-3">
              {painPoints.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span className="mt-1 size-2 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="features" className="border-y border-border bg-muted/30">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
          {principles.map((item) => (
            <article key={item.title} className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-3 rounded-2xl border border-border bg-card p-6 sm:p-8">
          {featureRows.map((row) => (
            <div key={row.name} className="grid gap-2 border-b border-border py-4 last:border-0 sm:grid-cols-[220px_1fr]">
              <h3 className="font-medium">{row.name}</h3>
              <p className="text-sm text-muted-foreground">{row.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Simple pricing. No smoke.</h2>
          <p className="text-sm text-muted-foreground">Annual plans available</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {pricing.map((item) => (
            <article key={item.plan} className="rounded-2xl border border-border bg-card p-6">
              <p className="text-sm font-medium text-muted-foreground">{item.plan}</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight">{item.price}<span className="text-base text-muted-foreground">/mo</span></p>
              <p className="mt-2 text-sm text-muted-foreground">{item.blurb}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {item.bullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">FAQ</h2>
        <div className="mt-8 space-y-4">
          {faqs.map((f) => (
            <article key={f.q} className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-medium">{f.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="waitlist" className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Join the early-access waitlist</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              If you are done with generic property content and want a serious execution platform,
              put your name down. Founding members get lifetime pricing protection.
            </p>
            <div className="mt-6">
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
