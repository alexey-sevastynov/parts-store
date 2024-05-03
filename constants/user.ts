export enum Role {
  admin = 'admin',
  user = 'user',
}

export type TypeRole = keyof typeof Role;
