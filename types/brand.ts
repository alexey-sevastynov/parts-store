import { IPromiseResponse } from './dashboard';
import { IProduct } from './goods';

export interface IBrand {
  _id?: string;
  name: string;
  website?: string;
}

export interface IBrandsProps extends IPromiseResponse<IBrand[]> {}
export interface IGoodsProps extends IPromiseResponse<IProduct[]> {}
