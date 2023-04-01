import React, { useState } from "react";
import "./scene.scss";
import { SceneM } from "../../models/scenario.models";
import { parseText } from "../../assets/parse-text";

export function SceneC(props: any) {
  const id: string = props.id;
  const editing: boolean = props.edit;
  const [scene, setScene] = useState<SceneM>(props.scene);
  const [hiding, setHiding] = useState(true);

  function toggleHide() {
    setHiding(!hiding);
  }

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateScene({
      name: e.target.value,
      text: scene.text
    });
  }
  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const newText = [...scene.text];
    newText[index] = e.target.value;
    updateScene({
      name: scene.name,
      text: newText
    });
  }
  const addText = () => {
    updateScene({
      name: scene.name,
      text: [...scene.text, ""]
    });
  }
  function updateScene(new_scene: SceneM) {
    setScene(new_scene);
    props.update(new_scene);
  }

  return <section className="scene">
    <button className="scene--hide-button" onClick={toggleHide}>{hiding ? "Show" : "Hide"}</button>
    {editing && <div className="scene-content">
      <input
        type="text"
        value={scene.name}
        onChange={handleName}
      ></input>
      {!hiding && scene.text.map((text, i) => <textarea
        key={id + "-input-" + i}
        value={text}
        onChange={(e) => { handleText(e, i); }}
      ></textarea>)}
      {!hiding && <button
        onClick={addText}
      >Add text</button>}
    </div>}
    {!editing && <div>
      <h2 className="scene-title">{scene.name}</h2>
      {!hiding && scene.text.map((text, i) => parseText(text, id + "-text-" + i))}
    </div>}
  </section>;
}
