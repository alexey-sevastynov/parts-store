import { HTMLAttributes, ReactNode } from 'react';

export interface IItemLinkCategoryProps extends HTMLAttributes<HTMLLIElement> {
  title: string;
  icon: string;
  href?: string;
  isWithArrow?: boolean;
}

export type TypeItemCart = {
  id: string;
  href: string;
  image: string;
  description: string;
};

export interface ICartNotificationBarProps {
  items: TypeItemCart[];
}
