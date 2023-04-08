import { useState } from "react";
import "./scene.scss";
import { SceneM } from "../../models/scenario.models";
import { ParseText } from "../../assets/parse-text";

export function SceneC(props: {
  sceneID: string;
  scene: SceneM,
  updateScene: (new_scene: SceneM) => void
}) {
  const [name, setName] = useState(props.scene.name);
  const [text, setText] = useState(props.scene.text.join("\n\n"));
  const [editing, setEditing] = useState(false);
  const [hiding, setHiding] = useState(true);

  function toggleEdit() {
    if (editing)
      props.updateScene({
        name: name,
        text: text.split("\n").filter(t => t.length > 0).map(t => t.trim())
      });
    setEditing(!editing);
  }
  return <div className="scene">
    <button className="scene--hide-button button-small" onClick={() => { setHiding(!hiding); }}>{hiding ? "Show" : "Hide"}</button>
    {!editing && <h3 className="scene--title">{props.scene.name}</h3>}
    {!hiding && <div className="scene--content">
      {!editing && <div className="scene--content--display">
        {text.split("\n").filter(t => t.length > 0).map((t: string, i: number) =>
          <div key={props.sceneID + "-text-" + i} className="scene--content--display--text">{ParseText(t, props.sceneID + "-text-" + i)}</div>
        )}
      </div>}
      {editing && <div className="scene--content--edit">
        <div className="scene--content--edit--input">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value) }}
          ></input>
        </div>
        <div className="scene--content--edit--textarea">
          <textarea
            value={text}
            onChange={(e) => { setText(e.target.value) }}
          ></textarea>
        </div>
      </div>}
      <div className="scene--content--buttons">
        <button className="button-small" onClick={toggleEdit}>{editing ? "Save" : "Edit"}</button>
      </div>
    </div>}
  </div>;
}
