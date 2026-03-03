"use client"

import { Target, Map, Home, Handshake } from "lucide-react"
import { motion } from "framer-motion"
import { SectionWrapper } from "@/components/section-wrapper"
import { ScrollAnimation } from "@/components/scroll-animation"

const STEPS = [
  {
    icon: Target,
    number: "01",
    title: "Set Your Strategy",
    description:
      "Answer a few questions about your finances. We calculate borrowing power, model cashflow scenarios, and recommend your target price range.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    glow: "group-hover:shadow-indigo-500/20",
  },
  {
    icon: Map,
    number: "02",
    title: "Find Your Suburbs",
    description:
      "We score 15,000+ Australian suburbs across 22 factors — vacancy, yield, growth signals, hazards. Ranked shortlist in minutes, not weeks.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    glow: "group-hover:shadow-purple-500/20",
  },
  {
    icon: Home,
    number: "03",
    title: "Score Properties",
    description:
      "New listings are auto-scored against your criteria. Flood zones flagged. Comparable sales pulled. Deal quality rated before you even look.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    glow: "group-hover:shadow-cyan-500/20",
  },
  {
    icon: Handshake,
    number: "04",
    title: "Negotiate & Buy",
    description:
      "Track deals from enquiry to settlement. AI-assisted agent outreach. Manage offers, inspections, and your whole pipeline in one place.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    glow: "group-hover:shadow-emerald-500/20",
  },
] as const

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const } },
}

export function HowItWorks() {
  return (
    <SectionWrapper
      id="how-it-works"
      label="HOW IT WORKS"
      heading="Four steps to your next investment property"
    >
      <ScrollAnimation>
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Desktop layout */}
          <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className={`group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-border/80 hover:shadow-lg ${step.glow}`}
              >
                {/* Step number */}
                <span className="font-mono text-xs font-bold tracking-widest text-muted-foreground/40">
                  {step.number}
                </span>

                {/* Icon */}
                <div className={`mt-4 mb-4 inline-flex rounded-xl ${step.bg} p-3`}>
                  <step.icon className={`size-6 ${step.color}`} strokeWidth={1.5} />
                </div>

                <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>

                {/* Connector arrow (not on last) */}
                {i < STEPS.length - 1 && (
                  <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-muted-foreground/20 lg:block">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile: vertical timeline */}
          <div className="space-y-6 md:hidden">
            {STEPS.map((step, i) => (
              <motion.div key={step.title} variants={fadeUp} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${step.bg}`}>
                    <step.icon className={`size-5 ${step.color}`} strokeWidth={1.5} />
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="mt-2 w-px flex-1 bg-border" />
                  )}
                </div>
                <div className="pb-6">
                  <span className="font-mono text-[10px] font-bold tracking-widest text-muted-foreground/40">
                    STEP {step.number}
                  </span>
                  <h3 className="mt-1 text-lg font-bold">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </ScrollAnimation>
    </SectionWrapper>
  )
}
