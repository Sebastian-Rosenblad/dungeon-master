export interface CultureM {
  id: string;
  name: string;
  chapters: Array<{
    name: string;
    texts: Array<string>;
  }>;
}
