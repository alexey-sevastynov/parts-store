import { ReactNode } from 'react';
import { IUser } from './user';

export interface IAdminAsideButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface IItemNavAdminProps {
  icon: ReactNode;
  title: string;
  isActive: boolean;
}

export interface IInfoSmallPanelProps {
  icon: ReactNode;
  title: string;
  number: number;
}

export interface ICustomersItemProps extends IUser {
  checkboxes: { [key: string]: boolean };
  setCheckboxes: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean;
    }>
  >;
}
