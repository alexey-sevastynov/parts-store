'use client';

import { IUser } from '@/types/user';

import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';
import { ICategory, ISubcategory } from '@/types/category';
import AddSubcategories from '@/components/modules/Dashboard/Categories/Add/AddSubcategories/AddSubcategories';
import AddSubSubcategories from '@/components/modules/Dashboard/Categories/Add/AddSubcategories/AddSubSubcategories/AddSubSubcategories';

const AddSubSubcategoriesPage = ({
  users: { msg: msgUsers, status: statusUsers, users },
  data: { msg, status, subcategory: data },
  idCategory,
}: {
  users: { msg: string; status: number; users: IUser[] };
  data: { msg: string; status: number; subcategory?: ISubcategory };
  idCategory: string;
}) => {
  return (
    <main className='dashboard-pages'>
      <HeaderAdmin
        statusDataUsers={statusUsers}
        msgDataUsers={msgUsers}
        dataUsers={users}
      />

      {data && (
        <AddSubSubcategories
          msg={msg}
          status={status}
          data={data}
          idCategory={idCategory}
        />
      )}
    </main>
  );
};

export default AddSubSubcategoriesPage;
