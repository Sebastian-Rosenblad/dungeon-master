import { ItemC } from "../components/item/item";
import { StatBlockC } from "../components/stat-block/stat-block";
import { state_armory } from "../functions/armory.functions";
import { state_bestiary } from "../functions/bestiary.functions";

export function ParseText(text: string, id?: string) {
  if (text.includes("[img]")) {
    const options = text.slice(5).split(";");
    if (options.length > 3)
      return <span><img src={"./images/" + options[0]} alt={options[1]} className={options[2]}/><p>{options[3]}</p></span>
    return <img src={"./images/" + options[0]} alt={options[1]} className={options[2]}/>
  }
  if (id && text.includes("[item]")) {
    const view_item = state_armory.find(item => item.name === text.split("[item]").join(""));
    if (view_item)
      return <ItemC itemID={id} item={view_item}/>
    return <p>{ text.split("[item]").join("") }</p>;
  }
  if (id && text.includes("[item_tags]")) {
    const items = state_armory.filter(item => item.tags.includes(text.split("[item_tags]").join("")));
    if (items.length > 0)
      return <div className="parsed-armory-list">{items.map((item, i) => <div key={id + "-item-" + i}>
        <ItemC itemID={id} item={item}/>
      </div>)}</div>;
    return <p>{ text.split("[item_tags]").join("") }</p>;
  }
  if (text.includes("[bestiary]")) {
    const stat_block = state_bestiary.find(entry => entry.name === text.split("[bestiary]").join(""));
    if (stat_block)
      return <StatBlockC statBlock={stat_block}/>
    return <p>{ text.split("[bestiary]").join("") }</p>;
  }
  if (id && text.includes("[bestiary_tags]")) {
    const entries = state_bestiary.filter(entry => entry.tags.includes(text.split("[bestiary_tags]").join("")));
    if (entries.length > 0)
      return <div className="parsed-bestiary-list">{entries.map((entry, i) => <div key={id + "-entry-" + i}>
        <StatBlockC statBlock={entry}/>
      </div>)}</div>;
    return <p>{ text.split("[bestiary_tags]").join("") }</p>;
  }
  if (id && text.includes("<ul>")) {
    let ulist: string = text.split(/(?:<ul>|<\/ul>)/)[1];
    let list_items: Array<string> = ulist.split(/(?:<li>|<\/li>)/).filter(item => item.length > 0);
    return <ul>{list_items.map((item: string, i: number) => <li key={id + "-li-" + i}>{item}</li>)}</ul>;
  }
  if (id && text.includes("<ol>")) {
    let olist: string = text.split(/(?:<ol>|<\/ol>)/)[1];
    let list_items: Array<string> = olist.split(/(?:<li>|<\/li>)/).filter(item => item.length > 0);
    return <ol>{list_items.map((item: string, i: number) => <li key={id + "-li-" + i}>{item}</li>)}</ol>;
  }
  if (text.includes("<b>")) {
    let bolds: Array<string> = text.split(/(?:<b>|<\/b>)/);
    return <p>{bolds.map((bold: string, i: number) => {
      if (bold.length > 0) {
        if (i % 2 === 1)
          return <b key={id + "-b-" + i}>{bold}</b>;
        return <span key={id + "-b-" + i}>{bold}</span>;
      }
      return "";
    })}</p>;
  }
  if (text.includes("<i>")) {
    let italics: Array<string> = text.split(/(?:<i>|<\/i>)/);
    return <p>{italics.map((italic: string, i: number) => {
      if (italic.length > 0) {
        if (i % 2 === 1)
          return <i key={id + "-i-" + i}>{italic}</i>;
        return <span key={id + "-i-" + i}>{italic}</span>;
      }
      return "";
    })}</p>;
  }
  return <p>{text}</p>;
}
