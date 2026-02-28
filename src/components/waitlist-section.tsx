"use client"

import { ArrowRight, Shield, Zap, Gift } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animation"
import { WaitlistForm } from "@/components/waitlist-form"

export function WaitlistSection() {
  return (
    <section
      id="waitlist"
      className="relative overflow-hidden py-20 md:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-primary/[0.08] to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2">
        <div className="absolute inset-0 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="mx-auto max-w-lg text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Gift className="size-3.5" />
              Limited founding member spots
            </span>

            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Get in before launch day
            </h2>
            <p className="mb-10 text-base leading-relaxed text-muted-foreground md:text-lg">
              Join Australian investors getting early access to PropAutopilot.
              First 100 members lock in{" "}
              <span className="font-semibold text-primary">30% off for life</span>.
            </p>

            <WaitlistForm />

            {/* Trust signals */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Shield className="size-3.5" />
                No spam, ever
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="size-3.5" />
                Priority access on April 1st
              </span>
              <span className="flex items-center gap-1.5">
                <ArrowRight className="size-3.5" />
                Unsubscribe anytime
              </span>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
