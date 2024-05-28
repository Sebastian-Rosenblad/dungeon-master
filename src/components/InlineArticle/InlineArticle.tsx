import React, { useEffect } from "react";
import "./InlineArticle.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchArticleById } from "../../features/articles/article-slice";
import useAppDispatch from "../../hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";

interface InlineArticlePropsM {
  articleId: string;
}

export function InlineArticleC({ articleId }: InlineArticlePropsM): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const article = useSelector((state: RootState) => state.articles.articles.find(a => a.id === articleId));
  const category = useSelector((state: RootState) => state.projects.currentProject?.categories.find(cat => cat.id === article?.category) || null);

  useEffect(() => {
    if (!article) {
      dispatch(fetchArticleById({ articleId, setAsCurrent: false }));
    }
  }, [articleId, article, dispatch]);

  if (!article) return <span className="inline-article">Loading...</span>;
  return (
    <span className="inline-article" style={{ color: category?.textColor }} onClick={() => navigate("/article/" + articleId)}><b>{article.title}</b></span>
  );
}
