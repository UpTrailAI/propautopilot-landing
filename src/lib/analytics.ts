/* eslint-disable @typescript-eslint/no-explicit-any */
export function trackEvent(name: string, properties?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && (window as any).va) {
    const va = (window as any).va as (type: string, data: Record<string, string | number>) => void
    va('event', { name, ...properties })
  }
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', name, properties)
  }
}
