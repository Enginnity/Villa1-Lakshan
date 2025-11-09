import { NextResponse } from "next/server"

type Provider = {
  name: string
  url: string
  parse: (payload: unknown) => number | null
}

const PROVIDERS: Provider[] = [
  {
    name: "exchangerate-host",
    url: "https://api.exchangerate.host/latest?base=USD&symbols=LKR",
    parse: (payload) => {
      if (typeof payload !== "object" || payload === null) return null
      const rate = (payload as { rates?: Record<string, number> }).rates?.["LKR"]
      return typeof rate === "number" && rate > 0 ? rate : null
    },
  },
  {
    name: "exchange-rate-api",
    url: "https://open.er-api.com/v6/latest/USD",
    parse: (payload) => {
      if (typeof payload !== "object" || payload === null) return null
      const body = payload as { result?: string; rates?: Record<string, number> }
      if (body.result !== "success") return null
      const rate = body.rates?.["LKR"]
      return typeof rate === "number" && rate > 0 ? rate : null
    },
  },
  {
    name: "fawazahmed-currency",
    url: "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/lkr.json",
    parse: (payload) => {
      if (typeof payload !== "object" || payload === null) return null
      const rate = (payload as { lkr?: number }).lkr
      return typeof rate === "number" && rate > 0 ? rate : null
    },
  },
]

export const dynamic = "force-dynamic"

export async function GET() {
  for (const provider of PROVIDERS) {
    try {
      const response = await fetch(provider.url, {
        cache: "no-store",
        headers: { accept: "application/json" },
      })

      if (!response.ok) {
        continue
      }

      const payload = await response.json()
      const rate = provider.parse(payload)

      if (rate) {
        return NextResponse.json({
          rate,
          source: provider.name,
          fetchedAt: new Date().toISOString(),
        })
      }
    } catch (error) {
      console.warn("Exchange rate provider failed", provider.name, error)
    }
  }

  return NextResponse.json({
    rate: 330,
    source: "fallback",
    stale: true,
    fetchedAt: new Date().toISOString(),
    message: "Returned predefined fallback rate.",
  })
}

