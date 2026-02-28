import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Privacy Policy — PropAutopilot",
}

export default function Privacy() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <p><strong>Last updated:</strong> 1 March 2026</p>

          <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
          <p>When you join our waitlist, we collect your email address, whether you identify as a buyer&apos;s agent, the referral source, and your IP address (for rate limiting only).</p>
          <p>When you use PropAutopilot, we collect account information (name, email), financial data you provide (income, expenses, borrowing capacity), property research activity, and usage analytics.</p>

          <h2 className="text-xl font-semibold text-foreground">2. How We Use Your Information</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>To provide and improve PropAutopilot&apos;s services</li>
            <li>To send you product updates and launch notifications</li>
            <li>To calculate suburb scores, property valuations, and financial models</li>
            <li>To prevent abuse and enforce rate limits</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">3. Data Storage & Security</h2>
          <p>Your data is encrypted at rest and in transit. We use industry-standard security practices. Financial data is never shared with third parties. Our infrastructure is hosted in Australia where possible.</p>

          <h2 className="text-xl font-semibold text-foreground">4. Third-Party Services</h2>
          <p>We use the following services to operate PropAutopilot:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li><strong>Vercel</strong> — hosting and analytics</li>
            <li><strong>Upstash</strong> — waitlist data storage</li>
            <li><strong>Resend</strong> — transactional emails</li>
            <li><strong>Stripe</strong> — payment processing</li>
            <li><strong>ElevenLabs</strong> — voice AI (call recordings are not stored)</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">5. Your Rights</h2>
          <p>You can request access to, correction of, or deletion of your personal data at any time by emailing <a href="mailto:privacy@propautopilot.com" className="text-primary hover:underline">privacy@propautopilot.com</a>.</p>

          <h2 className="text-xl font-semibold text-foreground">6. Cookies</h2>
          <p>We use essential cookies for authentication and analytics. No third-party advertising cookies are used.</p>

          <h2 className="text-xl font-semibold text-foreground">7. Changes</h2>
          <p>We may update this policy from time to time. We&apos;ll notify you of significant changes via email.</p>

          <h2 className="text-xl font-semibold text-foreground">8. Contact</h2>
          <p>PropAutopilot Pty Ltd<br />Email: <a href="mailto:privacy@propautopilot.com" className="text-primary hover:underline">privacy@propautopilot.com</a></p>
        </div>
      </main>
      <Footer />
    </>
  )
}
