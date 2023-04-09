import { useEffect, useState } from "react";
import "./cultures.scss";
import { state_cultures, set_cultures, NewCulture } from "../../functions/culture.functions";
import { CultureM } from "../../models/culture.model";
import { CultureV } from "./culture/culture";

export function CulturesV() {
  const [cultures, setCultures] = useState<Array<CultureM>>(state_cultures);
  const [culture, setCulture] = useState<CultureM | undefined>(undefined);
  
  useEffect(() => {
    set_cultures(cultures);
  });

  function addCulture() {
    setCultures([...cultures, NewCulture()]);
  }
  function viewCulture(id: string) {
    const index: number = cultures.findIndex(c => c.id === id);
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
    setCulture(new_culture);
  }

  return <div className="cultures">
    {!culture && <div>
      <h1 className="cultures--header">Cultures</h1>
      <div className="cultures--body">
        {cultures.map((culture: CultureM) =>
          <div key={"culture-" + culture.id} className="cultures--body--culture">
            <button onClick={() => { viewCulture(culture.id); }}>
              {culture.name}
            </button>
          </div>
        )}
      </div>
      <div className="cultures--footer">
        <button onClick={addCulture}>Add culture</button>
      </div>
    </div>}
    {!!culture && <div>
      <div className="cultures--buttons">
        <button onClick={() => { viewCulture(""); }}>Back to all cultures</button>
      </div>
      <div className="cultures--culture">
        <CultureV
          culture={culture}
          updateCulture={(new_culture: CultureM) => { updateCulture(new_culture); }}
        />
      </div>
    </div>}
  </div>;
}
