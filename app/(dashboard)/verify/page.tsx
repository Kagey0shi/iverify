import type { Metadata } from "next"

import { VerifyWorkspace } from "@/components/verify/verify-workspace"

export const metadata: Metadata = {
  title: "Verify",
}

export default function Page() {
  return <VerifyWorkspace />
}
