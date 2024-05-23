'use client';

import { IUser } from '@/types/user';

import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';
import Add from '@/components/modules/Dashboard/Categories/Add/Add';
import { ICategory } from '@/types/category';

const AddPage = ({
  users: { msg: msgUsers, status: statusUsers, users },
  data: { msg, status, categories: data },
}: {
  users: { msg: string; status: number; users: IUser[] };
  data: { msg: string; status: number; categories?: ICategory[] };
}) => {
  console.log(data);

  return (
    <main className='dashboard-pages'>
      <HeaderAdmin
        statusDataUsers={statusUsers}
        msgDataUsers={msgUsers}
        dataUsers={users}
      />

      {data && <Add msg={msg} status={status} data={data} />}
    </main>
  );
};

export default AddPage;
