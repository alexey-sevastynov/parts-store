'use client';

import Customers from '@/components/modules/Dashboard/Customers/Customers';
import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';

const CustomersPage = () => {
  return (
    <main className='customers-page'>
      <HeaderAdmin />

      <Customers />
    </main>
  );
};

export default CustomersPage;
