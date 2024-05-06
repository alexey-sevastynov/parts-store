export const SIZE_ICON = 25;
export const SIZE_ICON_BIG = 30;

export const MAX_VALUE_ITEMS = 30;

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  CUSTOMERS: '/dashboard/customers',
  GOODS: '/dashboard/goods',
  CHARACTERISTIC: '/dashboard/characteristic',

  VIEW_CUSTOMER_BY_ID: (id: string) => {
    return `customers/${id}`;
  },
};
