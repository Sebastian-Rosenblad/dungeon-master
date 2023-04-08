export interface ScenarioM {
  id: string;
  name: string;
  description: Array<string>;
  scenes: Array<SceneM>;
}
export interface SceneM {
  name: string;
  text: Array<string>;
}
