"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { SectionWrapper } from "@/components/section-wrapper"
import { ScrollAnimation } from "@/components/scroll-animation"

const TESTIMONIALS = [
  {
    quote:
      "I was spending 3 hours every Sunday researching suburbs in spreadsheets. PropAutopilot does it in 10 minutes. Game changer.",
    name: "Sarah M.",
    role: "Property Investor",
    location: "Sydney",
    context: "2 investment properties",
    initials: "SM",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    quote:
      "My buyer's agent charged $12K and picked a suburb I could have found myself. Never again. This is the tool I wish existed 5 years ago.",
    name: "James R.",
    role: "Portfolio Builder",
    location: "Melbourne",
    context: "Scaling to 5 properties",
    initials: "JR",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    quote:
      "The cashflow modeller alone is worth the subscription. I can stress-test any deal in seconds — rate rises, vacancy, everything.",
    name: "Priya K.",
    role: "First-Time Investor",
    location: "Brisbane",
    context: "First investment property",
    initials: "PK",
    gradient: "from-cyan-400 to-indigo-500",
  },
] as const

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const } },
}

export function Testimonials() {
  return (
    <SectionWrapper
      id="testimonials"
      label="WHAT INVESTORS SAY"
      heading="Built for investors, by investors"
    >
      {/* TODO: Replace with real testimonials before April 1 launch */}
      <ScrollAnimation>
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              className="group relative rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Stars */}
              <div className="mb-4 flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-sm font-bold text-white`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.role} &middot; {t.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </ScrollAnimation>
    </SectionWrapper>
  )
}
