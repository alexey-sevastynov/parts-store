import AddSubSubcategoriesPage from '@/components/templates/Dashboard/CategoriesPage/AddPage/AddSubcategoriesPage/AddSubSubcategoriesPage/AddSubSubcategoriesPage';
import { getSubcategory, getUsers } from '@/utils/dashboards';

const Add = async ({ params }: { params: { id: string; id_2: string } }) => {
  const fetchedSubcategory = await getSubcategory(params.id_2);

  const fetchedUsers = await getUsers();
  try {
    if (fetchedUsers.data) {
      return (
        <AddSubSubcategoriesPage
          users={fetchedUsers}
          data={fetchedSubcategory}
          idCategory={params.id}
        />
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
        <AddSubSubcategoriesPage
          users={{
            ...fetchedUsers,
            msg: 'Failed to fetch users.',
            status: 500,
          }}
          data={fetchedSubcategory}
          idCategory={params.id}
        />
      );
    } else {
      console.error(error);
      return <div>Error fetching data.</div>;
    }
  }
};

export default Add;
