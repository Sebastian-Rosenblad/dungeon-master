import { useState } from "react";
import "./scenario.scss";
import { ScenarioM, SceneM } from "../../../models/scenario.models";
import { SceneC } from "../../../components/scene/scene";
import { parseText } from "../../../assets/parse-text";

export function ScenarioV(props: any) {
  const [scenario, setScenario] = useState<ScenarioM>(props.scenario);
  const [editing, setEditing] = useState(false);

  function updateScenario(key: string, value: any) {
    setScenario({
      id: scenario.id,
      name: key === "name" ? value : scenario.name,
      intro: key === "intro" ? value : scenario.intro,
      scenes: key === "scenes" ? value : scenario.scenes
    });
  }
  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateScenario("name", e.target.value);
  }
  const updateIntro = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateScenario("intro", e.target.value);
  }
  function addScene() {
    updateScenario("scenes", [...scenario.scenes, {
      name: "New scene",
      text: []
    }]);
  }
  function updateScene(new_scene: SceneM, index: number) {
    const new_scenes = JSON.parse(JSON.stringify(scenario.scenes));
    new_scenes[index] = new_scene;
    updateScenario("scenes", new_scenes);
  }
  
  const toggleEdit = () => {
    if (editing)
      props.updateScenario(scenario);
    setEditing(!editing);
  }

  return <div className="scenario">
    {editing && <div className="scenario--edit">
      <div className="scenario--edit--row">
        <div className="scenario--edit--row-input">
          <label>Name</label>
          <input
            type="text"
            value={scenario.name}
            onChange={updateName}
          ></input>
        </div>
        <div className="scenario--edit--row-textarea">
          <textarea
            value={scenario.intro}
            onChange={updateIntro}
          ></textarea>
        </div>
      </div>
      <div className="scenario--edit--body">
        {scenario.scenes.map((scene: SceneM, i: number) =>
          <SceneC key={"scene-" + i} id={i} scene={scene} edit={true} update={(new_scene: SceneM) => { updateScene(new_scene, i); }} />
        )}
      </div>
      <div className="scenario--edit--footer">
        <button onClick={addScene}>Add scene</button>
      </div>
    </div>}
    {!editing && <div className="scenario--display">
      <h1 className="scenario--display--title">{scenario.name}</h1>
      <p className="scenario--display--intro">{parseText(scenario.intro)}</p>
      {scenario.scenes.map((scene: SceneM, i: number) =>
        <SceneC
          key={scenario.id + "-scene-" + i}
          scene={scene}
          scenarioID={scenario.id}
        />
      )}
    </div>}
    <div className="scenario--footer">
      <button onClick={toggleEdit}>{editing ? "Save" : "Edit"}</button>
    </div>
  </div>;
}
