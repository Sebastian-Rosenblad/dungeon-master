import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useAppDispatch from "../hooks/useAppDispatch";
import { fetchProjects } from "../features/projects/project-slice";
import { ProjectCardC } from "./ProjectCard";

export function ProjectListC(): JSX.Element {
  const dispatch = useAppDispatch();
  const projects = useSelector((state: RootState) => state.projects.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return <div className="project-list">
    {projects.map(project =>
      <ProjectCardC
        key={project.id}
        title={project.title}
        description={project.description}
        thumbnail={project.thumbnail}
      />
    )}
  </div>;
}
