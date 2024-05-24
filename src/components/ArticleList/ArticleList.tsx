import React from "react";
import "./ArticleList.scss";

export function ArticleListC(): JSX.Element {
  return (
    <div className="article-list">
      <h2>Articles</h2>
      <ul>
        <li>
          <h3>Article 1</h3>
          <p>Article 1 content</p>
        </li>
        <li>
          <h3>Article 2</h3>
          <p>Article 2 content</p>
        </li>
      </ul>
    </div>
  );
}
