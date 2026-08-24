"use client"

import type { ReactNode } from "react"
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

export function AppSidebar({ apiStatus }: { apiStatus: ReactNode }) {
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
          className="hidden size-8 shrink-0 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground md:flex"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3">
              {NAV.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href)

                return (
                  <SidebarMenuItem
                    key={item.href}
                    className="-mr-2 group-data-[collapsible=icon]:mr-0"
                  >
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.title}
                      render={<Link href={item.href} />}
                      className="rounded-l-lg rounded-r-none text-muted-foreground hover:bg-primary/5 hover:text-foreground active:bg-primary/10 data-active:bg-primary/10 data-active:font-medium data-active:text-primary data-active:hover:bg-primary/10 data-active:hover:text-primary"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    {isActive ? (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 right-0 w-1 rounded-l-full bg-primary group-data-[collapsible=icon]:hidden"
                      />
                    ) : null}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {apiStatus}
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
