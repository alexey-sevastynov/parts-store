import { ILanguageStrings } from './constants';

export interface ISubSubcategory {
  name: ILanguageStrings;
  iconUrl: string;
  description: string;
}

export interface ISubcategory {
  name: ILanguageStrings;
  iconUrl: string;
  subSubcategories: ISubSubcategory[];
}

export interface ICategory {
  _id?: string;
  iconUrl: string;
  name: ILanguageStrings;
  subcategories: ISubcategory[];
}
