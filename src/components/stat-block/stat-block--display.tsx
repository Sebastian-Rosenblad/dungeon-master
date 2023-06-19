import "./stat-block.scss";
import { ParseText } from "../../assets/parse-text";
import { StatBlockM } from "../../models/stat-block.models";

export function StatBlockDisplayC(props: {statBlock: StatBlockM}) {
  const statBlock = props.statBlock;

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

  return <div className="stat-block--display">
    <p className="stat-block--display--subtitle">({statBlock.size} {statBlock.type}, {statBlock.alignment})</p>
    {(statBlock.description || statBlock.img) && <div className="stat-block--display--description">
      {statBlock.description && <div className="stat-block--display--description--text">{statBlock.description.split("<br/>").map((d, i) => <div key={statBlock.id + "-description-" + i}>
        {ParseText(d, statBlock.id + "-description-" + i)}
      </div>)}</div>}
      {statBlock.img && <img src={'./images/' + statBlock.img} alt={statBlock.name}/>}
    </div>}
    <div className="stat-block--display--content">
      <p className="dont-break">
        <b>Armor Class:</b> {statBlock.armor + (statBlock.armor_source ? " (" + statBlock.armor_source + ")" : "")}<br/>
        <b>Hit Points:</b> {statBlock.health} ({statBlock.health_source})<br/>
        <b>Speed:</b> {statBlock.speed.join(", ")}
      </p>
      <p className="dont-break">
        <b>STR:</b> {statBlock.attribute.strength} ({attributeModifier(statBlock.attribute.strength)}) | <b>DEX:</b> {statBlock.attribute.dexterity} ({attributeModifier(statBlock.attribute.dexterity)}) | <b>CON:</b> {statBlock.attribute.constitution} ({attributeModifier(statBlock.attribute.constitution)}) | <b>INT:</b> {statBlock.attribute.intelligence} ({attributeModifier(statBlock.attribute.intelligence)}) | <b>WIS:</b> {statBlock.attribute.wisdom} ({attributeModifier(statBlock.attribute.wisdom)}) | <b>CHA:</b> {statBlock.attribute.charisma} ({attributeModifier(statBlock.attribute.charisma)})
      </p>
      <p className="dont-break">
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
      {statBlock.traits && <div className="dont-break">
        <h4>Traits</h4>
        {statBlock.traits.map((trait, i) => <p key={statBlock.id + "-trait-" + i}><b>{trait.name}:</b> {trait.description}</p>)}
      </div>}
      {statBlock.spellcaster && statBlock.spells && <div className="dont-break">
        <h4>Spellcasting</h4>
        <p>{statBlock.spellcaster}</p>
        <ul>
          {statBlock.spells.map((level, i) => <li key={statBlock.id + "-spelllevel-" + i}>{level.level}: {level.spells.join(", ")}</li>)}
        </ul>
      </div>}
      {statBlock.actions && <div className="dont-break">
        <h4>Actions</h4>
        {statBlock.actions.map((action, i) => <p key={statBlock.id + "-action-" + i}><b>{action.name}:</b> {action.description}</p>)}
      </div>}
      {statBlock.bonus_action && <div className="dont-break">
        <h4>Bonus Actions</h4>
        {statBlock.bonus_action.map((action, i) => <p key={statBlock.id + "-bonus_action-" + i}><b>{action.name}:</b> {action.description}</p>)}
      </div>}
      {statBlock.reactions && <div className="dont-break">
        <h4>Reactions</h4>
        {statBlock.reactions.map((action, i) => <p key={statBlock.id + "-reaction-" + i}><b>{action.name}:</b> {action.description}</p>)}
      </div>}
    </div>
  </div>;
}