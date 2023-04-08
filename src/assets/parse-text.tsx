import { StatBlockC } from "../components/stat-block/stat-block";
import { bestiary_db } from "../database/bestiary.db";

export function ParseText(text: string, id?: string) {
  if (id && text.includes("[bestiary]")) {
    const stat_block = bestiary_db.find(entry => entry.name === text.split("[bestiary]").join(""));
    if (stat_block)
      return <StatBlockC id={id} statBlock={stat_block}/>
    return <span><p>{ text.split("[bestiary]").join("") }</p></span>;
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
          return <b key={id + "-b-" + i}>{bold}</b>
        return bold;
      }
      return "";
    })}</p>
  }
  if (text.includes("<i>")) {
    let italics: Array<string> = text.split(/(?:<i>|<\/i>)/);
    return <p>{italics.map((italic: string, i: number) => {
      if (italic.length > 0) {
        if (i % 2 === 1)
          return <i key={id + "-i-" + i}>{italic}</i>
        return italic;
      }
      return "";
    })}</p>
  }
  return <p>{text}</p>;
}
