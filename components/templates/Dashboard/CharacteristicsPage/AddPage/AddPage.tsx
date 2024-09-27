'use client';

import { IUser } from '@/types/user';

import Add from '@/components/modules/Dashboard/Characteristics/Add/Add';
import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';

const AddPage = ({
  users: { msg: msgUsers, status: statusUsers, data: users },
}: {
  users: { msg: string; status: number; data: IUser[] };
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
