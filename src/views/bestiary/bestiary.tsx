import { useEffect, useState } from "react";
import "./bestiary.scss";
import { StatBlockC } from "../../components/stat-block/stat-block";
import { state_bestiary, NewStatBlock } from "../../functions/bestiary.functions";
import { StatBlockM } from "../../models/stat-block.models";

export function BestiaryV() {
  const [bestiary, setBestiary] = useState(state_bestiary);

  useEffect(() => {
    console.clear()
    console.log('import{StatBlockM}from"../models/stat-block.models";export const bestiary_db:Array<StatBlockM>=' + JSON.stringify(bestiary) + ';');
  });
  
  function addEntry() {
    setBestiary([...bestiary, NewStatBlock()]);
  }
  function updateEntry(entry: StatBlockM, index: number) {
    setBestiary(bestiary.map((item: StatBlockM, i: number) => {
      return i === index ? entry : item;
    }));
  }

  return <div className="bestiary">
    <h1 className="bestiary--title">Bestiary</h1>
    <div className="bestiary--content">
      {bestiary.map((entry: StatBlockM, i: number) =>
        <div className="bestiary--content--entry">
          <StatBlockC
            key={"entry-" + i}
            id={i}
            statBlock={entry}
            update={(statBlock: StatBlockM) => { updateEntry(statBlock, i); }}
          />
        </div>
      )}
    </div>
    <div className="bestiary--buttons">
      <button onClick={addEntry}>Add entry</button>
    </div>
  </div>;
}
