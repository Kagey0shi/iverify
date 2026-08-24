import type { CSSProperties, ReactNode } from "react"
import { Suspense } from "react"

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarApiStatus,
  SidebarApiStatusFallback,
} from "@/components/sidebar-api-status"
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
          <AppSidebar
            apiStatus={
              <Suspense fallback={<SidebarApiStatusFallback />}>
                <SidebarApiStatus />
              </Suspense>
            }
          />
          <SidebarInset className="h-svh overflow-hidden">
            <SiteHeader />
            <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
      <Toaster />
    </EnvironmentProvider>
  )
}
