'use client';

import Add from '@/components/modules/Dashboard/Goods/Add/Add';
import { IBrand } from '@/types/brand';

const AddPage = ({
  brands,
  brandsStatus,
  brandsMsg,
}: {
  brands: IBrand[];
  brandsStatus: number;
  brandsMsg: string;
}) => {
  return (
    <main className='dashboard-pages'>
      <Add brands={brands} brandsStatus={brandsStatus} brandsMsg={brandsMsg} />
    </main>
  );
};

export default AddPage;
