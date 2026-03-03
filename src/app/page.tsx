import { InvestorBadge } from "@/components/pitch-sections"
import { LandingV2 } from "@/components/landing-v2"

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
      <LandingV2 />
    </>
  )
}
