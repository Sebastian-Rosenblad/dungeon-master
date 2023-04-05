import { ScenarioM } from "../models/scenario.models";
import { scenarios_db } from "../database/scenarios.db";
import { RandomID } from "../assets/randomizer";

export let state_scenarios: Array<ScenarioM> = JSON.parse(JSON.stringify(scenarios_db));

export function NewScenario(): ScenarioM {
  return {
    id: RandomID(),
    name: "New scenario",
    intro: "",
    scenes: []
  };
}
