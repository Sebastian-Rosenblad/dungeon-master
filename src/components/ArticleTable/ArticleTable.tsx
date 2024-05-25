import React, { useState } from "react";
import "./ArticleTable.scss";
import { updateProjectArticles } from "../../features/projects/project-slice";
import { removeArticleById } from "../../features/articles/article-slice";
import useAppDispatch from "../../hooks/useAppDispatch";
import { ButtonC } from "../shared/Button";
import { IconC } from "../shared/Icon";
import { IconButtonC } from "../shared/IconButton";
import { MenuPopupC } from "../shared/MenuPopup";
import { LightboxC } from "../shared/Lightbox";
import { ArticleM } from "../../models/article.model";
import { CategoryM } from "../../models/category.model";

interface ArticleTablePropsM {
  articles: ArticleM[];
  categories: CategoryM[];
  sortColumn: "title" | "category";
  sortDirection: "asc" | "desc";
  onSort: (direction: "asc" | "desc", column: "title" | "category") => void;
  onArticleClick: (article: ArticleM) => void;
}

export function ArticleTableC({ articles, categories, sortColumn, sortDirection, onSort, onArticleClick }: ArticleTablePropsM): JSX.Element {
  const dispatch = useAppDispatch();
  const [buttonHover, setButtonHover] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [deleteArticle, setDeleteArticle] = useState<ArticleM | null>(null);
  const [showLightbox, setShowLightbox] = useState<boolean>(false);

  function handleSort(column: "title" | "category"): void {
    const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    onSort(newDirection, column);
  }
  function handleMouseEnter(): void {
    setButtonHover(true);
  }
  function handleMouseLeave(): void {
    setButtonHover(false);
  }
  function handleShowMenu(event: React.MouseEvent, article: ArticleM): void {
    event.stopPropagation();
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setDeleteArticle(article);
  }
  function handleDeleteArticle(): void {
    if (deleteArticle) {
      dispatch(removeArticleById(deleteArticle.id));
      dispatch(updateProjectArticles({ projectId: deleteArticle.projectId, articleId: deleteArticle.id, type: "remove" }));
    }
    handleCloseLightbox();
  }
  function handleCloseMenu(): void {
    setDeleteArticle(null);
  }
  function handleShowLightbox(): void {
    setShowLightbox(true);
  }
  function handleCloseLightbox(): void {
    setShowLightbox(false);
    setDeleteArticle(null);
  }

  function getCategory(id: string): CategoryM {
    return categories.find(category => category.id === id) || categories[0];
  }

  return (
    <div className="article-table">
      <div className="article-table--head">
        <div className="article-table--head--row">
          <p className="article-table--head--row--icon"></p>
          <p onClick={() => handleSort("title")} className="article-table--head--row--title sortable-column">
            <span>Title</span>
            {sortColumn === "title" && <IconC name={sortDirection === "asc" ? "sort-active-asc" : "sort-active-desc"} size="small" />}
            {sortColumn !== "title" && <IconC name="sort-asc" size="small" />}
          </p>
          <p onClick={() => handleSort("category")} className="article-table--head--row--category sortable-column">
            <span>Category</span>
            {sortColumn === "category" && <IconC name={sortDirection === "asc" ? "sort-active-asc" : "sort-active-desc"} size="small" />}
            {sortColumn !== "category" && <IconC name="sort-asc" size="small" />}
          </p>
          <p className="article-table--head--row--menu"></p>
        </div>
      </div>
      <div className="article-table--body">
        {articles.map(article => (
          <div
            key={article.id}
            className={["article-table--body--row", buttonHover && "no-hover"].join(" ")}
            onClick={() => onArticleClick(article)}
          >
            <div className="article-table--body--row--icon">
              <div className="article-table--body--row--icon-background" style={{ backgroundColor: getCategory(article.category).primaryColor }}>
                <IconC name={getCategory(article.category).icon} fill={getCategory(article.category).secondaryColor} />
              </div>
            </div>
            <h3 className="article-table--body--row--title">{article.title}</h3>
            <p className="article-table--body--row--category">{getCategory(article.category).name}</p>
            <p className="article-table--head--row--menu">
              <IconButtonC
                icon="dots-menu"
                transparent
                onClick={(evt) => handleShowMenu(evt, article)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </p>
          </div>
        ))}
        {articles.length === 0 && (
          <div className="article-table--body--row no-hover">
            <p className="article-table--body--row--empty">There are no articles linked to this project.</p>
          </div>
        )}
      </div>
      {!showLightbox && deleteArticle && (
        <MenuPopupC
          x={menuPosition.x}
          y={menuPosition.y}
          items={[
            { label: "Delete", icon: "delete", onClick: handleShowLightbox }
          ]}
          onClose={handleCloseMenu}
        />
      )}
      {showLightbox && (
        <LightboxC title="Confirm" icon="delete" onClose={handleCloseLightbox}>
          <p>Are you sure you want to delete the article?</p>
          <div className="lightbox--buttons">
            <ButtonC label="Yes" onClick={handleDeleteArticle}></ButtonC>
            <ButtonC label="No" onClick={handleCloseLightbox}></ButtonC>
          </div>
        </LightboxC>
      )}
    </div>
  );
}
