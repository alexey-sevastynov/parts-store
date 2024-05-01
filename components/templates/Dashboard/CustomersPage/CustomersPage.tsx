'use client';

import CustomersTable from '@/components/modules/Dashboard/Customers/CustomersTable';
import HeaderAdmin from '@/components/modules/Dashboard/Header/HeaderAdmin';

const CustomersPage = () => {
  return (
    <main className='customers-page'>
      <HeaderAdmin />

      <CustomersTable />
    </main>
  );
};

export default CustomersPage;
