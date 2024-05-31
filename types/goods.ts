import { IBrand } from './brand';
import { ILanguageStrings } from './constants';

export interface IProduct {
  _id: string;
  name: {
    en: string;
    ru: string;
    ua: string;
  };
  brand: IBrand[];
  sku: string;
  price: number;
  salePrice?: number | null; // Discounted price
  photos?: string[]; // Links to product photos
  description: {
    en: string;
    ru: string;
    ua: string;
  };
  country?: string;

  analogs?: any; // Links to product analogs or their names
  reviews?: any; // References to reviews
  compatibleCars?: any; // Car models compatible with the product

  availability: boolean; // Product availability
  quantityAvailable: number; // Quantity of available products
  rating?: number;
  // Other common fields if any
  characteristics?: { name: ILanguageStrings; value: ILanguageStrings }[]; // Dynamic characteristics of the product
  // Other common fields
}
