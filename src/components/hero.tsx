"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

/* ---------- Animated number counter ---------- */
function AnimatedNumber({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const duration = 2000
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target])
  return <>{prefix}{count.toLocaleString()}{suffix}</>
}

/* ---------- Live metric bar ---------- */
function MetricBar({ label, value, max, color, delay }: { label: string; value: number; max: number; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="space-y-1.5"
    >
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground/70">{label}</span>
        <span className="font-mono text-foreground/80">{value}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/50">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ delay: delay + 0.3, duration: 1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  )
}

/* ---------- Product preview (replaces abstract mockup) ---------- */
function ProductPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const }}
      className="relative mx-auto mt-16 w-full max-w-4xl"
    >
      {/* Glow behind the card */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-purple-500/15 to-cyan-400/20 blur-3xl" />

      {/* Main preview container */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-white/5 bg-zinc-900/80 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <div className="h-3 w-3 rounded-full bg-green-500/60" />
          </div>
          <div className="mx-auto flex h-7 w-72 items-center justify-center rounded-lg bg-zinc-800/80 px-3">
            <span className="text-[11px] text-zinc-400">app.propautopilot.com</span>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="grid grid-cols-12 gap-4 p-6">
          {/* Sidebar */}
          <div className="col-span-3 space-y-3">
            <div className="flex items-center gap-2 rounded-lg bg-indigo-500/10 px-3 py-2">
              <div className="h-2 w-2 rounded-full bg-indigo-500" />
              <span className="text-xs font-medium text-indigo-400">Dashboard</span>
            </div>
            {["Suburbs", "Properties", "Deals", "Portfolio"].map((item) => (
              <div key={item} className="flex items-center gap-2 px-3 py-2">
                <div className="h-2 w-2 rounded-full bg-zinc-700" />
                <span className="text-xs text-zinc-500">{item}</span>
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="col-span-9 space-y-4">
            {/* Top stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Suburbs Scored", value: "3,847", change: "+12 this week" },
                { label: "Portfolio Yield", value: "5.2%", change: "↑ 0.3% vs avg" },
                { label: "Active Deals", value: "4", change: "2 in negotiation" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/5 bg-zinc-900/50 p-4">
                  <p className="text-[10px] uppercase tracking-wider text-zinc-500">{stat.label}</p>
                  <p className="mt-1 font-mono text-xl font-bold text-white">{stat.value}</p>
                  <p className="mt-0.5 text-[10px] text-emerald-400">{stat.change}</p>
                </div>
              ))}
            </div>

            {/* Suburb scoring preview */}
            <div className="rounded-xl border border-white/5 bg-zinc-900/50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-300">Top Suburbs — Composite Score</span>
                <span className="text-[10px] text-zinc-500">22 factors</span>
              </div>
              <div className="space-y-3">
                <MetricBar label="Ipswich, QLD" value={87} max={100} color="bg-gradient-to-r from-indigo-500 to-purple-500" delay={1.0} />
                <MetricBar label="Logan, QLD" value={82} max={100} color="bg-gradient-to-r from-indigo-500 to-cyan-400" delay={1.15} />
                <MetricBar label="Salisbury, SA" value={78} max={100} color="bg-gradient-to-r from-purple-500 to-pink-500" delay={1.3} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </motion.div>
  )
}

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden"
    >
      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient orbs */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 rounded-full bg-indigo-500/15 blur-[120px]" />
      </div>
      <div className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px]">
        <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate={mounted ? "show" : "hidden"}
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="group inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm transition-colors hover:bg-primary/10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Launching April 2026 — Join the waitlist
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="mt-8 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-7xl"
          >
            Your{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                AI-powered
              </span>
              <span className="absolute -inset-x-2 -inset-y-1 -z-10 -rotate-1 rounded-lg bg-primary/10" />
            </span>{" "}
            property investment co-pilot
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            Replace the spreadsheets, the 8-website suburb research grind, and the{" "}
            <span className="font-semibold text-foreground">$15K buyer&rsquo;s agent fees</span>.
            One platform — from strategy to settlement.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              className="group relative h-12 rounded-full px-8 text-base font-semibold shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
              onClick={() => {
                trackEvent("cta_click", { location: "hero" })
                scrollTo("waitlist")
              }}
            >
              Get Early Access
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="h-12 rounded-full px-8 text-base font-medium text-muted-foreground hover:text-foreground"
              onClick={() => scrollTo("how-it-works")}
            >
              <Play className="mr-2 h-4 w-4" />
              See how it works
            </Button>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground"
          >
            {[
              "15,000+ suburbs scored",
              "Australian data only",
              "14-day free trial",
              "No credit card required",
            ].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-primary/60" />
                {item}
              </span>
            ))}
          </motion.div>

          {/* Product preview */}
          {mounted && <ProductPreview />}
        </motion.div>
      </div>
    </section>
  )
}
