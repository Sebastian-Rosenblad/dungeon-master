import { useEffect, useState } from "react";
import { StatBlockC } from "../../components/stat-block/stat-block";
import { state_bestiary, NewStatBlock } from "../../database/bestiary-functions";
import { StatBlockM } from "../../models/stat-block.models";

export function BestiaryV() {
  const [bestiary, setBestiary] = useState(state_bestiary);

  useEffect(() => {
    console.clear()
    console.log(JSON.stringify(bestiary));
  });
  
  function addEntry() {
    setBestiary([...bestiary, NewStatBlock()]);
  }
  function updateEntry(entry: StatBlockM, index: number) {
    setBestiary(bestiary.map((item: StatBlockM, i: number) => {
      return i === index ? entry : item;
    }));
  }

  return <article>
    <section className="bestiary-header">
      <h1>Bestiary</h1>
    </section>
    <section className="bestiary-body">
      {bestiary.map((entry: StatBlockM, i: number) =>
        <StatBlockC id={i} statBlock={entry} update={(statBlock: StatBlockM) => { updateEntry(statBlock, i); }} key={"entry-" + i} />)
      }
    </section>
    <section className="bestiary-footer">
      <button onClick={addEntry}>Add entry</button>
    </section>
  </article>;
}
