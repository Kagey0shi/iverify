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

let current: Environment = "live"
const listeners = new Set<() => void>()

function readStored(): Environment {
  if (typeof window === "undefined") return "live"
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === "live" || stored === "sandbox") return stored
  return "live"
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange)
  return () => listeners.delete(onStoreChange)
}

function getSnapshot() {
  return current
}

function getServerSnapshot(): Environment {
  return "live"
}

function emit(next: Environment) {
  current = next
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, next)
  }
  listeners.forEach((listener) => listener())
}

if (typeof window !== "undefined") {
  current = readStored()
}

export function EnvironmentProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const environment = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )

  const setEnvironment = React.useCallback((next: Environment) => {
    emit(next)
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
