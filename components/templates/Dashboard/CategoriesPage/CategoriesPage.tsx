import Categories from '@/components/modules/Dashboard/Categories/Categories';
import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';
import { ICategory } from '@/types/category';
import { IUser } from '@/types/user';
import React from 'react';

const CategoriesPage = ({
  users: { msg: msgUsers, status: statusUsers, users },
  data: { msg, status, categories },
}: {
  users: { msg: string; status: number; users?: IUser[] };
  data: { msg: string; status: number; categories?: ICategory[] };
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
