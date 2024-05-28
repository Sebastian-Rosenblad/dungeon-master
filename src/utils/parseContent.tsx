import React from 'react';
import parse, { HTMLReactParserOptions, DOMNode, Element } from 'html-react-parser';
import { ArticleBlockC } from '../components/ArticleBlock';

export function parseContent(content: string): React.ReactNode {
  const regex = /<p>\[article\](.*?)\[\/\]<\/p>/g;
  console.log(content);

  const contentWithPlaceholders = content.replace(regex, (match, articleId) => {
    return `<article-block data-article-id="${articleId}"></article-block>`;
  });

  const options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      if (domNode.type === "tag" && domNode.name === "article-block") {
        const element = domNode as Element;
        const articleId = element.attribs["data-article-id"];
        return <ArticleBlockC key={articleId} articleId={articleId} />;
      }
      return domNode;
    },
  };

  return parse(contentWithPlaceholders, options);
}
