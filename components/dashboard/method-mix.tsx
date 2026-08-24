"use client"

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { formatCount, methodName } from "@/lib/format"
import { DASHBOARD, METHOD_BREAKDOWN } from "@/lib/mock/dashboard"
import type { MethodId } from "@/lib/types"
import { cn } from "@/lib/utils"

const METHOD_COLORS: Record<MethodId, string> = {
  "ghana-card-basic": "var(--chart-1)",
  "ghana-card-linked": "color-mix(in oklch, var(--chart-1) 58%, white)",
  "ghana-card-biometrics": "var(--chart-5)",
  "bank-account": "var(--chart-2)",
  "voter-id": "var(--chart-3)",
  passport: "var(--warning)",
  "phone-number": "color-mix(in oklch, var(--chart-1) 50%, var(--chart-3))",
}

const chartConfig = {
  calls: { label: "Calls" },
  "ghana-card-basic": {
    label: methodName("ghana-card-basic"),
    color: METHOD_COLORS["ghana-card-basic"],
  },
  "ghana-card-linked": {
    label: methodName("ghana-card-linked"),
    color: METHOD_COLORS["ghana-card-linked"],
  },
  "ghana-card-biometrics": {
    label: methodName("ghana-card-biometrics"),
    color: METHOD_COLORS["ghana-card-biometrics"],
  },
  "bank-account": {
    label: methodName("bank-account"),
    color: METHOD_COLORS["bank-account"],
  },
  "voter-id": {
    label: methodName("voter-id"),
    color: METHOD_COLORS["voter-id"],
  },
  passport: {
    label: methodName("passport"),
    color: METHOD_COLORS.passport,
  },
  "phone-number": {
    label: methodName("phone-number"),
    color: METHOD_COLORS["phone-number"],
  },
} satisfies ChartConfig

const data = METHOD_BREAKDOWN.map((item) => ({
  ...item,
  fill: `var(--color-${item.id})`,
}))

export function MethodMix() {
  const total = METHOD_BREAKDOWN.reduce((sum, item) => sum + item.calls, 0)
  const isUp = DASHBOARD.callsDelta >= 0
  const Arrow = isUp ? ArrowUpIcon : ArrowDownIcon

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calls by method</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="relative w-full">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[200px] w-full"
            initialDimension={{ width: 360, height: 200 }}
          >
            <PieChart margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
              <ChartTooltip content={<ChartTooltipContent nameKey="id" />} />
              <Pie
                data={data}
                dataKey="calls"
                nameKey="id"
                cx="50%"
                cy="100%"
                startAngle={180}
                endAngle={0}
                innerRadius={118}
                outerRadius={130}
                paddingAngle={2}
                cornerRadius={12}
                strokeWidth={0}
                isAnimationActive={false}
              />
            </PieChart>
          </ChartContainer>
          <div className="pointer-events-none absolute inset-x-0 bottom-1 flex flex-col items-center">
            <p className="font-heading text-3xl font-semibold tracking-tight tabular-nums">
              {formatCount(total)}
            </p>
            <p className="flex items-center gap-1 text-xs">
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 font-medium tabular-nums",
                  isUp ? "text-success" : "text-destructive"
                )}
              >
                <Arrow className="size-3" strokeWidth={2.5} />
                {isUp ? "+" : ""}
                {DASHBOARD.callsDelta.toFixed(1)}%
              </span>
              <span className="text-muted-foreground">vs last month</span>
            </p>
          </div>
        </div>
        <ul className="flex flex-col gap-3">
          {METHOD_BREAKDOWN.map((item) => {
            const percent = (item.calls / total) * 100
            return (
              <li
                key={item.id}
                className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 text-sm"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: METHOD_COLORS[item.id] }}
                  />
                  <span className="truncate">{methodName(item.id)}</span>
                </span>
                <span className="w-8 text-right tabular-nums text-muted-foreground">
                  {percent.toFixed(0).padStart(2, "0")}%
                </span>
                <span className="w-12 text-right tabular-nums">
                  {formatCount(item.calls)}
                </span>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
