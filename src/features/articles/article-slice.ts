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
  // Fallback to an empty array if all else fails
  return rejectWithValue([]);
});

export const fetchArticleById = createAsyncThunk("articles/fetchArticlwById", async ({ articleId, setAsCurrent }: { articleId: string, setAsCurrent: boolean }, { rejectWithValue }) => {
  // Try fetching from the API endpoint
  if (baseURL) {
    try {
      const response = await axios.get<ArticleM>(`${baseURL}/article/${articleId}`);
      return { article: response.data, setAsCurrent };
    } catch (error) {
      console.error("Fetching from API failed", error);
    }
  }
  // Try fetching from localStorage
  const articles = localStorage.getItem(localKey);
  if (articles) {
    const articleList = JSON.parse(articles) as ArticleM[];
    const article = articleList.find(item => item.id === articleId);
    if (article) return { article, setAsCurrent };
  }
  // Fallback to undefined if all else fails
  return rejectWithValue(undefined);
});

function updateArticles(state: ArticleState, articles: ArticleM[]) {
  state.articles = articles;
  localStorage.setItem(localKey, JSON.stringify(articles));
}

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticles(state, action: PayloadAction<ArticleM[]>) {
      updateArticles(state, action.payload);
    },
    addArticle(state, action: PayloadAction<ArticleM>) {
      updateArticles(state, [...state.articles, action.payload]);
    },
    removeArticleById(state, action: PayloadAction<string>) {
      updateArticles(state, state.articles.filter(article => article.id !== action.payload));
    },
    removeArticlesById(state, action: PayloadAction<string[]>) {
      updateArticles(state, state.articles.filter(article => !action.payload.includes(article.id)));
    },
    setCurrentArticle(state, action: PayloadAction<ArticleM | undefined>) {
      state.currentArticle = action.payload;
      if (action.payload) {
        const newArticles = state.articles.map(item => item.id === action.payload?.id ? action.payload : item);
        updateArticles(state, newArticles);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action: PayloadAction<ArticleM[]>) => {
      state.articles = action.payload;
    });
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.articles = action.payload as ArticleM[] || [];
    });
    builder.addCase(fetchArticleById.fulfilled, (state, action) => {
      const { article, setAsCurrent } = action.payload as { article: ArticleM, setAsCurrent: boolean };
      if (setAsCurrent) state.currentArticle = article;
    });
    builder.addCase(fetchArticleById.rejected, (state) => {
      state.currentArticle = undefined;
    });
  },
});

export const { setArticles, addArticle, removeArticleById, removeArticlesById, setCurrentArticle } = articleSlice.actions;
export default articleSlice.reducer;
