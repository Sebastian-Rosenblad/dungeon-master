import { useState } from "react";
import "./item.scss";
import { ItemM } from "../../models/item.models";
import { ParseText } from "../../assets/parse-text";

export function ItemC(props: {
  itemID: string;
  item: ItemM;
  update?: (new_item: ItemM) => void
}) {
  const [name, setName] = useState(props.item.name);
  const [text, setText] = useState(props.item.text.join("\n\n"));
  const [tags, setTags] = useState(props.item.tags.join(", "));
  const [editing, setEditing] = useState(false);
  const [hiding, setHiding] = useState(true);

  function toggleEdit() {
    if (editing && props.update)
      props.update({
        id: props.item.id,
        name: name,
        text: text.split("\n").filter(t => t.length > 0).map(t => t.trim()),
        tags: tags.split(",").map(t => t.trim())
      });
    setEditing(!editing);
  }

  return <div className="item">
    <button className="item--hide-button button-small" onClick={() => { setHiding(!hiding); }}>{hiding ? "Show" : "Hide"}</button>
    {!editing && <h3 className="item--title">{props.item.name}</h3>}
    {!hiding && <div className="item--content">
      {!editing && <div className="item--content--display">
        {text.split("\n").filter(t => t.length > 0).map((t: string, i: number) =>
          <div key={props.itemID + "-text-" + i} className="item--content--display--text">{ParseText(t, props.itemID + "-text-" + i)}</div>
        )}
      </div>}
      {editing && <div className="item--content--edit">
        <div className="item--content--edit--input">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value) }}
          ></input>
        </div>
        <div className="item--content--edit--textarea">
          <textarea
            value={text}
            onChange={(e) => { setText(e.target.value) }}
          ></textarea>
        </div>
        <div className="item--content--edit--input">
          <label>Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => { setTags(e.target.value) }}
          ></input>
        </div>
      </div>}
      {props.update && <div className="item--content--buttons">
        <button className="button-small" onClick={toggleEdit}>{editing ? "Save" : "Edit"}</button>
      </div>}
    </div>}
  </div>;
}
