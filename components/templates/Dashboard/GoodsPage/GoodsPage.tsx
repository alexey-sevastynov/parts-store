'use client';

import Goods from '@/components/modules/Dashboard/Goods/Goods';
import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';
import { IProduct } from '@/types/goods';
import { IUser } from '@/types/user';

const GoodsPage = ({
  users: { msg: msgUsers, status: statusUsers, data: users },
  data: { msg, status, data: products },
}: {
  users: { msg: string; status: number; data: IUser[] };
  data: { msg: string; status: number; data: IProduct[] };
}) => {
  return (
    <main className='dashboard-pages'>
      {users && (
        <HeaderAdmin
          statusDataUsers={statusUsers}
          msgDataUsers={msgUsers}
          dataUsers={users}
        />
      )}

      {products && <Goods data={products} status={status} msg={msg} />}
    </main>
  );
};

export default GoodsPage;
