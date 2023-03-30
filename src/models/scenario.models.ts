export interface ScenarioM {
  name: string;
  intro: string;
  scenes: Array<SceneM>;
}
interface SceneM {
  name: string;
  text: Array<string>;
}
