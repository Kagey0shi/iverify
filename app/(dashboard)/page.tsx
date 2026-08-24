import type { Metadata } from "next"

import { DashboardHome } from "@/components/dashboard-home"
import { parseApiStatus } from "@/lib/mock/dashboard"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; empty?: string }>
}) {
  const params = await searchParams

  return (
    <DashboardHome
      apiStatus={parseApiStatus(params.status)}
      emptyActivity={params.empty === "1"}
    />
  )
}
