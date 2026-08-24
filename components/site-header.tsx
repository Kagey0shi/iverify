"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { EnvironmentSeal } from "@/components/environment-seal"

export function SiteHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 px-6">
      <SidebarTrigger className="md:hidden" />
      <Separator orientation="vertical" className="h-5 md:hidden" />
      <div className="flex min-w-0 flex-1 items-center justify-end">
        <EnvironmentSeal />
      </div>
    </header>
  )
}
