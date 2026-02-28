"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { trackEvent } from "@/lib/analytics"

type FormState = "idle" | "loading" | "success" | "error"

function getRefParam(): string {
  if (typeof window === "undefined") return "direct"
  const params = new URLSearchParams(window.location.search)
  return params.get("ref") || "direct"
}

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [isAdvisor, setIsAdvisor] = useState(false)
  const [state, setState] = useState<FormState>("idle")
  const [position, setPosition] = useState<number | null>(null)
  const [error, setError] = useState("")
  const [source, setSource] = useState("direct")

  useEffect(() => {
    setSource(getRefParam())
  }, [])

  function validateEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }

    setState("loading")
    trackEvent("waitlist_submit", { location: "cta_section" })

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          isAdvisor,
          source,
          referrer: typeof document !== "undefined" ? document.referrer : "",
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.")
        setState("error")
        return
      }

      setPosition(data.position)
      setState("success")
      trackEvent("waitlist_success", { position: data.position })
    } catch {
      setError("Network error. Please try again.")
      setState("error")
    }
  }

  if (state === "success") {
    return (
      <div className="text-center">
        <div className="mb-2 text-4xl">&#x2705;</div>
        <h3 className="mb-1 text-2xl font-bold">You&apos;re on the list!</h3>
        {position && (
          <p className="mb-2 text-lg text-muted-foreground">
            You&apos;re <span className="font-mono font-bold text-primary">#{position}</span> on
            the waitlist
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          We&apos;ll email you when early access opens on April 1st.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError("")
          }}
          className="h-12 rounded-xl"
          aria-label="Email address"
          disabled={state === "loading"}
        />
        <Button
          type="submit"
          className="h-12 shrink-0 rounded-xl px-6 font-semibold shadow-lg shadow-primary/25 sm:w-auto"
          disabled={state === "loading"}
          aria-label="Join the waitlist"
        >
          {state === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Joining...
            </>
          ) : (
            "Join Waitlist \u2192"
          )}
        </Button>
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
        <input
          type="checkbox"
          checked={isAdvisor}
          onChange={(e) => setIsAdvisor(e.target.checked)}
          className="size-4 rounded border-border accent-primary"
          disabled={state === "loading"}
        />
        I&apos;m a buyer&apos;s agent or property advisor
      </label>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}
