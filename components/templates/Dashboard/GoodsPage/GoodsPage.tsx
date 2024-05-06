'use client';

import Goods from '@/components/modules/Dashboard/Goods/Goods';
import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';

const GoodsPage = () => {
  return (
    <main className='dashboard-pages'>
      <HeaderAdmin />

      <Goods />
    </main>
  );
};

export default GoodsPage;
