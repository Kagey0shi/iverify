import type { Metadata } from "next"

import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = {
  title: "Verification History",
}

export default function Page() {
  return (
    <ComingSoon
      title="Verification History"
      description="The history table, filters, and CSV export ship in the next cycle. No-match and error calls from Verify will land here."
    />
  )
}
