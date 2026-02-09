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
