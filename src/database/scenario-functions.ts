import { ScenarioM } from "../models/scenario.models";
import { scenarios_db } from "./scenarios";

export let state_scenarios: Array<ScenarioM> = JSON.parse(JSON.stringify(scenarios_db));

export function NewScenario(): ScenarioM {
  return {
    name: "New scenario",
    intro: "",
    scenes: []
  };
}
