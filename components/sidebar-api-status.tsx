"use client"

import { useSearchParams } from "next/navigation"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { apiStatusCopy, parseApiStatus } from "@/lib/mock/dashboard"
import { cn } from "@/lib/utils"

function pipClass(status: ReturnType<typeof parseApiStatus>) {
  if (status === "degraded") return "bg-warning"
  if (status === "outage") return "bg-destructive"
  return "bg-success"
}

export function SidebarApiStatus() {
  const params = useSearchParams()
  const status = parseApiStatus(params.get("status") ?? undefined)
  const copy = apiStatusCopy(status)

  return (
    <>
      <div className="mx-2 mb-1 flex flex-col gap-2 rounded-xl border border-sidebar-border bg-background p-4 group-data-[collapsible=icon]:hidden">
        <p className="text-sm font-semibold text-sidebar-foreground">
          {copy.headline}
        </p>
        <p className="flex items-center gap-2 text-sm text-sidebar-foreground/60">
          <span
            aria-hidden
            className={cn("size-2 shrink-0 rounded-full", pipClass(status))}
          />
          {copy.detail}
        </p>
      </div>
      <div className="hidden items-center justify-center py-2 group-data-[collapsible=icon]:flex">
        <Tooltip>
          <TooltipTrigger
            className="flex size-8 items-center justify-center rounded-lg"
            aria-label={`${copy.headline}: ${copy.detail}`}
          >
            <span
              aria-hidden
              className={cn("size-2 rounded-full", pipClass(status))}
            />
          </TooltipTrigger>
          <TooltipContent side="right">
            {copy.headline}: {copy.detail}
          </TooltipContent>
        </Tooltip>
      </div>
    </>
  )
}
