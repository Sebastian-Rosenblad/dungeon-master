import { useEffect, useState } from "react";
import "./armory.scss";
import { state_armory, set_armory, NewItem } from "../../functions/armory.functions";
import { ItemC } from "../../components/item/item";
import { ItemM } from "../../models/item.models";

export function ArmoryV() {
  const [armory, setArmory] = useState(state_armory);

  useEffect(() => {
    set_armory(armory);
  });
  
  function addItem() {
    setArmory([...armory, NewItem()]);
  }
  function updateItem(item: ItemM) {
    const index: number = armory.findIndex(e => e.id === item.id);
    if (index >= 0) {
      const new_armory: Array<ItemM> = JSON.parse(JSON.stringify(armory));
      new_armory[index] = item;
      setArmory(new_armory);
    }
  }

  return <div className="armory">
    <h1 className="armory--header">Armory</h1>
    <div className="armory--body">
      {armory.map((item: ItemM) =>
        <div key={"item-" + item.id} className="armory--body--item">
          <ItemC
            itemID={"item-" + item.id}
            item={item}
            update={(new_item: ItemM) => { updateItem(new_item); }}
          />
        </div>
      )}
    </div>
    <div className="armory--footer">
      <button onClick={addItem}>Add entry</button>
    </div>
  </div>;
}
