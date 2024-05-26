import React, { useEffect } from "react";
import "./ProjectPage.scss";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchProjectById, setCurrentProject } from "../features/projects/project-slice";
import useAppDispatch from "../hooks/useAppDispatch";
import { useParams } from "react-router-dom";
import { BreadcrumbC } from "../components/shared/Breadcrumb";
import { ImageSelectC } from "../components/shared/ImageSelect";
import { EditableTextareaC } from "../components/shared/EditableTextarea";
import { ArticleCategoryListC } from "../components/ArticleCategoryList";

export function ProjectPageP(): JSX.Element {
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useAppDispatch();
  const project = useSelector((state: RootState) => state.projects.currentProject);

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectById(projectId));
    }
    return () => {
      dispatch(setCurrentProject(undefined));
    };
  }, [dispatch, projectId]);

  function handleUpdateThumbnail(thumbnail: string): void {
    if (!project) return;
    dispatch(setCurrentProject({ ...project, thumbnail }));
  }
  function handleUpdateTitle(title: string): void {
    if (!project) return;
    dispatch(setCurrentProject({ ...project, title }));
  }
  function handleUpdateDescription(description: string): void {
    if (!project) return;
    dispatch(setCurrentProject({ ...project, description }));
  }

  return !project ? (<div className="page"><p>Loading...</p></div>) : (
    <div className="page">
      <div className="project--header">
        <BreadcrumbC
          items={[
            { label: "My projects", link: "/" },
            { label: project.title, editable: true, onSave: handleUpdateTitle },
          ]}
        />
      </div>
      <div className="project--settings">
        <div className="project--settings--left">
          <ImageSelectC value={project.thumbnail} onChange={handleUpdateThumbnail} />
        </div>
        <div className="project--settings--right">
          <EditableTextareaC text={project.description} label="Description" placeholder="Click to add a description" onSave={handleUpdateDescription} />
        </div>
      </div>
      <div className="page--separator"></div>
      <div className="project--content">
        <ArticleCategoryListC />
      </div>
    </div>
  );
}
