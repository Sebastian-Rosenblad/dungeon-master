import React, { useEffect, useState } from "react";
import './ProjectList.scss';
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchProjects, setProjects } from "../features/projects/project-slice";
import useAppDispatch from "../hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import { InputSearchC } from "./shared/InputSearch";
import { ProjectTableC } from "./ProjectTable";
import { PaginationC } from "./shared/Pagination";
import { ButtonC } from "./shared/Button";
import { ButtonIconC } from "./shared/ButtonIcon";
import { MenuPopupC } from "./shared/MenuPopup";
import { ProjectM } from "../models/project.model";
import { generateUniqueId } from "../utils/generateUniqueId";

export function ProjectListC(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const projects: ProjectM[] = useSelector((state: RootState) => state.projects.projects);
  const [search, setSearch] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<"title" | "articles">("title");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState<number>(1);
  const [menuPosition, setMenuPosition] = useState<{ x: number, y: number } | null>(null);
  const projectsPerPage: number = 10;

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  function createNewProject(): void {
    const newProject: ProjectM = {
      id: generateUniqueId(projects.map(project => project.id)),
      thumbnail: "",
      title: "New Project",
      description: "",
      categories: [],
      articles: []
    };
    const updatedProjects: ProjectM[] = [...projects, newProject];
    dispatch(setProjects(updatedProjects));
    navigate(`/project/${newProject.id}`);
  }
  function getFilteredProjects(): ProjectM[] {
    return projects
      .filter(project => project.title.toLowerCase().includes(search.toLowerCase()))
      .slice((page - 1) * projectsPerPage, page * projectsPerPage)
      .sort((a, b) => {
        if (sortColumn === "title") {
          return sortDirection === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        } else {
          return sortDirection === "asc" ? a.articles.length - b.articles.length : b.articles.length - a.articles.length;
        }
      });
  }
  function updateSort(column: "title" | "articles", direction: "asc" | "desc"): void {
    setSortColumn(column);
    setSortDirection(direction);
  }
  function handleProjectClick(project: ProjectM): void {
    navigate(`/project/${project.id}`);
  }
  function handleShowMenu(event: React.MouseEvent): void {
    event.stopPropagation();
    setMenuPosition({ x: event.clientX, y: event.clientY });
  }
  function handleCloseMenu(): void {
    setMenuPosition(null);
  }

  return <div className="project-list">
    <div className="project-list--row">
      <ButtonC icon="add" label="New" onClick={createNewProject} />
      <InputSearchC
        value={search}
        onChange={setSearch}
        placeholder="Search projects"
      />
      <ButtonIconC icon="dots-menu" size="large" transparent onClick={handleShowMenu} />
    </div>
    <div className="project-list--row">
      <ProjectTableC
        projects={getFilteredProjects()}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={updateSort}
        onProjectClick={handleProjectClick}
      />
    </div>
    <div className="project-list--row center">
      <PaginationC
        page={page}
        totalPages={Math.ceil(projects.length / projectsPerPage)}
        onPageChange={setPage}
      />
    </div>
    {menuPosition && (
      <MenuPopupC
        x={menuPosition.x}
        y={menuPosition.y}
        items={[
          { label: "Import", icon: "import", onClick: () => {} },
          { label: "Export", icon: "export", onClick: () => {} }
        ]}
        onClose={handleCloseMenu}
      />
    )}
  </div>;
}
