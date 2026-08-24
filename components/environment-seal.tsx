"use client"

import { useEnvironment } from "@/lib/environment"
import { cn } from "@/lib/utils"

export function EnvironmentSeal() {
  const { environment, setEnvironment } = useEnvironment()
  const isSandbox = environment === "sandbox"

  return (
    <div
      className="flex h-10 items-center border-1 rounded-full bg-muted p-1"
      aria-label={`Current environment: ${environment}`}
    >
      <button
        type="button"
        aria-pressed={!isSandbox}
        onClick={() => setEnvironment("live")}
        className={cn(
          "rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide uppercase transition-colors",
          !isSandbox
            ? "bg-success text-white shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Live
      </button>
      <button
        type="button"
        aria-pressed={isSandbox}
        onClick={() => setEnvironment("sandbox")}
        className={cn(
          "rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide uppercase transition-colors",
          isSandbox
            ? "bg-warning text-white shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Sandbox
      </button>
    </div>
  )
}
