import AddSubcategoriesPage from '@/components/templates/Dashboard/CategoriesPage/AddPage/AddSubcategoriesPage/AddSubcategoriesPage';
import { getCategory, getUsers } from '@/utils/dashboards';

const Add = async ({ params }: { params: { id: string } }) => {
  const fetchedUsers = await getUsers();
  const fetchedCategory = await getCategory(params.id);

  try {
    if (fetchedUsers.data) {
      return (
        <AddSubcategoriesPage users={fetchedUsers} data={fetchedCategory} />
      );
    } else {
      // Handling cases where data is missing or incomplete
      return <div>Loading...</div>;
    }
  } catch (error) {
    if (fetchedUsers.data) {
      console.error(error);
      // Handling data retrieval error
      return (
        <AddSubcategoriesPage
          users={{
            ...fetchedUsers,
            msg: 'Failed to fetch users.',
            status: 500,
            data: [],
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
