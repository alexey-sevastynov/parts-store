import { MotionProps } from 'framer-motion';
import { HTMLProps } from 'react';
import { ICategory } from './category';
import { SWRResponse } from 'swr';

export interface IDropDownCatalogWrapperProps
  extends HTMLProps<HTMLDivElement> {
  categories: ICategory[];
  getCategoryByIdWithFallback: (id: string) => SWRResponse;
}

export interface IDropDownCatalogProps {
  categories: ICategory[];
  getCategoryByIdWithFallback: (id: string) => SWRResponse;
}

export interface IPopupWindowCatalogProps {
  categories: ICategory[];
  getCategoryByIdWithFallback: (id: string) => SWRResponse;
}

export interface IPopupWindowCatalogProps {
  categories: ICategory[];
  getCategoryByIdWithFallback: (id: string) => SWRResponse;
}
