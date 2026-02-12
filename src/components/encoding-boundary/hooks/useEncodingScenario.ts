import * as React from "react"
import type { EncodingScenario } from "../types"

export function useEncodingScenario(
  scenarios: EncodingScenario[],
  initialScenarioId?: string
) {
  const [scenarioId, setScenarioId] = React.useState<string | undefined>(
    initialScenarioId ?? scenarios[0]?.id
  )

  const scenario = React.useMemo(
    () => scenarios.find(s => s.id === scenarioId),
    [scenarios, scenarioId]
  )

  return { scenarioId, setScenarioId, scenario }
}

export function nextScenario(
  scenarios: EncodingScenario[],
  currentScenarioId: string
): string | undefined {
  const index = scenarios.findIndex(s => s.id === currentScenarioId)

  if (index === -1) return scenarios[0]?.id
  if (index === scenarios.length - 1) return undefined

  return scenarios[index + 1].id
}