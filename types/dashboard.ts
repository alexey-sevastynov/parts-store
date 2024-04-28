import { ReactNode } from 'react';

export interface IAdminAsideButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface IItemNavAdminProps {
  icon: ReactNode;

  title: string;

  isActive: boolean;
}
