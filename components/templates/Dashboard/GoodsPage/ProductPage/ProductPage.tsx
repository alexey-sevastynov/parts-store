'use client';
import Product from '@/components/modules/Dashboard/Goods/Product/Product';
import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';
import { IBrand } from '@/types/brand';
import { IProduct } from '@/types/goods';
import { IUser } from '@/types/user';

const ProductPage = ({
  users: { msg: msgUsers, status: statusUsers, users },
  data: { msg, status, data: product },
  brands,
  brandsStatus,
  brandsMsg,
}: {
  users: { msg: string; status: number; users?: IUser[] };
  data: { msg: string; status: number; data: IProduct | null };
  brands: IBrand[];
  brandsStatus: number;
  brandsMsg: string;
}) => {
  return (
    <main className='dashboard-pages'>
      {users && (
        <HeaderAdmin
          statusDataUsers={statusUsers}
          msgDataUsers={msgUsers}
          dataUsers={users}
        />
      )}

      {product && (
        <Product
          data={product}
          status={status}
          msg={msg}
          brands={brands}
          brandsMsg={brandsMsg}
          brandsStatus={brandsStatus}
        />
      )}
    </main>
  );
};

export default ProductPage;
