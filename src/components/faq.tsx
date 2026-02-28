"use client"

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { SectionWrapper } from "@/components/section-wrapper"
import { ScrollAnimation } from "@/components/scroll-animation"
import { trackEvent } from "@/lib/analytics"

const FAQ_ITEMS = [
  {
    question: "Do I need to have done a property investment course?",
    answer:
      "No. PropAutopilot works for any Australian property investor. But if you’ve done a course, you’ll recognise the methodology — we’ve digitised the workflow used by thousands of successful investors.",
    slug: "investment-course",
  },
  {
    question: "What data sources do you use?",
    answer:
      "We aggregate from CoreLogic, SQM Research, Domain, ABS Census, council planning portals, and state hazard maps. All the sources you’d check manually — in one view.",
    slug: "data-sources",
  },
  {
    question: "Can PropAutopilot actually replace a buyer’s agent?",
    answer:
      "That’s the goal. PropAutopilot gives you the same research, analysis, and deal management tools — at a fraction of the cost. You stay in control of every decision.",
    slug: "replace-ba",
  },
  {
    question: "How does the Voice AI work?",
    answer:
      "Our AI agent calls real estate agents on your behalf to gather intelligence, ask probing questions, and negotiate. You approve every offer. It’s like a tireless junior buyer’s agent. (Coming in a later release.)",
    slug: "voice-ai",
  },
  {
    question: "Is my data secure?",
    answer:
      "All data encrypted at rest and in transit. We never share your financial information. SOC 2 compliance on our roadmap.",
    slug: "data-security",
  },
  {
    question: "What if I’m investing interstate?",
    answer:
      "PropAutopilot is built for remote investing. Research any suburb in Australia, compare across states, manage deals without visiting.",
    slug: "interstate",
  },
  {
    question: "Can I try it before paying?",
    answer: "14-day free trial, no credit card required.",
    slug: "free-trial",
  },
  {
    question: "How is this different from SuburbFinder or InvestorKit?",
    answer:
      "Those tools do suburb research only. PropAutopilot covers the entire workflow — strategy, borrowing power, suburb selection, property scoring, CMA, negotiation, settlement tracking, and portfolio management. One platform, not five subscriptions.",
    slug: "competitors",
  },
  {
    question: "When is PropAutopilot launching?",
    answer:
      "April 1st, 2026. Join the waitlist now to get priority access on launch day and lock in founding member pricing — 50% off for 12 months.",
    slug: "launch-date",
  },
] as const

export function FAQ() {
  return (
    <SectionWrapper id="faq" label="FAQ" heading="Questions? Answers.">
      <ScrollAnimation>
        <Accordion
          type="single"
          collapsible
          className="mx-auto max-w-3xl"
          onValueChange={(value) => {
            if (value) {
              const item = FAQ_ITEMS.find((f) => f.slug === value)
              if (item) {
                trackEvent("faq_expand", { question: item.slug })
              }
            }
          }}
        >
          {FAQ_ITEMS.map((item) => (
            <AccordionItem key={item.slug} value={item.slug}>
              <AccordionTrigger className="text-left text-base">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollAnimation>
    </SectionWrapper>
  )
}
