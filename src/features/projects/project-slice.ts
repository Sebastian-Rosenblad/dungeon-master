import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ProjectM } from '../../models/project.model';
import axios from 'axios';

interface ProjectState {
  projects: ProjectM[];
}
const initialState: ProjectState = {
  projects: [],
};

const baseURL = process.env.REACT_APP_API_BASE_URL;

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
  const projects = localStorage.getItem('anciny--dungeon-master--projects');
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

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects(state, action: PayloadAction<ProjectM[]>) {
      state.projects = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.fulfilled, (state, action: PayloadAction<ProjectM[]>) => {
      state.projects = action.payload;
    });
  },
});

export const { setProjects } = projectSlice.actions;
export default projectSlice.reducer;
