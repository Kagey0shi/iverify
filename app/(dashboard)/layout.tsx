import type { CSSProperties, ReactNode } from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { EnvironmentProvider } from "@/lib/environment"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <EnvironmentProvider>
      <TooltipProvider>
        <SidebarProvider
          defaultOpen
          style={
            {
              "--sidebar-width-icon": "4.25rem",
            } as CSSProperties
          }
        >
          <AppSidebar />
          <SidebarInset>
            <SiteHeader />
            <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
      <Toaster />
    </EnvironmentProvider>
  )
}
