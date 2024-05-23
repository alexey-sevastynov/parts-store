'use client';

import { IUser } from '@/types/user';

import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';
import { ICategory } from '@/types/category';
import AddSubcategories from '@/components/modules/Dashboard/Categories/Add/AddSubcategories/AddSubcategories';

const AddSubcategoriesPage = ({
  users: { msg: msgUsers, status: statusUsers, users },
  data: { msg, status, category: data },
}: {
  users: { msg: string; status: number; users: IUser[] };
  data: { msg: string; status: number; category?: ICategory };
}) => {
  return (
    <main className='dashboard-pages'>
      <HeaderAdmin
        statusDataUsers={statusUsers}
        msgDataUsers={msgUsers}
        dataUsers={users}
      />

      {data && <AddSubcategories msg={msg} status={status} data={data} />}
    </main>
  );
};

export default AddSubcategoriesPage;
