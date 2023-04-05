export interface ScenarioM {
  id: string;
  name: string;
  intro: string;
  scenes: Array<SceneM>;
}
export interface SceneM {
  name: string;
  text: Array<string>;
}
