import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ArticleM } from "../../models/article.model";

interface ArticleState {
  articles: ArticleM[];
  currentArticle?: ArticleM;
}
const initialState: ArticleState = {
  articles: [],
  currentArticle: undefined,
};

const baseURL = process.env.REACT_APP_API_BASE_URL;
const localKey = "anciny--dungeon-master--articles";

export const fetchArticles = createAsyncThunk("articles/fetchArticles", async (_, { rejectWithValue }) => {
  // Try fetching from the API endpoint
  if (baseURL) {
    try {
      const response = await axios.get<ArticleM[]>(`${baseURL}/articles`);
      return response.data;
    } catch (error) {
      console.error("Fetching from API failed", error);
    }
  }
  // Try fetching from localStorage
  const articles = localStorage.getItem(localKey);
  if (articles) return JSON.parse(articles) as ArticleM[];
  // Try fetching from the JSON file
  const response = await fetch("/articles.json");
  if (response.ok) {
    const data = await response.json();
    return data as ArticleM[];
  }
  // Fallback to an empty array if all else fails
  return rejectWithValue([]);
});

export const fetchArticleById = createAsyncThunk("articles/fetchArticlwById", async (articleId: string, { rejectWithValue }) => {
  // Try fetching from the API endpoint
  if (baseURL) {
    try {
      const response = await axios.get<ArticleM>(`${baseURL}/article/${articleId}`);
      return response.data;
    } catch (error) {
      console.error("Fetching from API failed", error);
    }
  }
  // Try fetching from localStorage
  const articles = localStorage.getItem(localKey);
  if (articles) {
    const articleList = JSON.parse(articles) as ArticleM[];
    const article = articleList.find(item => item.id === articleId);
    if (article) return article;
  }
  // Try fetching from the JSON file
  const response = await fetch("/articles.json");
  if (response.ok) {
    const articleList = await response.json() as ArticleM[];
    const article = articleList.find(item => item.id === articleId);
    if (article) return article;
  }
  console.error("Failed to fetch article by ID");
  // Fallback to undefined if all else fails
  return rejectWithValue(undefined);
});

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticles(state, action: PayloadAction<ArticleM[]>) {
      state.articles = action.payload;
    },
    setCurrentArticle(state, action: PayloadAction<ArticleM | undefined>) {
      state.currentArticle = action.payload;
      const newArticles = state.articles.map(item => item.id === action.payload?.id ? action.payload : item);
      state.articles = newArticles;
      localStorage.setItem(localKey, JSON.stringify(newArticles));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action: PayloadAction<ArticleM[]>) => {
      state.articles = action.payload;
    });
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.articles = action.payload as ArticleM[] || [];
    });
    builder.addCase(fetchArticleById.fulfilled, (state, action: PayloadAction<ArticleM>) => {
      state.currentArticle = action.payload;
    });
    builder.addCase(fetchArticleById.rejected, (state) => {
      state.currentArticle = undefined;
    });
  },
});

export const { setArticles, setCurrentArticle } = articleSlice.actions;
export default articleSlice.reducer;
