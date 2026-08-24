"use client"

import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OutcomeBadge } from "@/components/status-badge"
import { formatRelative, methodName } from "@/lib/format"
import type { ActivityItem } from "@/lib/types"

export function ActivityPanel({ activity }: { activity: ActivityItem[] }) {
  const failed = activity.filter((item) => item.outcome !== "match")

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>
          {activity.length === 0
            ? "Latest verification calls"
            : `Last ${activity.length} verification calls`}
        </CardDescription>
        <CardAction>
          <Button
            nativeButton={false}
            size="sm"
            variant="outline"
            render={<Link href="/history" />}
          >
            View all
            <ArrowUpRightIcon data-icon="inline-end" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="gap-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="failed">No match & errors</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ActivityTable items={activity} />
          </TabsContent>
          <TabsContent value="failed">
            <ActivityTable items={failed} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function ActivityTable({ items }: { items: ActivityItem[] }) {
  if (items.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No calls this period</EmptyTitle>
          <EmptyDescription>
            Run a verification to see it listed here.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Method</TableHead>
          <TableHead>ID submitted</TableHead>
          <TableHead>Outcome</TableHead>
          <TableHead className="text-right">Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="whitespace-normal font-medium">
              {methodName(item.methodId)}
            </TableCell>
            <TableCell className="font-mono text-muted-foreground tabular-nums">
              {item.idSubmitted}
            </TableCell>
            <TableCell>
              <OutcomeBadge outcome={item.outcome} />
            </TableCell>
            <TableCell className="text-right text-muted-foreground">
              {formatRelative(item.timestamp)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
