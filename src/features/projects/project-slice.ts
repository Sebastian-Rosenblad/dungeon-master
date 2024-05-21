import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ProjectM } from '../../models/project.model';
import axios from 'axios';

interface ProjectState {
  projects: ProjectM[];
  currentProject?: ProjectM;
}
const initialState: ProjectState = {
  projects: [],
  currentProject: undefined,
};

const baseURL = process.env.REACT_APP_API_BASE_URL;
const localKey = 'anciny--dungeon-master--projects';

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (_, { rejectWithValue }) => {
  // Try fetching from the API endpoint
  if (baseURL) {
    try {
      const response = await axios.get<ProjectM[]>(`${baseURL}/projects`);
      return response.data;
    } catch (error) {
      console.error('Fetching from API failed', error);
    }
  }
  // Try fetching from localStorage
  const projects = localStorage.getItem(localKey);
  if (projects) return JSON.parse(projects) as ProjectM[];
  // Try fetching from the JSON file
  const response = await fetch('/projects.json');
  if (response.ok) {
    const data = await response.json();
    return data as ProjectM[];
  }
  // Fallback to an empty array if all else fails
  return rejectWithValue([]);
});

export const fetchProjectById = createAsyncThunk('projects/fetchProjectById', async (projectId: string, { rejectWithValue }) => {
  // Try fetching from the API endpoint
  if (baseURL) {
    try {
      const response = await axios.get<ProjectM>(`${baseURL}/project/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Fetching from API failed', error);
    }
  }
  // Try fetching from localStorage
  const projects = localStorage.getItem(localKey);
  if (projects) {
    const projectList = JSON.parse(projects) as ProjectM[];
    const project = projectList.find(p => p.id === projectId);
    if (project) return project;
  }
  // Try fetching from the JSON file
  const response = await fetch(`/projects.json`);
  if (response.ok) {
    const projectList = await response.json() as ProjectM[];
    const project = projectList.find(p => p.id === projectId);
    if (project) return project;
  }
  console.error('Failed to fetch project by ID');
  // Fallback to an empty array if all else fails
  return rejectWithValue(undefined);
});

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects(state, action: PayloadAction<ProjectM[]>) {
      state.projects = action.payload;
      localStorage.setItem(localKey, JSON.stringify(action.payload));
    },
    setCurrentProject(state, action: PayloadAction<ProjectM | undefined>) {
      state.currentProject = action.payload;
      const newProjects = state.projects.map(p => p.id === action.payload?.id ? action.payload : p);
      state.projects = newProjects;
      localStorage.setItem(localKey, JSON.stringify(newProjects));
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

export const { setProjects, setCurrentProject } = projectSlice.actions;
export default projectSlice.reducer;
