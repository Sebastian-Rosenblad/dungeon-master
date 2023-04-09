import React, { useState } from "react";
import "./stat-block.scss";
import { ParseStatBlock, StringifyStatBlock } from "../../functions/bestiary.functions";
import { StatBlockM } from "../../models/stat-block.models";

export function StatBlockEditC(props: {
  statBlock: StatBlockM;
  update: (stat_block: StatBlockM) => void
}) {
  const [input, setInput] = useState(StringifyStatBlock(props.statBlock));
  const [tags, setTags] = useState(props.statBlock.tags.join(", "));
  const [saved, setSaved] = useState(true);

  const updateInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    setSaved(false);
  }
  function updateTags(e: React.ChangeEvent<HTMLInputElement>) {
    setTags(e.target.value);
    setSaved(false);
  }
  function save() {
    const new_stat_block = ParseStatBlock(input);
    new_stat_block.id = props.statBlock.id;
    new_stat_block.tags = tags.split(",").map(t => t.trim());
    setSaved(true);
    props.update(new_stat_block);
  }

  return <div className="stat-block--edit">
    <div className="stat-block--edit--textarea">
      <textarea value={input} onChange={(e) => { updateInput(e); }}></textarea>
    </div>
    <div className="stat-block--edit--input">
      <label>Tags</label>
      <input
        type="text"
        value={tags}
        onChange={(e) => { updateTags(e); }}
      ></input>
    </div>
    {!saved && <div className="stat-block--edit--buttons">
      <button onClick={save}>Save</button>
    </div>}
  </div>;
}
