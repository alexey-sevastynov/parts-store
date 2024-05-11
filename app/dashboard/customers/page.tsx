import { getAllUsers } from '@/actions/authActions';
import CustomersPage from '@/components/templates/Dashboard/CustomersPage/CustomersPage';
import { getUsers } from '@/utils/dashboards';

const Customers = async () => {
  try {
    const fetchedUsers = await getUsers();

    // Проверяем, есть ли данные о пользователях
    if (fetchedUsers && fetchedUsers.users) {
      return <CustomersPage data={fetchedUsers} />;
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

export default Customers;
