import { useEffect, useState } from "react";
import { ScenarioM, SceneM } from "../../models/scenario.models";

export function ScenarioV(props: {scenario: ScenarioM}) {
  const [scenario, setScenario] = useState(props.scenario);

  useEffect(() => {
    console.clear()
    console.log(JSON.stringify(scenario));
  });

  function addScene() {
    
  }

  return <article>
    <section className="scenarios-header">
      <input
        type="text"
        value={scenario.name}
      ></input>
      <textarea
        value={scenario.intro}
      ></textarea>
    </section>
    <section className="scenarios-body">
      {scenario.scenes.map((scene: SceneM, i: number) =>
        <p>{scene.name}</p>
      )}
    </section>
    <section className="scenarios-footer">
      <button onClick={addScene}>Add scene</button>
    </section>
  </article>;
}
