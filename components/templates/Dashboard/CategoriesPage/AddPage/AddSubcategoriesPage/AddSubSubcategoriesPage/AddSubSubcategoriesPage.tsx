'use client';

import { IUser } from '@/types/user';

import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';
import { ISubcategory } from '@/types/category';
import AddSubSubcategories from '@/components/modules/Dashboard/Categories/Add/AddSubcategories/AddSubSubcategories/AddSubSubcategories';

const AddSubSubcategoriesPage = ({
  users: { msg: msgUsers, status: statusUsers, data: users },
  data: { msg, status, data: subcategory },
  idCategory,
}: {
  users: { msg: string; status: number; data: IUser[] };
  data: { msg: string; status: number; data: ISubcategory };
  idCategory: string;
}) => {
  return (
    <main className='dashboard-pages'>
      <HeaderAdmin
        statusDataUsers={statusUsers}
        msgDataUsers={msgUsers}
        dataUsers={users}
      />

      {subcategory && (
        <AddSubSubcategories
          msg={msg}
          status={status}
          data={subcategory}
          idCategory={idCategory}
        />
      )}
    </main>
  );
};

export default AddSubSubcategoriesPage;
