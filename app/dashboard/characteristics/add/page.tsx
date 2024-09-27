import AddPage from '@/components/templates/Dashboard/CharacteristicsPage/AddPage/AddPage';
import { getUsers } from '@/utils/dashboards';

const Add = async () => {
  const fetchedUsers = await getUsers();
  try {
    if (fetchedUsers.data) {
      return <AddPage users={fetchedUsers} />;
    } else {
      return <div>Loading...</div>;
    }
  } catch (error) {
    if (fetchedUsers.data) {
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
      return <div>Error fetching data.</div>;
    }
  }
};

export default Add;
