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

export interface IButtonIconDescriptionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  imageName: string;
  color: 'light' | 'dark';

  children: string;
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
export type ParagraphWeight =
  | 'bold'
  | 'semiBold'
  | 'medium'
  | 'light'
  | 'regular';

export type TitleSize = ParagraphSize;
export type TitleWeight = ParagraphWeight;
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

export interface IProductsItemProps {}

export interface BreadcrumbsItem {
  id: number;
  name: string;
  link?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbsItem[];
}

export interface SvgIconUrlProps {
  imageUrl: string;
  alt: string;
  className?: string;
  size?: number;
}

export interface ICategoryOverviewCardProps {
  hrefImage: string;
  title: string;
  hrefLink: string;
  description: string;
}
