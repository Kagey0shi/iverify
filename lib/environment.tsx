"use client"

import * as React from "react"

import type { Environment } from "@/lib/types"

const STORAGE_KEY = "iverify.environment"

type EnvironmentContextValue = {
  environment: Environment
  setEnvironment: (environment: Environment) => void
}

const EnvironmentContext = React.createContext<EnvironmentContextValue | null>(
  null
)

function readStored(): Environment {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === "live" || stored === "sandbox") return stored
  return "live"
}

export function EnvironmentProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [environment, setEnvironmentState] =
    React.useState<Environment>("live")

  React.useEffect(() => {
    setEnvironmentState(readStored())

    function onStorage(event: StorageEvent) {
      if (event.key !== STORAGE_KEY) return
      if (event.newValue === "live" || event.newValue === "sandbox") {
        setEnvironmentState(event.newValue)
      }
    }

    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const setEnvironment = React.useCallback((next: Environment) => {
    setEnvironmentState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const value = React.useMemo(
    () => ({ environment, setEnvironment }),
    [environment, setEnvironment]
  )

  return (
    <EnvironmentContext.Provider value={value}>
      {children}
    </EnvironmentContext.Provider>
  )
}

export function useEnvironment() {
  const context = React.useContext(EnvironmentContext)
  if (!context) {
    throw new Error("useEnvironment must be used within EnvironmentProvider")
  }
  return context
}
