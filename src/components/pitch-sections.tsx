"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ScrollAnimation } from "@/components/scroll-animation"
import { trackEvent } from "@/lib/analytics"

// ── Animated Counter ──────────────────────────────────────────────

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number
  prefix?: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1500
    const start = Date.now()
    const step = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, value])

  return (
    <span ref={ref} className="font-mono text-3xl font-bold tabular-nums md:text-4xl">
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  )
}

// ── Pitch Section Wrapper ─────────────────────────────────────────

function PitchSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t border-primary/20 bg-zinc-900/50 py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {children}
        </ScrollAnimation>
      </div>
    </section>
  )
}

// ── Market Opportunity ────────────────────────────────────────────

const KPI_STATS = [
  { value: 11.9, prefix: "$", suffix: "T", label: "AU residential market value", raw: 119, divisor: 10 },
  { value: 2.24, prefix: "", suffix: "M", label: "Property investors (ATO)", raw: 224, divisor: 100 },
  { value: 57624, prefix: "", suffix: "", label: "New investment loans, Q3 2025 (record)", raw: 57624, divisor: 1 },
  { value: 47, prefix: "$", suffix: "B", label: "Global proptech TAM", raw: 47, divisor: 1 },
] as const

function MarketOpportunity() {
  return (
    <PitchSection title="Market Opportunity">
      <div className="mb-10 grid grid-cols-2 gap-6 md:grid-cols-4">
        {KPI_STATS.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border bg-card p-6 text-center"
          >
            <div className="mb-2 text-primary">
              {stat.divisor > 1 ? (
                <AnimatedCounterDecimal
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  raw={stat.raw}
                  divisor={stat.divisor}
                />
              ) : (
                <AnimatedCounter
                  value={stat.raw}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              )}
            </div>
            <p className="text-xs text-muted-foreground md:text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
      <p className="mx-auto max-w-3xl text-center text-base text-muted-foreground md:text-lg">
        PropAutopilot targets the $2.3B addressable market of AU property investor
        tooling and buyer&apos;s agent services. Year 3 target: $6.8M ARR.
      </p>
    </PitchSection>
  )
}

function AnimatedCounterDecimal({
  value,
  prefix,
  suffix,
  raw,
  divisor,
}: {
  value: number
  prefix: string
  suffix: string
  raw: number
  divisor: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [display, setDisplay] = useState("0")

  useEffect(() => {
    if (!isInView) return
    const duration = 1500
    const start = Date.now()
    const step = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * raw
      setDisplay((current / divisor).toFixed(divisor > 1 ? (divisor >= 100 ? 2 : 1) : 0))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, raw, divisor, value])

  return (
    <span ref={ref} className="font-mono text-3xl font-bold tabular-nums md:text-4xl">
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

// ── Unit Economics ─────────────────────────────────────────────────

const UNIT_ECONOMICS = [
  { metric: "Blended ARPU", value: "~$218/mo" },
  { metric: "CAC", value: "~$120" },
  { metric: "LTV (24mo)", value: "~$5,232" },
  { metric: "LTV:CAC", value: "44:1" },
  { metric: "Gross Margin", value: "81.6%" },
  { metric: "Payback", value: "<1 month" },
] as const

function UnitEconomics() {
  return (
    <PitchSection title="Unit Economics">
      <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4 md:grid-cols-3">
        {UNIT_ECONOMICS.map((item) => (
          <motion.div
            key={item.metric}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border bg-card p-6 text-center"
          >
            <p className="mb-1 font-mono text-2xl font-bold text-primary md:text-3xl">
              {item.value}
            </p>
            <p className="text-xs text-muted-foreground md:text-sm">{item.metric}</p>
          </motion.div>
        ))}
      </div>
    </PitchSection>
  )
}

// ── Why Now ────────────────────────────────────────────────────────

const WHY_NOW = [
  {
    title: "AI Maturity",
    description:
      "Voice negotiation is now feasible. LLMs can handle nuanced real estate conversations, gather intel, and negotiate on behalf of investors.",
  },
  {
    title: "Data Accessibility",
    description:
      "Property data APIs are increasingly accessible. CoreLogic, Domain, and government portals now offer programmatic access.",
  },
  {
    title: "BA Industry Scrutiny",
    description:
      "Buyer’s agents under growing scrutiny for conflicts of interest, opaque fees, and inconsistent outcomes.",
  },
  {
    title: "Record Investment Lending",
    description:
      "57,624 new investment loans in Q3 2025 — a record. More investors than ever need tools, not just advice.",
  },
] as const

function WhyNow() {
  return (
    <PitchSection title="Why Now">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {WHY_NOW.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-2xl border border-border bg-card p-6 md:p-8"
          >
            <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </PitchSection>
  )
}

// ── Competitive Moat ──────────────────────────────────────────────

const MOATS = [
  {
    title: "Workflow completeness",
    description: "Strategy \u2192 settlement. No competitor covers the full property acquisition workflow.",
  },
  {
    title: "Voice AI negotiation",
    description: "No competitor has AI agent outreach. First-mover advantage in automated real estate negotiation.",
  },
  {
    title: "Course ecosystem distribution",
    description: "15K+ property course alumni as a built-in distribution channel. Warm audience, proven methodology.",
  },
  {
    title: "Data compounding effects",
    description: "Every deal, every suburb score, every negotiation outcome improves the model. Network effects compound over time.",
  },
] as const

function CompetitiveMoat() {
  return (
    <PitchSection title="Competitive Moat">
      <div className="mx-auto max-w-3xl space-y-6">
        {MOATS.map((moat, i) => (
          <motion.div
            key={moat.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex gap-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              {i + 1}
            </div>
            <div>
              <h3 className="mb-1 text-lg font-bold">{moat.title}</h3>
              <p className="text-sm text-muted-foreground">{moat.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </PitchSection>
  )
}

// ── Main Export ────────────────────────────────────────────────────

export function PitchSections() {
  const tracked = useRef(false)

  useEffect(() => {
    if (!tracked.current) {
      trackEvent("pitch_mode")
      tracked.current = true
    }
  }, [])

  return (
    <>
      <MarketOpportunity />
      <UnitEconomics />
      <WhyNow />
      <CompetitiveMoat />
    </>
  )
}

export function InvestorBadge() {
  return (
    <div className="fixed right-4 top-4 z-50 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary backdrop-blur-sm">
      Investor View
    </div>
  )
}
