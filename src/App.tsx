import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePageP } from './pages/HomePage';
import { ProjectPageP } from './pages/ProjectPage';

function App() {
  return <Routes>
    <Route index element={<HomePageP />} />
    <Route path="project/:projectId" element={<ProjectPageP />} />
  </Routes>
}

export default App;
