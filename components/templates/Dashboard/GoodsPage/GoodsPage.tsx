'use client';

import Goods from '@/components/modules/Dashboard/Goods/Goods';
import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';
import { IUser } from '@/types/user';

const GoodsPage = ({
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

      <Goods />
    </main>
  );
};

export default GoodsPage;
