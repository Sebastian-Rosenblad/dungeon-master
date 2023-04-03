import { useState } from "react";
import "./culture.scss";
import { parseText } from "../../../assets/parse-text";
import { state_bestiary } from "../../../functions/bestiary.functions";
import { CultureM } from "../../../models/culture.model";
import { StatBlockC } from "../../../components/stat-block/stat-block";
import { StatBlockM } from "../../../models/stat-block.models";

export function CultureV(props: any) {
  const [culture, setCulture] = useState<CultureM>(props.culture);
  const [bestiaryTags, setBestiaryTags] = useState(props.culture.bestiary_tags.join(", "));
  const [editing, setEditing] = useState(false);

  function updateName(e: React.ChangeEvent<HTMLInputElement>) {
    const name: string = e.target.value.trim();
    setCulture({
      id: culture.id,
      name: name,
      texts: culture.texts,
      bestiary_tags: culture.bestiary_tags
    });
  }
  function addText() {
    setCulture({
      id: culture.id,
      name: culture.name,
      texts: [...culture.texts, ""],
      bestiary_tags: culture.bestiary_tags
    });
  }
  function updateTexts(e: React.ChangeEvent<HTMLTextAreaElement>, i: number) {
    const texts: Array<string> = culture.texts;
    texts[i] = e.target.value;
    setCulture({
      id: culture.id,
      name: culture.name,
      texts: texts,
      bestiary_tags: culture.bestiary_tags
    });
  }
  function updateTags(e: React.ChangeEvent<HTMLInputElement>) {
    const tags: string = e.target.value;
    setBestiaryTags(tags);
  }
  function toggleEditing() {
    if (editing) {
      const save_culture = culture;
      save_culture.bestiary_tags = bestiaryTags.split(",").map((tag: string) => tag.trim());
      props.updateCulture(save_culture);
    }
    setEditing(!editing);
  }

  const stat_blocks: Array<StatBlockM> = state_bestiary.filter(entry => entry.tags.some(value => culture.bestiary_tags.includes(value)));

  return <div className="culture">
    {!editing && <div className="culture--display">
      <h1 className="culture--display--title">{culture.name}</h1>
      <h2 className="culture--display--subtitle">Description</h2>
      <div className="culture--display--texts">
        {culture.texts.map((text: string, i: number) =>
          <span key={"culture--text-" + i} className="culture--display--text">
            {parseText(text)}
          </span>
        )}
      </div>
      <h2 className="culture--display--subtitle">Bestiary</h2>
      <div className="culture--display--besiary">
        {stat_blocks.map((stat_block: StatBlockM, i: number) => 
          <div key={"culture--stat-block-" + i} className="culture--display--stat-block">
            <StatBlockC id={"culture--stat-block-" + i} statBlock={stat_block}/>
          </div>
        )}
      </div>
    </div>}
    {editing && <div className="culture--edit">
      <div className="culture--edit--input-row">
        <label>Name</label>
        <input
          type="text"
          value={culture.name}
          onChange={(e) => { updateName(e) }}
        ></input>
      </div>
      <div className="culture--edit--textarea-row">
        <label>Paragraphs</label>
        {culture.texts.map((text: string, i: number) =>
          <textarea
            key={"culture--edit--text-" + i}
            value={culture.texts[i]}
            onChange={(e) => { updateTexts(e, i) }}
          ></textarea>
        )}
        <div className="culture--edit--add-text">
          <button onClick={addText}>Add text</button>
        </div>
      </div>
      <div className="culture--edit--input-row">
        <label>Bestiary tags</label>
        <input
          type="text"
          value={bestiaryTags}
          onChange={(e) => { updateTags(e) }}
        ></input>
      </div>
    </div>}
    {!!props.updateCulture && <div className="culture--buttons">
      <button onClick={toggleEditing}>
        {editing ? "Save" : "Edit"}
      </button>
    </div>}
  </div>;
}
