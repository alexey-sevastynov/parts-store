export const SIZE_ICON = 25;
export const SIZE_ICON_BIG = 30;

export const MAX_VALUE_ITEMS = 30;

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  CUSTOMERS: '/dashboard/customers',
  GOODS: '/dashboard/goods',
  CHARACTERISTICS: '/dashboard/characteristics',
  CHARACTERISTICS_ADD: '/dashboard/characteristics/add',

  VIEW_CHARACTERISTIC_BY_ID: (id: string) => {
    return `characteristics/${id}`;
  },

  VIEW_CUSTOMER_BY_ID: (id: string) => {
    return `customers/${id}`;
  },
};
