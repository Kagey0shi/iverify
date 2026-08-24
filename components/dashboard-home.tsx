import Link from "next/link"
import {
  ArrowUpRightIcon,
  BanknoteIcon,
  PhoneCallIcon,
  RefreshCwIcon,
  ShieldCheckIcon,
  ShieldXIcon,
  TargetIcon,
} from "lucide-react"

import { ActivityPanel } from "@/components/dashboard/activity-panel"
import { MethodMix } from "@/components/dashboard/method-mix"
import { MethodStatus } from "@/components/dashboard/method-status"
import { MetricCard } from "@/components/dashboard/metric-card"
import { VolumeChart } from "@/components/dashboard/volume-chart"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ApiStatusBadge } from "@/components/status-badge"
import { formatCount, formatGhs, formatTimestamp } from "@/lib/format"
import { apiStatusCopy, DASHBOARD, RECENT_ACTIVITY } from "@/lib/mock/dashboard"
import type { ActivityItem, ApiStatus } from "@/lib/types"

export function DashboardHome({
  apiStatus,
  emptyActivity,
}: {
  apiStatus: ApiStatus
  emptyActivity: boolean
}) {
  const successRate =
    (DASHBOARD.successfulMatches / DASHBOARD.callsThisMonth) * 100
  const failedCalls = DASHBOARD.callsThisMonth - DASHBOARD.successfulMatches
  const copy = apiStatusCopy(apiStatus)
  const activity: ActivityItem[] = emptyActivity ? [] : RECENT_ACTIVITY

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Dashboard
          </h1>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <RefreshCwIcon className="size-3.5" />
            Last updated {formatTimestamp(DASHBOARD.lastUpdated)}
          </p>
        </div>
        <Button nativeButton={false} render={<Link href="/verify" />}>
          Verify Now
          <ArrowUpRightIcon data-icon="inline-end" />
        </Button>
      </div>

      {apiStatus !== "live" ? (
        <Alert variant={apiStatus === "outage" ? "destructive" : "default"}>
          <ShieldCheckIcon />
          <AlertTitle className="flex items-center gap-2">
            API status
            <ApiStatusBadge status={apiStatus} />
          </AlertTitle>
          <AlertDescription>
            {copy.alertTitle}. {copy.alertDescription}
          </AlertDescription>
        </Alert>
      ) : null}

      <section>
        <h2 className="sr-only">This month</h2>
        <Card className="gap-0 py-0">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              icon={PhoneCallIcon}
              label="API calls this month"
              value={formatCount(DASHBOARD.callsThisMonth)}
              delta={DASHBOARD.callsDelta}
            />
            <MetricCard
              icon={TargetIcon}
              label="Success rate"
              value={`${successRate.toFixed(1)}%`}
              delta={DASHBOARD.successDelta}
            />
            <MetricCard
              icon={ShieldXIcon}
              label="Failed calls"
              value={formatCount(failedCalls)}
              delta={DASHBOARD.failedDelta}
              improvement={DASHBOARD.failedDelta <= 0}
            />
            <MetricCard
              icon={BanknoteIcon}
              label="Estimated invoice"
              value={formatGhs(DASHBOARD.estimatedInvoiceGhs)}
              delta={DASHBOARD.invoiceDelta}
            />
          </div>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <VolumeChart />
        <MethodMix />
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <ActivityPanel activity={activity} />
        <MethodStatus apiStatus={apiStatus} />
      </section>
    </div>
  )
}
