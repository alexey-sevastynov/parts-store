'use client';

import Goods from '@/components/modules/Dashboard/Goods/Goods';
import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';
import { IProduct } from '@/types/goods';
import { IUser } from '@/types/user';

const GoodsPage = ({
  users: { msg: msgUsers, status: statusUsers, users },
  data: { msg, status, products },
}: {
  users: { msg: string; status: number; users?: IUser[] };
  data: { msg: string; status: number; products?: IProduct[] };
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
