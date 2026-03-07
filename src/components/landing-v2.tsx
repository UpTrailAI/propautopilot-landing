"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Check, Activity, Menu, MapPin, BarChart3, DollarSign, Building2, Phone, FileText, PieChart, Bell } from "lucide-react"
import { WaitlistForm } from "@/components/waitlist-form"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { trackEvent } from "@/lib/analytics"

// Suburb data for the hero widget
const SUBURB_DATA = [
  { id: "QLD-4305", name: "IPSWICH", type: "HOUSE", price: "$595K", growth: "+8.4%", yield: "5.1%", status: "HIGH YIELD" },
  { id: "QLD-4114", name: "LOGAN", type: "HOUSE", price: "$620K", growth: "+7.2%", yield: "5.4%", status: "HIGH YIELD" },
  { id: "SA-5108", name: "SALISBURY", type: "HOUSE", price: "$550K", growth: "+9.1%", yield: "4.8%", status: "GROWTH" },
  { id: "WA-6169", name: "ROCKINGHAM", type: "HOUSE", price: "$610K", growth: "+10.2%", yield: "5.0%", status: "GROWTH" },
]

// Pain cards for the problem section
const PAIN_CARDS = [
  {
    stat: "8 websites",
    title: "Research Paralysis",
    description: "Cross-referencing SQM Research, DSR Data, Domain, CoreLogic, ABS, council planning portals, state flood maps, and rental data for every suburb. Most investors shortlist 20-50. That's 160-400 manual browser visits before you've evaluated a single property.",
    tag: "40-100 hrs per property",
  },
  {
    stat: "4 files",
    title: "Spreadsheet Hell",
    description: "One for suburb comparison. One for cashflow modelling. One for CMA. One for portfolio tracking. None of them talk to each other. Data goes stale. The spreadsheet that was clean on property 1 is a 14-tab disaster by property 3.",
    tag: "Every deal starts from scratch",
  },
  {
    stat: "#1 blocker",
    title: "Phone Call Anxiety",
    description: "Getting real vendor intelligence means calling agents directly. It's the number one reason prepared investors still don't pull the trigger. They have the research. They don't make the call.",
    tag: "Most investors just don't call",
  },
  {
    stat: "$12,500",
    title: "Or Pay a Buyer's Agent",
    description: "A buyer's agent is full-service but costs $10,000-15,000 per property. Across a five-property portfolio: $50,000-75,000 in fees for a process that is largely systematic, repeatable, and until now, impossible to automate.",
    tag: "And you learn nothing for next time",
  },
]

// How it works steps
const STEPS = [
  { num: "01", title: "Set Your Strategy", description: "Answer 8 questions. Get your borrowing power, cashflow scenarios, and target price range calibrated to your income, tax bracket, and risk tolerance." },
  { num: "02", title: "Find Your Suburb", description: "3,847 suburbs scored across 22 factors in real time. Vacancy rate, demand score, yield trend, hazard risk, infrastructure pipeline. Ranked shortlist in minutes, not weeks." },
  { num: "03", title: "Score Listings", description: "Every new listing matching your criteria is auto-scored, CMA'd, and delivered with a projected cashflow summary. You only review properties worth reviewing." },
  { num: "04", title: "Call, Negotiate, Buy", description: "AI calls agents on your behalf. Structured questions. Transcribed. Scored for motivation signals. You review every call and approve every offer before anything is communicated." },
]

// Before/after comparison
const BEFORE_AFTER = [
  { task: "Suburb research", before: "40-60 hours across 8 websites, manually", after: "3,847 suburbs pre-scored. Filter in under 10 minutes." },
  { task: "Suburb scoring", before: "Multiple spreadsheets with manual data entry", after: "Automated. 22 factors. Scores update continuously." },
  { task: "Property valuation", before: "Estimate from recent sales. No real CMA.", after: "Automated CMA. Know the number before you offer." },
  { task: "Agent outreach", before: "You call every Monday. Anxious. Unprepared.", after: "AI calls agents for you. Structured. Transcribed." },
  { task: "Vendor intelligence", before: "Whatever the agent volunteers", after: "Motivation signals scored automatically from every call" },
  { task: "Deal tracking", before: "Another spreadsheet. Or sticky notes.", after: "Kanban pipeline from enquiry to settlement" },
  { task: "Portfolio view", before: "Rough figures in your head", after: "Live dashboard. Equity, yield, cashflow, all properties." },
  { task: "Total cost", before: "$0 + 100 hours, or $12,500 to a buyer's agent", after: "From $99/month. Pays for itself on your first property." },
]

// Features
const FEATURES = [
  { icon: MapPin, title: "Suburb Scoring Engine", description: "22 factors from vacancy rate to infrastructure pipeline. Scored, ranked, and filterable across 3,847 Australian suburbs. What 40 hours of manual research used to look like." },
  { icon: BarChart3, title: "Automated CMA", description: "Comparable sales pulled in real time. Adjusted for size, condition, and recency. Know what a property is worth and what to offer before you pick up the phone." },
  { icon: DollarSign, title: "Cashflow Modeller", description: "Stress-test at +2% rates. Model IO to P&I switch. See weekly out-of-pocket cost, annual tax position, depreciation, and break-even rent for any property at any price point." },
  { icon: Building2, title: "Borrowing Power Calculator", description: "Multi-lender, IO vs P&I, LMI calculations. Based on current lending rates and your actual income and liabilities. Matches what your broker will tell you." },
  { icon: FileText, title: "Deal Pipeline", description: "Kanban from lead to research to offer to contract to settlement. Every property in one place with notes, CMA reports, agent history, and documents attached." },
  { icon: PieChart, title: "Portfolio Dashboard", description: "Total equity, gross yield, net cashflow, and tax position across all your properties. Live. Know exactly when you're ready to buy the next one." },
  { icon: Phone, title: "Voice AI Agent Outreach", description: "AI calls real estate agents on your behalf. Gathers vendor intelligence. Returns full transcript and motivation score. You approve every offer amount before anything is communicated.", badge: "Included in Acquire" },
  { icon: Bell, title: "Smart Listing Alerts", description: "New listings matching your suburb shortlist and strategy criteria, pre-scored and delivered the moment they hit the market. You only review the ones worth reviewing." },
]

// Pricing
const PRICING = [
  {
    name: "SCOUT",
    price: "$99",
    period: "/month",
    annual: "$990/year",
    target: "For investors building their strategy and first property",
    features: [
      "10 tracked suburbs",
      "Borrowing power calculator",
      "Financial strategy wizard",
      "Cashflow scenario modeller",
      "Basic portfolio dashboard",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "ACQUIRE",
    price: "$299",
    period: "/month",
    annual: "$2,990/year",
    target: "For investors buying 1-2 properties per year",
    features: [
      "Unlimited suburbs",
      "Automated CMA",
      "Full deal pipeline",
      "Voice AI (20 calls/month)",
      "Portfolio dashboard",
      "Smart listing alerts",
    ],
    cta: "Get Early Access",
    highlight: true,
    roi: "A buyer's agent charges $12,500 per property. Acquire costs $3,588/year. On a single acquisition, you save $8,900+ and keep full control.",
  },
  {
    name: "PRO",
    price: "$599",
    period: "/month",
    annual: "$5,990/year",
    target: "For portfolio builders, buyer's agents, and advisors",
    features: [
      "Everything in Acquire",
      "Unlimited Voice AI calls",
      "Multi-client management",
      "Team access (up to 5)",
      "White-label reports",
      "API access",
      "Dedicated account manager",
    ],
    cta: "Get Started",
    highlight: false,
  },
]

// Competitors
const COMPETITORS = [
  { name: "SuburbsFinder", does: "Suburb data and scoring", doesnt: "No cashflow modelling, no agent calls, no deal pipeline" },
  { name: "DSR Data", does: "Demand-to-supply ratio by suburb", doesnt: "Single metric only, no workflow, no beginner guidance" },
  { name: "SQM Research", does: "Vacancy rates and listing data", doesnt: "Raw data only, no analysis layer, institutional pricing" },
  { name: "CoreLogic / RP Data", does: "Property valuation and sales history", doesnt: "Expensive, no strategy layer, no agent intelligence" },
  { name: "A buyer's agent", does: "Full acquisition support", doesnt: "$10-15K per property, no transparency, not scalable" },
]

// FAQ
const FAQ_ITEMS = [
  {
    q: "Can PropAutopilot actually replace a buyer's agent?",
    a: "That's the goal. PropAutopilot gives you the same research intelligence, deal pipeline, and now agent communication that a buyer's agent provides at a fraction of the cost. The average buyer's agent fee is $12,500 per property. PropAutopilot Acquire at $299/month pays for itself in the first deal alone. You keep full control of every decision.",
  },
  {
    q: "I already own 1-2 investment properties. Is this for me?",
    a: "Yes. Portfolio scalers are our core user. You've already been through the research grind once. PropAutopilot means you don't repeat those 80 hours for every subsequent property. The portfolio dashboard also gives you a live view across all your existing properties so you know exactly when equity and cashflow position support your next acquisition.",
  },
  {
    q: "I'm a first-time investor. Will I understand the data?",
    a: "PropAutopilot was built for self-directed investors at every stage. The strategy wizard walks you through your first property from scratch. You don't need to know what a DSR score is. Every data point is explained in plain English, and the scoring system translates complex multi-factor analysis into a single comparable number across all suburbs.",
  },
  {
    q: "How does the Voice AI work? Will agents hang up?",
    a: "The AI introduces itself as an AI assistant calling on behalf of a named, pre-approved investor. It uses natural voice with Australian English and follows a structured intelligence-gathering script. In practice, agents engage when the call is professional and the investor is clearly credible. You review the full transcript and motivation score after every call. You approve every offer amount before anything is communicated.",
  },
  {
    q: "What data sources do you use?",
    a: "We aggregate from SQM Research, DSR Data, CoreLogic, Domain, the ABS Census, council planning portals, and state flood and hazard maps. All the sources you'd check manually, consolidated in one view. Suburb data refreshes continuously. CMA data is pulled in real time when you run a valuation.",
  },
  {
    q: "Is PropAutopilot financial advice?",
    a: "No. PropAutopilot provides data aggregation, analysis tools, and workflow automation. We don't recommend specific properties or manage funds. All investment decisions are yours. We include appropriate disclaimers throughout the platform.",
  },
  {
    q: "When does it launch and what's in the beta?",
    a: "Beta opens April 2026 with the full strategy tools, suburb scoring engine, property scoring, cashflow modeller, CMA, and deal pipeline. Voice AI agent outreach is included in the Acquire plan from launch. Join the waitlist now to lock in founding member pricing: 33% off for life.",
  },
]

// Sticky bar hook
function useScrolled(threshold = 600) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [threshold])
  return scrolled
}

export function LandingV2() {
  const scrolled = useScrolled()

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 selection:bg-slate-900 selection:text-white font-sans antialiased">
      {/* Announcement Bar */}
      <div className="bg-slate-900 text-white text-center py-2.5 px-4 text-[11px] font-bold tracking-wide">
        <span className="inline-flex items-center gap-2">
          <span className="size-1.5 bg-emerald-400 rounded-full animate-pulse" />
          <span className="hidden sm:inline">The average buyer&apos;s agent fee is <span className="text-emerald-400">$12,500 per property</span>. There&apos;s a better way.</span>
          <span className="sm:hidden">$12,500 avg buyer&apos;s agent fee. There&apos;s a better way.</span>
          <a href="#waitlist" className="underline underline-offset-2 ml-1 hover:text-emerald-400 transition-colors">Join the waitlist &rarr;</a>
        </span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-[#FDFDFD]/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="size-4 bg-slate-900 flex items-center justify-center">
              <div className="size-1 bg-white" />
            </div>
            <span className="text-[11px] font-black tracking-widest text-slate-900 uppercase">PropAutopilot</span>
          </div>

          <nav className="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How It Works</a>
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
          </nav>

          <div className="hidden md:flex items-center">
            <a href="#waitlist" onClick={() => trackEvent("waitlist_click", { location: "header_desktop" })} className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-5 py-2 rounded-xl hover:bg-slate-800 transition-colors">
              Join Waitlist
            </a>
          </div>

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
                    <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How It Works</a>
                    <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
                    <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
                    <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
                  </nav>
                  <div className="p-6 mt-auto border-t border-slate-200">
                    <a href="#waitlist" onClick={() => trackEvent("waitlist_click", { location: "header_mobile" })} className="block text-center w-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-5 py-3 rounded-xl hover:bg-slate-800 transition-colors">
                      Join Waitlist
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="relative">
        {/* Grid Background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

        {/* ===== HERO ===== */}
        <section className="relative z-10 px-6 py-20 lg:px-8 lg:py-32 border-b border-slate-200">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-16 lg:gap-8 lg:grid-cols-[1.2fr_1fr] items-center">
              <div>
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-8 font-mono">
                  <span className="size-2 bg-emerald-500 rounded-full animate-pulse" />
                  Launching April 2026 &middot; Australia Only
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-black tracking-tighter text-slate-900 uppercase leading-[0.9] text-left">
                  Find, Analyse, <br className="hidden sm:block" />and Buy <br />
                  Your Next <br className="hidden sm:block" />Investment Property.
                </h1>
                <p className="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-slate-400 uppercase">
                  Without the $12,500 Fee.
                </p>
                <p className="mt-8 max-w-xl text-lg font-medium leading-relaxed text-slate-600">
                  PropAutopilot automates the 100 hours of suburb research, cashflow modelling, and agent intelligence-gathering behind every property acquisition. The systematic parts, handled by software. Every decision, still yours.
                </p>
                <p className="mt-3 text-sm font-mono text-slate-500">
                  From $99/month. No charge until beta opens April 2026.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <a href="#waitlist" onClick={() => trackEvent("waitlist_click", { location: "hero" })} className="inline-flex items-center justify-center gap-3 rounded-xl bg-slate-900 px-8 py-4 text-[11px] font-black uppercase tracking-widest text-white transition hover:bg-slate-800">
                    Get Early Access
                    <ArrowRight className="size-4" />
                  </a>
                  <a href="#how-it-works" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-8 py-4 text-[11px] font-black uppercase tracking-widest text-slate-900 transition hover:bg-slate-50">
                    See How It Works
                  </a>
                </div>
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-slate-500 font-medium">
                  {["No charge until April 2026", "Cancel anytime", "Australian data only", "No spam, ever"].map((item) => (
                    <span key={item} className="flex items-center gap-1.5">
                      <Check className="size-3 text-emerald-600" strokeWidth={3} />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hero Widget */}
              <div className="relative w-full max-w-lg mx-auto lg:mr-0 lg:ml-auto">
                <div className="bg-white border text-left border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="border-b border-slate-200 bg-slate-50 px-5 py-3 flex justify-between items-center">
                    <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest">SUBURB EXPLORER v1.0</span>
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

        {/* ===== PROBLEM ===== */}
        <section id="problem" className="relative z-10 bg-[#FDFDFD] border-b border-slate-200 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-16">
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">THE PROBLEM</div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase max-w-2xl">
                Property research is a full-time job. Most investors do it wrong.
              </h2>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl">
                Every Australian investor faces the same grind. There was no middle ground between doing it yourself (badly) and paying a buyer&apos;s agent $12,500 to do it for you. Until now.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {PAIN_CARDS.map((card) => (
                <div key={card.title} className="p-8 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-colors">
                  <div className="font-mono text-3xl font-black text-slate-900 mb-1">{card.stat}</div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">{card.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{card.description}</p>
                  <span className="inline-block font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-md">{card.tag}</span>
                </div>
              ))}
            </div>

            <p className="mt-16 text-center text-lg text-slate-600">
              There had to be a better way. <span className="font-black text-slate-900">There is.</span>
            </p>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section id="how-it-works" className="relative z-10 bg-[#FDFDFD] border-b border-slate-200 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-16">
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">HOW IT WORKS</div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
                Four steps from pre-approval to settlement.
              </h2>
              <p className="mt-4 text-lg text-slate-600">One platform. No spreadsheets. No buyer&apos;s agent fee.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {STEPS.map((step) => (
                <div key={step.num} className="p-8 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-colors">
                  <div className="font-mono text-[10px] font-bold text-slate-400 mb-6 border-b border-slate-200 pb-4 inline-block tracking-widest">STEP {step.num}</div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-3">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BEFORE / AFTER ===== */}
        <section className="relative z-10 bg-[#FDFDFD] border-b border-slate-200 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-16">
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">THE DIFFERENCE</div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
                Your Saturdays back. Your $12,500 back.
              </h2>
              <p className="mt-4 text-lg text-slate-600">Same research quality. Same acquisition outcome. A fraction of the time and cost.</p>
            </div>

            {/* Desktop table */}
            <div className="hidden md:block border border-slate-200 rounded-xl overflow-hidden">
              <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200">
                <div className="px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">Task</div>
                <div className="px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500 border-l border-slate-200">Before</div>
                <div className="px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-700 border-l border-slate-200">With PropAutopilot</div>
              </div>
              {BEFORE_AFTER.map((row, i) => (
                <div key={row.task} className={`grid grid-cols-3 ${i < BEFORE_AFTER.length - 1 ? 'border-b border-slate-100' : ''}`}>
                  <div className="px-6 py-4 text-sm font-bold text-slate-900">{row.task}</div>
                  <div className="px-6 py-4 text-sm text-slate-500 border-l border-slate-100">{row.before}</div>
                  <div className="px-6 py-4 text-sm text-slate-900 font-medium border-l border-slate-100 bg-emerald-50/30">{row.after}</div>
                </div>
              ))}
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-4">
              {BEFORE_AFTER.map((row) => (
                <div key={row.task} className="border border-slate-200 rounded-xl p-5 bg-white">
                  <div className="text-sm font-bold text-slate-900 mb-3">{row.task}</div>
                  <div className="text-xs text-slate-500 mb-2"><span className="font-mono text-[10px] font-bold uppercase tracking-widest text-red-600 mr-2">Before</span>{row.before}</div>
                  <div className="text-xs text-slate-900 font-medium"><span className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-700 mr-2">After</span>{row.after}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 border border-emerald-200 bg-emerald-50 rounded-xl p-6 text-center">
              <p className="text-sm sm:text-base text-slate-800">
                The average buyer&apos;s agent fee is <span className="font-black">$12,500 per property</span>. PropAutopilot Acquire at $299/month is <span className="font-black">$3,588/year</span> &mdash; a saving of $8,900+ on a single acquisition, and you make every decision yourself.
              </p>
            </div>
          </div>
        </section>

        {/* ===== VOICE AI SPOTLIGHT ===== */}
        <section className="relative z-10 bg-slate-900 text-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">AI AGENT OUTREACH</div>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase leading-[0.9]">
                  PropAutopilot <br />Calls Real Estate <br />Agents For You.
                </h2>
                <p className="mt-8 text-base text-slate-300 leading-relaxed max-w-lg">
                  Getting real vendor intelligence requires direct conversation, and most self-directed investors either put it off or pay a buyer&apos;s agent to do it for them.
                </p>
                <p className="mt-4 text-base text-slate-300 leading-relaxed max-w-lg">
                  PropAutopilot&apos;s Voice AI calls agents on your behalf. It identifies itself as an AI assistant. It asks the questions that extract genuine intelligence: vendor motivation, price flexibility, preferred settlement timeline, whether they&apos;ve already bought elsewhere.
                </p>
                <p className="mt-4 text-base text-slate-300 leading-relaxed max-w-lg">
                  Every call is transcribed, logged to your deal card, and scored for motivation signals.
                </p>

                <div className="mt-10 space-y-6">
                  {[
                    { num: "1", text: "You set the brief. Property address, your offer range, questions you want answered." },
                    { num: "2", text: "AI places the call. Natural voice. Australian English. Structured script. Identifies as AI." },
                    { num: "3", text: "Full transcript returned. Every line logged to your deal card automatically." },
                    { num: "4", text: "Motivation score calculated. NLP analysis flags language patterns that indicate flexibility." },
                    { num: "5", text: "You approve the offer. Nothing is communicated to the agent without your explicit sign-off." },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-4">
                      <div className="size-8 shrink-0 rounded-lg bg-white/10 flex items-center justify-center font-mono text-[11px] font-bold">{step.num}</div>
                      <p className="text-sm text-slate-300 leading-relaxed">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call terminal widget */}
              <div className="bg-slate-950 border border-slate-700 rounded-xl overflow-hidden font-mono text-[12px] leading-relaxed">
                <div className="border-b border-slate-700 bg-slate-900 px-5 py-3 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CALL TRANSCRIPT</span>
                  <div className="flex items-center gap-2">
                    <span className="size-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-red-400 font-bold">LIVE</span>
                  </div>
                </div>
                <div className="p-6 space-y-5 text-slate-300">
                  <div>
                    <div className="text-emerald-400 text-[10px] font-bold uppercase mb-1">PROPAUTOPILOT AI</div>
                    <p>Hi, this is an AI assistant calling on behalf of a pre-approved investor regarding 14 Acacia Drive, Ipswich. Is now a good time?</p>
                  </div>
                  <div>
                    <div className="text-blue-400 text-[10px] font-bold uppercase mb-1">AGENT</div>
                    <p>Yeah sure, what did you want to know?</p>
                  </div>
                  <div>
                    <div className="text-emerald-400 text-[10px] font-bold uppercase mb-1">PROPAUTOPILOT AI</div>
                    <p>The property has been listed for 34 days. Has the vendor had any feedback on price, or are they firm at the $549,000 asking price?</p>
                  </div>
                  <div>
                    <div className="text-blue-400 text-[10px] font-bold uppercase mb-1">AGENT</div>
                    <p>Look, they&apos;re motivated. They&apos;ve already purchased in Brisbane and they need a quick settlement.</p>
                  </div>
                  <div className="border-t border-slate-700 pt-4 mt-4">
                    <div className="flex items-center gap-2 text-amber-400 text-[10px] font-bold uppercase">
                      <Activity className="size-3" /> MOTIVATION SIGNAL DETECTED
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">&quot;already purchased&quot;, &quot;quick settlement&quot;</p>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="text-[10px] font-bold text-slate-500">SCORE</span>
                      <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "87%" }} />
                      </div>
                      <span className="text-emerald-400 font-bold text-sm">87/100</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">Vendor likely flexible on price and/or timeline</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section id="features" className="relative z-10 bg-[#FDFDFD] border-b border-slate-200 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-16">
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">FEATURES</div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
                Six tools. One workflow. Zero spreadsheets.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="p-6 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-colors flex flex-col">
                  <feature.icon className="size-6 text-slate-900 mb-4" strokeWidth={1.5} />
                  <h3 className="text-base font-black text-slate-900 uppercase tracking-tight mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">{feature.description}</p>
                  {feature.badge && (
                    <span className="mt-4 inline-block font-mono text-[9px] font-bold uppercase tracking-widest text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md w-max">{feature.badge}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PRICING ===== */}
        <section id="pricing" className="relative z-10 bg-[#FDFDFD] border-b border-slate-200 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-16">
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">PRICING</div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">Institutional-grade research. Accessible pricing.</h2>
              <p className="mt-4 text-lg text-slate-600">No charge until beta opens April 2026. Cancel anytime.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {PRICING.map((tier) => (
                <div key={tier.name} className={`p-8 rounded-xl flex flex-col ${tier.highlight ? 'border-2 border-slate-900 bg-white shadow-lg relative' : 'border border-slate-200 bg-white'}`}>
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">Most Popular</div>
                  )}
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{tier.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="font-mono text-4xl font-black text-slate-900">{tier.price}</span>
                    <span className="font-mono text-sm text-slate-500">{tier.period}</span>
                  </div>
                  <p className="font-mono text-[10px] text-slate-400 mt-1">{tier.annual}</p>
                  <p className="text-sm text-slate-600 mt-4 mb-6">{tier.target}</p>

                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-start gap-3">
                        <Check className="size-4 text-emerald-600 shrink-0 mt-0.5" strokeWidth={3} />
                        <span className="text-sm text-slate-700">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {tier.roi && (
                    <p className="text-xs text-slate-600 bg-emerald-50 border border-emerald-100 rounded-lg p-3 mb-6">{tier.roi}</p>
                  )}

                  <a href="#waitlist" onClick={() => trackEvent("waitlist_click", { location: `pricing_${tier.name.toLowerCase()}` })} className={`w-full block text-center text-[11px] font-black uppercase tracking-widest py-4 rounded-xl transition-colors ${tier.highlight ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                    {tier.cta}
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-10 border border-slate-200 rounded-xl p-6 text-center bg-white">
              <p className="text-sm text-slate-700">
                First 100 members lock in <span className="font-black">33% off Acquire for life</span> &mdash; $199/month permanently, no price increases. No charge until beta opens April 2026.
              </p>
            </div>
          </div>
        </section>

        {/* ===== COMPETITORS ===== */}
        <section className="relative z-10 bg-[#FDFDFD] border-b border-slate-200 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-16">
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">VS THE ALTERNATIVES</div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
                Everything they do. Plus the one thing none of them do.
              </h2>
            </div>

            <div className="space-y-4">
              {COMPETITORS.map((comp) => (
                <div key={comp.name} className="grid md:grid-cols-[200px_1fr_1fr] gap-4 p-6 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-colors items-start">
                  <div className="font-bold text-slate-900">{comp.name}</div>
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-700 block mb-1">What it does</span>
                    <p className="text-sm text-slate-600">{comp.does}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-red-600 block mb-1">What it doesn&apos;t</span>
                    <p className="text-sm text-slate-600">{comp.doesnt}</p>
                  </div>
                </div>
              ))}
              <div className="grid md:grid-cols-[200px_1fr_1fr] gap-4 p-6 border-2 border-slate-900 rounded-xl bg-slate-50 items-start">
                <div className="font-black text-slate-900 text-lg">PropAutopilot</div>
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-700 block mb-1">What it does</span>
                  <p className="text-sm text-slate-900 font-medium">All of the above in one platform, plus Voice AI agent calls</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1">The tradeoff</span>
                  <p className="text-sm text-slate-900 font-medium">You still make every final decision. PropAutopilot does the work.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SOCIAL PROOF ===== */}
        <section className="relative z-10 bg-[#FDFDFD] border-b border-slate-200 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="font-mono text-4xl sm:text-5xl font-black text-slate-900">200,000+</div>
                <p className="mt-2 text-sm text-slate-600">New investor loans in AU every year</p>
              </div>
              <div>
                <div className="font-mono text-4xl sm:text-5xl font-black text-slate-900">$60B+</div>
                <p className="mt-2 text-sm text-slate-600">Annual investor lending in AU</p>
              </div>
              <div>
                <div className="font-mono text-4xl sm:text-5xl font-black text-slate-900">$2B+</div>
                <p className="mt-2 text-sm text-slate-600">Buyer&apos;s agent market in AU</p>
              </div>
            </div>
            <p className="mt-10 text-center text-lg text-slate-600 max-w-2xl mx-auto">
              PropAutopilot is building the automation layer for the entire self-directed investor segment.
            </p>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section id="faq" className="relative z-10 bg-[#FDFDFD] border-b border-slate-200 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="mb-16 text-center">
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">FAQ</div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">Questions. Answered.</h2>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border border-slate-200 rounded-xl px-6 bg-white data-[state=open]:bg-slate-50">
                  <AccordionTrigger className="text-left text-sm font-bold text-slate-900 py-5 hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-slate-600 leading-relaxed pb-5">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section id="waitlist" className="relative z-10 bg-white py-24 sm:py-32 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="border-4 border-slate-900 p-8 lg:p-16 rounded-xl relative bg-[#FDFDFD]">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div>
                  <h2 className="text-5xl lg:text-7xl font-black tracking-tighter text-slate-900 uppercase leading-[0.85]">
                    Stop Paying <br />For It <br />With Time.
                  </h2>
                  <p className="mt-8 text-slate-600 text-base leading-relaxed max-w-md">
                    Join Australian investors already on the waitlist. Beta opens April 2026. First 100 founding members lock in 33% off for life.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5"><Check className="size-3 text-emerald-600" strokeWidth={3} />No spam, ever</span>
                    <span className="flex items-center gap-1.5"><Check className="size-3 text-emerald-600" strokeWidth={3} />Priority access April 1st</span>
                    <span className="flex items-center gap-1.5"><Check className="size-3 text-emerald-600" strokeWidth={3} />33% off for founders</span>
                    <span className="flex items-center gap-1.5"><Check className="size-3 text-emerald-600" strokeWidth={3} />Unsubscribe anytime</span>
                  </div>
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

      {/* Footer */}
      <footer className="relative z-10 bg-[#FDFDFD] border-t border-slate-200 py-12 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="size-4 bg-slate-900 flex items-center justify-center">
              <div className="size-1 bg-white" />
            </div>
            <span className="text-[11px] font-black tracking-widest text-slate-900 uppercase">PropAutopilot</span>
            <span className="text-[10px] text-slate-400 ml-2 hidden sm:inline">Your AI-powered property acquisition co-pilot</span>
          </div>
          <div className="flex gap-10 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <a href="mailto:hello@propautopilot.com" className="hover:text-slate-900 transition-colors">Contact</a>
            <a href="/privacy" className="hover:text-slate-900 transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-slate-900 transition-colors">Terms</a>
          </div>
          <p className="font-mono text-[10px] text-slate-400">
            &copy; 2026 PropAutopilot Pty Ltd &middot; Not financial advice.
          </p>
        </div>
      </footer>

      {/* Sticky Bar (appears after scroll) */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${scrolled ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="bg-slate-900/95 backdrop-blur-md border-t border-slate-700 px-4 py-3">
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            <span className="hidden sm:inline text-[11px] font-bold text-white tracking-wide">
              Beta opens April 2026 &middot; First 100 founders get 33% off for life
            </span>
            <span className="sm:hidden text-[11px] font-bold text-white tracking-wide">
              33% off for founding members
            </span>
            <a href="#waitlist" onClick={() => trackEvent("waitlist_click", { location: "sticky_bar" })} className="bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors shrink-0 ml-4">
              Lock In 33% Off &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
