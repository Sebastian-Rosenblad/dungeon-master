import { useState } from 'react';
import './App.scss';
import { ArmoryV } from './views/armory/armory';
import { BestiaryV } from './views/bestiary/bestiary';
import { CulturesV } from './views/cultures/cultures';
import { ScenariosV } from './views/scenarios/scenarios';
import { armory_string } from './functions/armory.functions';
import { bestiary_string } from './functions/bestiary.functions';
import { cultures_string } from './functions/culture.functions';
import { scenarios_string } from './functions/scenario.functions';

enum Views {
  Scenarios,
  Cultures,
  Bestiary,
  Armory
}

function App() {
  const [view, setView] = useState(Views.Scenarios);
  
  return (
    <div className='App'>
      <nav className='App--navigation'>
        <button
          onClick={() => { if (view === Views.Scenarios) console.log(scenarios_string()); setView(Views.Scenarios); }}
        >Scenarios</button>
        <button
          onClick={() => { if (view === Views.Cultures) console.log(cultures_string()); setView(Views.Cultures); }}
        >Cultures</button>
        <button
          onClick={() => { if (view === Views.Bestiary) console.log(bestiary_string()); setView(Views.Bestiary); }}
        >Bestiary</button>
        <button
          onClick={() => { if (view === Views.Armory) console.log(armory_string()); setView(Views.Armory); }}
        >Armory</button>
      </nav>
      {view === Views.Scenarios && <ScenariosV />}
      {view === Views.Cultures && <CulturesV />}
      {view === Views.Bestiary && <BestiaryV />}
      {view === Views.Armory && <ArmoryV />}
    </div>
  );
}

export default App;
