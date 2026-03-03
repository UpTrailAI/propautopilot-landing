import { ArrowRight, Check, Activity, Menu } from "lucide-react"
import { WaitlistForm } from "@/components/waitlist-form"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"

// Data points for the high-density table
const SUBURB_DATA = [
  { id: "QLD-4305", name: "IPSWICH", type: "HOUSE", price: "$595K", growth: "+8.4%", yield: "5.1%", status: "HIGH YIELD" },
  { id: "QLD-4114", name: "LOGAN", type: "HOUSE", price: "$620K", growth: "+7.2%", yield: "5.4%", status: "HIGH YIELD" },
  { id: "SA-5108", name: "SALISBURY", type: "HOUSE", price: "$550K", growth: "+9.1%", yield: "4.8%", status: "GROWTH" },
  { id: "WA-6169", name: "ROCKINGHAM", type: "HOUSE", price: "$610K", growth: "+10.2%", yield: "5.0%", status: "GROWTH" },
]

// Feature grid
const FEATURES = [
  {
    id: "F01",
    title: "One workspace for CoreLogic + PropTrack data.",
    description: "Connect institutional-grade valuation layers into a single viewport. Stop switching between 14 browser tabs.",
  },
  {
    id: "F02",
    title: "Built for Saturday morning research.",
    description: "High-density property screening. Filter 3,800+ suburbs by yield, growth pressure, and days on market instantly.",
  },
  {
    id: "F03",
    title: "Stop paying $15k buyer-agent fees.",
    description: "Run your own feasibility studies. Professional-grade acquisition pipeline to track listings, agents, and cashflow modeling.",
  }
]

// Pricing data
const PRICING = [
  {
    name: "SCOUT",
    price: "$99",
    billing: "PER MONTH",
    target: "INDIVIDUAL",
    features: [
      "10 Tracked Postcodes",
      "Core Valuations (AVM)",
      "Cashflow Calculator",
      "Basic Feasibility",
    ],
  },
  {
    name: "ACQUIRE",
    price: "$299",
    billing: "PER MONTH",
    target: "ACTIVE",
    features: [
      "50 Tracked Postcodes",
      "Aggregated CoreLogic + PropTrack",
      "Historical Growth Overlays",
      "Advanced Acquisition Pipeline",
      "Full Data Export (CSV)"
    ],
  },
  {
    name: "PRO",
    price: "$599",
    billing: "PER MONTH",
    target: "INSTITUTIONAL",
    features: [
      "Unlimited Tracked Postcodes",
      "API Access",
      "Bespoke Risk Modeling",
      "Team Workspaces (Up to 5)",
      "Dedicated Account Manager"
    ],
  }
]

export function LandingV2() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 selection:bg-slate-900 selection:text-white font-sans antialiased">
      {/* Precision Header */}
      <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-[#FDFDFD]/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="size-4 bg-slate-900 flex items-center justify-center">
              <div className="size-1 bg-white" />
            </div>
            <span className="text-[11px] font-black tracking-widest text-slate-900 uppercase">PropAutopilot</span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            <a href="#features" className="hover:text-slate-900 transition-colors">Platform</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Terms</a>
            <a href="#waitlist" className="hover:text-slate-900 transition-colors">Access</a>
          </nav>
          
          <div className="hidden md:flex items-center">
            <a href="#waitlist" className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-5 py-2 rounded-xl hover:bg-slate-800 transition-colors">
              Execute
            </a>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 -mr-2 text-slate-900" aria-label="Open menu">
                  <Menu className="size-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#FDFDFD] border-l border-slate-200 p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">Access site sections</SheetDescription>
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 p-6 border-b border-slate-200">
                    <div className="size-4 bg-slate-900 flex items-center justify-center">
                      <div className="size-1 bg-white" />
                    </div>
                    <span className="text-[11px] font-black tracking-widest text-slate-900 uppercase">PropAutopilot</span>
                  </div>
                  
                  <nav className="flex flex-col p-6 gap-6 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    <a href="#features" className="hover:text-slate-900 transition-colors">Platform</a>
                    <a href="#pricing" className="hover:text-slate-900 transition-colors">Terms</a>
                    <a href="#waitlist" className="hover:text-slate-900 transition-colors">Access</a>
                  </nav>
                  
                  <div className="p-6 mt-auto border-t border-slate-200">
                    <a href="#waitlist" className="block text-center w-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-5 py-3 rounded-xl hover:bg-slate-800 transition-colors">
                      Execute
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="pt-14 relative">
        {/* Grid Background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>

        {/* Hero - Ultra High End / Editorial Layout */}
        <section className="relative z-10 px-6 py-20 lg:px-8 lg:py-32 border-b border-slate-200">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-16 lg:gap-8 lg:grid-cols-[1.2fr_1fr] items-center">
              <div>
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-8 font-mono">
                  <span className="size-2 bg-slate-900 animate-pulse" />
                  SYSTEM_READY // Q2 2026
                </div>
                <h1 className="text-6xl sm:text-7xl lg:text-[7rem] font-black tracking-tighter text-slate-900 uppercase leading-[0.85] text-left">
                  Acquire <br />
                  With <br />
                  Precision.
                </h1>
                <p className="mt-10 max-w-xl text-xl font-medium leading-snug text-slate-700">
                  Stop paying $15k buyer-agent fees. <br />
                  One workspace for CoreLogic + PropTrack data.
                </p>
                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                  <a href="#waitlist" className="inline-flex items-center justify-center gap-3 rounded-xl bg-slate-900 px-8 py-4 text-[11px] font-black uppercase tracking-widest text-white transition hover:bg-slate-800">
                    Get On The List
                    <ArrowRight className="size-4" />
                  </a>
                  <a href="#features" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-8 py-4 text-[11px] font-black uppercase tracking-widest text-slate-900 transition hover:bg-slate-50">
                    View Platform
                  </a>
                </div>
              </div>

              {/* High-Fidelity Data UI Component */}
              <div className="relative w-full max-w-lg mx-auto lg:mr-0 lg:ml-auto">
                <div className="bg-white border text-left border-slate-200 rounded-xl overflow-hidden shadow-sm">
                   <div className="border-b border-slate-200 bg-slate-50 px-5 py-3 flex justify-between items-center">
                      <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest">AU_MARKET_DATA v1.0</span>
                      <div className="flex gap-2">
                         <div className="size-2 rounded-full bg-slate-300" />
                         <div className="size-2 rounded-full bg-slate-300" />
                         <div className="size-2 rounded-full bg-slate-300" />
                      </div>
                   </div>
                   
                   <div className="p-0 overflow-x-auto">
                     <table className="w-full text-left border-collapse min-w-[400px]">
                       <thead>
                         <tr className="border-b border-slate-200 bg-white">
                           <th className="px-5 py-3 font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID</th>
                           <th className="px-5 py-3 font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest">LOC</th>
                           <th className="px-5 py-3 font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest">METRICS</th>
                           <th className="px-5 py-3 font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">STATUS</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100 bg-white">
                         {SUBURB_DATA.map((row) => (
                           <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                             <td className="px-5 py-3 font-mono text-[11px] text-slate-500">{row.id}</td>
                             <td className="px-5 py-3 border-l border-slate-100">
                                <div className="font-mono text-[11px] font-bold text-slate-900">{row.name}</div>
                                <div className="font-mono text-[9px] text-slate-400 mt-0.5">{row.type}</div>
                             </td>
                             <td className="px-5 py-3 border-l border-slate-100">
                                <div className="flex flex-col gap-1">
                                   <span className="font-mono text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-sm inline-block w-max">{row.growth} GRW</span>
                                   <span className="font-mono text-[10px] text-indigo-700 font-bold bg-indigo-50 px-1.5 py-0.5 rounded-sm inline-block w-max">{row.yield} YLD</span>
                                </div>
                             </td>
                             <td className="px-5 py-3 border-l border-slate-100 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <div className={`size-2 rounded-full ${row.status === 'HIGH YIELD' ? 'bg-indigo-500' : 'bg-emerald-500'}`} />
                                  <span className="font-mono text-[10px] font-bold text-slate-900">{row.status}</span>
                                </div>
                             </td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                   
                   <div className="border-t border-slate-200 bg-slate-50 px-5 py-3 flex justify-between items-center">
                      <span className="font-mono text-[10px] text-slate-500 flex items-center gap-2"><Activity className="size-3" /> LIVE FEED ACTIVE</span>
                      <span className="font-mono text-[10px] text-slate-900 font-bold uppercase">SECURE</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features - Technical Spec Sheet */}
        <section id="features" className="relative z-10 bg-[#FDFDFD] border-b border-slate-200">
          <div className="mx-auto max-w-7xl grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 border-l border-r border-slate-200 my-0">
            {FEATURES.map((feature) => (
              <div key={feature.id} className="p-8 lg:p-12 hover:bg-slate-50 transition-colors cursor-default">
                 <div className="font-mono text-[10px] font-bold text-slate-400 mb-8 border-b border-slate-200 pb-4 inline-block">{feature.id}</div>
                 <h3 className="text-2xl font-black text-slate-900 mb-4 leading-snug tracking-tighter uppercase">{feature.title}</h3>
                 <p className="text-sm text-slate-600 font-medium leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing - Contract Summary */}
        <section id="pricing" className="relative z-10 bg-[#FDFDFD] border-b border-slate-200 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-16">
               <h2 className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">LICENSING TERMS</h2>
               <p className="text-4xl font-black tracking-tight text-slate-900 uppercase">Institutional Grade.<br />Accessible Rates.</p>
            </div>
            <div className="grid lg:grid-cols-3 border-t border-l border-slate-200">
               {PRICING.map((tier) => (
                  <div key={tier.name} className="p-8 lg:p-12 border-b border-r border-slate-200 flex flex-col hover:bg-slate-50 transition-colors bg-white">
                     <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-8">{tier.target}</div>
                     <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase mb-2">{tier.name}</h3>
                     <div className="font-mono text-4xl mr-auto font-black text-slate-900 tracking-tighter mb-1 bg-slate-100 px-3 py-1 rounded-md">{tier.price}</div>
                     <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-10 mt-2">{tier.billing}</div>
                     
                     <ul className="space-y-4 mb-12 flex-1">
                        {tier.features.map(f => (
                           <li key={f} className="flex items-start gap-3">
                              <Check className="size-4 text-slate-900 shrink-0 mt-0.5" strokeWidth={3} />
                              <span className="font-mono text-[11px] font-bold uppercase tracking-wide text-slate-700">{f}</span>
                           </li>
                        ))}
                     </ul>
                     
                     <a href="#waitlist" className="w-full block text-center bg-slate-900 text-white font-mono text-[11px] font-black uppercase tracking-widest py-4 rounded-xl hover:bg-slate-800 transition-colors">
                        REQUEST ACCESS
                     </a>
                  </div>
               ))}
            </div>
          </div>
        </section>

        {/* Waitlist - Editorial Block */}
        <section id="waitlist" className="relative z-10 bg-white py-24 sm:py-32 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="border-4 border-slate-900 p-8 lg:p-16 rounded-xl relative bg-[#FDFDFD]">
               <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                  <div>
                     <h2 className="text-5xl lg:text-7xl font-black tracking-tighter text-slate-900 uppercase leading-[0.85]">
                        Ready To <br/>Execute?
                     </h2>
                     <p className="mt-8 text-slate-600 font-mono text-[13px] leading-relaxed uppercase tracking-wide max-w-md font-bold">
                        The beta is strictly limited to 100 sophisticated investors. Secure your early access and lifetime discount today.
                     </p>
                  </div>
                  <div>
                      <div className="p-1 border border-slate-200 rounded-xl bg-white">
                         <div className="p-6">
                            <WaitlistForm />
                         </div>
                      </div>
                  </div>
               </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 bg-[#FDFDFD] border-t border-slate-200 py-12 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="size-4 bg-slate-900 flex items-center justify-center">
              <div className="size-1 bg-white" />
            </div>
            <span className="text-[11px] font-black tracking-widest text-slate-900 uppercase">PropAutopilot</span>
          </div>
          <div className="flex gap-10 text-[10px] font-bold uppercase tracking-widest text-slate-400">
             <a href="mailto:hello@propautopilot.com" className="hover:text-slate-900 transition-colors">Contact</a>
             <a href="/privacy" className="hover:text-slate-900 transition-colors">Privacy</a>
             <a href="/terms" className="hover:text-slate-900 transition-colors">Terms</a>
          </div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
            &copy; 2026 PROPAUTOPILOT.
          </p>
        </div>
      </footer>
    </div>
  )
}
