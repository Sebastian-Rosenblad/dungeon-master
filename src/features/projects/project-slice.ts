import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProjectM } from "../../models/project.model";
import { CategoryM } from '../../models/category.model';

interface ProjectState {
  projects: ProjectM[];
  currentProject?: ProjectM;
}
const initialState: ProjectState = {
  projects: [],
  currentProject: undefined,
};

const baseURL = process.env.REACT_APP_API_BASE_URL;
const localKey = "anciny--dungeon-master--projects";

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (_, { rejectWithValue }) => {
  // Try fetching from the API endpoint
  if (baseURL) {
    try {
      const response = await axios.get<ProjectM[]>(`${baseURL}/projects`);
      return response.data;
    } catch (error) {
      console.error("Fetching from API failed", error);
    }
  }
  // Try fetching from localStorage
  const projects = localStorage.getItem(localKey);
  if (projects) return JSON.parse(projects) as ProjectM[];
  // Try fetching from the JSON file
  const response = await fetch("/projects.json");
  if (response.ok) {
    const data = await response.json();
    return data as ProjectM[];
  }
  // Fallback to an empty array if all else fails
  return rejectWithValue([]);
});

export const fetchProjectById = createAsyncThunk("projects/fetchProjectById", async (projectId: string, { rejectWithValue }) => {
  // Try fetching from the API endpoint
  if (baseURL) {
    try {
      const response = await axios.get<ProjectM>(`${baseURL}/project/${projectId}`);
      return response.data;
    } catch (error) {
      console.error("Fetching from API failed", error);
    }
  }
  // Try fetching from localStorage
  const projects = localStorage.getItem(localKey);
  if (projects) {
    const projectList = JSON.parse(projects) as ProjectM[];
    const project = projectList.find(item => item.id === projectId);
    if (project) return project;
  }
  // Try fetching from the JSON file
  const response = await fetch("/projects.json");
  if (response.ok) {
    const projectList = await response.json() as ProjectM[];
    const project = projectList.find(item => item.id === projectId);
    if (project) return project;
  }
  console.error("Failed to fetch project by ID");
  // Fallback to undefined if all else fails
  return rejectWithValue(undefined);
});

function updateProjects(state: ProjectState, projects: ProjectM[]) {
  state.projects = projects;
  localStorage.setItem(localKey, JSON.stringify(projects));
}
function updateCurrentProject(state: ProjectState, project: ProjectM | undefined) {
  state.currentProject = project;
  if (project) {
    const newProjects = state.projects.map(item => item.id === project.id ? project : item);
    updateProjects(state, newProjects);
  }
}

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects(state, action: PayloadAction<ProjectM[]>) {
      updateProjects(state, action.payload);
    },
    addProject(state, action: PayloadAction<ProjectM>) {
      updateProjects(state, [...state.projects, action.payload]);
    },
    removeProjectById(state, action: PayloadAction<string>) {
      updateProjects(state, state.projects.filter(project => project.id !== action.payload));
    },
    setCurrentProject(state, action: PayloadAction<ProjectM | undefined>) {
      state.currentProject = action.payload;
      if (action.payload) {
        const newProjects = state.projects.map(item => item.id === action.payload?.id ? action.payload : item);
        updateProjects(state, newProjects);
      }
    },
    updateProjectArticles(state, action: PayloadAction<{ articleId: string, type: "add" | "remove" }>) {
      const { articleId, type } = action.payload;
      const project = state.projects.find(project => project.id === state.currentProject?.id);
      if (project !== undefined) {
        const updatedArticles = type === "add" ?
          [...project.articles, articleId] :
          project.articles.filter(article => article !== articleId);
        updateCurrentProject(state, { ...project, articles: updatedArticles });
      }
    },
    updateProjectCategory(state, action: PayloadAction<{ category: CategoryM, type: "add" | "remove" }>) {
      const { category, type } = action.payload;
      const project = state.projects.find(project => project.id === state.currentProject?.id);
      if (project !== undefined) {
        const updatedCategories = type === "add" ?
          [...project.categories, category] :
          project.categories.filter(cat => cat.id !== category.id);
        updateCurrentProject(state, { ...project, categories: updatedCategories });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.fulfilled, (state, action: PayloadAction<ProjectM[]>) => {
      state.projects = action.payload;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.projects = action.payload as ProjectM[] || [];
    });
    builder.addCase(fetchProjectById.fulfilled, (state, action: PayloadAction<ProjectM>) => {
      state.currentProject = action.payload;
    });
    builder.addCase(fetchProjectById.rejected, (state) => {
      state.currentProject = undefined;
    });
  },
});

export const { setProjects, addProject, removeProjectById, setCurrentProject, updateProjectArticles, updateProjectCategory } = projectSlice.actions;
export default projectSlice.reducer;
