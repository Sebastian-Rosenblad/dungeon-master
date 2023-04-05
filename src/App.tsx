import { useState } from 'react';
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
    <div className='App'>
      <nav className='App--navigation'>
        <button onClick={() => { setView(Views.Scenarios); }}>Scenarios</button>
        <button onClick={() => { setView(Views.Cultures); }}>Cultures</button>
        <button onClick={() => { setView(Views.Bestiary); }}>Bestiary</button>
      </nav>
      {view === Views.Scenarios && <ScenariosV />}
      {view === Views.Cultures && <CulturesV />}
      {view === Views.Bestiary && <BestiaryV />}
    </div>
  );
}

export default App;
