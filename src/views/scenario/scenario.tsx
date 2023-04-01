import { useEffect, useState } from "react";
import "./scenario.scss";
import { ScenarioM, SceneM } from "../../models/scenario.models";
import { SceneC } from "../../components/scene/scene";

export function ScenarioV(props: {scenario: ScenarioM}) {
  const [scenario, setScenario] = useState(props.scenario);
  const [editing, setEditing] = useState(false);
  const toggleEdit = () => {
    setEditing(!editing);
  }

  useEffect(() => {
    console.clear()
    console.log(JSON.stringify(scenario));
  });

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScenario({
      name: e.target.value,
      intro: scenario.intro,
      scenes: scenario.scenes
    });
  }
  const handleIntro = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setScenario({
      name: scenario.name,
      intro: e.target.value,
      scenes: scenario.scenes
    });
  }
  function addScene() {
    setScenario({
      name: scenario.name,
      intro: scenario.intro,
      scenes: [...scenario.scenes, {
        name: "New scene",
        text: []
      }]
    });
  }
  function updateScene(scene: SceneM, index: number) {
    const newScenes = [...scenario.scenes];
    newScenes[index] = scene;
    setScenario({
      name: scenario.name,
      intro: scenario.intro,
      scenes: newScenes
    });
  }

  return <article className="scenario">
    {editing && <div>
      <section className="scenario-header">
        <input
          type="text"
          value={scenario.name}
          onChange={handleName}
        ></input>
        <textarea
          value={scenario.intro}
          onChange={handleIntro}
        ></textarea>
      </section>
      <section className="scenario-body">
        {scenario.scenes.map((scene: SceneM, i: number) =>
          <SceneC key={"scene-" + i} id={i} scene={scene} edit={true} update={(new_scene: SceneM) => { updateScene(new_scene, i); }} />
        )}
      </section>
      <section className="scenario-footer">
        <button onClick={addScene}>Add scene</button>
      </section>
    </div>}
    {!editing && <div className="scenario">
      <h1 className="scenario-title">{scenario.name}</h1>
      <p className="scenario-description">{scenario.intro}</p>
      {scenario.scenes.map((scene: SceneM, i: number) => <SceneC key={"scene-" + i} id={i} scene={scene} />)}
    </div>}
    <button className="scenario--save-button" onClick={toggleEdit}>{editing ? "Save" : "Edit"}</button>
  </article>;
}
