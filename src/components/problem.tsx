"use client"

import { motion } from "framer-motion"
import { SectionWrapper } from "@/components/section-wrapper"
import { ScrollAnimation } from "@/components/scroll-animation"

const PAIN_POINTS = [
  {
    emoji: "📊",
    stat: "78+",
    statLabel: "input cells",
    title: "Spreadsheet Hell",
    description:
      "4 Excel files. 78+ input cells per property. You spend more time wrangling formulas than finding deals.",
    gradient: "from-red-500/10 to-orange-500/10",
    border: "hover:border-red-500/30",
  },
  {
    emoji: "🌐",
    stat: "400+",
    statLabel: "browser tabs",
    title: "Research Paralysis",
    description:
      "SQM, DSR Data, ABS, Domain, council maps, flood maps... 50 suburbs means 400+ browser tabs. Every. Single. Time.",
    gradient: "from-orange-500/10 to-yellow-500/10",
    border: "hover:border-orange-500/30",
  },
  {
    emoji: "📞",
    stat: "12+",
    statLabel: "calls per week",
    title: "Phone Call Anxiety",
    description:
      "Calling agents every Monday. Asking probing questions. Negotiating price drops. Most investors would rather just... not.",
    gradient: "from-purple-500/10 to-pink-500/10",
    border: "hover:border-purple-500/30",
  },
  {
    emoji: "💸",
    stat: "$11K",
    statLabel: "avg BA fee",
    title: "Expensive Alternatives",
    description:
      "Or pay a buyer's agent — and hope they pick the right suburb. Average fee: $11,000 per property. Per. Property.",
    gradient: "from-emerald-500/10 to-cyan-500/10",
    border: "hover:border-emerald-500/30",
  },
] as const

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const } },
}

export function Problem() {
  return (
    <SectionWrapper
      id="problem"
      label="THE PROBLEM"
      heading="Property investing shouldn't require a PhD in spreadsheets"
    >
      <ScrollAnimation>
        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {PAIN_POINTS.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 ${item.border}`}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

              <div className="relative">
                {/* Emoji + stat */}
                <div className="mb-5 flex items-center gap-4">
                  <span className="text-3xl">{item.emoji}</span>
                  <div>
                    <span className="font-mono text-3xl font-black text-foreground">{item.stat}</span>
                    <span className="ml-1.5 text-sm text-muted-foreground">{item.statLabel}</span>
                  </div>
                </div>

                <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bridge text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-muted-foreground">
            There had to be a better way.{" "}
            <span className="font-semibold text-foreground">There is.</span>
          </p>
        </motion.div>
      </ScrollAnimation>
    </SectionWrapper>
  )
}
