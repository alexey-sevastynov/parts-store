'use server';

import CustomerPage from '@/components/templates/Dashboard/CustomersPage/CustomerPage/CustomerPage';

const Customer = async ({ params }: { params: { id: string } }) => {
  return <CustomerPage />;
};

export default Customer;
