"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import clsx from "clsx"

import { useCurrency, type CurrencyCode } from "./currency-provider"

const CURRENCY_OPTIONS: Array<{
  code: CurrencyCode
  label: string
  flagSrc: string
}> = [
  { code: "USD", label: "United States Dollar", flagSrc: "/flag-us.png" },
  { code: "LKR", label: "Sri Lankan Rupee", flagSrc: "/flag-sri-lanka.png" },
]

interface CurrencySelectorProps {
  align?: "left" | "right"
  buttonSize?: "sm" | "md"
}

export default function CurrencySelector({ align = "right", buttonSize = "md" }: CurrencySelectorProps) {
  const { currency, setCurrency } = useCurrency()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  const selectedOption = useMemo(
    () => CURRENCY_OPTIONS.find((option) => option.code === currency) ?? CURRENCY_OPTIONS[0],
    [currency],
  )

  const handleSelect = (code: CurrencyCode) => {
    setCurrency(code)
    setOpen(false)
  }

  const buttonClass = clsx(
    "flex items-center gap-2 rounded-full border border-border/60 bg-white/95 shadow-sm transition-all duration-200",
    buttonSize === "sm" ? "px-2 py-1.5" : "px-2.5 py-1.5",
    open ? "shadow-xl -translate-y-0.5" : "hover:-translate-y-0.5 hover:shadow-lg",
  )

  const flagSize = buttonSize === "sm" ? 22 : 26

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={buttonClass}
      >
        <img
          src={selectedOption.flagSrc}
          alt={`${selectedOption.label} flag`}
          width={flagSize}
          height={flagSize}
          className="rounded-full border border-border/40 object-cover"
          style={{ width: flagSize, height: flagSize }}
        />
        <ChevronDown
          size={16}
          className={clsx(
            "text-muted-foreground transition-transform duration-200",
            open ? "-rotate-180 -translate-y-[1px]" : "-translate-y-[1px]",
          )}
        />
      </button>

      {open && (
        <div
          className={clsx(
            "absolute z-50 mt-2 w-56 rounded-2xl border border-border/40 bg-white/95 p-2 shadow-2xl backdrop-blur transition-transform duration-200",
            "origin-top",
            align === "right" ? "right-0" : "left-0",
          )}
        >
          <ul role="listbox" className="space-y-1">
            {CURRENCY_OPTIONS.map((option) => (
              <li key={option.code}>
                <button
                  type="button"
                  onClick={() => handleSelect(option.code)}
                  className={clsx(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
                    option.code === currency
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted/70 hover:text-foreground",
                  )}
                >
                  <img
                    src={option.flagSrc}
                    alt={`${option.label} flag`}
                    width={24}
                    height={24}
                    className="h-6 w-6 rounded-full border border-border/40 object-cover"
                  />
                  <div className="flex flex-col text-left">
                    <span>{option.label}</span>
                    <span className="text-xs font-semibold text-muted-foreground">{option.code}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

