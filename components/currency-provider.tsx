"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

export type CurrencyCode = "USD" | "LKR"

interface CurrencyContextValue {
  currency: CurrencyCode
  rate: number
  isLoading: boolean
  error: string | null
  lastUpdated: Date | null
  isStale: boolean
  setCurrency: (currency: CurrencyCode) => void
  toggleCurrency: () => void
  formatPrice: (usdAmount: number, options?: { withCode?: boolean }) => string
  convertToLKR: (usdAmount: number) => number
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined)

const STORAGE_KEYS = {
  currency: "sunset-villa-currency",
  rate: "sunset-villa-rate",
  updated: "sunset-villa-rate-updated",
}

const FALLBACK_RATE = 330
const REFRESH_INTERVAL = 60 * 60 * 1000 // 1 hour
const INTERNAL_ENDPOINT = "/api/exchange-rate"

interface CurrencyProviderProps {
  children: React.ReactNode
}

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [currency, setCurrency] = useState<CurrencyCode>("USD")
  const [rate, setRate] = useState<number>(FALLBACK_RATE)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isStale, setIsStale] = useState<boolean>(false)

  useEffect(() => {
    const preferred = window.localStorage.getItem(STORAGE_KEYS.currency)
    if (preferred === "USD" || preferred === "LKR") {
      setCurrency(preferred)
    }

    const storedRate = window.localStorage.getItem(STORAGE_KEYS.rate)
    const storedUpdated = window.localStorage.getItem(STORAGE_KEYS.updated)
    if (storedRate) {
      const parsed = Number(storedRate)
      if (!Number.isNaN(parsed) && parsed > 0) {
        setRate(parsed)
      }
    }
    if (storedUpdated) {
      const parsed = new Date(storedUpdated)
      if (!Number.isNaN(parsed.valueOf())) {
        setLastUpdated(parsed)
      }
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    let intervalId: number | undefined

    const fetchRate = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(INTERNAL_ENDPOINT, { cache: "no-store" })
        if (!response.ok) {
          throw new Error(`Exchange rate API returned ${response.status}`)
        }
        const data = (await response.json()) as { rate?: number; fetchedAt?: string; stale?: boolean }
        const fetchedRate = typeof data.rate === "number" && data.rate > 0 ? data.rate : null

        if (fetchedRate && isMounted) {
          setRate(fetchedRate)
          const updated = data.fetchedAt ? new Date(data.fetchedAt) : new Date()
          setLastUpdated(updated)
          setIsStale(Boolean(data.stale))
          window.localStorage.setItem(STORAGE_KEYS.rate, String(fetchedRate))
          window.localStorage.setItem(STORAGE_KEYS.updated, updated.toISOString())
          setError(null)
          return
        }

        if (isMounted) {
          throw new Error("Invalid exchange rate payload")
        }
      } catch (err) {
        console.error(err)
        if (isMounted) {
          const storedRate = window.localStorage.getItem(STORAGE_KEYS.rate)
          setIsStale(true)
          if (!storedRate) {
            setError("Live exchange rate unavailable. Showing recent rate.")
          } else {
            setError(null)
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchRate()
    intervalId = window.setInterval(fetchRate, REFRESH_INTERVAL)

    return () => {
      isMounted = false
      if (intervalId) {
        window.clearInterval(intervalId)
      }
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.currency, currency)
  }, [currency])

  const toggleCurrency = () => {
    setCurrency((current) => (current === "USD" ? "LKR" : "USD"))
  }

  const convertToLKR = (usdAmount: number) => Math.round(usdAmount * rate)

  const formatPrice = (usdAmount: number, options?: { withCode?: boolean }) => {
    if (currency === "USD") {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(usdAmount)
      if (options?.withCode) {
        return `USD ${formatted.replace("$", "").trim()}`
      }
      return formatted
    }

    const lkrValue = convertToLKR(usdAmount)
    const formatted = new Intl.NumberFormat("en-LK", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(lkrValue)
    return options?.withCode ? `LKR ${formatted}` : `Rs ${formatted}`
  }

  const contextValue = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      rate,
      isLoading,
      error,
      lastUpdated,
      isStale,
      setCurrency,
      toggleCurrency,
      formatPrice,
      convertToLKR,
    }),
    [currency, rate, isLoading, error, lastUpdated, isStale],
  )

  return <CurrencyContext.Provider value={contextValue}>{children}</CurrencyContext.Provider>
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}

