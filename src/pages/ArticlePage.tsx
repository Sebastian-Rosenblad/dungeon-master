import React, { useEffect, useRef, useState } from "react";
import "./ArticlePage.scss";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchProjectById, setCurrentProject } from "../features/projects/project-slice";
import { fetchArticleById, setCurrentArticle } from "../features/articles/article-slice";
import useAppDispatch from "../hooks/useAppDispatch";
import { useParams } from "react-router-dom";
import { debounce } from "lodash";
import { BreadcrumbC } from "../components/shared/Breadcrumb";
import { ButtonC } from "../components/shared/Button";
import { InputDropdownC } from "../components/shared/InputDropdown";
import { parseContent } from "../utils/parseContent";
import { CategoryM } from "../models/category.model";

export function ArticlePageP(): JSX.Element {
  const { articleId } = useParams<{ articleId: string }>();
  const dispatch = useAppDispatch();
  const project = useSelector((state: RootState) => state.projects.currentProject);
  const article = useSelector((state: RootState) => state.articles.currentArticle);
  const [editing, setEditing] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [lastSavedContent, setLastSavedContent] = useState<string>("");
  const quillRef = useRef<ReactQuill | null>(null);

  const autosave = useRef(
    debounce((value: string) => {
      if (value !== lastSavedContent && article) {
        dispatch(setCurrentArticle({ ...article, content: value }));
        setLastSavedContent(value);
      }
    }, 5000)
  ).current;

  useEffect(() => {
    if (articleId) {
      dispatch(fetchArticleById({ articleId, setAsCurrent: true }));
    }
    return () => {
      dispatch(setCurrentArticle(undefined));
    };
  }, [dispatch, articleId]);

  useEffect(() => {
    if (article) {
      dispatch(fetchProjectById(article.projectId));
      setContent(article.content);
      setLastSavedContent(article.content);
    }
    return () => {
      dispatch(setCurrentProject(undefined));
    }
  }, [article]);

  function handleUpdateTitle(title: string): void {
    if (article) dispatch(setCurrentArticle({ ...article, title }));
  }
  function handleContentChange(value: string): void {
    setContent(value);
    autosave(value);
  }
  function handleSave() {
    autosave.flush();
    if (article) {
      dispatch(setCurrentArticle({ ...article, content }));
      setLastSavedContent(content);
    }
    setEditing(false);
  }

  const editorModules = {
    clipboard: {
      matchVisual: false,
    },
  };

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
      <div className="article--settings">
        <InputDropdownC
          label="Category"
          value={article.category}
          options={project?.categories.map((category: CategoryM) => ({
            icon: category.icon,
            label: category.name,
            textColor: category.textColor,
            iconFill: category.secondaryColor,
            iconBackground: category.primaryColor,
            value: category.id
          })) || []}
          onChange={category => dispatch(setCurrentArticle({ ...article, category }))}
        />
        <ButtonC
          icon={editing ? "edit-save" : "edit-start"}
          label={editing ? "Save" : "Edit"}
          onClick={editing ? handleSave : () => setEditing(true)}
        />
      </div>
      <div className="page--separator"></div>
      <div className="article--content">
        {editing ?
          <ReactQuill
            ref={quillRef}
            value={content}
            onChange={handleContentChange}
            modules={editorModules}
          /> :
          <div className="article--content--display">{parseContent(content)}</div>
        }
      </div>
    </div>
  );
}
