import React from 'react';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  colotButton?: 'red' | 'green' | 'orange';
}

export const Button = ({
  children,
  className,
  colotButton = 'green',
  ...props
}: IButtonProps) => {
  const colorClasses = {
    red: 'btn-red',
    green: 'btn-green',
    orange: 'btn-orange',
  };

  return (
    <button
      className={`btn-md ${colorClasses[colotButton as 'red' | 'green' | 'orange']} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
