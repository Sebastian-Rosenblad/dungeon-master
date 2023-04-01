import { useEffect, useState } from "react";
import { NewScenario, state_scenarios } from "../../database/scenario-functions";
import { ScenarioM } from "../../models/scenario.models";
import { ScenarioV } from "../scenario/scenario";

export function ScenariosV() {
  const [scenarios, setScenarios] = useState(state_scenarios);
  const [scenario, setScenario] = useState<ScenarioM | undefined>(undefined);

  useEffect(() => {
    console.clear()
    console.log(JSON.stringify(scenarios));
  });

  function addScenario() {
    setScenarios([...scenarios, NewScenario()]);
  }
  function viewScenario(scenario: ScenarioM) {
    setScenario(scenario);
  }

  return <article>
    {!scenario && <span><section className="scenarios-header">
      <h1>Scenarios</h1>
    </section>
    <section className="scenarios-body">
      {scenarios.map((scenario: ScenarioM, i: number) =>
        <p onClick={() => { viewScenario(scenario); }}>{scenario.name}</p>
      )}
    </section>
    <section className="scenarios-footer">
      <button onClick={addScenario}>Add scenario</button>
    </section></span>}
    {scenario && <ScenarioV scenario={scenario} />}
  </article>;
}
