import { ArrowRight, Check, Map, Search, PieChart, Activity, Shield, Users, Clock } from "lucide-react"
import { WaitlistForm } from "@/components/waitlist-form"

const SUBURB_DATA = [
  { name: "Ipswich, QLD", growth: "8.4%", yield: "5.1%", risk: "Low", score: 87 },
  { name: "Logan, QLD", growth: "7.2%", yield: "5.4%", risk: "Low", score: 84 },
  { name: "Salisbury, SA", growth: "9.1%", yield: "4.8%", risk: "Med", score: 81 },
]

const FEATURES = [
  {
    title: "No more tab-hopping",
    description: "Combine CoreLogic, PropTrack, and ABS data into one unified view. Everything you need to compare suburbs side-by-side.",
    icon: Search,
    tag: "Efficiency"
  },
  {
    title: "Transparent Scoring",
    description: "Our 22-factor model doesn't just give you a number. It gives you the 'why'—growth pressure, stock levels, and yield trends.",
    icon: PieChart,
    tag: "Insights"
  },
  {
    title: "Strategy to Settlement",
    description: "Manage your entire acquisition pipeline. Shortlist properties, track negotiations, and monitor your portfolio growth.",
    icon: Activity,
    tag: "Execution"
  }
]

const PRICING = [
  {
    name: "Starter",
    price: "49",
    description: "For focused individual investors.",
    features: ["5 Tracked Properties", "Core Suburb Analysis", "Deal Pipeline Access", "Property Help Center"],
    cta: "Join Waitlist",
    highlight: false
  },
  {
    name: "Pro",
    price: "99",
    description: "For active portfolio builders.",
    features: ["25 Tracked Properties", "Full Model Transparency", "Batch REA Calling AI", "Multilingual Support"],
    cta: "Join Waitlist",
    highlight: true
  },
  {
    name: "Business",
    price: "249",
    description: "For teams and advisors.",
    features: ["Unlimited Properties", "Advanced Risk Filters", "Team Collaboration", "Priority Data Sync"],
    cta: "Join Waitlist",
    highlight: false
  }
]

export function LandingV2() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
      {/* Navigation - Minimalist */}
      <header className="fixed top-0 z-50 w-full border-b border-slate-200/60 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <div className="size-3 rounded-full bg-white animate-pulse" />
            </div>
            <span className="font-bold tracking-tight text-slate-900">PropAutopilot</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-500">
            <a href="#features" className="hover:text-slate-900 transition-colors">Platform</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#waitlist" className="hover:text-slate-900 transition-colors">Waitlist</a>
          </nav>
          <a href="#waitlist" className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 shadow-sm">
            Reserve Spot
          </a>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section - High Contrast & Clean Typography */}
        <section className="relative overflow-hidden px-6 pb-24 pt-20 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-indigo-600">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600"></span>
                  </span>
                  Coming April 2026
                </div>
                <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl lg:leading-[1.1]">
                  Property investing, <br />
                  <span className="text-slate-400 font-medium">uncomplicated.</span>
                </h1>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
                  Stop wrestling with 15 open tabs and broken spreadsheets. 
                  Get a unified view of suburb performance, deal analysis, and acquisition tracking. 
                  Built for investors who value their time.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <a href="#waitlist" className="flex items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-base font-bold text-white transition hover:bg-slate-800 shadow-xl shadow-slate-200">
                    Join the waitlist
                    <ArrowRight className="size-5" />
                  </a>
                  <a href="#features" className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-600 transition hover:bg-slate-50">
                    Platform overview
                  </a>
                </div>
                
                <div className="mt-12 flex items-center gap-8 text-slate-400">
                   <div className="flex items-center gap-2">
                     <Shield className="size-5" />
                     <span className="text-xs font-semibold tracking-wide uppercase">Institutional Data</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <Map className="size-5" />
                     <span className="text-xs font-semibold tracking-wide uppercase">AU Wide Support</span>
                   </div>
                </div>
              </div>

              {/* Data Visualization Mockup - Minimalist */}
              <div className="relative">
                <div className="absolute -inset-4 rounded-[2rem] bg-indigo-100/50 blur-3xl lg:-inset-8" />
                <div className="relative rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                  <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <h3 className="font-bold text-slate-800">Suburb Performance Matrix</h3>
                      <span className="text-xs font-medium text-slate-400">Mar 2026</span>
                    </div>
                    <div className="space-y-4">
                      {SUBURB_DATA.map((item) => (
                        <div key={item.name} className="group relative rounded-xl border border-slate-200/60 bg-white p-4 transition hover:border-indigo-200 hover:shadow-md">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-bold text-slate-900">{item.name}</p>
                              <div className="mt-1 flex gap-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                <span>Growth: <span className="text-emerald-600">{item.growth}</span></span>
                                <span>Yield: <span className="text-indigo-600">{item.yield}</span></span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-black text-slate-900">{item.score}</div>
                              <div className="text-[9px] font-bold uppercase text-slate-400">Score</div>
                            </div>
                          </div>
                          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                            <div 
                              className="h-full bg-slate-900 transition-all duration-1000" 
                              style={{ width: `${item.score}%` }} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid - Minimal & Content-First */}
        <section id="features" className="bg-white py-24 sm:py-32 border-y border-slate-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-bold uppercase tracking-[0.2em] text-indigo-600">The Platform</h2>
              <p className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">Built by investors, for investors.</p>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                PropAutopilot doesn't automate your thinking. It automates the data-gathering that gets in the way of your thinking.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {FEATURES.map((feature) => (
                  <div key={feature.title} className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-lg font-bold leading-7 text-slate-900">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      {feature.title}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                      <p className="flex-auto">{feature.description}</p>
                      <p className="mt-6">
                        <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-bold text-slate-500 ring-1 ring-inset ring-slate-200 uppercase tracking-wider">
                          {feature.tag}
                        </span>
                      </p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Pricing Section - Clean, High-End Utility */}
        <section id="pricing" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-bold uppercase tracking-[0.2em] text-indigo-600">Simple Pricing</h2>
              <p className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">No hidden fees. No $15k commissions.</p>
              <p className="mt-6 text-lg text-slate-600">Choose the plan that matches your current acquisition goals.</p>
            </div>

            <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-none lg:grid-cols-3">
              {PRICING.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative flex flex-col justify-between rounded-3xl p-8 ring-1 transition-all duration-300 ${
                    tier.highlight 
                    ? "bg-slate-900 text-white ring-slate-900 shadow-2xl scale-105 z-10 sm:p-10" 
                    : "bg-white text-slate-900 ring-slate-200 hover:ring-slate-300 sm:mx-8 lg:mx-0"
                  }`}
                >
                  <div>
                    <h3 className={`text-lg font-bold tracking-tight ${tier.highlight ? "text-indigo-400" : "text-slate-900"}`}>
                      {tier.name}
                    </h3>
                    <p className="mt-4 flex items-baseline gap-x-2">
                      <span className="text-5xl font-black tracking-tight">${tier.price}</span>
                      <span className={`text-sm font-semibold leading-6 ${tier.highlight ? "text-slate-400" : "text-slate-500"}`}>/month</span>
                    </p>
                    <p className={`mt-4 text-sm leading-6 ${tier.highlight ? "text-slate-300" : "text-slate-600"}`}>
                      {tier.description}
                    </p>
                    <ul role="list" className={`mt-8 space-y-3 text-sm leading-6 ${tier.highlight ? "text-slate-300" : "text-slate-600"}`}>
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <Check className={`h-6 w-5 flex-none ${tier.highlight ? "text-indigo-400" : "text-indigo-600"}`} aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href="#waitlist"
                    className={`mt-8 block rounded-full px-3 py-3 text-center text-sm font-bold leading-6 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      tier.highlight
                      ? "bg-white text-slate-900 hover:bg-slate-100 shadow-lg"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    {tier.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Waitlist Section - Direct & Clean */}
        <section id="waitlist" className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
          <div className="relative isolate overflow-hidden bg-slate-950 px-6 py-16 shadow-2xl rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
             {/* Background blur effects */}
            <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0" aria-hidden="true">
              <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#6366f1" />
                  <stop offset="1" stopColor="#818cf8" />
                </radialGradient>
              </defs>
            </svg>

            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Ready for the pilot? <br />
                Join the Founding 100.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                The first 100 waitlist members will lock in a 30% lifetime discount with code <span className="text-white font-mono font-bold uppercase">Founder30</span>.
              </p>
              <div className="mt-10">
                <WaitlistForm />
              </div>
            </div>

            <div className="relative mt-16 h-80 lg:mt-8">
              <div className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10 backdrop-blur-sm p-8">
                <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                  <div className="size-3 rounded-full bg-red-500/50" />
                  <div className="size-3 rounded-full bg-yellow-500/50" />
                  <div className="size-3 rounded-full bg-green-500/50" />
                  <div className="ml-auto text-[10px] font-mono text-white/30 uppercase tracking-widest">propautopilot.system</div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 w-3/4 rounded bg-white/10 animate-pulse" />
                  <div className="h-4 w-1/2 rounded bg-white/5 animate-pulse" />
                  <div className="h-20 w-full rounded bg-white/5 animate-pulse" />
                  <div className="grid grid-cols-3 gap-4">
                     <div className="h-12 rounded bg-indigo-500/20" />
                     <div className="h-12 rounded bg-white/5" />
                     <div className="h-12 rounded bg-white/5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Functional & Quiet */}
      <footer className="bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2 text-slate-400 text-sm font-medium">
             <a href="mailto:hello@propautopilot.com" className="hover:text-slate-900 transition-colors">Contact</a>
             <a href="/privacy" className="hover:text-slate-900 transition-colors">Privacy</a>
             <a href="/terms" className="hover:text-slate-900 transition-colors">Terms</a>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-slate-500">
              &copy; 2026 PropAutopilot Pty Ltd. Designed for production.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
