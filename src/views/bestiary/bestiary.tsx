import { useEffect, useState } from "react";
import "./bestiary.scss";
import { state_bestiary, set_bestiary, NewStatBlock } from "../../functions/bestiary.functions";
import { StatBlockC } from "../../components/stat-block/stat-block";
import { StatBlockM } from "../../models/stat-block.models";

export function BestiaryV() {
  const [bestiary, setBestiary] = useState(state_bestiary);

  useEffect(() => {
    set_bestiary(bestiary);
  });
  
  function addEntry() {
    setBestiary([...bestiary, NewStatBlock()]);
  }
  function updateEntry(entry: StatBlockM) {
    const index: number = bestiary.findIndex(e => e.id === entry.id);
    if (index >= 0) {
      const new_bestiary: Array<StatBlockM> = JSON.parse(JSON.stringify(bestiary));
      new_bestiary[index] = entry;
      setBestiary(new_bestiary);
    }
  }

  return <div className="bestiary">
    <h1 className="bestiary--header">Bestiary</h1>
    <div className="bestiary--body">
      {bestiary.map((entry: StatBlockM) =>
        <div key={"entry-" + entry.id} className="bestiary--body--entry">
          <StatBlockC
            statBlock={entry}
            update={(stat_block: StatBlockM) => { updateEntry(stat_block); }}
          />
        </div>
      )}
    </div>
    <div className="bestiary--footer">
      <button onClick={addEntry}>Add entry</button>
    </div>
  </div>;
}
