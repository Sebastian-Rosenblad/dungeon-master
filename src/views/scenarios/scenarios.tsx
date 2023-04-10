import { useEffect, useState } from "react";
import "./scenarios.scss";
import { state_scenarios, set_scenarios, NewScenario } from "../../functions/scenario.functions";
import { ScenarioM } from "../../models/scenario.models";
import { ScenarioV } from "./scenario/scenario";

export function ScenariosV() {
  const [scenarios, setScenarios] = useState<Array<ScenarioM>>(state_scenarios);
  const [scenario, setScenario] = useState<ScenarioM | undefined>(undefined);

  useEffect(() => {
    set_scenarios(scenarios);
  });

  function addScenario() {
    setScenarios([...scenarios, NewScenario()]);
  }
  function viewScenario(id: string) {
    const index: number = scenarios.findIndex(s => s.id === id);
    if (index >= 0)
      setScenario(scenarios[index]);
    else
      setScenario(undefined);
  }
  function updateScenario(new_scenario: ScenarioM) {
    const index: number = scenarios.findIndex(s => s.id === new_scenario.id);
    if (index >= 0) {
      const new_scenarios: Array<ScenarioM> = JSON.parse(JSON.stringify(scenarios));
      new_scenarios[index] = new_scenario;
      setScenarios(new_scenarios);
    }
    setScenario(new_scenario);
  }

  return <div className="scenarios">
    {!scenario && <div>
      <h1 className="scenarios--header">Scenarios</h1>
      <div className="scenarios--body">
        {scenarios.map((scenario: ScenarioM) =>
          <div key={"scenario-" + scenario.id} className="scenarios--body--scenario">
            <button className="button-large" onClick={() => { viewScenario(scenario.id); }}>
              {scenario.name}
            </button>
          </div>
        )}
      </div>
      <div className="scenarios--footer">
        <button onClick={addScenario}>Add scenario</button>
      </div>
    </div>}
    {!!scenario && <div>
      <div className="scenarios--buttons">
        <button onClick={() => { viewScenario(""); }}>Back to all scenarios</button>
      </div>
      <div className="scenarios--scenario">
        <ScenarioV
          scenario={scenario}
          update={(new_scenario: ScenarioM) => { updateScenario(new_scenario); }}
        />
      </div>
    </div>}
  </div>;
}
