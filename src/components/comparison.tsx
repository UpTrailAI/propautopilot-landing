"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { SectionWrapper } from "@/components/section-wrapper"
import { ScrollAnimation } from "@/components/scroll-animation"

const ROWS = [
  {
    metric: "Cost",
    diy: "Free (your time)",
    ba: "$8,000–15,000/property",
    prop: "From $99/mo",
  },
  {
    metric: "Suburb research",
    diy: "2–6 weeks manual",
    ba: "Done for you (opaque)",
    prop: "Minutes (transparent)",
  },
  {
    metric: "Properties evaluated",
    diy: "5–10 (fatigue)",
    ba: "Unknown",
    prop: "Unlimited",
  },
  {
    metric: "Data sources",
    diy: "8+ websites manual",
    ba: "Agent’s network",
    prop: "All sources, one screen",
  },
  {
    metric: "Negotiation",
    diy: "You do it",
    ba: "Agent does it",
    prop: "AI-assisted + your control",
  },
  {
    metric: "Portfolio tracking",
    diy: "Another spreadsheet",
    ba: "Not included",
    prop: "Built-in dashboard",
  },
  {
    metric: "Transparency",
    diy: "Full (but overwhelming)",
    ba: "Low",
    prop: "Full (and organised)",
  },
] as const

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function Comparison() {
  return (
    <SectionWrapper
      id="comparison"
      label="COMPARE"
      heading="How PropAutopilot stacks up"
    >
      <ScrollAnimation>
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Column headers — desktop */}
          <motion.div
            variants={fadeUp}
            className="mb-4 hidden grid-cols-4 gap-3 md:grid"
          >
            <div />
            <div className="rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-semibold text-muted-foreground">
              DIY (Spreadsheets)
            </div>
            <div className="rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-semibold text-muted-foreground">
              Buyer&apos;s Agent
            </div>
            <div className="relative rounded-xl border-2 border-primary/50 bg-primary/5 px-4 py-3 text-center text-sm font-semibold text-foreground">
              <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 text-white">
                Recommended
              </Badge>
              PropAutopilot
            </div>
          </motion.div>

          {/* Rows — desktop */}
          <div className="hidden flex-col gap-2 md:flex">
            {ROWS.map((row) => (
              <motion.div
                key={row.metric}
                variants={fadeUp}
                className="grid grid-cols-4 gap-3"
              >
                <div className="flex items-center rounded-xl px-4 py-3 text-sm font-semibold">
                  {row.metric}
                </div>
                <div className="flex items-center justify-center rounded-xl border border-border bg-card px-4 py-3 text-center text-sm text-muted-foreground">
                  {row.diy}
                </div>
                <div className="flex items-center justify-center rounded-xl border border-border bg-card px-4 py-3 text-center text-sm text-muted-foreground">
                  {row.ba}
                </div>
                <div className="flex items-center justify-center rounded-xl border-2 border-primary/50 bg-primary/5 px-4 py-3 text-center text-sm font-medium text-foreground">
                  {row.prop}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile: stacked cards per column */}
          <div className="flex flex-col gap-6 md:hidden">
            {/* PropAutopilot card first on mobile (highlighted) */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border-2 border-primary/50 bg-primary/5 p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold">PropAutopilot</h3>
                <Badge className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 text-white">
                  Recommended
                </Badge>
              </div>
              <div className="space-y-3">
                {ROWS.map((row) => (
                  <div key={row.metric} className="flex justify-between gap-2">
                    <span className="text-sm text-muted-foreground">{row.metric}</span>
                    <span className="text-right text-sm font-medium text-foreground">
                      {row.prop}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* DIY card */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="mb-4 text-lg font-bold text-muted-foreground">
                DIY (Spreadsheets)
              </h3>
              <div className="space-y-3">
                {ROWS.map((row) => (
                  <div key={row.metric} className="flex justify-between gap-2">
                    <span className="text-sm text-muted-foreground">{row.metric}</span>
                    <span className="text-right text-sm text-muted-foreground">
                      {row.diy}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Buyer's Agent card */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="mb-4 text-lg font-bold text-muted-foreground">
                Buyer&apos;s Agent
              </h3>
              <div className="space-y-3">
                {ROWS.map((row) => (
                  <div key={row.metric} className="flex justify-between gap-2">
                    <span className="text-sm text-muted-foreground">{row.metric}</span>
                    <span className="text-right text-sm text-muted-foreground">
                      {row.ba}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Callout box */}
          <motion.div
            variants={fadeUp}
            className="mt-10 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center"
          >
            <p className="text-base text-foreground md:text-lg">
              <span className="mr-2">💡</span>
              The average buyer&apos;s agent fee in Australia is $11,000.
              <br className="hidden sm:block" />{" "}
              PropAutopilot pays for itself on your first property.
            </p>
          </motion.div>
        </motion.div>
      </ScrollAnimation>
    </SectionWrapper>
  )
}
