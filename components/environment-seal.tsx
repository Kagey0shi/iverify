"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useEnvironment } from "@/lib/environment"

export function EnvironmentSeal() {
  const { environment, setEnvironment } = useEnvironment()

  return (
    <div className="flex items-center gap-3">
      <div
        data-environment={environment}
        className="env-seal inline-flex items-center gap-2 rounded-md px-2.5 py-1.5 text-primary-foreground"
        aria-label={`Current environment: ${environment}`}
      >
        <span aria-hidden className="env-seal-pip size-1.5 rounded-full" />
        <span className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase">
          {environment === "live" ? "Live" : "Sandbox"}
        </span>
      </div>
      <ToggleGroup
        value={[environment]}
        onValueChange={(value) => {
          if (value[0] === "live" || value[0] === "sandbox") {
            setEnvironment(value[0])
          }
        }}
        variant="outline"
        size="sm"
        spacing={0}
        aria-label="Switch environment"
      >
        <ToggleGroupItem value="live">Live</ToggleGroupItem>
        <ToggleGroupItem value="sandbox">Sandbox</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
