import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { Problem } from "@/components/problem"
import { HowItWorks } from "@/components/how-it-works"
import { Features } from "@/components/features"
import { PitchSections, InvestorBadge } from "@/components/pitch-sections"
import { Comparison } from "@/components/comparison"
import { Pricing } from "@/components/pricing"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { WaitlistSection } from "@/components/waitlist-section"
import { Footer } from "@/components/footer"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const isPitch = params.pitch === "true"

  return (
    <>
      {isPitch && <InvestorBadge />}
      <Nav />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        {isPitch && <PitchSections />}
        <Comparison />
        <Pricing />
        <Testimonials />
        <FAQ />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  )
}
