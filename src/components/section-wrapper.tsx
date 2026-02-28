"use client"

import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  id: string
  label: string
  heading: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}

export function SectionWrapper({ id, label, heading, subtitle, children, className }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-20 md:py-32", className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center md:mb-16">
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            {label}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {heading}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}
