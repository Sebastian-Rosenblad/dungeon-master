import { CategoryM } from "./category.model";

export interface ProjectM {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  categories: CategoryM[];
  articles: string[];
}
