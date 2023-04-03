import { RandomID } from "../assets/randomizer";
import { culture_db } from "../database/culture.db";
import { CultureM } from "../models/culture.model";

export let state_cultures: Array<CultureM> = JSON.parse(JSON.stringify(culture_db));

export function NewCulture(): CultureM {
  return {
    id: RandomID(),
    name: "New culture",
    texts: [],
    bestiary_tags: []
  };
}
