'use server';

import { getAllUsers } from '@/actions/authActions';
import CustomersPage from '@/components/templates/Dashboard/CustomersPage/CustomersPage';

const getUsers = async () => {
  const res = await getAllUsers();
  return res.users;
};

const Customers = async () => {
  const users = await getUsers();

  console.log(users);

  return <CustomersPage />;
};

export default Customers;
