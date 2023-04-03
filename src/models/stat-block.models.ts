export interface StatBlockM {
  name: string;
  description?: string;
  tags: Array<string>;
  size: string;
  type: string;
  alignment: string;
  armor: number;
  armor_source?: string;
  health: number;
  health_source: string;
  speed: Array<string>;
  attribute: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  saving_throws?: Array<string>;
  skills?: Array<string>;
  senses?: Array<string>;
  vulnerabilities?: Array<string>;
  resistances?: Array<string>;
  immunities?: Array<string>;
  condition_immunities?: Array<string>;
  languages?: Array<string>;
  challenge: number;
  traits?: Array<{
    name: string;
    description: string;
  }>;
  spellcaster?: string;
  spells?: Array<{
    level: string;
    spells: Array<string>;
  }>;
  actions?: Array<{
    name: string;
    description: string;
  }>;
  bonus_action?: Array<{
    name: string;
    description: string;
  }>;
  reactions?: Array<{
    name: string;
    description: string;
  }>;
}
