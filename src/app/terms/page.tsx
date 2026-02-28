import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Terms of Service — PropAutopilot",
}

export default function Terms() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">Terms of Service</h1>
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <p><strong>Last updated:</strong> 1 March 2026</p>

          <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p>By accessing or using PropAutopilot, you agree to be bound by these Terms of Service. If you do not agree, do not use the service.</p>

          <h2 className="text-xl font-semibold text-foreground">2. Service Description</h2>
          <p>PropAutopilot is a property investment research and management platform. We provide suburb scoring, property analysis, cashflow modelling, deal pipeline management, and AI-assisted voice calling tools.</p>

          <h2 className="text-xl font-semibold text-foreground">3. Not Financial Advice</h2>
          <p><strong>PropAutopilot does not provide financial, legal, or investment advice.</strong> All data, scores, and analysis are for informational purposes only. You should consult a qualified financial advisor, accountant, or solicitor before making any investment decisions. We are not a licensed financial services provider.</p>

          <h2 className="text-xl font-semibold text-foreground">4. Account Responsibilities</h2>
          <p>You are responsible for maintaining the security of your account credentials. You must provide accurate information and keep it up to date. You may not share your account with others.</p>

          <h2 className="text-xl font-semibold text-foreground">5. Subscriptions & Billing</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Subscriptions are billed monthly or annually via Stripe</li>
            <li>You can cancel at any time — access continues until the end of the billing period</li>
            <li>Refunds are handled on a case-by-case basis</li>
            <li>Voice minute top-ups do not expire</li>
            <li>Prices are in AUD and may change with 30 days&apos; notice</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">6. Acceptable Use</h2>
          <p>You may not use PropAutopilot to: scrape or resell data, harass real estate agents via the voice AI, misrepresent your identity, or violate any applicable laws including the Australian Consumer Law and ACMA telemarketing rules.</p>

          <h2 className="text-xl font-semibold text-foreground">7. Data Accuracy</h2>
          <p>We source data from third-party providers including CoreLogic, PropTrack, ABS, and others. While we strive for accuracy, we do not guarantee the completeness or accuracy of any data. Always verify critical information independently.</p>

          <h2 className="text-xl font-semibold text-foreground">8. Limitation of Liability</h2>
          <p>To the maximum extent permitted by Australian law, PropAutopilot Pty Ltd is not liable for any indirect, incidental, or consequential damages arising from your use of the service, including investment losses.</p>

          <h2 className="text-xl font-semibold text-foreground">9. Termination</h2>
          <p>We may suspend or terminate your account if you violate these terms. You may delete your account at any time by contacting us.</p>

          <h2 className="text-xl font-semibold text-foreground">10. Governing Law</h2>
          <p>These terms are governed by the laws of New South Wales, Australia.</p>

          <h2 className="text-xl font-semibold text-foreground">11. Contact</h2>
          <p>PropAutopilot Pty Ltd<br />Email: <a href="mailto:hello@propautopilot.com" className="text-primary hover:underline">hello@propautopilot.com</a></p>
        </div>
      </main>
      <Footer />
    </>
  )
}
