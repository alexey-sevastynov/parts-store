'use client';

import { IUser } from '@/types/user';

import Customers from '@/components/modules/Dashboard/Customers/Customers';
import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';

const CustomersPage = ({
  data: { msg, status, users },
}: {
  data: { msg: string; status: number; users: IUser[] };
}) => {
  return (
    <main className='dashboard-pages'>
      <HeaderAdmin
        statusDataUsers={status}
        msgDataUsers={msg}
        dataUsers={users}
      />

      <Customers data={users} status={status} msg={msg} />
    </main>
  );
};

export default CustomersPage;
