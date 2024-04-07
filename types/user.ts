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
  viewedProducts?: any;
  cart?: any;
  likedProducts?: any;
  cars?: any;
  orders?: any;
}
