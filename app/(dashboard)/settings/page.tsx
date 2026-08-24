import type { Metadata } from "next"

import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = {
  title: "Settings",
}

export default function Page() {
  return (
    <ComingSoon
      title="Settings"
      description="Live and sandbox API key management ships in the next cycle."
    />
  )
}
