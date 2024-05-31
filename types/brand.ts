import { IPromiseResponse } from './dashboard';

export interface IBrand {
  _id?: string;
  name: string;
  website?: string;
}

export interface IBrandsProps extends IPromiseResponse<IBrand[]> {}
