import React, { useEffect, useState } from "react";
import './ArticleCategoryList.scss';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addArticle, fetchArticles } from "../../features/articles/article-slice";
import useAppDispatch from "../../hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import { ArticleTableC } from "../ArticleTable";
import { InputSearchC } from "../shared/InputSearch";
import { PaginationC } from "../shared/Pagination";
import { ButtonC } from "../shared/Button";
import { ProjectM } from "../../models/project.model";
import { ArticleM } from "../../models/article.model";
import { generateUniqueId } from "../../utils/generateUniqueId";
import { updateProjectArticles } from "../../features/projects/project-slice";

interface ArticleCategoryListPropsM {
  project: ProjectM;
}

export function ArticleCategoryListC({ project }: ArticleCategoryListPropsM): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const articles: ArticleM[] = useSelector((state: RootState) => state.articles.articles);
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
  function updateSort(column: "title" | "category", direction: "asc" | "desc"): void {
    setSortColumn(column);
    setSortDirection(direction);
  }
  function handleArticleClick(article: ArticleM): void {
    navigate(`/article/${article.id}`);
  }

  return (
    <div className="article-category-list">
      <div className="article-category-list--row">
        <ButtonC icon="add" label="New" onClick={createNewArticle} />
        <InputSearchC
          value={search}
          onChange={setSearch}
          placeholder="Search articles"
        />
      </div>
      <div className="article-category-list--row">
        <ArticleTableC
          articles={getFilteredArticles()}
          categories={project.categories}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={updateSort}
          onArticleClick={handleArticleClick}
        />
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
