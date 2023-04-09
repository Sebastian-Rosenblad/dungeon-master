import { useState } from "react";
import "./culture.scss";
import { CultureM, ChapterM } from "../../../models/culture.model";
import { ChapterC } from "../../../components/chapter/chapter";
import { ParseText } from "../../../assets/parse-text";

export function CultureV(props: {
  culture: CultureM,
  update: (new_culture: CultureM) => void
}) {
  const [name, setName] = useState<string>(props.culture.name);
  const [description, setDescription] = useState<string>(props.culture.description.join("\n\n"));
  const [editing, setEditing] = useState(false);

  function saveCulture(chapters: Array<ChapterM>) {
    props.update({
      id: props.culture.id,
      name: name,
      description: description.split("\n").filter(d => d.length > 0).map(d => d.trim()),
      chapters: chapters
    } as CultureM);
  }
  function addChapter() {
    saveCulture([...props.culture.chapters, {name:"New chapter",text:[""]}]);
  }
  function updateChapter(new_chapter: ChapterM, index: number) {
    saveCulture([...props.culture.chapters.slice(0, index), new_chapter, ...props.culture.chapters.slice(index + 1)]);
  }
  function moveChapterUp(index: number) {
    if (index > 0 && index < props.culture.chapters.length)
      saveCulture([...props.culture.chapters.slice(0, index - 1), props.culture.chapters[index], props.culture.chapters[index - 1], ...props.culture.chapters.slice(index + 1)]);
  }
  function toggleEdit() {
    if (editing)
      saveCulture(props.culture.chapters);
    setEditing(!editing);
  }

  return <div className="culture">
    {!editing && <div className="culture--display">
      <h1>{name}</h1>
      {description.split("\n").filter((text: string) => text.length > 0).map((text: string, i: number) =>
        <div key={props.culture.id + "-description-" + i}>{ParseText(text.trim(), props.culture.id + "-description-" + i)}</div>
      )}
    </div>}
    {editing && <div className="culture--edit">
      <div className="culture--edit--input">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value) }}
        ></input>
      </div>
      <div className="culture--edit--textarea">
        <textarea
          value={description}
          onChange={(e) => { setDescription(e.target.value) }}
        ></textarea>
      </div>
    </div>}
    <div className="culture--buttons">
      <button className="button-small" onClick={toggleEdit}>{editing ? "Save" : "Edit"}</button>
    </div>
    <div className="culture--chapters">
      {props.culture.chapters.map((chapter: ChapterM, i: number) =>
        <div key={props.culture.id + "-chapter-" + i} className="culture--chapters--chapter">
          <ChapterC
            chapterID={props.culture.id + "-chapter-" + i}
            chapter={chapter}
            update={(new_chapter: ChapterM) => { updateChapter(new_chapter, i); }}
            moveUp={() => { moveChapterUp(i); }}
          />
        </div>
      )}
      <div className="culture--chapters--buttons">
        <button onClick={addChapter}>Add chapter</button>
      </div>
    </div>
  </div>;
}
