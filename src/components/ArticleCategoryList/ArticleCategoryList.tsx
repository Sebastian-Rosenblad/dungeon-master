import React, { useEffect, useState } from "react";
import './ArticleCategoryList.scss';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { updateProjectArticles } from "../../features/projects/project-slice";
import { addArticle, fetchArticles } from "../../features/articles/article-slice";
import useAppDispatch from "../../hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import { ArticleTableC } from "../ArticleTable";
import { CategoryTableC } from "../CategoryTable";
import { InputSearchC } from "../shared/InputSearch";
import { PaginationC } from "../shared/Pagination";
import { ButtonC } from "../shared/Button";
import { ToggleButtonC } from "../shared/ToggleButton";
import { ProjectM } from "../../models/project.model";
import { ArticleM } from "../../models/article.model";
import { generateUniqueId } from "../../utils/generateUniqueId";

interface ArticleCategoryListPropsM {
  project: ProjectM;
}

export function ArticleCategoryListC({ project }: ArticleCategoryListPropsM): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const articles: ArticleM[] = useSelector((state: RootState) => state.articles.articles);
  const [view, setView] = useState<"article" | "category">("article");
  const [search, setSearch] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<"title" | "category">("title");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState<number>(1);
  const articlesPerPage: number = 10;

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  function createNewArticle(): void {
    const newArticle: ArticleM = {
      id: generateUniqueId(articles.map(article => article.id)),
      projectId: project.id,
      title: "New Article",
      category: project.categories[0].id,
      content: []
    };
    dispatch(addArticle(newArticle));
    dispatch(updateProjectArticles({ projectId: project.id, articleId: newArticle.id, type: "add" }));
    navigate(`/article/${newArticle.id}`);
  }
  function getFilteredArticles(): ArticleM[] {
    return articles
      .filter(article => article.title.toLowerCase().includes(search.toLowerCase()))
      .slice((page - 1) * articlesPerPage, page * articlesPerPage)
      .sort((a, b) => {
        if (sortColumn === "title") {
          return sortDirection === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        } else {
          return sortDirection === "asc" ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category);
        }
      });
  }
  function updateSort(direction: "asc" | "desc", column?: "title" | "category"): void {
    if (column) setSortColumn(column);
    setSortDirection(direction);
  }
  function handleArticleClick(article: ArticleM): void {
    navigate(`/article/${article.id}`);
  }

  return (
    <div className="article-category-list">
      <div className="article-category-list--row">
        <ButtonC icon="add" label={`New ${view}`} onClick={createNewArticle} />
        <InputSearchC
          value={search}
          onChange={setSearch}
          placeholder={`Search ${view === "article" ? "articles" : "categories"}`}
        />
        <ToggleButtonC
          left={{ label: "Articles", value: "article" }}
          right={{ label: "Categories", value: "category" }}
          value={view}
          onChange={(value) => setView(value as "article" | "category")}
        />
      </div>
      <div className="article-category-list--row">
        {view === "article" && (
          <ArticleTableC
            articles={getFilteredArticles()}
            categories={project.categories}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={updateSort}
            onArticleClick={handleArticleClick}
          />
        )}
        {view === "category" && (
          <CategoryTableC
            categories={project.categories}
            sortDirection={sortDirection}
            onSort={updateSort}
          />
        )}
      </div>
      <div className="article-category-list--row center">
        <PaginationC
          page={page}
          totalPages={Math.ceil(articles.length / articlesPerPage)}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
