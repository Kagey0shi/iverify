import type { Metadata } from "next"

import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = {
  title: "Billing",
}

export default function Page() {
  return (
    <ComingSoon
      title="Billing"
      description="Usage, estimated invoices, and prepaid wallet top-up ship in the next cycle."
    />
  )
}
