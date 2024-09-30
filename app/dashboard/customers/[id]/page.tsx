import CustomerPage from '@/components/templates/Dashboard/CustomersPage/CustomerPage/CustomerPage';
import { getUser, getUsers } from '@/utils/dashboards';

const Customer = async ({ params }: { params: { id: string } }) => {
  try {
    const fetchedUser = await getUser(params.id);
    const fetchedUsers = await getUsers();

    if (fetchedUser && fetchedUsers && fetchedUsers.data) {
      return <CustomerPage users={fetchedUsers} user={fetchedUser} />;
    } else {
      return <div>Loading...</div>;
    }
  } catch (error) {
    console.error(error);
    return <div>Error fetching data.</div>;
  }
};

export default Customer;
