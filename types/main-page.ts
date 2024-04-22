import { ReactNode } from 'react';

export interface IItemCategoryProps {
  title: string;
  icon: ReactNode;
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
