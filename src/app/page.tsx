import { Nav } from "@/components/nav"
import { InvestorBadge } from "@/components/pitch-sections"
import { LandingV2 } from "@/components/landing-v2"
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
      <LandingV2 />
      <Footer />
    </>
  )
}
