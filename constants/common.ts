import { transformStringToAdressLink } from '@/utils/common';

export const SIZE_ICON = 25;
export const SIZE_ICON_BIG = 30;

export const MAX_VALUE_ITEMS = 30;

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  CATALOG: '/catalog',
  VIEW_CATEGORY_BY_ID: (nameEn: string, id: string) => {
    return `/catalog/${transformStringToAdressLink(nameEn)}?id=${id}`;
  },

  VIEW_SUBCATEGORY_BY_ID: (
    nameSubcategoryEn: string,
    nameSubSubcategoryEn: string,
    idCategory: string,
    idSubcategory: string
  ) => {
    return `/catalog/${transformStringToAdressLink(nameSubcategoryEn)}/${transformStringToAdressLink(nameSubSubcategoryEn)}?idCategory=${idCategory}&idSubcategory=${idSubcategory}`;
  },

  CUSTOMERS: '/dashboard/customers',
  VIEW_CUSTOMER_BY_ID: (id: string) => {
    return `customers/${id}`;
  },

  GOODS: '/dashboard/goods',
  GOODS_ADD: '/dashboard/goods/add',
  VIEW_GOODS_BY_ID: (id: string) => {
    return `goods/${id}`;
  },

  BRANDS: '/dashboard/brands',
  BRANDS_ADD: '/dashboard/brands/add',
  VIEW_BRANDS_BY_ID: (id: string) => {
    return `/dashboard/brands/${id}`;
  },

  CHARACTERISTICS: '/dashboard/characteristics',
  CHARACTERISTICS_ADD: '/dashboard/characteristics/add',
  VIEW_CHARACTERISTIC_BY_ID: (id: string) => {
    return `characteristics/${id}`;
  },

  CATEGORIES: '/dashboard/categories',
  CATEGORIES_ADD: '/dashboard/categories/add',
  VIEW_CATEGORIES_BY_ID: (id: string) => {
    return `categories/${id}`;
  },

  VIEW_SUBCATEGORIES_ADD: (id: string) => {
    return `/dashboard/categories/add/${id}`;
  },

  VIEW_SUB_SUBCATEGORIES_ADD_BY_ID: (id1: string, id2: string) => {
    return `${id1}/${id2}`;
  },
};
