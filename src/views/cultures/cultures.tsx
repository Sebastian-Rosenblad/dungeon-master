import { useEffect, useState } from "react";
import "./cultures.scss";
import { NewCulture, state_cultures } from "../../functions/culture.functions";
import { CultureM } from "../../models/culture.model";
import { CultureV } from "./culture/culture";

export function CulturesV() {
  const [cultures, setCultures] = useState<Array<CultureM>>(state_cultures);
  const [culture, setCulture] = useState<CultureM | undefined>(undefined);
  
  useEffect(() => {
    console.clear();
    console.log('import{CultureM}from"../models/culture.model";export const culture_db:Array<CultureM>=' + JSON.stringify(cultures) + ';');
  });

  function addCulture() {
    setCultures([...cultures, NewCulture()]);
  }
  function viewCulture(id: string) {
    const index: number = cultures.map(culture => culture.id).indexOf(id);
    if (index >= 0)
      setCulture(cultures[index]);
    else
      setCulture(undefined);
  }
  function updateCulture(new_culture: CultureM) {
    const index: number = cultures.findIndex(c => c.id === new_culture.id);
    if (index >= 0) {
      const new_cultures = JSON.parse(JSON.stringify(cultures));
      new_cultures[index] = new_culture;
      setCultures(new_cultures);
    }
  }

  return <div className="cultures">
    {!culture && <span>
      <h1 className="cultures--title">Cultures</h1>
      <div className="cultures--list">
        {cultures.map((culture: CultureM, i: number) =>
          <h2
            key={"culture-" + i}
            className="cultures--list--culture"
            onClick={() => { viewCulture(culture.id); }}
          >
            {culture.name}
          </h2>
        )}
      </div>
      <div className="cultures--buttons">
        <button onClick={addCulture}>Add culture</button>
      </div>
    </span>}
    {!!culture && <span>
      <div className="cultures--buttons">
        <button onClick={() => { viewCulture(""); }}>Back to all cultures</button>
      </div>
      <CultureV
        culture={culture}
        updateCulture={(new_culture: CultureM) => { updateCulture(new_culture); }}
      />
    </span>}
  </div>;
}
