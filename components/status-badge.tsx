import { Badge } from "@/components/ui/badge"
import type { LiveServiceStatus } from "@/lib/live-status"
import { liveStatusLabel } from "@/lib/live-status"
import type { ApiStatus, VerificationOutcome } from "@/lib/types"

export function OutcomeBadge({ outcome }: { outcome: VerificationOutcome }) {
  if (outcome === "match") {
    return <Badge variant="success">Match Found</Badge>
  }
  if (outcome === "no_match") {
    return <Badge variant="warning">No Match</Badge>
  }
  return <Badge variant="destructive">Error</Badge>
}

export function LiveStatusBadge({
  status,
}: {
  status: LiveServiceStatus | null
}) {
  if (!status) {
    return <Badge variant="outline">Unavailable</Badge>
  }
  if (status === "operational") {
    return <Badge variant="success">{liveStatusLabel(status)}</Badge>
  }
  if (status === "degraded") {
    return <Badge variant="warning">{liveStatusLabel(status)}</Badge>
  }
  return <Badge variant="destructive">{liveStatusLabel(status)}</Badge>
}

export function ApiStatusBadge({ status }: { status: ApiStatus }) {
  const mapped: LiveServiceStatus =
    status === "live" ? "operational" : status === "outage" ? "down" : "degraded"
  return <LiveStatusBadge status={mapped} />
}
