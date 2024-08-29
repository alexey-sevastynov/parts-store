import Categories from '@/components/modules/Dashboard/Categories/Categories';
import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';
import { ICategory } from '@/types/category';
import { IUser } from '@/types/user';
import React from 'react';

const CategoriesPage = ({
  users: { msg: msgUsers, status: statusUsers, data: users },
  data: { msg, status, data: categories },
}: {
  users: { msg: string; status: number; data: IUser[] };
  data: { msg: string; status: number; data: ICategory[] };
}) => {
  return (
    <div className='dashboard-pages'>
      {users && (
        <HeaderAdmin
          statusDataUsers={statusUsers}
          msgDataUsers={msgUsers}
          dataUsers={users}
        />
      )}

      {categories && <Categories data={categories} status={status} msg={msg} />}
    </div>
  );
};

export default CategoriesPage;
