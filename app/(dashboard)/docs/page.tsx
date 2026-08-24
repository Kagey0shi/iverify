import type { Metadata } from "next"

import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = {
  title: "API Docs",
}

export default function Page() {
  return (
    <ComingSoon
      title="API Docs"
      description="Endpoint reference and key usage examples will live here. Use Verify to try the seven Ghana methods now."
    />
  )
}
