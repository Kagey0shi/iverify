import { LiveStatusBadge } from "@/components/status-badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatRelative, formatTimestamp } from "@/lib/format"
import {
  formatResponseTime,
  formatUptimePercent,
  getLiveStatus,
  liveStatusPipClass,
  sortLiveServices,
  type LiveService,
} from "@/lib/live-status"
import { cn } from "@/lib/utils"

export function MethodStatusFallback() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>API status</CardTitle>
        <CardDescription>Live endpoint health</CardDescription>
        <CardAction>
          <Skeleton className="h-5 w-24 rounded-full" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col">
          {Array.from({ length: 6 }).map((_, index) => (
            <li
              key={index}
              className="flex items-center justify-between gap-3 border-t py-3 first:border-t-0 first:pt-0"
            >
              <div className="flex min-w-0 flex-col gap-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-52" />
              </div>
              <Skeleton className="h-5 w-20 rounded-full" />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export async function MethodStatus() {
  const live = await getLiveStatus()

  if (!live) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>API status</CardTitle>
          <CardDescription>Live endpoint health</CardDescription>
          <CardAction>
            <LiveStatusBadge status={null} />
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Could not reach the live status feed.
          </p>
        </CardContent>
      </Card>
    )
  }

  const services = sortLiveServices(live.services)
  const checked = live.lastCheckedAt
    ? formatRelative(live.lastCheckedAt)
    : null

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>API status</CardTitle>
        <CardDescription>
          Live endpoint health
          {checked ? ` · Checked ${checked}` : null}
        </CardDescription>
        <CardAction>
          <LiveStatusBadge status={live.overallStatus} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col">
          {services.map((service) => (
            <ServiceRow key={service.slug} service={service} />
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function ServiceRow({ service }: { service: LiveService }) {
  const checkedLabel = service.checkedAt
    ? formatRelative(service.checkedAt)
    : "—"
  const checkedExact = service.checkedAt
    ? formatTimestamp(service.checkedAt)
    : undefined

  return (
    <li className="flex items-start justify-between gap-3 border-t py-3 first:border-t-0 first:pt-0 last:pb-0">
      <span className="flex min-w-0 items-start gap-2">
        <span
          aria-hidden
          className={cn(
            "mt-1.5 size-2 shrink-0 rounded-full",
            liveStatusPipClass(service.status)
          )}
        />
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium">
            {service.name}
          </span>
          <span
            className="mt-0.5 flex flex-wrap gap-x-1.5 text-xs text-muted-foreground tabular-nums"
            title={checkedExact}
          >
            <span>{formatResponseTime(service.responseTimeMs)}</span>
            <span aria-hidden>·</span>
            <span className={cn(service.status === "down" && "text-destructive")}>
              {formatUptimePercent(service.uptime24h)} 24h
            </span>
            <span aria-hidden>·</span>
            <span>{checkedLabel}</span>
          </span>
        </span>
      </span>
      <LiveStatusBadge status={service.status} />
    </li>
  )
}
