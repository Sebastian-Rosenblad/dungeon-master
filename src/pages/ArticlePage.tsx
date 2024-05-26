import React, { useEffect } from "react";
import "./ArticlePage.scss";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchProjectById, setCurrentProject } from "../features/projects/project-slice";
import { fetchArticleById, setCurrentArticle } from "../features/articles/article-slice";
import useAppDispatch from "../hooks/useAppDispatch";
import { useNavigate, useParams } from "react-router-dom";
import { EditableTextC } from "../components/shared/EditableText";
import { IconC } from "../components/shared/Icon";

export function ArticlePageP(): JSX.Element {
  const { articleId } = useParams<{ articleId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const project = useSelector((state: RootState) => state.projects.currentProject);
  const article = useSelector((state: RootState) => state.articles.currentArticle);

  useEffect(() => {
    if (articleId) {
      dispatch(fetchArticleById(articleId));
    }
    return () => {
      dispatch(setCurrentArticle(undefined));
    };
  }, [dispatch, articleId]);
  useEffect(() => {
    if (article) {
      dispatch(fetchProjectById(article.projectId));
    }
    return () => {
      dispatch(setCurrentProject(undefined));
    }
  }, [article]);

  function handleUpdateTitle(title: string): void {
    if (!article) return;
    dispatch(setCurrentArticle({ ...article, title }));
  }

  return !article ? (<div className="page"><p>Loading...</p></div>) : (
    <div className="page">
      <div className="project-navigation">
        <h1 onClick={() => navigate("/")}>My projects</h1>
        <IconC name="breadcrumb-separator" size="large" />
        <h1 onClick={() => navigate("/project/" + project?.id)}>{project?.title}</h1>
        <IconC name="breadcrumb-separator" size="large" />
        <EditableTextC text={article.title} tag="h1" onSave={handleUpdateTitle} />
      </div>
      <div className="article-header">
      </div>
    </div>
  );
}
