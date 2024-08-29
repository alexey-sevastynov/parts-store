'use client';

import { IUser } from '@/types/user';

import Customer from '@/components/modules/Dashboard/Customers/Customer/Customer';
import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';

const CustomerPage = (data: {
  user: { msg: string; status: number; data: IUser };
  users: { msg: string; status: number; data: IUser[] };
}) => {
  const userData = data.user.data;
  console.log('userData:', userData);
  return (
    <main className='dashboard-pages'>
      <HeaderAdmin
        statusDataUsers={data.users.status}
        msgDataUsers={data.users.msg}
        dataUsers={data.users.data}
      />

      {userData && <Customer data={userData} />}
    </main>
  );
};

export default CustomerPage;
