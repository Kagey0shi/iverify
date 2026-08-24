import { Badge } from "@/components/ui/badge"
import type { ApiStatus, VerificationOutcome } from "@/lib/types"

export function OutcomeBadge({ outcome }: { outcome: VerificationOutcome }) {
  if (outcome === "match") {
    return <Badge variant="success">Match Found</Badge>
  }
  if (outcome === "no_match") {
    return <Badge variant="secondary">No Match</Badge>
  }
  return <Badge variant="destructive">Error</Badge>
}

export function ApiStatusBadge({ status }: { status: ApiStatus }) {
  if (status === "live") {
    return <Badge variant="success">Live</Badge>
  }
  if (status === "degraded") {
    return <Badge variant="warning">Degraded</Badge>
  }
  return <Badge variant="destructive">Outage</Badge>
}
