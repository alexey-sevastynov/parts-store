import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';

export interface IInputs {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  passwordOld?: string;
  passwordNew?: string;
}

export interface IAuthInput {
  register: UseFormRegister<IInputs>;
  name?: 'password' | 'passwordOld' | 'passwordNew';
  errors: Partial<FieldErrorsImpl<IInputs>>;
  labalText?: string;
}

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  className?: string;
  nameIcon: string;
}

export type StatusType = 'loading' | 'success' | 'error' | 'idle' | null;

export type messageErrorType =
  | 'Incorrect password'
  | 'User not found'
  | 'Email already exsist'
  | 'Email does not exist'
  | 'Sign Up Success! Check your email to complete the registartion!'
  | 'Old password does not match!'
  | 'Changed Password Succussefully!'
  | 'A confirmation has been sent to the specified email address, please confirm it.';

export interface DeleteRequestData {
  url: string | string[];
}

export interface ResetPasswordProps {
  searchParams: {
    token: string;
  };
}
