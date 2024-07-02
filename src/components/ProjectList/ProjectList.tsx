import React, { useEffect, useState } from "react";
import "./ProjectList.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addProject, fetchProjects, setProjects } from "../../features/projects/project-slice";
import { setArticles } from "../../features/articles/article-slice";
import useAppDispatch from "../../hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import { ProjectTableC } from "../ProjectTable";
import { InputSearchC } from "../shared/InputSearch";
import { PaginationC } from "../shared/Pagination";
import { ButtonC } from "../shared/Button";
import { IconButtonC } from "../shared/IconButton";
import { MenuPopupC } from "../shared/MenuPopup";
import { ProjectM } from "../../models/project.model";
import { ArticleM } from "../../models/article.model";
import { generateUniqueId } from "../../utils/generateUniqueId";

export function ProjectListC(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const projects: ProjectM[] = useSelector((state: RootState) => state.projects.projects);
  const articles: ArticleM[] = useSelector((state: RootState) => state.articles.articles);
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
      categories: [{
        id: generateUniqueId([]),
        name: "Uncategorized",
        icon: "category-article",
        textColor: "#000",
        primaryColor: "#c2e7ff",
        secondaryColor: "#f0f9ff"
      }],
      articles: []
    };
    dispatch(addProject(newProject));
    navigate(`/project/${newProject.id}`);
  }
  function getFilteredProjects(): ProjectM[] {
    return projects
      .filter(project => project.title.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortColumn === "title") {
          return sortDirection === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        } else {
          return sortDirection === "asc" ? a.articles.length - b.articles.length : b.articles.length - a.articles.length;
        }
      })
      .slice((page - 1) * projectsPerPage, page * projectsPerPage);
  }
  function updateSort(column: "title" | "articles", direction: "asc" | "desc"): void {
    setSortColumn(column);
    setSortDirection(direction);
  }
  function handleProjectClick(project: ProjectM): void {
    navigate(`/project/${project.id}`);
  }
  function handleShowMenu(evt: React.MouseEvent): void {
    evt.stopPropagation();
    setMenuPosition({ x: evt.clientX, y: evt.clientY });
  }
  function handleImport(): void {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";
  
    fileInput.onchange = async (evt: Event) => {
      const target = evt.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        const fileContent = await file.text();
        try {
          const imported: { projects: ProjectM[], articles: ArticleM[] } = JSON.parse(fileContent);
  
          const updated = { projects: [...projects], articles: [...articles] };
          const projectMap = new Map<string, ProjectM>();
          const articleMap = new Map<string, ArticleM>();
  
          updated.projects.forEach(project => projectMap.set(project.id, project));
          imported.projects.forEach(project => projectMap.set(project.id, project));
          updated.articles.forEach(article => articleMap.set(article.id, article));
          imported.articles.forEach(article => articleMap.set(article.id, article));
  
          const mergedProjects = Array.from(projectMap.values());
          const mergedArticles = Array.from(articleMap.values());
          dispatch(setProjects(mergedProjects));
          dispatch(setArticles(mergedArticles));
        } catch (error) {
          console.error("Failed to parse the imported file", error);
          alert("Failed to import projects. Please make sure the file is a valid JSON.");
        }
      }
    };
  
    fileInput.click();
    handleCloseMenu();
  }
  function handleExport(): void {
    const jsonContent = JSON.stringify({ projects, articles });
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "dungeon-master.json";
  
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  
    URL.revokeObjectURL(url);
    handleCloseMenu();
  }
  function handleCloseMenu(): void {
    setMenuPosition(null);
  }

  return (
    <div className="project-list">
      <div className="project-list--row">
        <ButtonC icon="add" label="New project" onClick={createNewProject} />
        <InputSearchC
          value={search}
          onChange={setSearch}
          placeholder="Search projects"
        />
        <IconButtonC icon="dots-menu" size="large" transparent onClick={handleShowMenu} />
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
            { label: "Import", icon: "import", onClick: handleImport },
            { label: "Export", icon: "export", onClick: handleExport }
          ]}
          onClose={handleCloseMenu}
        />
      )}
    </div>
  );
}
