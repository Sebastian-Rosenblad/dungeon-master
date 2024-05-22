import React, { useEffect } from "react";
import "./ProjectTable.scss";
import { fetchProjects, setProjects } from "../features/projects/project-slice";
import useAppDispatch from "../hooks/useAppDispatch";
import { ButtonIconC } from "./shared/ButtonIcon";
import { IconC } from "./shared/Icon";
import { MenuPopupC } from "./shared/MenuPopup";
import { ProjectM } from "../models/project.model";

interface ProjectTablePropsM {
  projects: ProjectM[];
  sortColumn: "title" | "articles";
  sortDirection: "asc" | "desc";
  onSort: (column: "title" | "articles", direction: "asc" | "desc") => void;
  onProjectClick: (project: ProjectM) => void;
}

export function ProjectTableC({ projects, sortColumn, sortDirection, onSort, onProjectClick }: ProjectTablePropsM): JSX.Element {
  const dispatch = useAppDispatch();
  const [buttonHover, setButtonHover] = React.useState<boolean>(false);
  const [menuPosition, setMenuPosition] = React.useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [menuProject, setMenuProject] = React.useState<ProjectM | null>(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  function handleSort(column: "title" | "articles"): void {
    const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    onSort(column, newDirection);
  }
  function handleImgError(event: React.SyntheticEvent<HTMLImageElement>): void {
    event.currentTarget.src = "./images/default-thumbnail.png";
  }
  function handleMouseEnter(): void {
    setButtonHover(true);
  }
  function handleMouseLeave(): void {
    setButtonHover(false);
  }
  function handleShowMenu(event: React.MouseEvent, project: ProjectM): void {
    event.stopPropagation();
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setMenuProject(project);
  }
  function handleDeleteProject(): void {
    dispatch(setProjects(projects.filter(project => project.id !== menuProject!.id)));
    handleCloseMenu();
  }
  function handleCloseMenu(): void {
    setMenuProject(null);
  }

  return <div className="project-table">
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
            <img src={`./images/${project.thumbnail}`} alt={project.title} onError={handleImgError} />
          </div>
          <h3 className="project-table--body--row--title">{project.title}</h3>
          <p className="project-table--body--row--description">{project.description}</p>
          <p className="project-table--body--row--articles">{project.articles.length}</p>
          <p className="project-table--head--row--menu">
            <ButtonIconC
              icon="dots-menu"
              transparent
              onClick={(evt) => handleShowMenu(evt, project)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </p>
        </div>
      ))}
    </div>
    {menuProject && (
      <MenuPopupC
        x={menuPosition.x}
        y={menuPosition.y}
        items={[
          { label: "Export", icon: "export", onClick: () => {} },
          { label: "Delete", icon: "delete", onClick: handleDeleteProject }
        ]}
        onClose={handleCloseMenu}
      />
    )}
  </div>;
}
