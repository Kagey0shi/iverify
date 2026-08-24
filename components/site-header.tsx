"use client"

import { SearchIcon} from "lucide-react"

import { EnvironmentSeal } from "@/components/environment-seal"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { formatGhs } from "@/lib/format"
import { DASHBOARD } from "@/lib/mock/dashboard"

export function SiteHeader() {
  return (
    <header
      data-slot="site-header"
      className="z-20 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background px-4 md:px-6"
    >
      <SidebarTrigger className="md:hidden" />
      <Separator orientation="vertical" className="h-5 md:hidden" />
      <label className="relative flex h-10 w-full max-w-[16.5rem] min-w-0 sm:max-w-xs">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Quick search"
          aria-label="Quick search"
          className="h-full w-full rounded-xl border-0 bg-card pr-3 pl-9 text-sm shadow-none ring-1 ring-border outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
        />
      </label>
      <div className="ml-auto flex shrink-0 items-center gap-2">
        <EnvironmentSeal />
        <div className="flex h-10 items-center gap-2 rounded-lg bg-card px-3 ring-1 ring-border">
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="text-[11px] text-muted-foreground">Wallet</span>
            <span className="text-sm font-medium tabular-nums">
              {formatGhs(DASHBOARD.walletBalanceGhs)}
            </span>
          </span>
        </div>
        <div className="hidden h-10 items-center gap-2 rounded-lg bg-card px-2.5 ring-1 ring-border xl:flex">
          <Avatar size="sm">
            <AvatarFallback>AP</AvatarFallback>
          </Avatar>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-sm font-medium">Acme Payments</span>
            <span className="truncate text-[11px] text-muted-foreground">
              ops@acmepayments.com
            </span>
          </span>
        </div>
      </div>
    </header>
  )
}
