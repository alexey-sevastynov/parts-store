'use client';

import { IUser } from '@/types/user';

import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';
import Add from '@/components/modules/Dashboard/Categories/Add/Add';
import { ICategory } from '@/types/category';

const AddPage = ({
  users: { msg: msgUsers, status: statusUsers, data: users },
  data: { msg, status, data: categories },
}: {
  users: { msg: string; status: number; data: IUser[] };
  data: { msg: string; status: number; data: ICategory[] };
}) => {

  return (
    <main className='dashboard-pages'>
      <HeaderAdmin
        statusDataUsers={statusUsers}
        msgDataUsers={msgUsers}
        dataUsers={users}
      />

      {categories && <Add msg={msg} status={status} data={categories} />}
    </main>
  );
};

export default AddPage;
