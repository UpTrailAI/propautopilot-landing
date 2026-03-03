import { ArrowRight, Check, Menu, TrendingUp, BarChart3, Zap, MapPin, DollarSign, Clock } from "lucide-react"
import { WaitlistForm } from "@/components/waitlist-form"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"

const SUBURBS = [
  { name: "Ipswich", state: "QLD", median: "$595k", growth: "+8.4%", yield: "5.1%", hot: true },
  { name: "Logan", state: "QLD", median: "$620k", growth: "+7.2%", yield: "5.4%", hot: true },
  { name: "Salisbury", state: "SA", median: "$550k", growth: "+9.1%", yield: "4.8%", hot: false },
  { name: "Rockingham", state: "WA", median: "$610k", growth: "+10.2%", yield: "5.0%", hot: false },
]

const FEATURES = [
  {
    icon: MapPin,
    title: "All your data in one place",
    description: "CoreLogic, PropTrack, and ABS data side by side. No more 14 browser tabs on a Saturday morning.",
    detail: "3,800+ suburbs",
  },
  {
    icon: BarChart3,
    title: "Transparent scoring",
    description: "Every suburb score is backed by 22 real factors you can actually see. Growth pressure, vacancy rates, stock levels — all of it.",
    detail: "22 factors",
  },
  {
    icon: DollarSign,
    title: "Cashflow modelling that works",
    description: "Plug in your numbers, see what a property actually returns after costs. Stamp duty, management fees, insurance — we don't hide the ugly stuff.",
    detail: "Real numbers",
  },
  {
    icon: Clock,
    title: "Track your deals",
    description: "From shortlist to settlement. Keep your inspections, offers, and agent conversations organised in one pipeline.",
    detail: "Full pipeline",
  },
]

const PRICING = [
  {
    name: "Scout",
    price: "$99",
    period: "/mo",
    description: "For weekend researchers getting started.",
    features: [
      "10 tracked suburbs",
      "Core valuations (AVM)",
      "Cashflow calculator",
      "Basic feasibility reports",
    ],
  },
  {
    name: "Acquire",
    price: "$299",
    period: "/mo",
    popular: true,
    description: "For investors actively buying.",
    features: [
      "50 tracked suburbs",
      "CoreLogic + PropTrack combined",
      "Historical growth overlays",
      "Full acquisition pipeline",
      "CSV data export",
    ],
  },
  {
    name: "Pro",
    price: "$599",
    period: "/mo",
    description: "For teams and advisory firms.",
    features: [
      "Unlimited suburbs",
      "API access",
      "Custom risk modelling",
      "Up to 5 team members",
      "Dedicated account manager",
    ],
  },
]

const NUMBERS = [
  { value: "3,800+", label: "Suburbs scored" },
  { value: "22", label: "Scoring factors" },
  { value: "$0", label: "Buyer-agent fees" },
]

export function LandingV2() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white font-sans antialiased">
      {/* Nav */}
      <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-neutral-100">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
          <a href="/" className="flex items-center gap-2.5">
            <div className="size-7 rounded-lg bg-neutral-900 flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
            <span className="text-[15px] font-semibold text-neutral-900">PropAutopilot</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Pricing</a>
            <a href="#waitlist" className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors">
              Join waitlist
              <ArrowRight className="size-3.5" />
            </a>
          </nav>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 -mr-2 text-neutral-900" aria-label="Open menu">
                  <Menu className="size-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-white border-l border-neutral-100 p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SheetDescription className="sr-only">Site navigation</SheetDescription>
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2.5 p-5 border-b border-neutral-100">
                    <div className="size-7 rounded-lg bg-neutral-900 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">P</span>
                    </div>
                    <span className="text-[15px] font-semibold">PropAutopilot</span>
                  </div>
                  <nav className="flex flex-col p-5 gap-4">
                    <a href="#features" className="text-[15px] text-neutral-600 hover:text-neutral-900 transition-colors py-1">Features</a>
                    <a href="#pricing" className="text-[15px] text-neutral-600 hover:text-neutral-900 transition-colors py-1">Pricing</a>
                  </nav>
                  <div className="p-5 mt-auto border-t border-neutral-100">
                    <a href="#waitlist" className="flex items-center justify-center gap-2 w-full rounded-lg bg-neutral-900 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors">
                      Join waitlist
                      <ArrowRight className="size-3.5" />
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero */}
        <section className="px-5 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1.5 text-sm text-emerald-700 font-medium mb-8">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Launching April 2026
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
                Your Saturday morning
                <br />
                <span className="text-neutral-400">property research,</span>
                <br />
                sorted.
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-neutral-500 leading-relaxed max-w-xl">
                Stop paying buyer&apos;s agents $15k to do what you can do yourself.
                All the data. One workspace. Actually affordable.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <a href="#waitlist" className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-6 py-3.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors">
                  Join the waitlist
                  <ArrowRight className="size-4" />
                </a>
                <a href="#features" className="inline-flex items-center justify-center rounded-lg border border-neutral-200 px-6 py-3.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                  See how it works
                </a>
              </div>
            </div>

            {/* Numbers strip */}
            <div className="mt-16 flex flex-wrap gap-x-12 gap-y-4 border-t border-neutral-100 pt-8">
              {NUMBERS.map((n) => (
                <div key={n.label} className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-mono text-neutral-900">{n.value}</span>
                  <span className="text-sm text-neutral-400">{n.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live preview card */}
        <section className="px-5 pb-20 lg:pb-28">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200 bg-white">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="size-3 rounded-full bg-red-400" />
                    <div className="size-3 rounded-full bg-amber-400" />
                    <div className="size-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs text-neutral-400 hidden sm:block">propautopilot.com/dashboard</span>
                </div>
                <span className="text-xs text-neutral-400 flex items-center gap-1.5">
                  <TrendingUp className="size-3" />
                  Live data
                </span>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid gap-3">
                  {/* Table header */}
                  <div className="hidden sm:grid grid-cols-[1fr_80px_80px_80px] gap-4 px-4 py-2 text-xs text-neutral-400 font-medium">
                    <span>Suburb</span>
                    <span>Median</span>
                    <span>Growth</span>
                    <span>Yield</span>
                  </div>

                  {SUBURBS.map((s, i) => (
                    <div
                      key={s.name}
                      className={`grid grid-cols-1 sm:grid-cols-[1fr_80px_80px_80px] gap-2 sm:gap-4 items-center rounded-lg bg-white px-4 py-3.5 border border-neutral-100 ${i === 0 ? 'ring-2 ring-neutral-900/5' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`size-2 rounded-full ${s.hot ? 'bg-emerald-500' : 'bg-neutral-300'}`} />
                        <span className="text-sm font-medium text-neutral-900">{s.name}</span>
                        <span className="text-xs text-neutral-400">{s.state}</span>
                      </div>
                      <span className="text-sm text-neutral-600 font-mono">{s.median}</span>
                      <span className="text-sm text-emerald-600 font-medium font-mono">{s.growth}</span>
                      <span className="text-sm text-neutral-600 font-mono">{s.yield}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-xs text-neutral-400 text-center">
                  This is a real preview of the suburb comparison tool. Data from CoreLogic + PropTrack.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="px-5 py-20 lg:py-28 bg-neutral-50/80">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-lg mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
                Built for people who
                <br />
                actually buy property.
              </h2>
              <p className="mt-4 text-neutral-500 text-lg">
                Not another dashboard full of vanity metrics. These are the tools we wished existed when we were researching our own investments.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {FEATURES.map((f) => (
                <div key={f.title} className="group rounded-xl border border-neutral-200 bg-white p-6 sm:p-8 hover:border-neutral-300 transition-colors">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center justify-center size-10 rounded-lg bg-neutral-100 text-neutral-600 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                      <f.icon className="size-5" />
                    </div>
                    <span className="text-xs text-neutral-400 font-medium font-mono">{f.detail}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social proof strip */}
        <section className="px-5 py-12 border-y border-neutral-100">
          <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center">
            <p className="text-sm text-neutral-400">
              Built by property investors in Sydney, for every Australian market.
            </p>
            <div className="h-4 w-px bg-neutral-200 hidden sm:block" />
            <p className="text-sm text-neutral-400 flex items-center gap-2">
              <Zap className="size-3.5 text-amber-500" />
              Launching April 1st, 2026
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="px-5 py-20 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-lg mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
                Simple, honest pricing.
              </h2>
              <p className="mt-4 text-neutral-500 text-lg">
                No lock-in contracts. No hidden fees. Cancel anytime. A buyer&apos;s agent charges $15k per deal — we charge a fraction of that per month.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              {PRICING.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative flex flex-col rounded-xl border p-6 sm:p-8 transition-colors ${
                    tier.popular
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-200 bg-white hover:border-neutral-300'
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-6 rounded-full bg-emerald-500 px-3 py-0.5 text-xs font-medium text-white">
                      Most popular
                    </span>
                  )}

                  <div>
                    <h3 className={`text-lg font-semibold ${tier.popular ? 'text-white' : 'text-neutral-900'}`}>
                      {tier.name}
                    </h3>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className={`text-4xl font-bold font-mono tracking-tight ${tier.popular ? 'text-white' : 'text-neutral-900'}`}>
                        {tier.price}
                      </span>
                      <span className={`text-sm ${tier.popular ? 'text-neutral-400' : 'text-neutral-400'}`}>
                        {tier.period}
                      </span>
                    </div>
                    <p className={`mt-3 text-sm leading-relaxed ${tier.popular ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      {tier.description}
                    </p>
                  </div>

                  <ul className="mt-8 space-y-3 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className={`size-4 mt-0.5 shrink-0 ${tier.popular ? 'text-emerald-400' : 'text-emerald-600'}`} strokeWidth={2.5} />
                        <span className={`text-sm ${tier.popular ? 'text-neutral-300' : 'text-neutral-600'}`}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#waitlist"
                    className={`mt-8 block text-center rounded-lg py-3 text-sm font-medium transition-colors ${
                      tier.popular
                        ? 'bg-white text-neutral-900 hover:bg-neutral-100'
                        : 'bg-neutral-900 text-white hover:bg-neutral-800'
                    }`}
                  >
                    Join waitlist
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Waitlist */}
        <section id="waitlist" className="px-5 py-20 lg:py-28 bg-neutral-50/80">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
                Get early access.
              </h2>
              <p className="mt-4 text-neutral-500 text-lg max-w-md mx-auto">
                We&apos;re launching with 100 spots. The first members get a 30% lifetime discount. No spam, just a launch email.
              </p>

              <div className="mt-10 mx-auto max-w-md">
                <WaitlistForm />
              </div>

              <p className="mt-6 text-xs text-neutral-400">
                Free to join. Unsubscribe anytime. We respect your inbox.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-100 bg-white px-5 py-10">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="size-6 rounded-md bg-neutral-900 flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">P</span>
            </div>
            <span className="text-sm font-semibold text-neutral-900">PropAutopilot</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-neutral-400">
            <a href="mailto:hello@propautopilot.com" className="hover:text-neutral-900 transition-colors">Contact</a>
            <a href="/privacy" className="hover:text-neutral-900 transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-neutral-900 transition-colors">Terms</a>
          </div>
          <p className="text-sm text-neutral-400">
            &copy; 2026 PropAutopilot
          </p>
        </div>
      </footer>
    </div>
  )
}
