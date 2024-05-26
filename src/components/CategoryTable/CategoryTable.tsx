import React, { useState } from "react";
import "./CategoryTable.scss";
import { updateProjectCategory } from "../../features/projects/project-slice";
import useAppDispatch from "../../hooks/useAppDispatch";
import { ButtonC } from "../shared/Button";
import { IconC } from "../shared/Icon";
import { IconButtonC } from "../shared/IconButton";
import { EditableTextC } from "../shared/EditableText";
import { MenuPopupC } from "../shared/MenuPopup";
import { LightboxC } from "../shared/Lightbox";
import { CategoryM } from "../../models/category.model";

interface CategoryTablePropsM {
  categories: CategoryM[];
  sortDirection: "asc" | "desc";
  onSort: (direction: "asc" | "desc") => void;
}

export function CategoryTableC({ categories, sortDirection, onSort }: CategoryTablePropsM): JSX.Element {
  const dispatch = useAppDispatch();
  const [menuPosition, setMenuPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [deleteCategory, setDeleteCategory] = useState<CategoryM | null>(null);
  const [showLightbox, setShowLightbox] = useState<boolean>(false);

  function handleUpdateCategory(category: CategoryM): void {
    dispatch(updateProjectCategory({ category, type: "update" }));
  }
  function handleShowMenu(event: React.MouseEvent, category: CategoryM): void {
    event.stopPropagation();
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setDeleteCategory(category);
  }
  function handleDeleteCategory(): void {
    if (deleteCategory) {
      dispatch(updateProjectCategory({ category: deleteCategory, type: "remove" }));
    }
    handleCloseLightbox();
  }
  function handleCloseMenu(): void {
    setDeleteCategory(null);
  }
  function handleShowLightbox(): void {
    setShowLightbox(true);
  }
  function handleCloseLightbox(): void {
    setShowLightbox(false);
    setDeleteCategory(null);
  }

  return (
    <div className="category-table">
      <div className="category-table--head">
        <div className="category-table--head--row">
          <p className="category-table--head--row--icon">Icon</p>
          <p onClick={() => onSort("asc")} className="category-table--head--row--name sortable-column">
            <span>Category</span>
            <IconC name={sortDirection === "asc" ? "sort-active-asc" : "sort-active-desc"} size="small" />
          </p>
          <p className="category-table--head--row--text-color">Text</p>
          <p className="category-table--head--row--primary-color">Primary</p>
          <p className="category-table--head--row--secondary-color">Secondary</p>
          <p className="article-table--head--row--menu"></p>
        </div>
      </div>
      <div className="category-table--body">
        {categories.map(category => (
          <div key={category.id} className="category-table--body--row">
            <div className="category-table--body--row--icon">
              <div className="category-table--body--row--icon-background" style={{ backgroundColor: category.primaryColor }}>
                <IconC name={category.icon} fill={category.secondaryColor} />
              </div>
            </div>
            <div className="category-table--body--row--name">
              <EditableTextC text={category.name} tag="h3" onSave={(value) => handleUpdateCategory({ ...category, name: value })} />
            </div>
            <div className="category-table--body--row--text-color"></div>
            <div className="category-table--body--row--primary-color"></div>
            <div className="category-table--body--row--secondary-color"></div>
            <p className="article-table--head--row--menu">
              {categories.length > 1 && <IconButtonC
                icon="dots-menu"
                transparent
                onClick={(evt) => handleShowMenu(evt, category)}
              />}
            </p>
          </div>
        ))}
      </div>
      {!showLightbox && deleteCategory && (
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
          <p>Are you sure you want to delete the category?</p>
          <div className="lightbox--buttons">
            <ButtonC label="Yes" onClick={handleDeleteCategory}></ButtonC>
            <ButtonC label="No" onClick={handleCloseLightbox}></ButtonC>
          </div>
        </LightboxC>
      )}
    </div>
  );
}
