'use client';

import { IUser } from '@/types/user';

import Customer from '@/components/modules/Dashboard/Customers/Customer/Customer';
import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';

const CustomerPage = (data: {
  user: { msg: string; status: number; user?: IUser };
  users: { msg: string; status: number; users: IUser[] };
}) => {
  const userData = data.user.user;
  return (
    <main className='dashboard-pages'>
      <HeaderAdmin
        statusDataUsers={data.users.status}
        msgDataUsers={data.users.msg}
        dataUsers={data.users.users}
      />

      {userData && <Customer data={userData} />}
    </main>
  );
};

export default CustomerPage;
