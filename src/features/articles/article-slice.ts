import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ArticleM } from '../../models/article.model';
import axios from 'axios';

interface ArticleState {
  articles: ArticleM[];
}

const initialState: ArticleState = {
  articles: [],
};

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (_, { rejectWithValue }) => {
  // Try fetching from the API endpoint
  try {
    const response = await axios.get<ArticleM[]>('https://api.example.com/articles');
    return response.data;
  } catch (error) {
    console.error('Fetching from API failed', error);
  }
  // Try fetching from localStorage
  try {
    const articles = localStorage.getItem('anciny--dungeon-master--articles');
    if (articles) return JSON.parse(articles) as ArticleM[];
  } catch (error) {
    console.error('Fetching from localStorage failed', error);
  }
  // Try fetching from the JSON file
  try {
    const response = await fetch('/articles.json');
    if (response.ok) {
      const data = await response.json();
      return data as ArticleM[];
    }
  } catch (error) {
    console.error('Fetching from JSON file failed', error);
  }
  // Fallback to an empty array if all else fails
  return rejectWithValue([]);
});

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticles(state, action: PayloadAction<ArticleM[]>) {
      state.articles = action.payload;
    },
    // Additional reducers can be added here
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action: PayloadAction<ArticleM[]>) => {
      state.articles = action.payload;
    });
  },
});

export const { setArticles } = articleSlice.actions;
export default articleSlice.reducer;
