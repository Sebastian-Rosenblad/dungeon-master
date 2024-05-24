import React, { useEffect } from "react";
import "./ArticlePage.scss";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchArticleById, setCurrentArticle } from "../features/articles/article-slice";
import useAppDispatch from "../hooks/useAppDispatch";
import { useParams } from "react-router-dom";
import { EditableTextC } from "../components/shared/EditableText";
import { EditableTextareaC } from "../components/shared/EditableTextarea";
import { ImageSelectC } from "../components/shared/ImageSelect";

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

  function handleUpdateThumbnail(thumbnail: string): void {
    if (!article) return;
    dispatch(setCurrentArticle({ ...article, thumbnail }));
  }
  function handleUpdateTitle(title: string): void {
    if (!article) return;
    dispatch(setCurrentArticle({ ...article, title }));
  }
  function handleUpdateDescription(description: string): void {
    if (!article) return;
    dispatch(setCurrentArticle({ ...article, description }));
  }

  return !article ? (<div className="page"><p>Loading...</p></div>) : (
    <div className="article-header">
        <div className="article-header--left">
          <ImageSelectC value={article.thumbnail} onChange={handleUpdateThumbnail} />
        </div>
        <div className="article-header--right">
          <EditableTextC text={article.title} tag="h2" onSave={handleUpdateTitle} />
          <EditableTextareaC text={article.description} placeholder="Click to add a description" onSave={handleUpdateDescription} />
        </div>
      </div>
  );
}
