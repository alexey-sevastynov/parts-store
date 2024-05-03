'use server';

import CustomersPage from '@/components/templates/Dashboard/CustomersPage/CustomersPage';

const Customer = async ({ params }: { params: { id: string } }) => {
  return <CustomersPage />;
};

export default Customer;
