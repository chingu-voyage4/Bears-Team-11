export interface Category {
  _id: string;
  categoryName: string;
  arrayOfProjectIds: string[];
}

export interface Categories {
  categories: Array<Category>;
}
