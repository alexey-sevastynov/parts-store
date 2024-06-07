import { IBrand } from './brand';
import { ILanguageStrings } from './constants';

export interface IProduct {
  _id?: string;
  category: ILanguageStrings;
  name: ILanguageStrings;
  brand: IBrand;
  sku: string;
  price: number;
  salePrice?: number | null; // Discounted price
  photos?: string[]; // Links to product photos
  description: {
    en: string;
    ru: string;
    ua: string;
  };
  country?: {
    en: string;
    ru: string;
    ua: string;
  };

  analogs?: any; // Links to product analogs or their names
  reviews?: any; // References to reviews
  compatibleCars?: any; // Car models compatible with the product

  quantityAvailable: number; // Quantity of available products
  rating?: number;
  // Other common fields if any
  characteristics?: { name: ILanguageStrings; value: ILanguageStrings }[]; // Dynamic characteristics of the product
  // Other common fields
}

export interface IProductInputs {
  name: {
    en: string;
    ru: string;
    ua: string;
  };
  category: OptionCategoryType;
  brand: OptionBrandType;
  sku: string;
  price: number;
  description: ILanguageStrings;
  quantityAvailable: number;
  characteristics?: {
    name: OptionChatacteristicNameType;
    value: OptionCharacteristicValueType;
  };
  salePrice?: number | null;
  photos?: string[];

  country?: OptionCountryType;
  analogs?: any;
  reviews?: any;
  compatibleCars?: any;

  rating?: number;
}

export type OptionCategoryType = { value: ILanguageStrings; label: string };

export type OptionBrandType = { value: IBrand; label: string };

export type OptionCountryType = { value: ILanguageStrings; label: string };
export type OptionChatacteristicNameType = {
  value: {
    en: string;
    ru: string;
    ua: string;
    _id: string;
  };
  label: string;
};

export type OptionCharacteristicValueType = {
  value: {
    en: string;
    ru: string;
    ua: string;
    _id: string;
  };
  label: string;
};
