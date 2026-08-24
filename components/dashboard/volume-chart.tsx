"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  formatChartDate,
  formatChartTick,
  formatCount,
} from "@/lib/format"
import { VOLUME_MONTH, VOLUME_WEEK } from "@/lib/mock/dashboard"

const RANGE_ITEMS = [
  { label: "Weekly", value: "week" },
  { label: "Monthly", value: "month" },
]

const chartConfig = {
  calls: {
    label: "Volume",
    color: "var(--primary)",
  },
} satisfies ChartConfig

function VolumeTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { payload: { date: string; calls: number } }[]
}) {
  if (!active || !payload?.[0]) return null
  const point = payload[0].payload

  return (
    <div className="rounded-lg border border-border/80 bg-card px-3 py-2 shadow-lg">
      <p className="font-heading text-base font-semibold tabular-nums">
        {formatCount(point.calls)}
      </p>
      <p className="text-xs text-muted-foreground">
        {formatChartDate(point.date)}
      </p>
    </div>
  )
}

export function VolumeChart() {
  const [range, setRange] = React.useState("week")
  const data = range === "month" ? VOLUME_MONTH : VOLUME_WEEK
  const total = data.reduce((sum, item) => sum + item.calls, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex w-full flex-wrap items-center justify-between gap-3">
          <CardTitle>Verification volume</CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="size-2.5 rounded-[2px] bg-primary" />
            Volume {formatCount(total)}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Time interval:</span>
            <Select
              items={RANGE_ITEMS}
              value={range}
              onValueChange={(value) => {
                if (typeof value === "string") setRange(value)
              }}
            >
              <SelectTrigger size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false} align="end">
                <SelectGroup>
                  {RANGE_ITEMS.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-100 w-full">
          <AreaChart
            key={range}
            data={data}
            margin={{ left: 0, right: 12, top: 8, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillCalls" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-calls)"
                  stopOpacity={0.18}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-calls)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="var(--border)"
              strokeDasharray="0"
            />
            <CartesianGrid
              horizontal={false}
              stroke="var(--border)"
              strokeDasharray="4 4"
            />
            <XAxis
              dataKey={range === "week" ? "label" : "date"}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              minTickGap={16}
              interval={range === "month" ? 3 : 0}
              tickFormatter={
                range === "month" ? (value) => formatChartTick(String(value)) : undefined
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={40}
              tickMargin={8}
              domain={[0, (dataMax: number) => Math.ceil(dataMax / 500) * 500]}
              ticks={
                range === "week"
                  ? [0, 500, 1000, 1500, 2000, 2500]
                  : [0, 250, 500, 750, 1000]
              }
              tickFormatter={(value: number) =>
                value >= 1000
                  ? `${Number((value / 1000).toFixed(1)).toString().replace(/\.0$/, "")}k`
                  : String(value)
              }
            />
            <ChartTooltip
              cursor={{ stroke: "var(--border)", strokeDasharray: "4 4" }}
              content={<VolumeTooltip />}
            />
            <Area
              dataKey="calls"
              type="linear"
              fill="url(#fillCalls)"
              stroke="var(--color-calls)"
              strokeWidth={1.75}
              dot={false}
              activeDot={{
                r: 4,
                strokeWidth: 0,
                fill: "var(--color-calls)",
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
