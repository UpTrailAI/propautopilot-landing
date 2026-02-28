"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { trackEvent } from "@/lib/analytics"

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const

function scrollTo(href: string) {
  const id = href.replace("#", "")
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: "smooth" })
  }
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="PropAutopilot home">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
        <span className="text-sm font-bold text-white">P</span>
      </div>
      <span className="text-lg font-bold text-foreground tracking-tight">PropAutopilot</span>
    </Link>
  )
}

export function Nav() {
  const [open, setOpen] = useState(false)

  function handleNavClick(href: string) {
    scrollTo(href)
    setOpen(false)
  }

  function handleCtaClick() {
    trackEvent("cta_click", { location: "nav" })
    scrollTo("#waitlist")
    setOpen(false)
  }

  return (
    <nav
      className="sticky top-0 z-50 border-b border-border/50 bg-background/60 backdrop-blur-xl backdrop-saturate-150"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop right side */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button
            size="sm"
            className="group rounded-full px-5 shadow-lg shadow-primary/20"
            onClick={handleCtaClick}
          >
            Join Waitlist
            <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4 pt-4">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="rounded-lg px-3 py-3 text-left text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {link.label}
                  </button>
                ))}
                <Button
                  className="mt-6 w-full rounded-full"
                  onClick={handleCtaClick}
                >
                  Join Waitlist
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
