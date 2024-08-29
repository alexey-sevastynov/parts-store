'use client';

import { IUser } from '@/types/user';

import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';
import { IBrand } from '@/types/brand';
import Brand from '@/components/modules/Dashboard/Brands/Brand/Brand';

const BrandPage = ({
  users: { msg: msgUsers, status: statusUsers, data: users },
  data: { msg, status, data: brand },
}: {
  users: { msg: string; status: number; data: IUser[] };
  data: { msg: string; status: number; data: IBrand };
}) => {
  return (
    <main className='dashboard-pages'>
      <HeaderAdmin
        statusDataUsers={statusUsers}
        msgDataUsers={msgUsers}
        dataUsers={users}
      />

      {brand && <Brand data={brand} />}
    </main>
  );
};

export default BrandPage;
