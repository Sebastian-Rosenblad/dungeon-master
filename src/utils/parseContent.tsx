import React from 'react';
import parse, { HTMLReactParserOptions, DOMNode, Element } from 'html-react-parser';
import { ArticleBlockC } from '../components/ArticleBlock';
import { InlineArticleC } from '../components/InlineArticle';

export function parseContent(content: string): React.ReactNode {
  const blockRegex = /<p>\[article-block\](.*?)\[\/\]<\/p>/g;
  const inlineRegex = /\[article\](.*?)\[\/\]/g;
  const imgBlockRegex = /<p>\[img\](.*?)\[\/\]<\/p>/g;

  const contentWithPlaceholders = content
    .replace(blockRegex, (_, articleId) => `<article-block data-article-id="${articleId}"></article-block>`)
    .replace(inlineRegex, (_, articleId) => `<inline-article data-article-id="${articleId}"></inline-article>`)
    .replace(imgBlockRegex, (_, src) => `<img data-src="${src}" />`)
  ;

  const options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      if (domNode.type === "tag" && domNode.name === "article-block") {
        const element = domNode as Element;
        const articleId = element.attribs["data-article-id"];
        return <ArticleBlockC key={articleId} articleId={articleId} />;
      }
      else if (domNode.type === "tag" && domNode.name === "inline-article") {
        const element = domNode as Element;
        const articleId = element.attribs["data-article-id"];
        return <InlineArticleC key={articleId} articleId={articleId} />;
      }
      else if (domNode.type === "tag" && domNode.name === "img") {
        const element = domNode as Element;
        const source = element.attribs["data-src"];
        return <img src={'/images/' + source} />
      }
      return domNode;
    },
  };

  return parse(contentWithPlaceholders, options);
}
