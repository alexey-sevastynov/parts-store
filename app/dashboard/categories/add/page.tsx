import AddPage from '@/components/templates/Dashboard/CategoriesPage/AddPage/AddPage';
import { getCategories, getUsers } from '@/utils/dashboards';

const Add = async () => {
  const fetchedUsers = await getUsers();
  const fetchedCategories = await getCategories();

  try {
    if (fetchedUsers.data) {
      return <AddPage users={fetchedUsers} data={fetchedCategories} />;
    } else {
      // Handling cases where data is missing or incomplete
      return <div>Loading...</div>;
    }
  } catch (error) {
    if (fetchedUsers.data) {
      console.error(error);
      return <div>Error fetching data.</div>;
    }
  }
};

export default Add;
