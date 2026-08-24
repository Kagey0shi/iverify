import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"
import { formatRelative } from "@/lib/format"
import {
  formatResponseTime,
  formatUptimePercent,
  getLiveStatus,
  liveStatusDetail,
  liveStatusLabel,
  liveStatusPipClass,
  summarizeLiveStatus,
} from "@/lib/live-status"
import { cn } from "@/lib/utils"

export function SidebarApiStatusFallback() {
  return (
    <>
      <div className="mx-2 mb-1 flex flex-col gap-2.5 rounded-xl border border-border bg-muted/60 p-3 group-data-[collapsible=icon]:hidden">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-sidebar-foreground">
            API status
          </p>
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
      <div className="hidden items-center justify-center py-2 group-data-[collapsible=icon]:flex">
        <Skeleton className="size-2 rounded-full" />
      </div>
    </>
  )
}

export async function SidebarApiStatus() {
  const live = await getLiveStatus()

  if (!live) {
    return (
      <SidebarStatusFrame
        label="Unavailable"
        detail="Could not reach the live status feed"
        pipClass="bg-muted-foreground/40"
      />
    )
  }

  const summary = summarizeLiveStatus(live)
  const checked = live.lastCheckedAt
    ? formatRelative(live.lastCheckedAt)
    : null

  return (
    <SidebarStatusFrame
      label={liveStatusLabel(live.overallStatus)}
      detail={liveStatusDetail(live)}
      pipClass={liveStatusPipClass(live.overallStatus)}
      stats={
        summary.avgResponseMs !== null && summary.avgUptime24h !== null
          ? [
              {
                label: "Response",
                value: formatResponseTime(summary.avgResponseMs),
              },
              {
                label: "24h",
                value: formatUptimePercent(summary.avgUptime24h),
              },
              {
                label: "Checked",
                value: checked ?? "—",
              },
            ]
          : undefined
      }
    />
  )
}

function SidebarStatusFrame({
  label,
  detail,
  pipClass,
  stats,
}: {
  label: string
  detail: string
  pipClass: string
  stats?: { label: string; value: string }[]
}) {
  const tooltip = stats
    ? `${label} · ${stats.map((stat) => stat.value).join(" · ")}`
    : `${label}: ${detail}`

  return (
    <>
      <div className="mx-2 mb-1 flex flex-col gap-2.5 rounded-xl border border-border bg-muted/60 p-3 group-data-[collapsible=icon]:hidden">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-sidebar-foreground">
            API status
          </p>
          <p className="flex items-center gap-1.5 text-xs text-sidebar-foreground/70">
            <span
              aria-hidden
              className={cn("size-2 shrink-0 rounded-full", pipClass)}
            />
            {label}
          </p>
        </div>
        {label !== "Operational" && label !== "Unavailable" ? (
          <p className="text-xs leading-snug text-sidebar-foreground/50">
            {detail}
          </p>
        ) : null}
        {stats ? (
          <dl className="grid grid-cols-3 gap-1.5">
            {stats.map((stat) => (
              <div key={stat.label} className="flex min-w-0 flex-col gap-0.5">
                <dt className="truncate text-[11px] text-sidebar-foreground/50">
                  {stat.label}
                </dt>
                <dd className="truncate text-sm font-medium tabular-nums text-sidebar-foreground">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="text-xs leading-snug text-sidebar-foreground/50">
            {detail}
          </p>
        )}
      </div>
      <div className="hidden items-center justify-center py-2 group-data-[collapsible=icon]:flex">
        <Tooltip>
          <TooltipTrigger
            className="flex size-8 items-center justify-center rounded-lg"
            aria-label={`API status: ${tooltip}`}
          >
            <span
              aria-hidden
              className={cn("size-2 rounded-full", pipClass)}
            />
          </TooltipTrigger>
          <TooltipContent side="right">{tooltip}</TooltipContent>
        </Tooltip>
      </div>
    </>
  )
}
