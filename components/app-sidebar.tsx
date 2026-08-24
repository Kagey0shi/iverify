"use client"

import { Suspense } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpenIcon,
  CreditCardIcon,
  HistoryIcon,
  LayoutDashboardIcon,
  ScanSearchIcon,
  SettingsIcon,
} from "lucide-react"

import { SidebarApiStatus } from "@/components/sidebar-api-status"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const NAV = [
  { title: "Dashboard", href: "/", icon: LayoutDashboardIcon },
  { title: "Verify", href: "/verify", icon: ScanSearchIcon },
  { title: "Verification History", href: "/history", icon: HistoryIcon },
  { title: "Billing", href: "/billing", icon: CreditCardIcon },
  { title: "Settings", href: "/settings", icon: SettingsIcon },
  { title: "API Docs", href: "/docs", icon: BookOpenIcon },
] as const

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex-row items-center justify-between group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-start">
        <SidebarMenu className="w-auto min-w-0 flex-1 group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:flex-none">
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="iVerify"
              render={<Link href="/" />}
            >
              <span className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-heading text-xs font-semibold">
                iV
              </span>
              <span className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">iVerify</span>
                <span className="truncate text-xs text-sidebar-foreground/60">
                  ShrinQ Limited
                </span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarTrigger
          title="Toggle sidebar"
          className="hidden size-8 shrink-0 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground md:flex"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href)
                    }
                    tooltip={item.title}
                    render={<Link href={item.href} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Suspense>
          <SidebarApiStatus />
        </Suspense>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="Acme Payments">
              <Avatar size="sm">
                <AvatarFallback>AP</AvatarFallback>
              </Avatar>
              <span className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Acme Payments</span>
                <span className="truncate text-xs text-sidebar-foreground/60">
                  Local · GHS
                </span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
