import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';
import { IUser } from '@/types/user';
import React from 'react';

const CategoriesPage = ({
  users: { msg: msgUsers, status: statusUsers, users },
}: {
  users: { msg: string; status: number; users: IUser[] };
}) => {
  return (
    <div className='dashboard-pages'>
      <HeaderAdmin
        statusDataUsers={statusUsers}
        msgDataUsers={msgUsers}
        dataUsers={users}
      />
    </div>
  );
};

export default CategoriesPage;
