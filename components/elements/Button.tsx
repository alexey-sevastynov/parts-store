import { ButtonHTMLAttributes } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button = ({ children, className, ...props }: IButtonProps) => {
  return (
    <button className={`btn-md ${className}`} {...props}>
      {children}
    </button>
  );
};
