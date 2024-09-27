'use client';

import Add from '@/components/modules/Dashboard/Goods/Add/Add';
import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';
import { IBrand } from '@/types/brand';
import { IUser } from '@/types/user';

const AddPage = ({
  brands,
  brandsStatus,
  brandsMsg,
  data: { msg, status, data: users },
}: {
  brands: IBrand[];
  brandsStatus: number;
  brandsMsg: string;
  data: { msg: string; status: number; data: IUser[] };
}) => {
  return (
    <main className='dashboard-pages'>
      <HeaderAdmin
        statusDataUsers={status}
        msgDataUsers={msg}
        dataUsers={users}
      />

      <Add brands={brands} brandsStatus={brandsStatus} brandsMsg={brandsMsg} />
    </main>
  );
};

export default AddPage;
