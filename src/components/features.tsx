"use client"

import {
  BarChart3,
  Calculator,
  TrendingUp,
  Wallet,
  Kanban,
  PieChart,
  Bot,
  Bell,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { SectionWrapper } from "@/components/section-wrapper"
import { ScrollAnimation } from "@/components/scroll-animation"

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  badge?: string
  color: string
  bg: string
}

const FEATURES: Feature[] = [
  {
    icon: BarChart3,
    title: "Suburb Scoring Engine",
    description:
      "22 factors from vacancy to infrastructure — scored, ranked, and visualised across 3,800+ suburbs.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    icon: Calculator,
    title: "Automated CMA",
    description:
      "Comparable sales pulled automatically. Know what a property is worth before you offer.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: TrendingUp,
    title: "Cashflow Modeller",
    description:
      "Stress-test at +2% rates. Model IO→P&I reversion. See exactly what a deal costs you weekly.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Wallet,
    title: "Borrowing Power",
    description:
      "Multi-lender, IO vs P&I, LMI calculations. Matches what your broker will tell you.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Kanban,
    title: "Deal Pipeline",
    description:
      "Kanban board from lead → research → offer → contract → settlement. Never lose track of a deal.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: PieChart,
    title: "Portfolio Dashboard",
    description:
      "Total equity, yield, cashflow across all properties. Know when you're ready for the next one.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    icon: Bot,
    title: "AI Agent Outreach",
    description:
      "AI calls real estate agents on your behalf. Gathers intel, negotiates offers. You approve every decision.",
    badge: "Coming Soon",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description:
      "New listings matching your criteria, scored and delivered instantly. Cut through the noise.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] as const } },
}

export function Features() {
  return (
    <SectionWrapper
      id="features"
      label="FEATURES"
      heading="Everything you need. Nothing you don't."
    >
      <ScrollAnimation>
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              {feature.badge && (
                <Badge className="absolute right-4 top-4 border-0 bg-primary/10 text-[10px] font-medium text-primary">
                  {feature.badge}
                </Badge>
              )}

              <div className={`mb-4 inline-flex rounded-xl ${feature.bg} p-2.5 transition-transform duration-300 group-hover:scale-110`}>
                <feature.icon className={`size-5 ${feature.color}`} strokeWidth={1.5} />
              </div>

              <h3 className="mb-1.5 text-base font-bold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </ScrollAnimation>
    </SectionWrapper>
  )
}
