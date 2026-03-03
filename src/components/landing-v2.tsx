import { ArrowRight, Check, Map, Search, PieChart, Activity, Shield, Target, MousePointer2 } from "lucide-react"
import { WaitlistForm } from "@/components/waitlist-form"

const SUBURB_DATA = [
  { name: "Ipswich, QLD", growth: "8.4%", yield: "5.1%", risk: "Low", score: 87 },
  { name: "Logan, QLD", growth: "7.2%", yield: "5.4%", risk: "Low", score: 84 },
  { name: "Salisbury, SA", growth: "9.1%", yield: "4.8%", risk: "Med", score: 81 },
]

const FEATURES = [
  {
    title: "Unified Data Pipeline",
    description: "Connect CoreLogic, PropTrack, and ABS data into one view. Compare suburbs without losing context.",
    icon: Search,
    tag: "Efficiency"
  },
  {
    title: "Explicit Rationale",
    description: "Every score is backed by 22 transparent factors. See the growth pressure and stock levels before you buy.",
    icon: PieChart,
    tag: "Insights"
  },
  {
    title: "Deal Command",
    description: "A professional pipeline for your entire acquisition. Track shortlists, offers, and settlement progress.",
    icon: Activity,
    tag: "Execution"
  }
]

const PRICING = [
  {
    name: "Starter",
    price: "49",
    description: "For focused solo investors.",
    features: ["5 Tracked Properties", "Core Suburb Analysis", "Deal Pipeline Access"],
    cta: "Join Waitlist",
    highlight: false
  },
  {
    name: "Pro",
    price: "99",
    description: "For active portfolio builders.",
    features: ["25 Tracked Properties", "Full Model Transparency", "Batch REA Calling AI"],
    cta: "Join Waitlist",
    highlight: true
  },
  {
    name: "Business",
    price: "249",
    description: "For teams and advisors.",
    features: ["Unlimited Properties", "Advanced Risk Filters", "Team Collaboration"],
    cta: "Join Waitlist",
    highlight: false
  }
]

export function LandingV2() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 selection:bg-slate-900 selection:text-white font-sans antialiased">
      {/* Precision Header */}
      <header className="fixed top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="size-6 rounded bg-slate-900 flex items-center justify-center">
              <div className="size-2 rounded-full bg-white" />
            </div>
            <span className="text-sm font-bold tracking-tight text-slate-900 uppercase">PropAutopilot</span>
          </div>
          <nav className="hidden md:flex gap-10 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
            <a href="#features" className="hover:text-slate-900 transition-colors">Platform</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#waitlist" className="hover:text-slate-900 transition-colors">Waitlist</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="#waitlist" className="text-[11px] font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-0.5 hover:text-slate-500 hover:border-slate-500 transition-all">
              Reserve Spot
            </a>
          </div>
        </div>
      </header>

      <main className="pt-14">
        {/* Hero - Ultra High End / Editorial Layout */}
        <section className="relative px-6 py-20 lg:px-8 lg:py-32 overflow-hidden border-b border-slate-100">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-20 lg:grid-cols-[1fr_0.8fr] lg:items-start">
              <div className="relative z-10">
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-8">
                  <span className="size-1.5 rounded-full bg-slate-900 animate-pulse" />
                  Product Launch · Q2 2026
                </div>
                <h1 className="text-6xl font-black tracking-[-0.03em] text-slate-900 sm:text-8xl leading-[0.95]">
                  Serious <br />
                  Acquisition.
                </h1>
                <p className="mt-10 max-w-lg text-xl leading-relaxed text-slate-500 font-medium italic border-l-4 border-slate-100 pl-6">
                  One workspace for Australian property data. <br />
                  No buyer-agent fees. No spreadsheet chaos.
                </p>
                <div className="mt-12 flex flex-col gap-5 sm:flex-row">
                  <a href="#waitlist" className="group flex items-center justify-center gap-3 rounded-full bg-slate-900 px-10 py-5 text-sm font-bold text-white transition hover:bg-slate-800 shadow-2xl shadow-slate-200">
                    Get On The List
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a href="#features" className="flex items-center justify-center rounded-full border border-slate-200 bg-white px-10 py-5 text-sm font-bold text-slate-900 transition hover:bg-slate-50">
                    The Platform
                  </a>
                </div>
              </div>

              {/* High-Fidelity Data UI Component */}
              <div className="relative mt-12 lg:mt-0">
                <div className="relative rounded-xl border border-slate-200 bg-white p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                       <Target className="size-4 text-slate-900" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Decision Matrix</span>
                    </div>
                    <div className="flex gap-1.5">
                       <div className="size-2 rounded-full bg-slate-100" />
                       <div className="size-2 rounded-full bg-slate-100" />
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {SUBURB_DATA.map((item) => (
                      <div key={item.name} className="relative group">
                        <div className="flex items-end justify-between mb-2">
                           <span className="text-xs font-black text-slate-900">{item.name}</span>
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Score: {item.score}</span>
                        </div>
                        <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                           <div className="h-full bg-slate-900" style={{ width: `${item.score}%` }} />
                        </div>
                        <div className="mt-3 flex gap-4">
                           <div className="px-2 py-1 rounded bg-slate-50 text-[9px] font-bold text-slate-500 uppercase tracking-widest">{item.growth} Growth</div>
                           <div className="px-2 py-1 rounded bg-indigo-50 text-[9px] font-bold text-indigo-600 uppercase tracking-widest">{item.yield} Yield</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 pt-6 border-t border-slate-50 flex items-center justify-between">
                     <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                        <MousePointer2 className="size-3" />
                        <span>Interactive Model</span>
                     </div>
                     <span className="text-[9px] font-black uppercase text-slate-900">Live AU Data</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Pillars - Grid Layout */}
        <section id="features" className="bg-white py-24 sm:py-32 border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-3">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="flex flex-col border-t-4 border-slate-900 pt-8">
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">{feature.tag}</span>
                   <h3 className="text-2xl font-black tracking-tight text-slate-900 mb-4">{feature.title}</h3>
                   <p className="text-base leading-relaxed text-slate-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing - Utility Grade */}
        <section id="pricing" className="py-24 sm:py-32 bg-[#F9FAFB] border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-20">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-4">Investment Plans</h2>
              <p className="text-4xl font-black tracking-tight text-slate-900">Simple pricing. <br />No $15k commissions.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {PRICING.map((tier) => (
                <div key={tier.name} className={`flex flex-col rounded-2xl border p-8 transition-all ${tier.highlight ? 'bg-slate-900 border-slate-900 shadow-2xl scale-105 z-10' : 'bg-white border-slate-200'}`}>
                  <div className="flex-1">
                    <h3 className={`text-sm font-black uppercase tracking-widest ${tier.highlight ? 'text-white' : 'text-slate-900'}`}>{tier.name}</h3>
                    <div className="mt-6 flex items-baseline gap-2">
                      <span className={`text-5xl font-black tracking-tight ${tier.highlight ? 'text-white' : 'text-slate-900'}`}>${tier.price}</span>
                      <span className={`text-xs font-bold uppercase tracking-widest ${tier.highlight ? 'text-slate-400' : 'text-slate-400'}`}>/ Month</span>
                    </div>
                    <p className={`mt-4 text-sm leading-relaxed ${tier.highlight ? 'text-slate-400' : 'text-slate-500'}`}>{tier.description}</p>
                    <ul className="mt-10 space-y-4">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
                          <Check className={`size-4 ${tier.highlight ? 'text-white' : 'text-slate-900'}`} />
                          <span className={tier.highlight ? 'text-white' : 'text-slate-900'}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a href="#waitlist" className={`mt-10 block rounded-full py-4 text-center text-xs font-black uppercase tracking-[0.2em] transition ${tier.highlight ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                    {tier.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Waitlist - Editorial Block */}
        <section id="waitlist" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center border-4 border-slate-900 p-12 lg:p-24 rounded-[3rem]">
            <div>
              <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl leading-[0.95] mb-8">
                Ready to <br />Execute?
              </h2>
              <p className="text-lg text-slate-500 font-medium mb-4">
                The first 100 waitlist members lock in a 30% lifetime discount.
              </p>
              <div className="flex items-center gap-3">
                 <span className="text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white px-3 py-1 rounded">Code: FOUNDER30</span>
              </div>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
               <WaitlistForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-100 py-12 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="size-5 rounded bg-slate-900 flex items-center justify-center">
              <div className="size-1 rounded-full bg-white" />
            </div>
            <span className="text-xs font-black tracking-tighter uppercase text-slate-900">PropAutopilot</span>
          </div>
          <div className="flex gap-10 text-[10px] font-bold uppercase tracking-widest text-slate-400">
             <a href="mailto:hello@propautopilot.com" className="hover:text-slate-900 transition-colors">Contact</a>
             <a href="/privacy" className="hover:text-slate-900 transition-colors">Privacy</a>
             <a href="/terms" className="hover:text-slate-900 transition-colors">Terms</a>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
            &copy; 2026 Production Ready.
          </p>
        </div>
      </footer>
    </div>
  )
}
