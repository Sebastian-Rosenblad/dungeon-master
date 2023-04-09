import { useState } from "react";
import "./stat-block.scss";
import { StatBlockM } from "../../models/stat-block.models";
import { StatBlockEditC } from "./stat-block--edit";
import { StatBlockDisplayC } from "./stat-block--display";

export function StatBlockC(props: any) {
  const [statBlock, setStatBlock] = useState<StatBlockM>(props.statBlock);
  const [editing, setEditing] = useState(false);
  const [hiding, setHiding] = useState(true);

  function toggleEdit() {
    if (editing)
      props.update(statBlock);
    setEditing(!editing);
  }
  function toggleHide() {
    setHiding(!hiding);
    if (editing)
      props.update(statBlock);
    setEditing(false);
  }
  
  return <div className="stat-block">
    <button className="stat-block--hide-button button-small" onClick={toggleHide}>{hiding ? "Show" : "Hide"}</button>
    {!editing && <h1 className="stat-block--header">{statBlock.name}</h1>}
    {!hiding && !editing &&
      <StatBlockDisplayC statBlock={statBlock} />
    }
    {!hiding && editing &&
      <StatBlockEditC statBlock={statBlock} update={(new_statBlock: StatBlockM) => { setStatBlock(new_statBlock); }}/>
    }
    {!hiding && props.update && <div className="stat-block--footer">
      <button onClick={toggleEdit}>{editing ? "Back" : "Edit"}</button>
    </div>}
  </div>;
}
