import React from 'react';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ children, className, ...props }: IButtonProps) => {
  return (
    <button className={`btn-md ${className}`} {...props}>
      {children}
    </button>
  );
};
