import { StatBlockM } from "../models/stat-block.models";
import { bestiary_db } from "./bestiary";

export let state_bestiary: Array<StatBlockM> = JSON.parse(JSON.stringify(bestiary_db));

let text2parse: string;
let indexes: Array<{ i: number, key: string }>;

export function NewStatBlock(): StatBlockM {
  return {
    name: "New entry",
    size: "",
    type: "",
    alignment: "",
    armor: 0,
    health: 0,
    health_source: "",
    speed: [],
    attribute: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10
    },
    challenge: 0
  };
}
export function ParseStatBlock(text: string): StatBlockM {
  text2parse = text;
  SetIndexes();
  let statBlock: StatBlockM = {
    name: GetString("name"),
    size: GetString("size").toLowerCase(),
    type: GetString("type").toLowerCase(),
    alignment: GetString("alignment").toLowerCase(),
    armor: GetNumber("armor"),
    health: GetNumber("health"),
    health_source: GetNumberSource("health"),
    speed: GetStringArray("speed"),
    attribute: {
      strength: GetNumber("str"),
      dexterity: GetNumber("dex"),
      constitution: GetNumber("con"),
      intelligence: GetNumber("int"),
      wisdom: GetNumber("wis"),
      charisma: GetNumber("cha")
    },
    challenge: GetNumber("challenge")
  };
  let _str = GetString("description");
  if (_str)
    statBlock.description = _str.slice(_str.indexOf(":") + 1).trim();
  _str = GetNumberSource("armor");
  if (_str)
    statBlock.armor_source = _str;
  let _strs = GetStringArray("saves");
  if (_strs.length > 0)
    statBlock.saving_throws = _strs;
  _strs = GetStringArray("skills");
  if (_strs.length > 0)
    statBlock.skills = _strs;
  _strs = GetStringArray("senses");
  if (_strs.length > 0)
    statBlock.senses = _strs;
  _strs = GetStringArray("vulnerabilities");
  if (_strs.length > 0)
    statBlock.vulnerabilities = _strs;
  _strs = GetStringArray("resistances");
  if (_strs.length > 0)
    statBlock.resistances = _strs;
  _strs = GetStringArray("immunities");
  if (_strs.length > 0)
    statBlock.immunities = _strs;
  _strs = GetStringArray("conditionimmunities");
  if (_strs.length > 0)
    statBlock.condition_immunities = _strs;
  _strs = GetStringArray("languages");
  if (_strs.length > 0)
    statBlock.languages = _strs;
  let _objs = GetObjectArray("traits");
  if (_objs.length > 0)
    statBlock.traits = _objs;
  _objs = GetObjectArray("actions");
  if (_objs.length > 0)
    statBlock.actions = _objs;
  _objs = GetObjectArray("bonusactions");
  if (_objs.length > 0)
    statBlock.bonus_action = _objs;
  _objs = GetObjectArray("reactions");
  if (_objs.length > 0)
    statBlock.reactions = _objs;
  _str = GetSpellcaster();
  if (_str.length > 0) {
    statBlock.spellcaster = _str;
    statBlock.spells = GetSpells();
  }
  return statBlock;
}
function SetIndexes() {
  indexes = [
    { i: 0, key: "name" },
    { i: text2parse.indexOf("(") + 1, key: "size" }
  ];
  indexes.push({ i: indexes[1].i + text2parse.slice(indexes[1].i).indexOf(" "), key: "type" });
  indexes.push({ i: indexes[2].i + text2parse.slice(indexes[2].i).indexOf(",") + 1, key: "alignment" });
  const items = [
    { search: "Description:", key: "description" },
    { search: "Armor Class:", key: "armor" },
    { search: "Hit Points:", key: "health" },
    { search: "Speed:", key: "speed" },
    { search: "STR:", key: "str" },
    { search: "DEX:", key: "dex" },
    { search: "CON:", key: "con" },
    { search: "INT:", key: "int" },
    { search: "WIS:", key: "wis" },
    { search: "CHA:", key: "cha" },
    { search: "Saving Throws:", key: "saves" },
    { search: "Skills:", key: "skills" },
    { search: "Senses:", key: "senses" },
    { search: "Damage Vulnerabilities:", key: "vulnerabilities" },
    { search: "Damage Resistances:", key: "resistances" },
    { search: "Damage Immunities:", key: "immunities" },
    { search: "Condition Immunities:", key: "conditionimmunities" },
    { search: "Languages:", key: "languages" },
    { search: "Challenge:", key: "challenge" },
    { search: "Traits:", key: "traits" },
    { search: "Spellcasting:", key: "spellcasting" },
    { search: "Actions:", key: "actions" },
    { search: "Bonus Actions:", key: "bonusactions" },
    { search: "Reactions:", key: "reactions" }
  ];
  items.forEach(item => {
    indexes.push({ i: text2parse.indexOf(item.search), key: item.key });
  });
  indexes.sort((a, b) => a.i - b.i);
}
function GetString(key: string): string {
  for (let i = 0; i < indexes.length; i++) {
    if (indexes[i].key === key && indexes[i].i >= 0) {
      let start: number = indexes[i].i, end: number = i + 1 >= indexes.length ? -1 : indexes[i + 1].i;
      return text2parse.slice(start, end).trim().replace(/(?:\(|,|\))$/, '').trim();
    }
  }
  return "";
}
function GetNumber(key: string): number {
  for (let i = 0; i < indexes.length; i++) {
    if (indexes[i].key === key && indexes[i].i >= 0) {
      let start: number = indexes[i].i, end: number = i + 1 >= indexes.length ? -1 : indexes[i + 1].i;
      const segment = text2parse.slice(start, end).trim();
      if (segment.indexOf("(") > 0)
        return ParseNumber(segment.slice(segment.indexOf(":") + 1, segment.indexOf("(")).trim());
      return ParseNumber(segment.slice(segment.indexOf(":") + 1).trim());
    }
  }
  return -1;
}
function GetNumberSource(key: string): string {
  for (let i = 0; i < indexes.length; i++) {
    if (indexes[i].key === key && indexes[i].i >= 0) {
      let start: number = indexes[i].i, end: number = i + 1 >= indexes.length ? -1 : indexes[i + 1].i;
      const segment = text2parse.slice(start, end).trim();
      if (segment.indexOf("(") >= 0)
        return segment.slice(segment.indexOf("(") + 1, segment.indexOf(")")).trim();
      return "";
    }
  }
  return "";
}
function GetStringArray(key: string): Array<string> {
  for (let i = 0; i < indexes.length; i++) {
    if (indexes[i].key === key && indexes[i].i >= 0) {
      let start: number = indexes[i].i, end: number = i + 1 >= indexes.length ? -1 : indexes[i + 1].i;
      const segment = text2parse.slice(start, end).trim();
      return segment.slice(segment.indexOf(":") + 1).trim().split(",").map(item => item.trim());
    }
  }
  return [];
}
function GetObjectArray(key: string): Array<{ name: string; description: string; }> {
  for (let i = 0; i < indexes.length; i++) {
    if (indexes[i].key === key && indexes[i].i >= 0) {
      let start: number = indexes[i].i, end: number = i + 1 >= indexes.length ? -1 : indexes[i + 1].i;
      const segment = text2parse.slice(start, end).trim();
      const items = segment.split("\n").slice(1).filter(item => item.trim().length > 0);
      return items.map((item: string) => {
        return {
          name: item.slice(0, item.indexOf(":")).trim(),
          description: item.slice(item.indexOf(":") + 1).trim()
        }
      });
    }
  }
  return [];
}
function GetSpellcaster(): string {
  for (let i = 0; i < indexes.length; i++) {
    if (indexes[i].key === "spellcasting" && indexes[i].i >= 0) {
      let start: number = indexes[i].i, end: number = i + 1 >= indexes.length ? -1 : indexes[i + 1].i;
      const segment = text2parse.slice(start, end).trim();
      start = segment.indexOf(":") + 1;
      end = segment.slice(start).indexOf(":") + start;
      return segment.slice(start, end).trim();
    }
  }
  return "";
}
function GetSpells(): Array<{ level: string; spells: Array<string>; }> {
  for (let i = 0; i < indexes.length; i++) {
    if (indexes[i].key === "spellcasting" && indexes[i].i >= 0) {
      let start: number = indexes[i].i, end: number = i + 1 >= indexes.length ? -1 : indexes[i + 1].i;
      let segment = text2parse.slice(start, end).trim();
      segment = segment.slice(segment.indexOf(":") + 1);
      segment = segment.slice(segment.indexOf(":") + 1).trim();
      const SpellLevels = segment.split("\n");
      let spells: Array<{ level: string; spells: Array<string>; }> = [];
      SpellLevels.forEach(level => {
        spells.push({
          level: level.slice(0, level.indexOf(":")),
          spells: level.slice(level.indexOf(":") + 1).trim().split(",").map(spell => spell.trim())
        });
      });
      return spells;
    }
  }
  return [];
}
function ParseNumber(text: string): number {
  if (text.includes("/"))
    return text.split("/").map(num => parseInt(num)).reduce((a, b) => a / b, 1);
  return parseInt(text);
}