'use client';

import { IUser } from '@/types/user';

import Add from '@/components/modules/Dashboard/Brands/Add/Add';
import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';
import { IBrand } from '@/types/brand';

const AddPage = ({
  users: { msg: msgUsers, status: statusUsers, data: users },
  brands: { msg: msgBrands, status: statusBrands, data: brands },
}: {
  users: { msg: string; status: number; data: IUser[] };
  brands: { msg: string; status: number; data: IBrand[] };
}) => {
  return (
    <main className='dashboard-pages'>
      <HeaderAdmin
        statusDataUsers={statusUsers}
        msgDataUsers={msgUsers}
        dataUsers={users}
      />

      <Add msg={msgBrands} status={statusBrands} data={brands} />
    </main>
  );
};

export default AddPage;
