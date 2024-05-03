import { Role } from '@/constants/user';

export const getRoleFromString = (role: string): Role => {
  return role === 'user' ? Role.user : Role.admin;
};
