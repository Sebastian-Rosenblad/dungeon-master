import { useState } from "react";
import "./chapter.scss";
import { ChapterM } from "../../models/culture.model";
import { ParseText } from "../../assets/parse-text";

export function ChapterC(props: {
  chapterID: string;
  chapter: ChapterM;
  update: (new_chapter: ChapterM) => void;
  moveUp: () => void
}) {
  const [name, setName] = useState(props.chapter.name);
  const [text, setText] = useState(props.chapter.text.join("\n\n"));
  const [editing, setEditing] = useState(false);
  const [hiding, setHiding] = useState(true);

  function toggleEdit() {
    if (editing)
      props.update({
        name: name,
        text: text.split("\n").filter(t => t.length > 0).map(t => t.trim())
      });
    setEditing(!editing);
  }

  return <div className="chapter">
    <button className="chapter--hide-button button-small" onClick={() => { setHiding(!hiding); }}>{hiding ? "Show" : "Hide"}</button>
    {hiding && props.moveUp && <button className="chapter--move-up button-small" onClick={() => { props.moveUp(); }}>Move up</button>}
    {!editing && <h3 className="chapter--title">{props.chapter.name}</h3>}
    {!hiding && <div className="chapter--content">
      {!editing && <div className="chapter--content--display">
        {text.split("\n").filter(t => t.length > 0).map((t: string, i: number) =>
          <div key={props.chapterID + "-text-" + i} className="chapter--content--display--text">{ParseText(t, props.chapterID + "-text-" + i)}</div>
        )}
      </div>}
      {editing && <div className="chapter--content--edit">
        <div className="chapter--content--edit--input">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value) }}
          ></input>
        </div>
        <div className="chapter--content--edit--textarea">
          <textarea
            value={text}
            onChange={(e) => { setText(e.target.value) }}
          ></textarea>
        </div>
      </div>}
      <div className="chapter--content--buttons">
        <button className="button-small" onClick={toggleEdit}>{editing ? "Save" : "Edit"}</button>
      </div>
    </div>}
  </div>;
}
