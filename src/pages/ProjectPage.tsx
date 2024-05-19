import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchProjectById, setCurrentProject } from "../features/projects/project-slice";
import useAppDispatch from "../hooks/useAppDispatch";
import { useNavigate, useParams } from "react-router-dom";
import { EditableTextC } from "../components/shared/EditableText";
import { EditableTextareaC } from "../components/shared/EditableTextarea";

export function ProjectPageP(): JSX.Element {
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const project = useSelector((state: RootState) => state.projects.currentProject);

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectById(projectId));
    }
  }, [dispatch, projectId]);

  return !project ? (<div className="page"><p>Loading...</p></div>) : (
    <div className="page">
      <EditableTextC text={project.title} tag="h1" onSave={title => dispatch(setCurrentProject({ ...project, title }))} />
      <EditableTextareaC text={project.description} label="Description" onSave={description => dispatch(setCurrentProject({ ...project, description }))} />
      <p>Articles: {project.articles.length}</p>
    </div>
);
}
