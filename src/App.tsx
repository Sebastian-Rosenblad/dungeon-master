import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePageP } from './pages/HomePage';

function App() {
  return <Routes>
    <Route path="/" element={<HomePageP />} />
  </Routes>
}

export default App;
