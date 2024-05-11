import { findUserById, getAllUsers } from '@/actions/authActions';
import CustomerPage from '@/components/templates/Dashboard/CustomersPage/CustomerPage/CustomerPage';
import { getUser, getUsers } from '@/utils/dashboards';

const Customer = async ({ params }: { params: { id: string } }) => {
  try {
    const fetchedUser = await getUser(params.id);
    const fetchedUsers = await getUsers();

    // Проверяем, есть ли данные о пользователе и список всех пользователей
    if (fetchedUser && fetchedUsers && fetchedUsers.users) {
      return <CustomerPage users={fetchedUsers} user={fetchedUser} />;
    } else {
      // Обработка случаев, когда данные отсутствуют или неполные
      return <div>Loading...</div>;
    }
  } catch (error) {
    console.error(error);
    // Обработка ошибки получения данных
    return <div>Error fetching data.</div>;
  }
};

export default Customer;
