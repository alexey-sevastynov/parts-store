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
