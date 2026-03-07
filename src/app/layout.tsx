import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Analytics } from "@/components/Analytics"
import { GoogleTagManager } from "@/components/GoogleTagManager"
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
    "Stop paying buyer's agents $12,500. PropAutopilot automates suburb research, property scoring, cashflow modelling, and deal management for Australian property investors. From $99/mo.",
  metadataBase: new URL("https://propautopilot.com"),
  openGraph: {
    title: "PropAutopilot — Find, Analyse, and Buy Your Next Investment Property",
    description:
      "AI-powered property acquisition platform. 3,847 suburbs scored across 22 factors. Voice AI agent outreach. From $99/mo.",
    url: "https://propautopilot.com",
    siteName: "PropAutopilot",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PropAutopilot — Find, Analyse, and Buy Your Next Investment Property",
    description:
      "AI-powered property acquisition platform. 3,847 suburbs scored. Voice AI agent outreach. From $99/mo.",
  },
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PropAutopilot",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description:
      "AI-powered property investment acquisition platform for Australian investors. Suburb scoring, cashflow modelling, automated CMA, Voice AI agent outreach, and deal pipeline management.",
    url: "https://propautopilot.com",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "99",
      highPrice: "599",
      priceCurrency: "AUD",
      offerCount: "3",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PropAutopilot",
    url: "https://propautopilot.com",
    logo: "https://propautopilot.com/og-image.png",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@propautopilot.com",
      contactType: "customer service",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PropAutopilot",
    url: "https://propautopilot.com",
  },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = JSON.stringify(jsonLd)

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleTagManager position="head" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <GoogleTagManager position="body" />
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
