export interface CultureM {
  id: string;
  name: string;
  description: Array<string>;
  chapters: Array<ChapterM>;
}
export interface ChapterM {
  name: string;
  text: Array<string>;
}
