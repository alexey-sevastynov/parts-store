import { ILanguageStrings } from './constants';

export interface ISubSubcategory {
  name: ILanguageStrings;
  imageUrl: string;
  description: string;
}

export interface ISubcategory {
  _id?: string;
  name: ILanguageStrings;
  imageUrl: string;
  subSubcategories: ISubSubcategory[];
}

export interface ICategory {
  _id?: string;
  imageUrl: string;
  name: ILanguageStrings;
  subcategories: ISubcategory[];
}

export interface ICategoryFormData {
  nameEn: string;
  nameUa: string;
  nameRu: string;
  imageUrl: string;
}

export interface ISubcategoryFormData extends ICategoryFormData {}
export interface ISubSubcategoryFormData extends ICategoryFormData {
  description?: string;
}

export interface ISubcategoryFormProps {
  categoryId: string;
}

export interface ISubSubcategoryFormProps {
  subcategoryId: string;
}
