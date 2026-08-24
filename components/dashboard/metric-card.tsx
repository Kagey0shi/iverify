import { ArrowDownIcon, ArrowUpIcon, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export function MetricCard({
  icon: Icon,
  label,
  value,
  hint = "vs last month",
  delta,
  improvement,
}: {
  icon: LucideIcon
  label: string
  value: string
  hint?: string
  delta?: number
  improvement?: boolean
}) {
  const deltaIsGood =
    improvement ?? (typeof delta === "number" ? delta >= 0 : undefined)
  const isUp = typeof delta === "number" && delta >= 0
  const Arrow = isUp ? ArrowUpIcon : ArrowDownIcon

  return (
    <article
      className={cn(
        "flex flex-col border-border",
        "max-sm:not-last:border-b",
        "sm:max-lg:[&:nth-child(-n+2)]:border-b sm:max-lg:odd:border-r",
        "lg:not-last:border-r"
      )}
    >
      <div className="flex flex-1 items-start gap-3 px-5 py-5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-card text-foreground [&_svg]:size-4">
          <Icon />
        </span>
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="truncate text-sm text-muted-foreground">{label}</p>
          <p className="font-heading text-2xl font-semibold tracking-tight whitespace-nowrap tabular-nums">
            {value}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 border-t px-5 py-2.5 text-xs">
        {typeof delta === "number" ? (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-medium tabular-nums",
              deltaIsGood ? "text-success" : "text-destructive"
            )}
          >
            <Arrow className="size-3" strokeWidth={2.5} />
            {delta >= 0 ? "+" : ""}
            {delta.toFixed(1)}%
          </span>
        ) : null}
        {hint ? (
          <span className="text-muted-foreground">{hint}</span>
        ) : null}
      </div>
    </article>
  )
}
