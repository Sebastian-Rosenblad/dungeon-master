import React, { useEffect } from "react";
import "./ArticlePage.scss";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchArticleById, setCurrentArticle } from "../features/articles/article-slice";
import useAppDispatch from "../hooks/useAppDispatch";
import { useParams } from "react-router-dom";
import { EditableTextC } from "../components/shared/EditableText";

export function ArticlePageP(): JSX.Element {
  const { articleId } = useParams<{ articleId: string }>();
  const dispatch = useAppDispatch();
  const article = useSelector((state: RootState) => state.articles.currentArticle);

  useEffect(() => {
    if (articleId) {
      dispatch(fetchArticleById(articleId));
    }
    return () => {
      dispatch(setCurrentArticle(undefined));
    };
  }, [dispatch, articleId]);

  function handleUpdateTitle(title: string): void {
    if (!article) return;
    dispatch(setCurrentArticle({ ...article, title }));
  }

  return !article ? (<div className="page"><p>Loading...</p></div>) : (
    <div className="page">
      <div className="article-header">
        <div className="article-header--right">
          <EditableTextC text={article.title} tag="h2" onSave={handleUpdateTitle} />
        </div>
      </div>
    </div>
  );
}
