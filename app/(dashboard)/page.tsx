import type { Metadata } from "next"

import { DashboardHome } from "@/components/dashboard-home"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ empty?: string }>
}) {
  const params = await searchParams

  return <DashboardHome emptyActivity={params.empty === "1"} />
}
