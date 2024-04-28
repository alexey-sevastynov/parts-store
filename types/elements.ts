import { ImageProps } from 'next/image';
import { LinkProps } from 'next/link';
import { IUserParams } from './user';
import { HTMLProps, ReactNode } from 'react';

export interface ILinkIconDescriptionProps
  extends LinkProps,
    React.HTMLAttributes<HTMLAnchorElement> {
  imageName: string;
  color: 'light' | 'dark';

  children: React.ReactNode;
}

export interface ILgotypeProps extends Omit<ImageProps, 'src' | 'alt'> {
  src?: string;
  alt?: string;
}

export interface ILogotypeSmallProps {
  theme?: ThemeType;
  color?: 'red' | 'orange';
}

export type ParagraphSize = 'xl' | 'lg' | 'md' | 'sm';
export type TitleSize = ParagraphSize;
export type ThemeType = 'light' | 'dark';

export interface IUserCardProps
  extends Omit<IUserParams, 'password' | 'phone'> {
  photo?: string;
  isActive?: boolean;
  isOnlyPhoto?: boolean;
  theme?: ThemeType;
}

export interface IIconWithTitleCounterProps {
  image: ReactNode;
  text: string;
  counter?: number | null;
}

export interface IPopupWindowProps {
  closePopupWindow: () => void;
  title: string;
  children: ReactNode;
}

export type TypeNotificationMessage = 'success' | 'error' | 'warning';

export interface INotificationBarProps extends HTMLProps<HTMLDivElement> {
  children: string;
  type?: TypeNotificationMessage;
}

type TypeChatacteristicItem = {
  id: string;
  name: {
    en: string;
    ru: string;
    ua: string;
  };
  value: {
    en: any;
    ru: any;
    ua: any;
  };
};

export interface IItemProduct {
  id: string;
  name: {
    en: string;
    ru: string;
    ua: string;
  };
  brand: string;
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
  manufacturerWebsite: string; // Manufacturer's website
  analogs?: any; // Links to product analogs or their names
  reviews?: any; // References to reviews
  compatibleCars?: any; // Car models compatible with the product

  availability: boolean; // Product availability
  quantityAvailable: number; // Quantity of available products
  rating?: number;
  // Other common fields if any
  characteristics?: TypeChatacteristicItem[]; // Dynamic characteristics of the product
  // Other common fields
}

export type TypeListProducts = IItemProduct[];

export interface IProductsItemProps {}
