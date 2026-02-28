"use client"

import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SectionWrapper } from "@/components/section-wrapper"
import { ScrollAnimation } from "@/components/scroll-animation"
import { trackEvent } from "@/lib/analytics"
import { cn } from "@/lib/utils"

interface Tier {
  name: string
  price: number
  annualPrice: number
  badge: string | null
  highlighted: boolean
  features: string[]
  tagline: string
}

const TIERS: Tier[] = [
  {
    name: "Starter",
    price: 49,
    annualPrice: 39,
    badge: null,
    highlighted: false,
    features: [
      "5 tracked properties",
      "30 AI voice minutes / mo",
      "Strategy & borrowing tools",
      "Suburb explorer (10 shortlisted)",
      "Cashflow modeller",
      "Deal pipeline (3 active)",
      "English only",
      "Email support",
    ],
    tagline: "Perfect for your first investment property",
  },
  {
    name: "Pro",
    price: 99,
    annualPrice: 79,
    badge: "Most Popular",
    highlighted: true,
    features: [
      "25 tracked properties",
      "240 AI voice minutes / mo",
      "Everything in Starter",
      "Unlimited suburb research",
      "Automated CMA",
      "Portfolio dashboard",
      "Batch calling campaigns",
      "3 languages (EN, ZH, HI)",
      "Priority support",
    ],
    tagline: "For serious investors building a portfolio",
  },
  {
    name: "Business",
    price: 249,
    annualPrice: 199,
    badge: "For Professionals",
    highlighted: false,
    features: [
      "Unlimited properties",
      "720 AI voice minutes / mo",
      "Everything in Pro",
      "Multi-client management",
      "All languages",
      "White-label reports",
      "API access",
      "Dedicated support",
    ],
    tagline: "For buyer's agents and advisory firms",
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const } },
}

function scrollToWaitlist(tier: string) {
  trackEvent("cta_click", { location: "pricing", tier })
  document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
}

export function Pricing() {
  return (
    <SectionWrapper
      id="pricing"
      label="PRICING"
      heading="Simple pricing. No surprises."
    >
      <ScrollAnimation>
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          {/* Pricing cards */}
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {TIERS.map((tier) => (
              <motion.div
                key={tier.name}
                variants={cardVariants}
                className={cn(
                  "group relative flex flex-col rounded-2xl border p-8 transition-all duration-300",
                  tier.highlighted
                    ? "border-primary/40 bg-gradient-to-b from-primary/[0.06] to-transparent shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/15"
                    : "border-border bg-card hover:border-border/80 hover:shadow-lg"
                )}
              >
                {tier.badge && (
                  <Badge
                    className={cn(
                      "absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap",
                      tier.highlighted
                        ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 text-white shadow-lg shadow-primary/25"
                        : "bg-secondary text-secondary-foreground"
                    )}
                  >
                    {tier.badge}
                  </Badge>
                )}

                {/* Tier name */}
                <h3 className="text-lg font-bold">{tier.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground italic">{tier.tagline}</p>

                {/* Price */}
                <div className="mt-6 mb-1 flex items-baseline gap-1">
                  <span className="font-mono text-5xl font-black tracking-tight">
                    ${tier.price}
                  </span>
                  <span className="text-sm text-muted-foreground">/mo</span>
                </div>
                <p className="mb-6 text-xs text-muted-foreground">
                  or ${tier.annualPrice}/mo billed annually
                </p>

                {/* Features */}
                <ul className="mb-8 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2.5} />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  className={cn(
                    "w-full rounded-full transition-all",
                    tier.highlighted
                      ? "shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
                      : ""
                  )}
                  variant={tier.highlighted ? "default" : "outline"}
                  onClick={() => scrollToWaitlist(tier.name)}
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Below cards */}
          <motion.div variants={cardVariants} className="mt-10 space-y-3 text-center">
            <p className="text-sm text-muted-foreground">
              All plans include a 14-day free trial. No credit card required.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5">
              <span className="text-sm font-medium">
                🎁 First 100 members — <span className="font-bold text-primary">30% off for life</span> with code <code className="ml-1 rounded bg-primary/10 px-1.5 py-0.5 font-mono text-xs text-primary">FOUNDER30</code>
              </span>
            </div>
          </motion.div>

          {/* Voice top-ups */}
          <motion.div variants={cardVariants} className="mt-8 w-full max-w-2xl">
            <div className="rounded-xl border border-border bg-card/50 p-6">
              <h4 className="mb-3 text-center text-sm font-semibold text-foreground">Need more voice minutes?</h4>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { name: "Boost", price: 19, mins: 60 },
                  { name: "Power", price: 49, mins: 180 },
                  { name: "Mega", price: 99, mins: 480 },
                ].map((pack) => (
                  <div key={pack.name} className="rounded-lg border border-border bg-background p-3">
                    <p className="text-xs font-semibold text-muted-foreground">{pack.name}</p>
                    <p className="mt-1 font-mono text-lg font-bold">${pack.price}</p>
                    <p className="text-xs text-muted-foreground">{pack.mins} min</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground">Top-ups never expire</p>
            </div>
          </motion.div>
        </motion.div>
      </ScrollAnimation>
    </SectionWrapper>
  )
}
