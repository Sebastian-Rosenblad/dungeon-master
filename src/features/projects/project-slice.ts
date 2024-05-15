import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ProjectM } from '../../models/project.model';
import axios from 'axios';

interface ProjectState {
  projects: ProjectM[];
}

const initialState: ProjectState = {
  projects: [],
};

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (_, { rejectWithValue }) => {
  // Try fetching from the API endpoint
  try {
    const response = await axios.get<ProjectM[]>('https://api.example.com/projects');
    return response.data;
  } catch (error) {
    console.error('Fetching from API failed', error);
  }
  // Try fetching from localStorage
  try {
    const projects = localStorage.getItem('anciny--dungeon-master--projects');
    if (projects) return JSON.parse(projects) as ProjectM[];
  } catch (error) {
    console.error('Fetching from localStorage failed', error);
  }
  // Try fetching from the JSON file
  try {
    const response = await fetch('/projects.json');
    if (response.ok) {
      const data = await response.json();
      return data as ProjectM[];
    }
  } catch (error) {
    console.error('Fetching from JSON file failed', error);
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
    // Additional reducers can be added here
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.fulfilled, (state, action: PayloadAction<ProjectM[]>) => {
      state.projects = action.payload;
    });
  },
});

export const { setProjects } = projectSlice.actions;
export default projectSlice.reducer;
