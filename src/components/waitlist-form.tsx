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
      <div className="text-center py-2">
        <p className="text-2xl mb-2">Nice one.</p>
        {position && (
          <p className="text-sm text-neutral-500">
            You&apos;re number <span className="font-mono font-semibold text-neutral-900">#{position}</span> on the list.
          </p>
        )}
        <p className="text-sm text-neutral-400 mt-2">
          We&apos;ll email you when early access opens.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <Input
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError("")
          }}
          className="h-11 rounded-lg border-neutral-200 bg-white text-sm placeholder:text-neutral-400 focus-visible:ring-neutral-900"
          aria-label="Email address"
          disabled={state === "loading"}
        />
        <Button
          type="submit"
          className="h-11 shrink-0 rounded-lg bg-neutral-900 px-5 text-sm font-medium text-white hover:bg-neutral-800 sm:w-auto"
          disabled={state === "loading"}
          aria-label="Join the waitlist"
        >
          {state === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Joining...
            </>
          ) : (
            <>Join waitlist &rarr;</>
          )}
        </Button>
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-500">
        <input
          type="checkbox"
          checked={isAdvisor}
          onChange={(e) => setIsAdvisor(e.target.checked)}
          className="size-4 rounded border-neutral-300 accent-neutral-900"
          disabled={state === "loading"}
        />
        I&apos;m a buyer&apos;s agent or advisor
      </label>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}
