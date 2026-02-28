import Link from "next/link"
import { Separator } from "@/components/ui/separator"

const PRODUCT_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const

const COMPANY_LINKS = [
  { label: "About", href: "#" },
  { label: "Contact", href: "mailto:hello@propautopilot.com" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
] as const

function FooterLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
        <span className="text-sm font-bold text-white">P</span>
      </div>
      <span className="text-lg font-semibold text-foreground">PropAutopilot</span>
    </div>
  )
}

function TwitterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46L20 4" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* 3-column grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <FooterLogo />
            <p className="text-sm text-muted-foreground">
              Your AI-powered property investment co-pilot
            </p>
            <p className="text-sm text-muted-foreground">
              Made in Australia 🇦🇺
            </p>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Product</h3>
            <ul className="space-y-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <span className="text-sm text-muted-foreground/60">
                  Blog <span className="text-xs italic">(coming soon)</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Company</h3>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom row */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 PropAutopilot Pty Ltd
          </p>

          <div className="flex items-center gap-4">
            {/* Investor pitch link */}
            <Link
              href="/pitch"
              className="text-xs text-muted-foreground/60 transition-colors hover:text-muted-foreground"
            >
              Investor? See our pitch &rarr;
            </Link>

            {/* Social icons */}
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Follow us on X (Twitter)"
            >
              <TwitterIcon />
            </a>
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Follow us on LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
