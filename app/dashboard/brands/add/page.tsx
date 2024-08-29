import AddPage from '@/components/templates/Dashboard/BrandsPage/AddPage/AddPage';
import { getBrands, getUsers } from '@/utils/dashboards';

const Add = async () => {
  const fetchedUsers = await getUsers();
  const fetchedBrands = await getBrands();

  try {
    if (fetchedUsers.data) {
      return <AddPage users={fetchedUsers} brands={fetchedBrands} />;
    } else {
      // Handling cases where data is missing or incomplete
      return <div>Loading...</div>;
    }
  } catch (error) {
    if (fetchedUsers.data) {
      console.error(error);
      // Handling data retrieval error
      return (
        <AddPage
          brands={fetchedBrands}
          users={{
            ...fetchedUsers,
            msg: 'Failed to fetch users.',
            status: 500,
            data: [],
          }}
        />
      );
    } else {
      console.error(error);
      return <div>Error fetching data.</div>;
    }
  }
};

export default Add;
