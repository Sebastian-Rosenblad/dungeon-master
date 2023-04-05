import { useEffect, useState } from "react";
import "./scenarios.scss";
import { NewScenario, state_scenarios } from "../../functions/scenario.functions";
import { ScenarioM } from "../../models/scenario.models";
import { ScenarioV } from "./scenario/scenario";

export function ScenariosV() {
  const [scenarios, setScenarios] = useState<Array<ScenarioM>>(state_scenarios);
  const [scenario, setScenario] = useState<ScenarioM | undefined>(undefined);

  useEffect(() => {
    console.clear()
    console.log('import{ScenarioM}from"../models/scenario.models";export const scenarios_db:Array<ScenarioM>=' + JSON.stringify(scenarios) + ';');
  });

  function addScenario() {
    setScenarios([...scenarios, NewScenario()]);
  }
  function viewScenario(scenario: ScenarioM) {
    setScenario(scenario);
  }
  function updateScenario(new_scenario: ScenarioM) {
    const index: number = scenarios.findIndex(s => s.id === new_scenario.id);
    if (index >= 0) {
      const new_scenarios: Array<ScenarioM> = JSON.parse(JSON.stringify(scenarios));
      new_scenarios[index] = new_scenario;
      setScenarios(new_scenarios);
    }
  }

  return <div className="scenarios">
    {!scenario && <div>
      <h1 className="scenarios--header">Scenarios</h1>
      <div className="scenarios--body">
        {scenarios.map((scenario: ScenarioM, i: number) =>
          <div key={"scenario-" + i} className="scenarios--body--scenario">
            <button
              onClick={() => { viewScenario(scenario); }}
            >{scenario.name}</button>
          </div>
        )}
      </div>
      <div className="scenarios--footer">
        <button onClick={addScenario}>Add scenario</button>
      </div>
    </div>}
    {scenario &&
      <ScenarioV scenario={scenario} updateScenario={(new_scenario: ScenarioM) => { updateScenario(new_scenario); }} />
    }
  </div>;
}
