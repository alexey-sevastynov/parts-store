import { ILanguageStrings } from './constants';

export interface ISubSubcategory {
  _id?: string;
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

export interface ISubcategoryWithIds {
  _id?: string;
  name: ILanguageStrings;
  imageUrl: string;
  subSubcategories: string[];
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
  updateListSubcategories: () => Promise<void>;
}

export interface ISubSubcategoryFormProps {
  subcategoryId: string;
  updateListData: () => Promise<void>;
}
