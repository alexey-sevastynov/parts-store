import { TypeRole } from '@/constants/user';

export interface IUserParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface IUser extends IUserParams {
  _id: string;
  photo?: string;
  viewedProducts?: string[];
  cart?: string[];
  likedProducts?: string[];
  cars?: string[];
  orders?: string[];
  provider?: string;
  role?: TypeRole;
  createdAt?: string;
  updatedAt?: string;
  isBlocked: boolean;
}
