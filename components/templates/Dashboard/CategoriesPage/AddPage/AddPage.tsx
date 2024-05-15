'use client';

import { IUser } from '@/types/user';

import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';

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
    </main>
  );
};

export default AddPage;
