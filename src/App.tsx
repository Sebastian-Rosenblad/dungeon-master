import React, { useState } from 'react';
import './App.scss';
import { BestiaryV } from './views/bestiary/bestiary';
import { CulturesV } from './views/cultures/cultures';
import { ScenariosV } from './views/scenarios/scenarios';

enum Views {
  Scenarios,
  Cultures,
  Bestiary
}

function App() {
  const [view, setView] = useState(Views.Scenarios);
  
  return (
    <div className="App">
      <nav>
        <span><button onClick={() => { setView(Views.Scenarios); }}>Scenarios</button> | </span>
        <span><button onClick={() => { setView(Views.Cultures); }}>Cultures</button> | </span>
        <span><button onClick={() => { setView(Views.Bestiary); }}>Bestiary</button></span>
      </nav>
      {view === Views.Scenarios && <ScenariosV />}
      {view === Views.Cultures && <CulturesV />}
      {view === Views.Bestiary && <BestiaryV />}
    </div>
  );
}

export default App;
