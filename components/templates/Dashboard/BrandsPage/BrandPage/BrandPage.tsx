'use client';

import { IUser } from '@/types/user';

import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';
import { IBrand } from '@/types/brand';
import Brand from '@/components/modules/Dashboard/Brands/Brand/Brand';

const BrandPage = ({
  users: { msg: msgUsers, status: statusUsers, users },
  data: { msg, status, brand: data },
}: {
  users: { msg: string; status: number; users: IUser[] };
  data: { msg: string; status: number; brand?: IBrand };
}) => {
  return (
    <main className='dashboard-pages'>
      <HeaderAdmin
        statusDataUsers={statusUsers}
        msgDataUsers={msgUsers}
        dataUsers={users}
      />

      {data && <Brand data={data} />}
    </main>
  );
};

export default BrandPage;
