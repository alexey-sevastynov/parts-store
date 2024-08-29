'use client';

import { IUser } from '@/types/user';

import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';
import { ICategory } from '@/types/category';
import AddSubcategories from '@/components/modules/Dashboard/Categories/Add/AddSubcategories/AddSubcategories';

const AddSubcategoriesPage = ({
  users: { msg: msgUsers, status: statusUsers, data: users },
  data: { msg, status, data: category },
}: {
  users: { msg: string; status: number; data: IUser[] };
  data: { msg: string; status: number; data: ICategory };
}) => {
  return (
    <main className='dashboard-pages'>
      <HeaderAdmin
        statusDataUsers={statusUsers}
        msgDataUsers={msgUsers}
        dataUsers={users}
      />

      {category && <AddSubcategories msg={msg} status={status} data={category} />}
    </main>
  );
};

export default AddSubcategoriesPage;
