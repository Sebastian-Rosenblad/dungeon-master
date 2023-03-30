import { useEffect, useState } from "react";
import { NewScenario, state_scenarios } from "../../database/scenario-functions";
import { ScenarioM } from "../../models/scenario.models";

export function ScenariosV() {
  const [scenarios, setScenarios] = useState(state_scenarios);

  useEffect(() => {
    console.clear()
    console.log(JSON.stringify(scenarios));
  });

  function addScenario() {
    setScenarios([...scenarios, NewScenario()]);
  }

  return <article>
    <section className="scenarios-header">
      <h1>Scenarios</h1>
    </section>
    <section className="scenarios-body">
      {scenarios.map((scenario: ScenarioM, i: number) =>
        <p>{scenario.name}</p>
      )}
    </section>
    <section className="scenarios-footer">
      <button onClick={addScenario}>Add scenario</button>
    </section>
  </article>;
}
