import { state_cultures } from "../functions/culture.functions";

let state_ids: Array<string> = [];

export const RandomID = (): string => {
  let id: string = Math.random().toString(36).slice(-8);
  while (stateIDs().includes(id))
    id = Math.random().toString(36).slice(-8);
  state_ids.push(id);
  return id;
}
function stateIDs(): Array<string> {
  if (state_ids.length === 0)
    state_ids = [
      ...state_cultures.map(culture => culture.id)
    ];
  return state_ids;
}
