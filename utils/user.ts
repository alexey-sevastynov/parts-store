import { Role } from '@/constants/user';

export const getRoleFromString = (role: string): Role => {
  return role === Role.user ? Role.user : Role.admin;
};
