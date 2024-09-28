import { transformStringToAdressLink } from '@/utils/common';
import { PAGE_NAMES } from '@/constants/page-names';

export const SIZE_ICON = 25;
export const SIZE_ICON_BIG = 30;

export const MAX_VALUE_ITEMS = 30;

export const ROUTES = {
  HOME: '/',
  DASHBOARD: `/${PAGE_NAMES.DASHBOARD}`,
  CATALOG: `/${PAGE_NAMES.CATALOG}`,
  VIEW_CATEGORY_BY_ID: (nameEn: string, id: string) => {
    return `/${PAGE_NAMES.CATALOG}/${transformStringToAdressLink(nameEn)}?id=${id}`;
  },

  ITEM_PRODUCT: (id: string) => {
    return `/${id}`;
  },

  VIEW_SUBCATEGORY_BY_ID: (
    nameSubcategoryEn: string,
    nameSubSubcategoryEn: string,
    idCategory: string,
    idSubcategory: string
  ) => {
    return `/${PAGE_NAMES.CATALOG}
    /${transformStringToAdressLink(nameSubcategoryEn)}
    /${transformStringToAdressLink(nameSubSubcategoryEn)}
    ?idCategory=${idCategory}
    &idSubcategory=${idSubcategory}`;
  },

  CUSTOMERS: `/${PAGE_NAMES.DASHBOARD}/${PAGE_NAMES.CUSTOMERS}`,
  VIEW_CUSTOMER_BY_ID: (id: string) => {
    return `${PAGE_NAMES.CUSTOMERS}/${id}`;
  },

  GOODS: `/${PAGE_NAMES.DASHBOARD}/${PAGE_NAMES.GOODS}`,
  GOODS_ADD: `/${PAGE_NAMES.DASHBOARD}/${PAGE_NAMES.GOODS}/${PAGE_NAMES.ADD}`,
  VIEW_GOODS_BY_ID: (id: string) => {
    return `${PAGE_NAMES.GOODS}/${id}`;
  },

  BRANDS: `/${PAGE_NAMES.DASHBOARD}/${PAGE_NAMES.BRANDS}`,
  BRANDS_ADD: `/${PAGE_NAMES.DASHBOARD}/${PAGE_NAMES.BRANDS}/${PAGE_NAMES.ADD}`,
  VIEW_BRANDS_BY_ID: (id: string) => {
    return `/${PAGE_NAMES.DASHBOARD}/${PAGE_NAMES.BRANDS}/${id}`;
  },

  CHARACTERISTICS: `/${PAGE_NAMES.DASHBOARD}/${PAGE_NAMES.CHARACTERISTICS}`,
  CHARACTERISTICS_ADD: `/${PAGE_NAMES.DASHBOARD}
  /${PAGE_NAMES.CHARACTERISTICS}
  /${PAGE_NAMES.ADD}`,
  VIEW_CHARACTERISTIC_BY_ID: (id: string) => {
    return `${PAGE_NAMES.CHARACTERISTICS}/${id}`;
  },

  CATEGORIES: `/${PAGE_NAMES.DASHBOARD}/${PAGE_NAMES.CATEGORIES}`,
  CATEGORIES_ADD: `/${PAGE_NAMES.DASHBOARD}/${PAGE_NAMES.CATEGORIES}/${PAGE_NAMES.ADD}`,
  VIEW_CATEGORIES_BY_ID: (id: string) => {
    return `${PAGE_NAMES.CATEGORIES}/${id}`;
  },

  VIEW_SUBCATEGORIES_ADD: (id: string) => {
    return `/${PAGE_NAMES.DASHBOARD}/${PAGE_NAMES.CATEGORIES}/${PAGE_NAMES.ADD}/${id}`;
  },

  VIEW_SUB_SUBCATEGORIES_ADD_BY_ID: (id1: string, id2: string) => {
    return `${id1}/${id2}`;
  },
} as const;
