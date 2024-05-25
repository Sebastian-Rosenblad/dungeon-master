import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { HomePageP } from './pages/HomePage';
import { ProjectPageP } from './pages/ProjectPage';
import { ArticlePageP } from './pages/ArticlePage';
import { IconPageP } from './pages/Debug/IconPage';

function App() {
  return (
    <div className="app">
      <nav>
        <Link to="/"><h1>Dungeon Master</h1></Link>
      </nav>
      <Routes>
        <Route path="icons/" element={<IconPageP />} />
        <Route index element={<HomePageP />} />
        <Route path="project/:projectId" element={<ProjectPageP />} />
        <Route path="article/:articleId" element={<ArticlePageP />} />
      </Routes>
    </div>
  );
}

export default App;
