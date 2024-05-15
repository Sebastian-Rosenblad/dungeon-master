import { combineReducers } from '@reduxjs/toolkit';
import projectReducer from '../features/projects/project-slice';
import articleReducer from '../features/articles/article-slice';

const rootReducer = combineReducers({
  projects: projectReducer,
  articles: articleReducer,
});

export default rootReducer;
