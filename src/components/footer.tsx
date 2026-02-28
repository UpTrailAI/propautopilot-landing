import Link from "next/link"
import { Separator } from "@/components/ui/separator"

const PRODUCT_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Join Waitlist", href: "/#waitlist" },
] as const

const COMPANY_LINKS = [
  { label: "Contact", href: "mailto:hello@propautopilot.com" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
] as const

function FooterLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
        <span className="text-sm font-bold text-white">P</span>
      </div>
      <span className="text-lg font-bold tracking-tight text-foreground">PropAutopilot</span>
    </Link>
  )
}

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
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
      width="18"
      height="18"
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
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <FooterLogo />
            <p className="text-sm leading-relaxed text-muted-foreground">
              AI-powered property investment platform.<br />
              From strategy to settlement.
            </p>
            <p className="text-sm text-muted-foreground">
              Made in Australia 🇦🇺
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Product</h3>
            <ul className="space-y-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <span className="text-sm text-muted-foreground/50">
                  Blog <span className="text-xs italic">(coming soon)</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Company</h3>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://x.com/propautopilot"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Follow us on X"
              >
                <XIcon />
              </a>
              <a
                href="https://linkedin.com/company/propautopilot"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Follow us on LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 PropAutopilot Pty Ltd. All rights reserved.
          </p>

          <Link
            href="/pitch"
            className="text-xs text-muted-foreground/50 transition-colors hover:text-muted-foreground"
          >
            Investor? See our pitch &rarr;
          </Link>
        </div>
      </div>
    </footer>
  )
}
