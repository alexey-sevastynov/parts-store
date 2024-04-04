import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';

export interface IInputs {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}

export interface IAuthInput {
  register: UseFormRegister<IInputs>;
  errors: Partial<FieldErrorsImpl<IInputs>>;
}

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  className?: string;
  nameIcon: string;
}
