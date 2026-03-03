import { ArrowUpRight, Check, ShieldCheck, Sparkles, TrendingUp } from "lucide-react"
import { WaitlistForm } from "@/components/waitlist-form"

const metrics = [
  { label: "Suburbs scored", value: "3,800+" },
  { label: "Data factors", value: "22" },
  { label: "Launch window", value: "Apr 2026" },
  { label: "Founding discount", value: "30%" },
]

const pillars = [
  {
    title: "Institutional decision framework",
    body: "Each recommendation is traceable to explicit drivers: demand, cash flow resilience, downside exposure, and liquidity quality.",
    icon: ShieldCheck,
  },
  {
    title: "Execution from one command center",
    body: "Research, shortlist, deal progression, and portfolio decisions live in one workflow instead of fragmented tools.",
    icon: TrendingUp,
  },
  {
    title: "Built for Australian market realities",
    body: "Not a recycled US template. Language, assumptions, and process are tailored for Australian investors and operators.",
    icon: Sparkles,
  },
]

const capabilities = [
  ["Suburb Intelligence Engine", "Multi-factor scoring with transparent rationale"],
  ["Deal Pipeline", "Move from shortlist to action with explicit next steps"],
  ["Portfolio Command", "Track performance, risk, and rebalance opportunities"],
  ["Investment Journey System", "Structured progression across key milestones"],
]

const plans = [
  {
    name: "Starter",
    price: "$49",
    notes: "For focused individual investors",
    items: ["5 properties", "30 AI minutes / month", "Core analysis + pipeline"],
  },
  {
    name: "Pro",
    price: "$99",
    notes: "For active portfolio builders",
    items: ["25 properties", "240 AI minutes / month", "Batch outreach + multilingual"],
    featured: true,
  },
  {
    name: "Business",
    price: "$249",
    notes: "For high-volume users and teams",
    items: ["Unlimited properties", "720 AI minutes / month", "Priority access + full suite"],
  },
]

export function LandingV2() {
  return (
    <main className="relative overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.2),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.18),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:56px_56px]" />

      <section className="relative mx-auto max-w-7xl px-4 pb-14 pt-14 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/75 px-3 py-1 text-xs font-medium tracking-wide text-slate-300">
              <span className="inline-block size-2 rounded-full bg-emerald-400" />
              EARLY ACCESS · APRIL 2026
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Institutional-grade property intelligence,
              <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent"> for serious investors.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              PropAutopilot replaces generic "AI content" with a disciplined decision system: where to buy,
              why it works, and what to execute next.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <a href="#waitlist" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-100">
                Join waitlist
                <ArrowUpRight className="size-4" />
              </a>
              <a href="#pricing" className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-3 font-medium transition hover:border-slate-500">
                View pricing
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 p-5 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
              <span>Decision Console Preview</span>
              <span className="font-mono">v1.0</span>
            </div>

            <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-4">
              {[
                ["Growth Pressure", "87 / 100", "text-emerald-300"],
                ["Yield Stability", "82 / 100", "text-cyan-300"],
                ["Liquidity Score", "79 / 100", "text-indigo-300"],
                ["Downside Risk", "Low-Mid", "text-amber-300"],
              ].map(([l, r, c]) => (
                <div key={l as string} className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">{l}</span>
                  <span className={`font-mono ${c}`}>{r}</span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              Transparent model outputs, explicit assumptions, and confidence-backed recommendations.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">{m.label}</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">{m.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="relative border-y border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Platform Principles</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Designed to be trusted under pressure</h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {pillars.map((p) => {
              const Icon = p.icon
              return (
                <article key={p.title} className="rounded-2xl border border-slate-800 bg-slate-950/75 p-6">
                  <div className="mb-4 inline-flex rounded-lg border border-slate-700 bg-slate-900 p-2">
                    <Icon className="size-5 text-slate-200" />
                  </div>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{p.body}</p>
                </article>
              )
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/75 p-4 sm:p-6">
            <div className="grid gap-3">
              {capabilities.map(([k, v]) => (
                <div key={k} className="grid items-center gap-1 border-b border-slate-800 py-4 last:border-0 sm:grid-cols-[260px_1fr]">
                  <p className="font-medium text-slate-100">{k}</p>
                  <p className="text-sm text-slate-300">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Pricing</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Straightforward plans. Production intent.</h2>
          </div>
          <p className="text-sm text-slate-400">Annual billing available · FOUNDER30 for first 100 users</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.name}
              className={`rounded-2xl border p-6 ${
                p.featured
                  ? "border-indigo-400/60 bg-gradient-to-b from-indigo-900/30 to-slate-900/80 shadow-xl shadow-indigo-950/30"
                  : "border-slate-800 bg-slate-900/60"
              }`}
            >
              <p className="text-sm font-medium text-slate-300">{p.name}</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight">
                {p.price}
                <span className="text-base font-medium text-slate-400">/mo</span>
              </p>
              <p className="mt-2 text-sm text-slate-400">{p.notes}</p>

              <ul className="mt-5 space-y-2 text-sm text-slate-200">
                {p.items.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 text-emerald-300" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="waitlist" className="border-t border-slate-800 bg-slate-900/50">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-700/80 bg-slate-950/80 p-6 shadow-2xl shadow-black/30 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Early Access</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Get on the waitlist</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              If you want institutional-grade clarity instead of generic AI noise, reserve your spot now.
            </p>

            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5">
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
