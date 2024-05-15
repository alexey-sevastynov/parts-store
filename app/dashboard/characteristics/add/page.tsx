import AddPage from '@/components/templates/Dashboard/CharacteristicsPage/AddPage/AddPage';
import { getUsers } from '@/utils/dashboards';

const Add = async () => {
  const fetchedUsers = await getUsers();
  try {
    if (fetchedUsers.users) {
      return <AddPage users={fetchedUsers} />;
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
        />
      );
    } else {
      console.error(error);
      return <div>Error fetching data.</div>;
    }
  }
};

export default Add;
