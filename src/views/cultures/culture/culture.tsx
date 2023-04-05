import { useState } from "react";
import "./culture.scss";
import { parseText } from "../../../assets/parse-text";
import { CultureM } from "../../../models/culture.model";

interface Chapter { name: string; texts: string; }
interface ChapterI { name: string; texts: Array<string>; }

export function CultureV(props: any) {
  const [name, setName] = useState<string>(props.culture.name);
  const [chapters, setChapters] = useState<Array<Chapter>>(props.culture.chapters.map((chapter: ChapterI) => { return {name:chapter.name,texts:chapter.texts.join("\n\n")}; }));
  const [editing, setEditing] = useState(false);

  function updateName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value.trim());
  }
  function addChapter() {
    setChapters([...chapters, {name:"New chapter",texts:""}]);
  }
  function updateChapterName(e: React.ChangeEvent<HTMLInputElement>, i: number) {
    const new_chapters: Array<Chapter> = JSON.parse(JSON.stringify(chapters));
    new_chapters[i].name = e.target.value.trim();
    setChapters(new_chapters);
  }
  function updateChapterText(e: React.ChangeEvent<HTMLTextAreaElement>, i: number) {
    const new_chapters: Array<Chapter> = JSON.parse(JSON.stringify(chapters));
    new_chapters[i].texts = e.target.value;
    setChapters(new_chapters);
  }
  function toggleEditing() {
    if (editing) {
      props.updateCulture({
        id: props.culture.id,
        name: name,
        chapters: chapters.map(chapter => {
          return {
            name: chapter.name,
            texts: chapter.texts.split("\n").filter(text => text.length > 0).map(text => text.trim())
          } as ChapterI;
        })
      } as CultureM);
    }
    setEditing(!editing);
  }

  return <div className="culture">
    {!editing && <div className="culture--display">
      <h1 className="culture--display--title">{name}</h1>
      {chapters.map((chapter, i) =>
        <div key={"culture-chapter-" + i} className="culture--display--chapter">
          <h2>{chapter.name}</h2>
          {chapter.texts.split("\n").filter(text => text.length > 0).map((text, j) =>
            <p key={"culture-chapter-" + i + "-text-" + j}>{parseText(text.trim())}</p>
          )}
        </div>
      )}
    </div>}
    {editing && <div className="culture--edit">
      <div className="culture--edit--block">
        <div className="culture--edit--block--input">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => { updateName(e) }}
          ></input>
        </div>
      </div>
      {chapters.map((chapter, i) =>
        <div key={"culture-edit-chapter" + i} className="culture--edit--block">
          <div className="culture--edit--block--input">
            <label>Chapter</label>
            <input
              type="text"
              value={chapter.name}
              onChange={(e) => { updateChapterName(e, i) }}
            ></input>
          </div>
          <div className="culture--edit--block--textarea">
            <textarea
              value={chapter.texts}
              onChange={(e) => { updateChapterText(e, i) }}
            ></textarea>
          </div>
        </div>
      )}
      <div className="culture--edit--block culture--buttons">
        <button onClick={addChapter}>Add chapter</button>
      </div>
    </div>}
    {!!props.updateCulture && <div className="culture--buttons">
      <button onClick={toggleEditing}>
        {editing ? "Save" : "Edit"}
      </button>
    </div>}
  </div>;
}
