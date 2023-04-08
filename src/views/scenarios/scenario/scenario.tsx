import { useState } from "react";
import "./scenario.scss";
import { ScenarioM, SceneM } from "../../../models/scenario.models";
import { SceneC } from "../../../components/scene/scene";
import { ParseText } from "../../../assets/parse-text";

export function ScenarioV(props: {
  scenario: ScenarioM,
  updateScenario: (new_scenario: ScenarioM) => void
}) {
  const [name, setName] = useState<string>(props.scenario.name);
  const [description, setDescription] = useState<string>(props.scenario.description.join("\n\n"));
  const [editing, setEditing] = useState(false);

  function saveScenario(scenes: Array<SceneM>) {
    props.updateScenario({
      id: props.scenario.id,
      name: name,
      description: description.split("\n").filter(d => d.length > 0).map(d => d.trim()),
      scenes: scenes
    } as ScenarioM);
  }
  function addScene() {
    saveScenario([...props.scenario.scenes, {name:"New scene",text:[""]}]);
  }
  function updateScene(new_scene: SceneM, index: number) {
    saveScenario([...props.scenario.scenes.slice(0, index), new_scene, ...props.scenario.scenes.slice(index + 1)]);
  }
  function toggleEdit() {
    if (editing)
      saveScenario(props.scenario.scenes);
    setEditing(!editing);
  }

  return <div className="scenario">
    {!editing && <div className="scenario--display">
      <h1>{name}</h1>
      {description.split("\n").filter((text: string) => text.length > 0).map((text: string, i: number) =>
        <div key={props.scenario.id + "-description-" + i}>{ParseText(text.trim(), props.scenario.id + "-description-" + i)}</div>
      )}
    </div>}
    {editing && <div className="scenario--edit">
      <div className="scenario--edit--input">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value) }}
        ></input>
      </div>
      <div className="scenario--edit--textarea">
        <textarea
          value={description}
          onChange={(e) => { setDescription(e.target.value) }}
        ></textarea>
      </div>
    </div>}
    <div className="scenario--buttons">
      <button className="button-small" onClick={toggleEdit}>{editing ? "Save" : "Edit"}</button>
    </div>
    <div className="scenario--scenes">
      {props.scenario.scenes.map((scene: SceneM, i: number) =>
        <div key={props.scenario.id + "-scene-" + i} className="scenario--scenes--scene">
          <SceneC
            sceneID={props.scenario.id + "-scene-" + i}
            scene={scene}
            updateScene={(new_scene: SceneM) => { updateScene(new_scene, i); }}
          />
        </div>
      )}
      <div className="scenario--scenes--buttons">
        <button onClick={addScene}>Add scene</button>
      </div>
    </div>
  </div>;
}
