import React, { useEffect } from "react";
import "./ArticlePage.scss";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchProjectById, setCurrentProject } from "../features/projects/project-slice";
import { fetchArticleById, setCurrentArticle } from "../features/articles/article-slice";
import useAppDispatch from "../hooks/useAppDispatch";
import { useParams } from "react-router-dom";
import { BreadcrumbC } from "../components/shared/Breadcrumb";

export function ArticlePageP(): JSX.Element {
  const { articleId } = useParams<{ articleId: string }>();
  const dispatch = useAppDispatch();
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
      <div className="article--header">
        <BreadcrumbC
          items={[
            { label: "My projects", link: "/" },
            { label: project?.title || "", link: project ? "/project/" + project.id : undefined },
            { label: article.title, editable: true, onSave: handleUpdateTitle }
          ]}
        />
      </div>
      <div className="article--settings"></div>
      <div className="page--separator"></div>
      <div className="article--content"></div>
    </div>
  );
}
