export const SIZE_ICON = 25;
export const SIZE_ICON_BIG = 30;

export const MAX_VALUE_ITEMS = 30;

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',

  CUSTOMERS: '/dashboard/customers',
  VIEW_CUSTOMER_BY_ID: (id: string) => {
    return `customers/${id}`;
  },

  GOODS: '/dashboard/goods',

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
};
