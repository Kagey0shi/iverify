import type { ActivityItem, ApiStatus, MethodId } from "@/lib/types"

export const DASHBOARD = {
  periodLabel: "1–24 Aug 2026",
  lastUpdated: "2026-08-24T11:18:00.000Z",
  callsThisMonth: 12847,
  callsLastMonth: 11203,
  successfulMatches: 11742,
  estimatedInvoiceGhs: 18420.5,
  walletBalanceGhs: 8420.75,
  billedCalls: 12847,
  callsDelta: 14.7,
  successDelta: 1.2,
  failedDelta: -8.4,
  invoiceDelta: 9.1,
}

export const VOLUME_WEEK = [
  { label: "Sun", date: "2026-08-23", calls: 980 },
  { label: "Mon", date: "2026-08-24", calls: 1680 },
  { label: "Tue", date: "2026-08-25", calls: 1920 },
  { label: "Wed", date: "2026-08-26", calls: 1840 },
  { label: "Thu", date: "2026-08-27", calls: 2100 },
  { label: "Fri", date: "2026-08-28", calls: 1760 },
  { label: "Sat", date: "2026-08-29", calls: 720 },
]

export const VOLUME_MONTH = [
  { label: "1 Aug", date: "2026-08-01", calls: 280 },
  { label: "2 Aug", date: "2026-08-02", calls: 240 },
  { label: "3 Aug", date: "2026-08-03", calls: 590 },
  { label: "4 Aug", date: "2026-08-04", calls: 630 },
  { label: "5 Aug", date: "2026-08-05", calls: 610 },
  { label: "6 Aug", date: "2026-08-06", calls: 650 },
  { label: "7 Aug", date: "2026-08-07", calls: 500 },
  { label: "8 Aug", date: "2026-08-08", calls: 300 },
  { label: "9 Aug", date: "2026-08-09", calls: 250 },
  { label: "10 Aug", date: "2026-08-10", calls: 630 },
  { label: "11 Aug", date: "2026-08-11", calls: 670 },
  { label: "12 Aug", date: "2026-08-12", calls: 640 },
  { label: "13 Aug", date: "2026-08-13", calls: 690 },
  { label: "14 Aug", date: "2026-08-14", calls: 520 },
  { label: "15 Aug", date: "2026-08-15", calls: 320 },
  { label: "16 Aug", date: "2026-08-16", calls: 260 },
  { label: "17 Aug", date: "2026-08-17", calls: 670 },
  { label: "18 Aug", date: "2026-08-18", calls: 710 },
  { label: "19 Aug", date: "2026-08-19", calls: 680 },
  { label: "20 Aug", date: "2026-08-20", calls: 730 },
  { label: "21 Aug", date: "2026-08-21", calls: 540 },
  { label: "22 Aug", date: "2026-08-22", calls: 400 },
  { label: "23 Aug", date: "2026-08-23", calls: 340 },
  { label: "24 Aug", date: "2026-08-24", calls: 997 },
]

export const METHOD_BREAKDOWN: {
  id: MethodId
  calls: number
}[] = [
  { id: "ghana-card-basic", calls: 4120 },
  { id: "ghana-card-linked", calls: 2100 },
  { id: "ghana-card-biometrics", calls: 1800 },
  { id: "bank-account", calls: 1500 },
  { id: "voter-id", calls: 1400 },
  { id: "passport", calls: 1100 },
  { id: "phone-number", calls: 827 },
]

export const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: "ver_8f2c1a",
    methodId: "ghana-card-basic",
    idSubmitted: "GHA-291847365-1",
    outcome: "match",
    costGhs: 1.5,
    timestamp: "2026-08-24T11:18:00.000Z",
    environment: "live",
  },
  {
    id: "ver_3b91de",
    methodId: "phone-number",
    idSubmitted: "0244123456",
    outcome: "match",
    costGhs: 0.8,
    timestamp: "2026-08-24T11:02:00.000Z",
    environment: "live",
  },
  {
    id: "ver_aa12c0",
    methodId: "ghana-card-biometrics",
    idSubmitted: "GHA-448201937-4",
    outcome: "match",
    costGhs: 5,
    timestamp: "2026-08-24T10:44:00.000Z",
    environment: "live",
  },
  {
    id: "ver_71e904",
    methodId: "bank-account",
    idSubmitted: "001234567890",
    outcome: "no_match",
    costGhs: 1,
    timestamp: "2026-08-24T09:21:00.000Z",
    environment: "live",
  },
  {
    id: "ver_c0d88e",
    methodId: "passport",
    idSubmitted: "G1234567",
    outcome: "error",
    costGhs: 0,
    timestamp: "2026-08-24T08:05:00.000Z",
    environment: "live",
  },
  {
    id: "ver_9d4b21",
    methodId: "voter-id",
    idSubmitted: "1234567890",
    outcome: "match",
    costGhs: 1.5,
    timestamp: "2026-08-24T07:52:00.000Z",
    environment: "live",
  },
  {
    id: "ver_2e77c4",
    methodId: "ghana-card-linked",
    idSubmitted: "GHA-772910384-2",
    outcome: "match",
    costGhs: 2.5,
    timestamp: "2026-08-24T07:31:00.000Z",
    environment: "live",
  },
  {
    id: "ver_b18af6",
    methodId: "phone-number",
    idSubmitted: "0205550188",
    outcome: "match",
    costGhs: 0.8,
    timestamp: "2026-08-24T07:18:00.000Z",
    environment: "live",
  },
  {
    id: "ver_44c901",
    methodId: "ghana-card-basic",
    idSubmitted: "GHA-105938274-6",
    outcome: "no_match",
    costGhs: 1.5,
    timestamp: "2026-08-24T06:55:00.000Z",
    environment: "live",
  },
  {
    id: "ver_e03d17",
    methodId: "bank-account",
    idSubmitted: "204817339021",
    outcome: "match",
    costGhs: 1,
    timestamp: "2026-08-24T06:40:00.000Z",
    environment: "live",
  },
  {
    id: "ver_6a8f32",
    methodId: "ghana-card-biometrics",
    idSubmitted: "GHA-661029384-8",
    outcome: "match",
    costGhs: 5,
    timestamp: "2026-08-24T06:12:00.000Z",
    environment: "live",
  },
  {
    id: "ver_f19c80",
    methodId: "passport",
    idSubmitted: "H8472916",
    outcome: "match",
    costGhs: 2,
    timestamp: "2026-08-24T05:48:00.000Z",
    environment: "live",
  },
  {
    id: "ver_0c55ae",
    methodId: "voter-id",
    idSubmitted: "8472910365",
    outcome: "error",
    costGhs: 0,
    timestamp: "2026-08-24T05:22:00.000Z",
    environment: "live",
  },
  {
    id: "ver_d7b263",
    methodId: "ghana-card-linked",
    idSubmitted: "GHA-330184726-5",
    outcome: "match",
    costGhs: 2.5,
    timestamp: "2026-08-24T04:57:00.000Z",
    environment: "live",
  },
  {
    id: "ver_5e1d94",
    methodId: "phone-number",
    idSubmitted: "0547891234",
    outcome: "match",
    costGhs: 0.8,
    timestamp: "2026-08-24T04:31:00.000Z",
    environment: "live",
  },
]

export function parseApiStatus(value: string | string[] | undefined): ApiStatus {
  const raw = Array.isArray(value) ? value[0] : value
  if (raw === "degraded" || raw === "outage" || raw === "live") return raw
  return "live"
}

export function apiStatusCopy(status: ApiStatus) {
  if (status === "live") {
    return {
      headline: "API status",
      detail: "All systems operational",
      alertTitle: "All Ghana endpoints responding",
      alertDescription: "Verification calls are routing normally.",
    }
  }
  if (status === "degraded") {
    return {
      headline: "API status",
      detail: "Elevated latency",
      alertTitle: "Elevated latency on Ghana Card",
      alertDescription: "Calls may take longer. Results are still being returned.",
    }
  }
  return {
    headline: "API status",
    detail: "Ghana endpoints down",
    alertTitle: "Ghana verification is unavailable",
    alertDescription: "Do not submit live checks until the outage clears.",
  }
}

const GHANA_ID_METHODS: MethodId[] = [
  "ghana-card-basic",
  "ghana-card-linked",
  "ghana-card-biometrics",
  "voter-id",
  "passport",
]

const ALL_METHODS: MethodId[] = [
  ...GHANA_ID_METHODS,
  "bank-account",
  "phone-number",
]

export function methodApiStatuses(status: ApiStatus): Record<MethodId, ApiStatus> {
  if (status === "live") {
    return Object.fromEntries(ALL_METHODS.map((id) => [id, "live"])) as Record<
      MethodId,
      ApiStatus
    >
  }

  if (status === "degraded") {
    return Object.fromEntries(
      ALL_METHODS.map((id) => [
        id,
        id.startsWith("ghana-card") ? "degraded" : "live",
      ])
    ) as Record<MethodId, ApiStatus>
  }

  return Object.fromEntries(
    ALL_METHODS.map((id) => [
      id,
      GHANA_ID_METHODS.includes(id) ? "outage" : "live",
    ])
  ) as Record<MethodId, ApiStatus>
}


