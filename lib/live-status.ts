import { cache } from "react"

export const LIVE_STATUS_JSON_URL =
  "https://iverify.shrinqghana.com/status.json"

export type LiveServiceStatus = "operational" | "degraded" | "down"

export type LiveService = {
  slug: string
  name: string
  description: string
  method: string
  path: string
  status: LiveServiceStatus
  responseTimeMs: number
  httpStatusCode: number | null
  checkedAt: string
  uptime24h: number
}

export type LiveStatus = {
  overallStatus: LiveServiceStatus
  lastCheckedAt: string
  generatedAt: string
  services: LiveService[]
}

const STATUS_VALUES = new Set<LiveServiceStatus>([
  "operational",
  "degraded",
  "down",
])

function asStatus(value: unknown): LiveServiceStatus | null {
  if (typeof value === "string" && STATUS_VALUES.has(value as LiveServiceStatus)) {
    return value as LiveServiceStatus
  }
  return null
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : ""
}

function parseService(raw: unknown): LiveService | null {
  if (!raw || typeof raw !== "object") return null
  const row = raw as Record<string, unknown>
  const status = asStatus(row.status)
  const slug = asString(row.slug)
  if (!status || !slug) return null

  return {
    slug,
    name: asString(row.name) || slug,
    description: asString(row.description),
    method: asString(row.method),
    path: asString(row.path),
    status,
    responseTimeMs: asNumber(row.response_time_ms) ?? 0,
    httpStatusCode: asNumber(row.http_status_code),
    checkedAt: asString(row.checked_at),
    uptime24h: asNumber(row.uptime_24h) ?? 0,
  }
}

function deriveOverall(services: LiveService[]): LiveServiceStatus {
  if (services.some((service) => service.status === "down")) return "down"
  if (services.some((service) => service.status === "degraded")) return "degraded"
  return "operational"
}

export function parseLiveStatus(raw: unknown): LiveStatus | null {
  if (!raw || typeof raw !== "object") return null
  const payload = raw as Record<string, unknown>
  const services = Array.isArray(payload.services)
    ? payload.services
        .map(parseService)
        .filter((service): service is LiveService => service !== null)
    : []

  const generatedAt = asString(payload.generated_at)
  const lastCheckedAt =
    asString(payload.last_checked_at) ||
    services[0]?.checkedAt ||
    generatedAt

  if (!lastCheckedAt && services.length === 0) return null

  return {
    overallStatus: asStatus(payload.overall_status) ?? deriveOverall(services),
    lastCheckedAt,
    generatedAt,
    services,
  }
}

export const getLiveStatus = cache(async (): Promise<LiveStatus | null> => {
  try {
    const response = await fetch(LIVE_STATUS_JSON_URL, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(8_000),
    })
    if (!response.ok) return null
    return parseLiveStatus(await response.json())
  } catch {
    return null
  }
})

export function liveStatusLabel(status: LiveServiceStatus) {
  if (status === "operational") return "Operational"
  if (status === "degraded") return "Degraded"
  return "Down"
}

export function liveStatusPipClass(status: LiveServiceStatus) {
  if (status === "degraded") return "bg-warning"
  if (status === "down") return "bg-destructive"
  return "bg-success"
}

export function liveStatusDetail(status: LiveStatus) {
  const affected = status.services.filter(
    (service) => service.status !== "operational"
  )
  if (status.overallStatus === "operational" || affected.length === 0) {
    return "All systems operational"
  }
  if (affected.length === 1) {
    return `${affected[0].name} is ${liveStatusLabel(affected[0].status).toLowerCase()}`
  }
  return `${affected.length} endpoints experiencing issues`
}

export function summarizeLiveStatus(status: LiveStatus) {
  const count = status.services.length
  if (count === 0) {
    return {
      avgResponseMs: null as number | null,
      avgUptime24h: null as number | null,
      lastCheckedAt: status.lastCheckedAt,
    }
  }

  return {
    avgResponseMs:
      status.services.reduce((sum, service) => sum + service.responseTimeMs, 0) /
      count,
    avgUptime24h:
      status.services.reduce((sum, service) => sum + service.uptime24h, 0) / count,
    lastCheckedAt: status.lastCheckedAt,
  }
}

const STATUS_RANK: Record<LiveServiceStatus, number> = {
  down: 0,
  degraded: 1,
  operational: 2,
}

export function sortLiveServices(services: LiveService[]) {
  return [...services].sort(
    (a, b) => STATUS_RANK[a.status] - STATUS_RANK[b.status]
  )
}

export function formatResponseTime(ms: number) {
  if (ms >= 1000) return `${(ms / 1000).toFixed(1)}s`
  return `${Math.round(ms)}ms`
}

export function formatUptimePercent(value: number) {
  const rounded = Math.round(value * 100) / 100
  return `${rounded}%`
}
