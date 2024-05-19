import React from "react";
import './ProjectTable.scss';
import { ProjectM } from "../models/project.model";

interface ProjectTablePropsM {
  projects: ProjectM[];
  sortColumn: "title" | "articles";
  sortDirection: "asc" | "desc";
  onSort: (column: "title" | "articles", direction: "asc" | "desc") => void;
  onProjectClick: (project: ProjectM) => void;
}

export function ProjectTableC(props: ProjectTablePropsM): JSX.Element {
  const { projects, sortColumn, sortDirection, onSort } = props;

  function handleSort(column: "title" | "articles"): void {
    const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    onSort(column, newDirection);
  }
  function handleImgError(event: React.SyntheticEvent<HTMLImageElement>): void {
    event.currentTarget.src = "./images/default-thumbnail.png";
  }

  return <div className="project-table">
    <div className="project-table--head">
      <div className="project-table--head--row">
        <p className="project-table--head--row--thumbnail"></p>
        <p onClick={() => handleSort("title")} className="project-table--head--row--title sortable-column">
          Title
          {sortColumn === "title" && (
            <svg className="icon">
              <use xlinkHref={`#${sortDirection === "asc" ? "icon-sort-active-asc" : "icon-sort-active-desc"}`} />
            </svg>
          )}
          {sortColumn !== "title" && (
            <svg className="icon">
              <use xlinkHref="#icon-sort-asc" />
            </svg>
          )}
        </p>
        <p className="project-table--head--row--description">Description</p>
        <p onClick={() => handleSort("articles")} className="project-table--head--row--articles sortable-column">
          Articles
          {sortColumn === "articles" && (
            <svg className="icon">
              <use xlinkHref={`#${sortDirection === "asc" ? "icon-sort-active-asc" : "icon-sort-active-desc"}`} />
            </svg>
          )}
          {sortColumn !== "articles" && (
            <svg className="icon">
              <use xlinkHref="#icon-sort-asc" />
            </svg>
          )}
        </p>
      </div>
    </div>
    <div className="project-table--body">
      {projects.map(project => <div key={project.id} className="project-table--body--row" onClick={() => props.onProjectClick(project)}>
        <div className="project-table--body--row--thumbnail">
          <img src={`./images/${project.thumbnail}.png`} alt={project.title} onError={handleImgError} />
        </div>
        <h3 className="project-table--body--row--title">{project.title}</h3>
        <p className="project-table--body--row--description">{project.description}</p>
        <p className="project-table--body--row--articles">{project.articles.length}</p>
      </div>)}
    </div>
  </div>;
}
