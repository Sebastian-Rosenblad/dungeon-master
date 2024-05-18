import React, { useEffect, useState } from "react";
import './ProjectList.scss';
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchProjects, setProjects } from "../features/projects/project-slice";
import useAppDispatch from "../hooks/useAppDispatch";
import { InputTextC } from "./shared/InputText";
import { ProjectTableC } from "./ProjectTable";
import { PaginationC } from "./shared/Pagination";
import { ProjectM } from "../models/project.model";
import { generateUniqueId } from "../utils/generateUniqueId";

export function ProjectListC(): JSX.Element {
  const dispatch = useAppDispatch();
  const projects: ProjectM[] = useSelector((state: RootState) => state.projects.projects);
  const [search, setSearch] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<"title" | "articles">("title");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState<number>(1);
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

  return <div className="project-list">
    <div className="project-list--row">
      <InputTextC
        value={search}
        onChange={setSearch}
        placeholder="Search projects"
      />
      <button onClick={createNewProject}>Create New Project</button>
    </div>
    <div className="project-list--row">
      <ProjectTableC
        projects={getFilteredProjects()}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={updateSort}
      />
    </div>
    <div className="project-list--row">
      <PaginationC
        page={page}
        totalPages={Math.ceil(projects.length / projectsPerPage)}
        onPageChange={setPage}
      />
    </div>
  </div>;
}
