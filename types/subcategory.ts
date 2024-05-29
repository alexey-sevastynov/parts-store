import { ICategory, ISubcategory } from './category';

export interface ISubcategoryProps {
  title: string;
  data: ICategory;
}

export interface ISubSubCategoryProps {
  title: string;
  data: ISubcategory;
}
