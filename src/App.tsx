import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { HomePageP } from './pages/HomePage';
import { ProjectPageP } from './pages/ProjectPage';

function App() {
  return <div className="app">
    <nav>
      <Link to="/"><h1>Dungeon Master</h1></Link>
    </nav>
    <Routes>
      <Route index element={<HomePageP />} />
      <Route path="project/:projectId" element={<ProjectPageP />} />
    </Routes>
  </div>;
}

export default App;
