'use client';

import Customers from '@/app/dashboard/customers/page';
import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';

const CustomerPage = () => {
  return (
    <main className='customers-page'>
      <HeaderAdmin />

      <Customers />
    </main>
  );
};

export default CustomerPage;
