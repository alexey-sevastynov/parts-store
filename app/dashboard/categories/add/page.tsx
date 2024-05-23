import { getAllCategories } from '@/actions/categoryActions';
import AddPage from '@/components/templates/Dashboard/CategoriesPage/AddPage/AddPage';
import { getUsers } from '@/utils/dashboards';

const Add = async () => {
  const fetchedUsers = await getUsers();

  const fetchedCategories = await getAllCategories();
  try {
    if (fetchedUsers.users) {
      return <AddPage users={fetchedUsers} data={fetchedCategories} />;
    } else {
      // Handling cases where data is missing or incomplete
      return <div>Loading...</div>;
    }
  } catch (error) {
    if (fetchedUsers.users) {
      console.error(error);
      // Handling data retrieval error
      return (
        <AddPage
          users={{
            ...fetchedUsers,
            msg: 'Failed to fetch users.',
            status: 500,
          }}
          data={fetchedCategories}
        />
      );
    } else {
      console.error(error);
      return <div>Error fetching data.</div>;
    }
  }
};

export default Add;
