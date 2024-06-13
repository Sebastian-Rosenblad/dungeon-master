import React, { useState } from "react";
import "./ProjectTable.scss";
import { removeProjectById } from "../../features/projects/project-slice";
import { removeArticlesById } from "../../features/articles/article-slice";
import useAppDispatch from "../../hooks/useAppDispatch";
import { ButtonC } from "../shared/Button";
import { IconC } from "../shared/Icon";
import { IconButtonC } from "../shared/IconButton";
import { MenuPopupC } from "../shared/MenuPopup";
import { LightboxC } from "../shared/Lightbox";
import { ProjectM } from "../../models/project.model";
import { toKebabCase } from "../../utils/kebabCase";

interface ProjectTablePropsM {
  projects: ProjectM[];
  sortColumn: "title" | "articles";
  sortDirection: "asc" | "desc";
  onSort: (column: "title" | "articles", direction: "asc" | "desc") => void;
  onProjectClick: (project: ProjectM) => void;
}

export function ProjectTableC({ projects, sortColumn, sortDirection, onSort, onProjectClick }: ProjectTablePropsM): JSX.Element {
  const dispatch = useAppDispatch();
  const [buttonHover, setButtonHover] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [menuProject, setMenuProject] = useState<ProjectM | null>(null);
  const [showLightbox, setShowLightbox] = useState<boolean>(false);

  function handleSort(column: "title" | "articles"): void {
    const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    onSort(column, newDirection);
  }
  function handleImgError(evt: React.SyntheticEvent<HTMLImageElement>): void {
    evt.currentTarget.src = "/images/default-thumbnail.png";
  }
  function handleMouseEnter(): void {
    setButtonHover(true);
  }
  function handleMouseLeave(): void {
    setButtonHover(false);
  }
  function handleShowMenu(evt: React.MouseEvent, project: ProjectM): void {
    evt.stopPropagation();
    setMenuPosition({ x: evt.clientX, y: evt.clientY });
    setMenuProject(project);
  }
  function handleDeleteProject(): void {
    if (menuProject) {
      dispatch(removeProjectById(menuProject.id));
      dispatch(removeArticlesById(menuProject.articles));
    }
    handleCloseLightbox();
  }
  function handleExportProject(): void {
    if (menuProject) {
      const jsonContent = JSON.stringify({ projects: [menuProject], atricles: [] });
      const blob = new Blob([jsonContent], { type: "application/json" });
      const url = URL.createObjectURL(blob);
    
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `project_${toKebabCase(menuProject.title)}.json`;
    
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    
      URL.revokeObjectURL(url);
    }
    handleCloseMenu();
  }
  function handleCloseMenu(): void {
    setMenuProject(null);
  }
  function handleShowLightbox(): void {
    setShowLightbox(true);
  }
  function handleCloseLightbox(): void {
    setShowLightbox(false);
    setMenuProject(null);
  }

  return (
    <div className="project-table">
      <div className="project-table--head">
        <div className="project-table--head--row">
          <p className="project-table--head--row--thumbnail"></p>
          <p onClick={() => handleSort("title")} className="project-table--head--row--title sortable-column">
            <span>Title</span>
            {sortColumn === "title" && <IconC name={sortDirection === "asc" ? "sort-active-asc" : "sort-active-desc"} size="small" />}
            {sortColumn !== "title" && <IconC name="sort-asc" size="small" />}
          </p>
          <p className="project-table--head--row--description">Description</p>
          <p onClick={() => handleSort("articles")} className="project-table--head--row--articles sortable-column">
            <span>Articles</span>
            {sortColumn === "articles" && <IconC name={sortDirection === "asc" ? "sort-active-asc" : "sort-active-desc"} size="small" />}
            {sortColumn !== "articles" && <IconC name="sort-asc" size="small" />}
          </p>
          <p className="project-table--head--row--menu"></p>
        </div>
      </div>
      <div className="project-table--body">
        {projects.map(project => (
          <div
            key={project.id}
            className={["project-table--body--row", buttonHover && "no-hover"].join(" ")}
            onClick={() => onProjectClick(project)}
          >
            <div className="project-table--body--row--thumbnail">
              <img src={`/images/${project.thumbnail}`} alt={project.title} onError={handleImgError} />
            </div>
            <h3 className="project-table--body--row--title">{project.title}</h3>
            <p className="project-table--body--row--description">{project.description}</p>
            <p className="project-table--body--row--articles">{project.articles.length}</p>
            <p className="project-table--head--row--menu">
              <IconButtonC
                icon="dots-menu"
                transparent
                onClick={(evt) => handleShowMenu(evt, project)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </p>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="project-table--body--row no-hover">
            <p className="project-table--body--row--empty">You have no projects created yet, click the "New project" button to get started!</p>
          </div>
        )}
      </div>
      {!showLightbox && menuProject && (
        <MenuPopupC
          x={menuPosition.x}
          y={menuPosition.y}
          items={[
            { label: "Export", icon: "export", onClick: handleExportProject },
            { label: "Delete", icon: "delete", onClick: handleShowLightbox }
          ]}
          onClose={handleCloseMenu}
        />
      )}
      {showLightbox && (
        <LightboxC title="Confirm" icon="delete" onClose={handleCloseLightbox}>
          <p>Are you sure you want to delete the project?</p>
          <div className="lightbox--buttons">
            <ButtonC label="Yes" onClick={handleDeleteProject}></ButtonC>
            <ButtonC label="No" onClick={handleCloseLightbox}></ButtonC>
          </div>
        </LightboxC>
      )}
    </div>
  );
}
