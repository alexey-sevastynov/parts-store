'use client';

import { IUser } from '@/types/user';

import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';
import { ICategory, ISubcategory } from '@/types/category';
import AddSubcategories from '@/components/modules/Dashboard/Categories/Add/AddSubcategories/AddSubcategories';
import AddSubSubcategories from '@/components/modules/Dashboard/Categories/Add/AddSubcategories/AddSubSubcategories/AddSubSubcategories';

const AddSubSubcategoriesPage = ({
  users: { msg: msgUsers, status: statusUsers, users },
  data: { msg, status, subcategory: data },
  idSubcategory,
}: {
  users: { msg: string; status: number; users: IUser[] };
  data: { msg: string; status: number; subcategory?: ISubcategory };
  idSubcategory: string;
}) => {
  return (
    <main className='dashboard-pages'>
      <HeaderAdmin
        statusDataUsers={statusUsers}
        msgDataUsers={msgUsers}
        dataUsers={users}
      />

      <AddSubSubcategories
        msg={msg}
        status={status}
        data={data}
        idSubcategory={idSubcategory}
      />
    </main>
  );
};

export default AddSubSubcategoriesPage;
