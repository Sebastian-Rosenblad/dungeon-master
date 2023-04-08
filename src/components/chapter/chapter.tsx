import { useState } from "react";
import "./chapter.scss";
import { ChapterM } from "../../models/culture.model";
import { ParseText } from "../../assets/parse-text";

export function ChapterC(props: {
  chapter: ChapterM,
  updateChapter: (new_chapter: ChapterM) => void
}) {
  const [editing, setEditing] = useState(false);
  const [hiding, setHiding] = useState(true);

  return <div className="chapter">
    <h3 className="chapter--title">{props.chapter.name}</h3>
  </div>;
}
