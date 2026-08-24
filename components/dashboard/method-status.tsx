import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ApiStatusBadge } from "@/components/status-badge"
import { methodName } from "@/lib/format"
import { methodApiStatuses } from "@/lib/mock/dashboard"
import { METHODS } from "@/lib/mock/methods"
import type { ApiStatus } from "@/lib/types"
import { cn } from "@/lib/utils"

function pipClass(status: ApiStatus) {
  if (status === "degraded") return "bg-warning"
  if (status === "outage") return "bg-destructive"
  return "bg-success"
}

export function MethodStatus({ apiStatus }: { apiStatus: ApiStatus }) {
  const statuses = methodApiStatuses(apiStatus)

  return (
    <Card>
      <CardHeader>
        <CardTitle>API status</CardTitle>
        <CardDescription>By verification method</CardDescription>
        <CardAction>
          <ApiStatusBadge status={apiStatus} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col">
          {METHODS.map((method) => {
            const status = statuses[method.id]
            return (
              <li
                key={method.id}
                className="flex items-center justify-between gap-3 border-t py-2.5 first:border-t-0 first:pt-0 last:pb-0"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span
                    aria-hidden
                    className={cn("size-2 shrink-0 rounded-full", pipClass(status))}
                  />
                  <span className="truncate text-sm">{methodName(method.id)}</span>
                </span>
                <ApiStatusBadge status={status} />
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
