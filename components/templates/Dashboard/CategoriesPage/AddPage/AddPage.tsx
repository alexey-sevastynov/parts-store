'use client';

import { IUser } from '@/types/user';

import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';
import Add from '@/components/modules/Dashboard/Categories/Add/Add';

const AddPage = ({
  users: { msg: msgUsers, status: statusUsers, users },
}: {
  users: { msg: string; status: number; users: IUser[] };
}) => {
  return (
    <main className='dashboard-pages'>
      <HeaderAdmin
        statusDataUsers={statusUsers}
        msgDataUsers={msgUsers}
        dataUsers={users}
      />

      <Add />
    </main>
  );
};

export default AddPage;
