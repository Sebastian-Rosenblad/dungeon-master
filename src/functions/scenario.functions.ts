import { scenario_db } from "../database/scenario.db";
import { RandomID } from "../assets/randomizer";
import { ScenarioM } from "../models/scenario.models";

const STORAGE_KEY = "dm-scenarios";
const storage_string: string = localStorage.getItem(STORAGE_KEY) || "";
export let state_scenarios: Array<ScenarioM> = JSON.parse(storage_string.length > 0 ? storage_string : JSON.stringify(scenario_db));
export function set_scenarios(scenarios: Array<ScenarioM>) {
  state_scenarios = scenarios;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
}

export function NewScenario(): ScenarioM {
  return {
    id: RandomID(),
    name: "New scenario",
    description: [],
    scenes: []
  };
}
