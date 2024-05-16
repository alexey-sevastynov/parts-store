import { getCategoryById } from '@/actions/categoryActions';
import AddSubcategoriesPage from '@/components/templates/Dashboard/CategoriesPage/AddPage/AddSubcategoriesPage/AddSubcategoriesPage';
import { getUsers } from '@/utils/dashboards';

const Add = async ({ params }: { params: { id: string } }) => {
  const fetchedCategory = await getCategoryById(params.id);

  const fetchedUsers = await getUsers();
  try {
    if (fetchedUsers.users) {
      return (
        <AddSubcategoriesPage users={fetchedUsers} data={fetchedCategory} />
      );
    } else {
      // Handling cases where data is missing or incomplete
      return <div>Loading...</div>;
    }
  } catch (error) {
    if (fetchedUsers.users) {
      console.error(error);
      // Handling data retrieval error
      return (
        <AddSubcategoriesPage
          users={{
            ...fetchedUsers,
            msg: 'Failed to fetch users.',
            status: 500,
          }}
          data={fetchedCategory}
        />
      );
    } else {
      console.error(error);
      return <div>Error fetching data.</div>;
    }
  }
};

export default Add;
