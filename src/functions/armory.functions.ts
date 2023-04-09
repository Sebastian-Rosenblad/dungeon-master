import { armory_db } from "../database/armory.db";
import { RandomID } from "../assets/randomizer";
import { ItemM } from "../models/item.models";

const STORAGE_KEY = "dm-armory";
const storage_string: string = localStorage.getItem(STORAGE_KEY) || "";
export let state_armory: Array<ItemM> = JSON.parse(storage_string.length > 0 ? storage_string : JSON.stringify(armory_db));
export function set_armory(armory: Array<ItemM>) {
  state_armory = armory;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(armory));
}
export function armory_string(): string {
  return 'import{ItemM}from"../models/item.models";export const armory_db:Array<ItemM>=' + JSON.stringify(state_armory) + ';';
}

export function NewItem(): ItemM {
  return {
    id: RandomID(),
    name: "New item",
    text: [],
    tags: []
  };
}
