import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Analytics } from "@/components/Analytics"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "PropAutopilot — AI-Powered Property Investment Platform | Australia",
  description:
    "Stop paying buyer's agents $15,000. PropAutopilot automates suburb research, property scoring, cashflow modelling, and deal management for Australian property investors. From $99/mo.",
  metadataBase: new URL("https://propautopilot.com"),
  openGraph: {
    title: "PropAutopilot — Build Your Property Portfolio Smarter",
    description:
      "AI-powered property acquisition platform. 3,800+ suburbs scored. From $99/mo.",
    url: "https://propautopilot.com",
    siteName: "PropAutopilot",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PropAutopilot — Build Your Property Portfolio Smarter",
    description:
      "AI-powered property acquisition platform. 3,800+ suburbs scored. From $99/mo.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PropAutopilot",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description:
    "AI-powered property investment acquisition platform for Australian investors",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "99",
    highPrice: "249",
    priceCurrency: "AUD",
    offerCount: "3",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
