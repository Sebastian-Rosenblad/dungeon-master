import React, { useState } from "react";
import "./stat-block.scss";
import { ParseStatBlock } from "../../database/bestiary-functions";
import { StatBlockM } from "../../models/stat-block.models";

export function StatBlockC(props: any) {
  const id: string = props.id;
  const [statBlock, setStatBlock] = useState<StatBlockM>(props.statBlock);
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState("");
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  }

  function parseInput() {
    setStatBlock(ParseStatBlock(input));
  }
  function toggleEdit() {
    if (editing)
      props.update(statBlock);
    setEditing(!editing);
  }

  function attributeModifier(value: number): string {
    return (value >= 10 ? "+" : "") + (Math.floor(value / 2) - 5);
  }
  function challengeRating(cr: number): string {
    if (cr < 1)
      return "1/" + Math.round(1 / cr);
    return cr.toString();
  }
  function experienceYield(cr: number): string {
    const cr2xp: Array<{ cr: number; xp: number; }> = [{cr:1/8,xp:25},{cr:1/4,xp:50},{cr:1/2,xp:100},{cr:1,xp:200},{cr:2,xp:430},{cr:3,xp:700},{cr:4,xp:1100},{cr:5,xp:1800}];
    const item = cr2xp.find(item => item.cr === cr);
    if (item)
      return item.xp + " xp";
    return "0 xp";
  }

  return <div className="stat-block">
    {!editing && <div className="stat-block--display">
      <h2 className="stat-block--display--title">{statBlock.name}</h2>
      <p className="stat-block--display--subtitle">({statBlock.size} {statBlock.type}, {statBlock.alignment})</p>
      {statBlock.description && <span className="stat-block--display--description">
        {statBlock.description.split("<br/>").map((d, i) => <p key={id + "-description-" + i}>{d}</p>)}
      </span>}
      <div className="stat-block--display--content">
        <p>
          <b>Armor Class:</b> {statBlock.armor + (statBlock.armor_source ? " (" + statBlock.armor_source + ")" : "")}<br/>
          <b>Hit Points:</b> {statBlock.health} ({statBlock.health_source})<br/>
          <b>Speed:</b> {statBlock.speed.join(", ")}
        </p>
        <p>
          <span><b>STR:</b> {statBlock.attribute.strength} ({attributeModifier(statBlock.attribute.strength)}) | </span>
          <span><b>DEX:</b> {statBlock.attribute.dexterity} ({attributeModifier(statBlock.attribute.dexterity)}) | </span>
          <span><b>CON:</b> {statBlock.attribute.constitution} ({attributeModifier(statBlock.attribute.constitution)}) | </span>
          <span><b>INT:</b> {statBlock.attribute.intelligence} ({attributeModifier(statBlock.attribute.intelligence)}) | </span>
          <span><b>WIS:</b> {statBlock.attribute.wisdom} ({attributeModifier(statBlock.attribute.wisdom)}) | </span>
          <span><b>CHA:</b> {statBlock.attribute.charisma} ({attributeModifier(statBlock.attribute.charisma)})</span>
        </p>
        <p>
          {statBlock.saving_throws && <span><b>Saving Throws:</b> {statBlock.saving_throws.join(", ")}<br/></span>}
          {statBlock.skills && <span><b>Skills:</b> {statBlock.skills.join(", ")}<br/></span>}
          {statBlock.vulnerabilities && <span><b>Vulnerabilities:</b> {statBlock.vulnerabilities.join(", ")}<br/></span>}
          {statBlock.resistances && <span><b>Resistances:</b> {statBlock.resistances.join(", ")}<br/></span>}
          {statBlock.immunities && <span><b>Immunities:</b> {statBlock.immunities.join(", ")}<br/></span>}
          {statBlock.condition_immunities && <span><b>Condition Immunities:</b> {statBlock.condition_immunities.join(", ")}<br/></span>}
          {statBlock.senses && <span><b>Senses:</b> {statBlock.senses.join(", ")}<br/></span>}
          {statBlock.languages && <span><b>Languages:</b> {statBlock.languages.join(", ")}<br/></span>}
          <b>Challenge:</b> {challengeRating(statBlock.challenge)} ({experienceYield(statBlock.challenge)})
        </p>
        {statBlock.traits && <span>
          <h3>Traits:</h3>
          {statBlock.traits.map((trait, i) => <p key={id + "-trait-" + i}><b>{trait.name}:</b> {trait.description}</p>)}
        </span>}
        {statBlock.spellcaster && statBlock.spells && <span>
          <h3>Spellcasting:</h3>
          <p>{statBlock.spellcaster}</p>
          <ul>
            {statBlock.spells.map((level, i) => <li key={id + "-spelllevel-" + i}>{level.level}: {level.spells.join(", ")}</li>)}
          </ul>
        </span>}
        {statBlock.actions && <span>
          <h3>Actions:</h3>
          {statBlock.actions.map((action, i) => <p key={id + "-action-" + i}><b>{action.name}:</b> {action.description}</p>)}
        </span>}
        {statBlock.bonus_action && <span>
          <h3>Bonus Actions:</h3>
          {statBlock.bonus_action.map((action, i) => <p key={id + "-bonus_action-" + i}><b>{action.name}:</b> {action.description}</p>)}
        </span>}
        {statBlock.reactions && <span>
          <h3>Reactions:</h3>
          {statBlock.reactions.map((action, i) => <p key={id + "-reaction-" + i}><b>{action.name}:</b> {action.description}</p>)}
        </span>}
      </div>
    </div>}
    {editing && <div className="stat-block--edit">
      <div className="stat-block--edit--textarea">
        <textarea value={input} onChange={handleInput}></textarea>
        <button onClick={parseInput}>Parse</button>
      </div>
    </div>}
    <div className="stat-block--buttons">
      <button onClick={toggleEdit}>{editing ? "Save" : "Edit"}</button>
    </div>
  </div>;
}
