import { ReactNode } from 'react';

export interface IItemCategoryProps {
  title: string;
  icon: ReactNode;
  href?: string;
  isWithArrow?: boolean;
}
