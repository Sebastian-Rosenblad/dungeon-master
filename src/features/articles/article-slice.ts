import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ArticleM } from '../../models/article.model';
import axios from 'axios';

interface ArticleState {
  articles: ArticleM[];
}
const initialState: ArticleState = {
  articles: [],
};

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (_, { rejectWithValue }) => {
  // Try fetching from the API endpoint
  if (baseURL) {
    try {
      const response = await axios.get<ArticleM[]>(`${baseURL}/articles`);
      return response.data;
    } catch (error) {
      console.error('Fetching from API failed', error);
    }
  }
  // Try fetching from localStorage
  const articles = localStorage.getItem('anciny--dungeon-master--articles');
  if (articles) return JSON.parse(articles) as ArticleM[];
  // Try fetching from the JSON file
  const response = await fetch('/articles.json');
  if (response.ok) {
    const data = await response.json();
    return data as ArticleM[];
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action: PayloadAction<ArticleM[]>) => {
      state.articles = action.payload;
    });
  },
});

export const { setArticles } = articleSlice.actions;
export default articleSlice.reducer;
