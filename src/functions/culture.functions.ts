import { culture_db } from "../database/culture.db";
import { RandomID } from "../assets/randomizer";
import { CultureM } from "../models/culture.model";

const STORAGE_KEY = "dm-cultures";
const storage_string: string = localStorage.getItem(STORAGE_KEY) || "";
export let state_cultures: Array<CultureM> = JSON.parse(storage_string.length > 0 ? storage_string : JSON.stringify(culture_db));
export function set_cultures(cultures: Array<CultureM>) {
  state_cultures = cultures;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cultures));
}
export function cultures_string(): string {
  return 'import{CultureM}from"../models/culture.model";export const culture_db:Array<CultureM>=' + JSON.stringify(state_cultures) + ';';
}

export function NewCulture(): CultureM {
  return {
    id: RandomID(),
    name: "New culture",
    description: [],
    chapters: []
  };
}
