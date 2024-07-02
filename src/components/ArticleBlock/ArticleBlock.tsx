import React, { useEffect, useState } from "react";
import "./ArticleBlock.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchArticleById } from "../../features/articles/article-slice";
import useAppDispatch from "../../hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import { ButtonC } from "../shared/Button";
import { IconButtonC } from "../shared/IconButton";
import { parseContent } from "../../utils/parseContent";

interface ArticleBlockPropsM {
  articleId: string;
}

export function ArticleBlockC({ articleId }: ArticleBlockPropsM): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const article = useSelector((state: RootState) => state.articles.articles.find(a => a.id === articleId));
  const category = useSelector((state: RootState) => state.projects.currentProject?.categories.find(cat => cat.id === article?.category) || null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!article) {
      dispatch(fetchArticleById({ articleId, setAsCurrent: false }));
    }
  }, [articleId, article, dispatch]);

  if (!article) return <div className="article-block">Loading...</div>;
  return (
    <div className="article-block" style={{ borderColor: category ? category.primaryColor : "#000" }}>
      <div className="article-block--header" style={{ backgroundColor: category ? category.secondaryColor : "#FFF" }}>
        <h3 style={{ color: category ? category.textColor : "#000" }}>{article.title}</h3>
        <div className="article-block--header--buttons">
          <ButtonC icon={isExpanded ? "cheveron-up" : "cheveron-down"} label={isExpanded ? "Collapse" : "Expand"} size="small" transparent onClick={() => setIsExpanded(!isExpanded)} />
          {isExpanded && <IconButtonC icon="edit-start" transparent onClick={() => navigate(`/article/${articleId}`)} />}
        </div>
      </div>
      {isExpanded && (
        <div className="article-block--content">{parseContent(article.content)}</div>
      )}
    </div>
  );
}
