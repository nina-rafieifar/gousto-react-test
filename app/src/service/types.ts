export interface ICategory {
  id: string;
  title: string;
  hidden: boolean;
}

export interface IProduct {
  id: string;
  title: string;
  description: string;
  categories: string[];
}
